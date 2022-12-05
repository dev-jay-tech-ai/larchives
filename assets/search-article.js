

$.ajax({
    url: '/search?type=article&q=dress',
    type: 'GET',
    dataType: 'html',
  }).done((info) => {
    const content = $(info).find('.article-card > .card__content');
    for (const value of Object.values(content)) {
      
    }
  $('.article_get').append(value); 
  });