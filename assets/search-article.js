

$.ajax({
    url: '/search?type=article&q=dress',
    type: 'GET',
    dataType: 'html',
  }).done((info) => {
    const content = $(info).find('.article-card > .card__content');

    $.Each(content,(index, el) => {
      console.log('element', el);
    });
    
    $('.article_get').append(content.html()); 
  });