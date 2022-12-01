console.log('Masonry 구동 중')

const blog_container = document.querySelector('.blog-nav');
const blogs = document.querySelectorAll('.blog-articles');

blog_container.style.position = 'relative';
blog_container.style.height = '240rem';

blogs.forEach((bl) => {
  bl.style.position = 'absolute';
});

blogs[0].style.left = '0';
blogs[1].style.left = '50%';
blogs[2].style.left = '0';
blogs[3].style.left = '50%';
blogs[4].style.left = '0';
blogs[5].style.left = '50%';

blogs[0].style.top = '0';
blogs[1].style.top = '0';
blogs[2].style.top = '758px';
blogs[3].style.top = '558px';
blogs[4].style.top = '558px';
blogs[5].style.top = '878px';

// position: relative; height: 2195.17px;
// position: absolute; left: 50%; top: 558.391px;
// position: absolute; left: 0%; top: 758.391px;
// position: absolute; left: 50%; top: 1116.78px;
// position: absolute; left: 0%; top: 1636.78px;