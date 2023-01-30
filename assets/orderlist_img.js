const config = fetchConfig('javascript');
config.headers['X-Requested-With'] = 'XMLHttpRequest';
delete config.headers['Content-Type'];

const product_id = 'bicolor-accordion-card-wallet';

const target = document.querySelector('table.order-details td > img');

jQuery.getJSON(window.Shopify.routes.root + 'products/'+ product_id +'.js', function(product) {
  console.log(product.images);
  target.src = product.images[0];
} );