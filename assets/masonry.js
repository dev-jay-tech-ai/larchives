console.log('Masonry 구동 중')

// vanilla JS
// init with element
var grid = document.querySelector('.blog-articles');
var msnry = new Masonry( grid, {
  // options...
  itemSelector: '.blog-articles__article',
});


const articles_on_page = $('.articles-on-page');
let next_url = articles_on_page.data('next-url');
const load_more = $('.load-more');

load_more[0].addEventListener("click",(e) => {
  e.preventDefault(); 
  $.ajax({
    url: next_url,
    type: 'GET',
    dataType: 'html',
  }).done((next_page) => {
    const new_articles = $(next_page).find('.articles-on-page');
    const new_url = new_articles.data('next-url');
    next_url = new_url;
    articles_on_page.append(new_articles.html());
  })  
});


if(screen.width > 750) {

const blog_container = document.querySelector('.blog-articles');
const blogs = document.querySelectorAll('.blog-articles__article');

blog_container.style.position = 'relative';

  
let sumOdd = 0;
let sumEven = 0;
  

blogs.forEach((blg,idx) => {
  
  blg.style.position = 'absolute';
  if(idx === 0 || idx === 1) blg.style.top = '0';
  if(idx% 2 == 0) {
    blg.style.left = '0';
    blg.style.paddingRight = '20px';
    sumEven += blg.clientHeight;
  } else {
    blg.style.left = 'unset';
    blg.style.right = '0';
    blg.style.paddingLeft = '20px';
    sumOdd += blg.clientHeight;
  }
  console.log(sumOdd);
  console.log(sumEven);

  blogs[2].style.top = String(758)+'px';
  blogs[3].style.top = String(558)+'px';
  blogs[4].style.top = String(758+558)+'px';
  blogs[5].style.top = String(558+858)+'px';

  setTimeout(() => {
    blog_container.style.height = Math.max(sumOdd,sumEven);
  },100);
  
});
}  