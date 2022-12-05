

$.ajax({
    url: '/search?type=article&q=dress',
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