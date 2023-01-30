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


  



    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.enableLoading(line);
    console.log('라인: ',line,'양: ',quantity,'네임: ', name)
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem = document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      });
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
      lineItemError
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          quantityElement.value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');
  }



          

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