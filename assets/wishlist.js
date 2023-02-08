const LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
const LOCAL_STORAGE_DELIMITER = ',';
const BUTTON_ACTIVE_CLASS = 'active';
const GRID_LOADED_CLASS = 'loaded';

const wishlist_selectors = {
  button: '[button-wishlist]',
  grid: '[grid-wishlist]',
  productCard: '.grid__item',
  reset: '.wishlist_clear'
};

document.addEventListener('DOMContentLoaded', () => {
  initButtons();
  initGrid();
});

document.addEventListener('shopify-wishlist:updated', (event) => {
  console.log('[Shopify Wishlist] Wishlist Updated ✅', event.detail.wishlist);
  initGrid();
});

document.addEventListener('shopify-wishlist:init-product-grid', (event) => {
  // console.log('[Shopify Wishlist] Wishlist Product List Loaded ✅', event.detail.wishlist);
  const rowsPerPage = 12;
  const rows = document.querySelectorAll('#product-grid .grid__item');
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount/rowsPerPage);
  const numbers = document.querySelector('#numbers');
  numbers.innerHTML += `<li><a href="#" class="pagination__item pagination__item--next pagination__item-arrow link motion-reduce" aria-label="Previous page"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31 24H17" stroke="#040B09" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 31L17 24L24 17" stroke="#040B09" stroke-linecap="round" stroke-linejoin="round"></path><rect x="47.5" y="47.5" width="47" height="47" transform="rotate(-180 47.5 47.5)" stroke="#040B09" stroke-opacity="0.1"></rect></svg></a></li>`;
  for (let i=1; i<=pageCount; i++) {  
    numbers.innerHTML += `<li><a role="link" aria-disabled="true" class="pagination__item light" aria-current="page" aria-label="Page ${i}">${i}</a></li>`;
  }
  numbers.innerHTML += `<li><a href="#" class="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce" aria-label="Next page"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="#040B09" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 5L19 12L12 19" stroke="#040B09" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></li>`
  const numberBtn = numbers.querySelectorAll('a');
  numberBtn.forEach((btn,idx) => {
    btn.addEventListener('click',(e) => {
      e.preventDefault();
      for(let nb of numberBtn) {
        nb.classList.remove('pagination__item--current');
      }
      e.target.classList.add('pagination__item--current');
      // 테이블 출력 함수
      displayRow(idx);
    })
  });

  const displayRow = (idx) => {
    let start = idx*rowsPerPage;
    let end = start+rowsPerPage;
    let rowsArray = [...rows];
    for(let ra of rowsArray) {
      ra.style.display = 'none';
    }
    let newRows = rowsArray.slice(start, end);
    for(let nr of newRows) {
      nr.style.display= 'block';
    }
  }
});

document.addEventListener('shopify-wishlist:init-buttons', (event) => {
  console.log('[Shopify Wishlist] Wishlist Buttons Loaded ✅', event.detail.wishlist);
});

const fetchProductCardHTML = (handle) => {
  const productTileTemplateUrl = `/products/${handle}?view=card`;
  return fetch(productTileTemplateUrl)
  .then((res) => res.text())
  .then((res) => {
    const text = res;
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(text, 'text/html');
    const productCard = htmlDocument.documentElement.querySelector(wishlist_selectors.productCard);
    return productCard.outerHTML;
  })
  .catch((err) => console.error(`[Shopify Wishlist] Failed to load content for handle: ${handle}`, err));
};

const setupGrid = async (grid) => {
  const wishlist = getWishlist();
  const requests = wishlist.map(fetchProductCardHTML);
  const responses = await Promise.all(requests);
  const wishlistProductCards = responses.join('');
  grid.innerHTML = wishlistProductCards;
  grid.classList.add(GRID_LOADED_CLASS);
  initButtons();

  const event = new CustomEvent('shopify-wishlist:init-product-grid', {
    detail: { wishlist: wishlist }
  });
  document.dispatchEvent(event);
};

const setupButtons = (buttons) => {
  buttons.forEach((button) => {
    const productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
    button.addEventListener('click', () => {
      updateWishlist(productHandle);
      button.classList.toggle(BUTTON_ACTIVE_CLASS);
    });
  });
};

const initGrid = () => {
  const grid = document.querySelector(wishlist_selectors.grid) || false;
  if (grid) setupGrid(grid);
};

const initButtons = () => {
  const buttons = document.querySelectorAll(wishlist_selectors.button) || [];
  if (buttons.length) setupButtons(buttons);
  else return;
  const event = new CustomEvent('shopify-wishlist:init-buttons', {
    detail: { wishlist: getWishlist() }
  });
  document.dispatchEvent(event);
};

const getWishlist = () => {
  const wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

const setWishlist = (array) => {
  const wishlist = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
  else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

  const event = new CustomEvent('shopify-wishlist:updated', {
    detail: { wishlist: array }
  });
  document.dispatchEvent(event);

  return wishlist;
};

const updateWishlist = (handle) => {
  const wishlist = getWishlist();
  const indexInWishlist = wishlist.indexOf(handle);
  if (indexInWishlist === -1) wishlist.push(handle);
  else wishlist.splice(indexInWishlist, 1);
  return setWishlist(wishlist);
};

const wishlistContains = (handle) => {
  const wishlist = getWishlist();
  return wishlist.includes(handle);
};

const deleteWishlist = (el) => {
  const productHandle = el.dataset.productHandle || false;
  let wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  let arr;
  if (wishlist) arr = wishlist.split(',');
  arr = arr.filter((ele) => { return ele !== productHandle });
  localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY,arr.join());
  return setWishlist(arr);
};

const resetWishlist = () => {
  return setWishlist([]);
};