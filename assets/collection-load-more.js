const products_on_page = $('.products-on-page');
let next_url = products_on_page.data('next-url');
const load_more = $('.product-list-bottom .load-more');
const pagination = $('.product-list-bottom div');

if(load_more.length>0) {
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
    console.log(new_url)
    if(new_url === '') load_more.hide();
    else next_url = new_url;
    products_on_page.append(new_products.html());
  })  
});
}  