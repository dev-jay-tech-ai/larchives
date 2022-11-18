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

$.Mason.prototype._placeBrick = function(e) {
    var n = $(e),
        r, i, s, o, u;
    r = Math.ceil(n.outerWidth(!0) / this.columnWidth), r = Math.min(r, this.cols);
    if (r === 1) s = this.colYs;
    else {
        i = this.cols + 1 - r, s = [];
        for (u = 0; u < i; u++) o = this.colYs.slice(u, u + r), s[u] = Math.max.apply(Math, o)
    }
    var a = Math.min.apply(Math, s),
        f = 0;
    for (var l = 0, c = s.length; l < c; l++)
        if (s[l] === a) {
            f = l;
            break
        }
    /* Add new calculation, what column next brick is in: */
    f = $(e).index() % this.cols; /* Get col index f: Just divide with element's index */
    a = s[f]; /* This is current height for f-th column */
    /* END of customizing */
    var h = {
        top: a + this.offset.y
    };
    h[this.horizontalDirection] = this.columnWidth * f + this.offset.x, this.styleQueue.push({
        $el: n,
        style: h
    });
    var p = a + n.outerHeight(!0),
        d = this.cols + 1 - c;
    for (l = 0; l < d; l++) this.colYs[f + l] = p;
}