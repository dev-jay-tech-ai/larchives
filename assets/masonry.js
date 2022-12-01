// external js: masonry.pkgd.js, imagesloaded.pkgd.js
console.log('Masonry 구동 중')
// init Masonry
const grid = document.querySelector('.grid_blog');

const msnry = new Masonry(grid, {
  itemSelector: '.grid_blog_item',
  columnWidth: '.grid_blog-sizer',
  percentPosition: true
});

console.log(msnry)

imagesLoaded(grid).on('progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});