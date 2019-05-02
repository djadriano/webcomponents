import SearchElement from 'elements/search';
import SearchButtonElement from 'elements/search/button';
import CarouselElement from 'elements/carousel/index';
import CarouselItemElement from 'elements/carousel/item';

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('search-bar', SearchElement);
  customElements.define('search-bar-button', SearchButtonElement);
  customElements.define('book-carousel', CarouselElement);
  customElements.define('book-carousel-item', CarouselItemElement);
});
