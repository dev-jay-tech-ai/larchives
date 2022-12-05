

$.ajax({
    url: '/search?type=article&q=dress',
    type: 'GET',
    dataType: 'html',
  }).done((info) => {
    const content = $(info).find('.article-card > .card__content');
    console.log(content);
    
    $('.article_get').append(Array.from(content)[0].html()); 
    $('.article_get').append(Array.from(content)[1].html()); 
  });