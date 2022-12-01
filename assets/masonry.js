// external js: masonry.pkgd.js, imagesloaded.pkgd.js
console.log('Masonry 구동 중')
// init Masonry
const grid_blog = document.querySelector('.grid_blog');

const msnry = new Masonry(grid_blog, {
  itemSelector: '.grid_blog_item',
  columnWidth: 620
});
 console.log(msnry);
// imagesLoaded(grid).on( 'progress', function() {
//   // layout Masonry after each image loads
//   msnry.layout();
// });