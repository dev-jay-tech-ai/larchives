class WishlistPagination extends HTMLElement {
  constructor() {
    super();
    
    const rowsPerPage = 12;
    const rows = this.querySelectorAll('#product-grid .grid__item');
    const rowsCount = rows.length;
    console.log(rows)
    
  }
}

customElements.define('wishlist-pagination', WishlistPagination);
