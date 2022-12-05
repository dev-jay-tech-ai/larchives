

$.ajax({
    url: '/search?type=article&q=dress',
    type: 'GET',
    dataType: 'html',
  }).done((info) => {
    const content = $(info).find('.article-card > .card__content');
    console.log(Object.keys(content)[0])
    console.log(Object.keys(content)[1])   
    $('.article_get').append(content.html()); 
  });