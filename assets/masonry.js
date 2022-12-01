// external js: masonry.pkgd.js, imagesloaded.pkgd.js
console.log('Masonry 구동 중')
// init Masonry
var grid = document.querySelector('.grid-blog');

var msnry = new Masonry( grid, {
  itemSelector: '.grid-blog-item',
  columnWidth: '.grid-blog-sizer',
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});