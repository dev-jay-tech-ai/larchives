data-next-url="/search?options%5Bprefix%5D=last&page=2&q=Dress"
const products_on_page = $('.products-on-page');
const url = products_on_page.data('next-url').split('q=');
const keyword = url[url.length-1];
console.log(keyword)
const content = $(info).find('.article-card > .card__content');
$.ajax({
    url: '/search?type=article&q='+ keyword,
    type: 'GET',
    dataType: 'html',
  }).done((info) => {

    /* console.log(Object.values(content)[0]);
    console.log(Object.values(content)[1]); */

    for (let i=0; i<content.length; i++) {
      $('.article_get').append(Object.values(content)[i]); 
    }
  });