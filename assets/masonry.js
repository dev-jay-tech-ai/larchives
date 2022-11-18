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

Masonry.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();
  // how many columns does this brick span
  var remainder = item.size.outerWidth % this.columnWidth;
  var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
  // round if off by 1 pixel, otherwise use ceil
  var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
  colSpan = Math.min( colSpan, this.cols );

  var colGroup = this._getColGroup( colSpan );
  // ### HACK: sort by natural order, not by min col height
  // get the minimum Y value from the columns
  // var minimumY = Math.min.apply( Math, colGroup );
  // var shortColIndex = utils.indexOf( colGroup, minimumY );
  var shortColIndex = jQuery(item.element).index() % colGroup.length;
  var minimumY = colGroup[shortColIndex];

  // position the brick
  var position = {
    x: this.columnWidth * shortColIndex,
    y: minimumY
  };

  // apply setHeight to necessary columns
  var setHeight = minimumY + item.size.outerHeight;
  var setSpan = this.cols + 1 - colGroup.length;
  for ( var i = 0; i < setSpan; i++ ) {
    this.colYs[ shortColIndex + i ] = setHeight;
  }

  return position;
};