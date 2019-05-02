import SearchElement from 'elements/search';
import SearchButtonElement from 'elements/search/button';

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('search-bar', SearchElement);
  customElements.define('search-bar-button', SearchButtonElement);
});
