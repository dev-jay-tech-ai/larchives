const products_on_page = $('.products-on-page');
let next_url = products_on_page.data('next-url');
const load_more = $('.load-more');
const pagination = $('.product-list-bottom div');

load_more[0].addEventListener("click",(e) => {
  e.preventDefault(); 
  load_more[0].style.margin = '0 auto';
  pagination[1].style.display = 'none';
  $.ajax({
    url: next_url,
    type: 'GET',
    dataType: 'html',
  }).done((next_page) => {
    const new_products = $(next_page).find('.products-on-page');
    const new_url = new_products.data('next-url');
    if(new_url === '') console.log('y');
    next_url = new_url;

    products_on_page.append(new_products.html());
  })  
});