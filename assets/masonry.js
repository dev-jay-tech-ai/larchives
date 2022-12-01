console.log('Masonry 구동 중')


if(screen.width > 750) {

const blog_container = document.querySelector('.blog-articles');
const blogs = document.querySelectorAll('.blog-articles__article');

blog_container.style.position = 'relative';
blog_container.style.height = '240rem';

blogs.forEach((bl) => {
  bl.style.position = 'absolute';
});

blogs[0].style.left = '0';
blogs[0].style.paddingRight = '20px';
  
blogs[1].style.right = '0';
blogs[1].style.paddingLeft = '20px';
  
blogs[2].style.left = '0';
blogs[2].style.paddingRight = '20px';
  
blogs[3].style.right = '0';
blogs[3].style.paddingLeft = '20px';
  
blogs[4].style.left = '0';
blogs[4].style.paddingRight = '20px';
  
blogs[5].style.right = '0';
blogs[5].style.paddingLeft = '20px';
  
blogs[0].style.top = '0';
blogs[1].style.top = '0';
blogs[2].style.top = String(758)+'px';
blogs[3].style.top = String(558)+'px';
blogs[4].style.top = String(758+558)+'px';
blogs[5].style.top = String(558+858)+'px';
}