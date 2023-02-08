class WishlistPagination extends HTMLElement {
  constructor() {
    super();
    
    const rowsPerPage = 12;
    const rows = document.querySelectorAll('#product-grid .grid__item');
    const rowsCount = rows.length;
    console.log(rowsCount)
    
  }
}

customElements.define('wishlist-pagination', WishlistPagination);
