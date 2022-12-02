
//apply
 var macyInstance = Macy({
    container: '.blog-articles',
    trueOrder: true,
    waitForImages: false,
    margin: { x: 20, y: 0 },
    columns: 2,
    breakAt: {
        1200: 2,
        940: 2,
        520: 1,
        400: 1
    }
});

console.log(macy)