console.log('Masonry 구동 중')

const height_total = document.querySelector('.grid_blog').clientHeight;

console.log(height_total);

const blog_container = document.querySelector('.grid_blog');
const blogs = document.querySelectorAll('.grid_blog_item');

blog_container.style.position = 'relative';
blogs.forEach((bl) => {
  bl.style.position = 'absolute';
});

blogs[0].style.left = '0';
blogs[1].style.left = '50%';
blogs[2].style.left = '0';
blogs[3].style.left = '50%';
blogs[4].style.left = '0';
blogs[5].style.left = '50%';


setTimeout(() => {

},200)


// position: relative; height: 2195.17px;
// position: absolute; left: 50%; top: 558.391px;
// position: absolute; left: 0%; top: 758.391px;
// position: absolute; left: 50%; top: 1116.78px;
// position: absolute; left: 0%; top: 1636.78px;