// external js: masonry.pkgd.js, imagesloaded.pkgd.js

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