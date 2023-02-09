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
  const prevPageBtn = document.querySelector('a[aria-label="Previous page"]');
  const nextPageBtn = document.querySelector('a[aria-label="Next page"]'); 
  let pageActiveIdx = 0;
  let currentPageNum = 0;
  let maxPageNum = 4;
  const insertTarget = document.querySelector('#numbers li:nth-of-type(2)');
  for (let i=1; i<=pageCount; i++) {  
    insertTarget.innerHTML += `<li><a role="link" aria-disabled="true" class="pagination__item light" aria-current="page" aria-label="Page ${i}">${i}</a></li>`;
  }
  insertTarget.outerHTML = insertTarget.innerHTML;
  const numberBtn = numbers.querySelectorAll('a[role="link"]');
  // for(let nb of numberBtn) {
  //   nb.style.display = 'none';
  // }
  numberBtn.forEach((btn,idx) => {
    btn.addEventListener('click',(e) => {
      e.preventDefault();
      displayRow(idx);
    })
  });
  const displayRow = (idx) => {
    console.log(pageCount);
    if(pageCount <= 1) {
      prevPageBtn.style.display = 'none';
      nextPageBtn.style.display = 'none';
    }
    
    let start = idx*rowsPerPage;
    let end = start+rowsPerPage;
    let rowsArray = [...rows];
    for(let ra of rowsArray) {
      ra.style.display = 'none';
    }
    let newRows = rowsArray.slice(start, end);
    for(let nr of newRows) {
      nr.style.display = '';
    }
    for(let nb of numberBtn) {
      nb.classList.remove('pagination__item--current');
    }
    numberBtn[idx].classList.add('pagination__item--current');
  }
  displayRow(0);

  const displayPageEx = (num) => {
    for(let nb of numberBtn) {
      nb.style.display = 'none';
    }
    let totalPageCount = Math.ceil(pageCount/maxPageNum);
    let pageArr = [...numberBtn];
    let start = num*maxPageNum;
    let end = start+maxPageNum;
    let pageListArr = pageArr.slice(start, end);
    for(let item of pageListArr) {
      item.style.display = 'inline-flex';
    }

    if (pageActiveIdx === 0) {
      prevPageBtn.style.display = 'none';
    } else {
      prevPageBtn.style.display = 'inline-flex';
    }

    if (pageActiveIdx === totalPageCount-1) {
      nextPageBtn.style.display = 'none';
    } else {
      nextPageBtn.style.display = 'inline-flex';
    }
    
  }
  const displayPage = (num) => { 
    if (pageActiveIdx === 0) {
      prevPageBtn.style.display = 'none';
    } else {
      prevPageBtn.style.display = 'inline-flex';
    }
  
    if (pageActiveIdx === pageCount-1) {
      nextPageBtn.style.display = 'none';
    } else {
      nextPageBtn.style.display = 'inline-flex';
    }
  }  
  
  displayPage(0);
  
  nextPageBtn.addEventListener('click',(e) => {
    e.preventDefault();
    let nextPageNum = ++pageActiveIdx;
    // let nextPageNum = pageActiveIdx*maxPageNum+maxPageNum;
    displayRow(nextPageNum);
    displayPage(pageActiveIdx);
  })
  
  prevPageBtn.addEventListener('click',(e) => {
    let nextPageNum = --pageActiveIdx;
    e.preventDefault();
    // let nextPageNum = pageActiveIdx*maxPageNum-maxPageNum;
    displayRow(nextPageNum);
    displayPage(pageActiveIdx);
  })
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