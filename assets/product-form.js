function formatMoney (cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      this.submitButton = this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      this.handleErrorMessage();

      this.submitButton.setAttribute('aria-disabled', true);
      this.submitButton.classList.add('loading');
      if(this.querySelector('.loading-overlay__spinner')) this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if(screen.width > 1024 || !isMobile) {
        const cart_popup = document.querySelector('.drawer');
        cart_popup.style.visibility = 'visible';
      }

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      if (this.cart) {
        formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
        formData.append('sections_url', window.location.pathname);
        this.cart.setActiveElement(document.activeElement);
      }
      config.body = formData;

      // 카트에 더하는 함수
      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            if(this.querySelector('.product-form__error-message-wrapper')) this.handleErrorMessage(response.description);
            if(this.submitButton.querySelector('.sold-out-message')) {
              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
            }

            this.submitButton.setAttribute('aria-disabled', true);
            if(this.submitButton.querySelector('span')) {
              // this.submitButton.querySelector('span').classList.add('hidden');
              this.submitButton.querySelector('span').style.opacity = .2;
              soldOutMessage.classList.remove('hidden');
            }
            this.error = true;
            return;
          } else if (!this.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          this.error = false;
          /*
          const quickAddModal = this.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener('modalClosed', () => {
              setTimeout(() => { this.cart.renderContents(response) });
            }, { once: true });
            quickAddModal.hide(true);
          } else {
            this.cart.renderContents(response);
          }*/
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          
         fetch(`${routes.cart_change_url}`, config)
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            const format = this.querySelector('[data-money-format]').getAttribute('data-money-format');
            const subtotal = this.querySelector('.totals__subtotal-value');
            subtotal.innerText = formatMoney(res.items_subtotal_price, format);

            const htmlFormat = `<tr id="CartDrawer-Item-0" class="cart-item" role="row">
                <td class="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">
                    <a href="/products/canvas-small-canvas-bag-339933?variant=41299318767774" class="cart-item__link" tabindex="-1" aria-hidden="true"> </a>
                    <img class="cart-item__image" src="//cdn.shopify.com/s/files/1/0595/6275/4206/products/BGCANVLI427_7.png?v=1651574032&amp;width=300" alt="" loading="lazy" width="150" height="200">
                </td>            
                <td class="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct"><a href="/products/canvas-small-canvas-bag-339933?variant=41299318767774" class="cart-item__name h4 break">BALENCIAGA</a>
                    <p class="caption-with-letter-spacing light">${ res.items[0].product_title }</p><dl><div class="product-option">
                            <dt>COLOUR: </dt>
                            <dd>IVORY</dd>
                          </div></dl>
                    <p class="product-option"></p><ul class="discounts list-unstyled" role="list" aria-label="Discount"></ul>
                </td>
                <td class="cart-item__totals right" role="cell" headers="CartDrawer-ColumnTotal">
                  <div class="loading-overlay hidden">
                    <div class="loading-overlay__spinner">
                      <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                      </svg>
                    </div>
                  </div>
                  <div class="cart-item__price-wrapper">
                     <div class="cart-item__discounted-prices">
                        <span class="visually-hidden">
                          Regular price
                        </span>
                        <s class="cart-item__old-price price price--end">${ res.items[0].final_price }</s>
                        <span class="visually-hidden">
                          Sale price
                        </span>
                        <span class="price price--end">${ res.items[0].final_price }</span>
                      </div></div>
                </td>
                <td class="cart-item__quantity" role="cell" headers="CartDrawer-ColumnQuantity">
                  <div class="cart-item__quantity-wrapper">
                    <div class="totals">
                      <label class="product-option" for="Quantity-1">
                        QUANTITY
                      </label>
                      <quantity-input class="cart_quantity">
                        <button class="cart_quantity__button no-js-hidden" name="minus" type="button">
                          <span class="visually-hidden">Decrease quantity for canvas tote bag</span>
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
<path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
</path></svg>
                        </button>
                        <input class="cart_quantity__input" type="number" name="quantity" value="1" min="1" aria-label="Quantity for canvas tote bag" id="Quantity-1" data-index="1">
                        <button class="cart_quantity__button no-js-hidden" name="plus" type="button">
                          <span class="visually-hidden">Increase quantity for canvas tote bag</span>
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
</path></svg>
                        </button>
                      </quantity-input>
                    </div>
                    <cart-remove-button id="CartDrawer-Remove-1" data-index="1">
                      <button type="button" class="button button--tertiary" aria-label="Remove canvas tote bag - ivory">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove">
<path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
<path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
</svg>
                      </button>
                    </cart-remove-button>
                  </div>
                  <div id="CartDrawer-LineItemError-1" class="cart-item__error" role="alert">
                    <small class="cart-item__error-text"></small>
                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                      <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                      <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                      <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                      <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                    </path></svg>
                  </div>
                </td>
              </tr>`;
    
          })
          .catch((e) => {
            console.error(e);
          })
          
          this.submitButton.classList.remove('loading');
          if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
          if (!this.error) this.submitButton.removeAttribute('aria-disabled');
          if(this.querySelector('.loading-overlay__spinner')) this.querySelector('.loading-overlay__spinner').classList.add('hidden');   
        })
    } 
    
    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}