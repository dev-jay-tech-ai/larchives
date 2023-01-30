const config = fetchConfig('javascript');
config.headers['X-Requested-With'] = 'XMLHttpRequest';
delete config.headers['Content-Type'];

const product_id = 'bicolor-accordion-card-wallet';

fetch(`/products/${product_id}.json`, config)
  .then((response) => response.text())
  .then((response) => {
    if (response.status) {
      console.log(response.images)
    } 

    this.error = false;
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {

  })