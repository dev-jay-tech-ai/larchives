const config = fetchConfig('javascript');
config.headers['X-Requested-With'] = 'XMLHttpRequest';
delete config.headers['Content-Type'];

const product_id = 'bicolor-accordion-card-wallet';

fetch(`/products/${product_id}.json`)
  .then((response) => response.text())
  .then((response) => {
    if (response.status) {
      console.log(response)
    } 

    this.error = false;
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {

  })

jQuery.getJSON(window.Shopify.routes.root + 'products/'+ product_id +'.js', function(product) {
  console.log('The title of this product is ' + product.title);
} );