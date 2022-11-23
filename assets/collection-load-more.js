const products_on_page = $('.products-on-page');
let next_url = products_on_page.data('next-url');
// pagination 버튼 없애는 법 고민해보기
// url page=2 부터 페이지네이션을 감춘다

$.ajax({
  url: next_url,
  type: 'GET',
  dataType: 'html',
}).done((next_page) => {
  const new_products = $(next_page).find('.products-on-page');
  const new_url = new_products.data('next-url');
  next_url = new_url;
  products_on_page.append(new_products.html());
})