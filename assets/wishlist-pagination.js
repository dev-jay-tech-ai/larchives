class WishlistPagination extends HTMLElement {
  constructor() {
    super();
    
    const rowsPerPage = 12;
    const rows = this.querySelectorAll('#product-grid .grid__item');
    const rowsCount = rows.length;
    setTimeout(() => { console.log(rowsCount)}, 5000)
    
  }
}

customElements.define('wishlist-pagination', WishlistPagination);
