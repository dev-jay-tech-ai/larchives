const targetUrl = products_on_page.data('next-url').split('q=');
const keyword = targetUrl[targetUrl.length-1].split('&');
console.log(keyword[0]);

$.ajax({
    url: '/search?type=article&q='+ keyword[0],
    type: 'GET',
    dataType: 'html',
  }).done((info) => {
    const content = $(info).find('.article-card > .card__content');
    /* console.log(Object.values(content)[0]);
    console.log(Object.values(content)[1]); */

    for (let i=0; i<content.length; i++) {
      $('.article_get').append(Object.values(content)[i]); 
    }
  });