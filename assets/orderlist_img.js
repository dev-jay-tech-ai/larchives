const config = fetchConfig('javascript');
config.headers['X-Requested-With'] = 'XMLHttpRequest';
delete config.headers['Content-Type'];

const product_id = '162050248862';



fetch(`/admin/api/2023-01/products/${product_id}.json`, config)
  .then((response) => response.json())
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