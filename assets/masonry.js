// external js: masonry.pkgd.js, imagesloaded.pkgd.js
console.log('Masonry 구동 중')
// init Masonry
const grid = document.querySelector('.grid-blog');

const msnry = new Masonry(grid, {
  itemSelector: '.grid-blog-item',
  columnWidth: '.grid-blog-sizer',
  percentPosition: true
});

imagesLoaded( grid ).on('progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});