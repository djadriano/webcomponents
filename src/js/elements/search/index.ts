import SearchTemplate from 'templates/search/search';

export default class SearchElement extends HTMLElement {
  private searchForm: HTMLElement;
  private searchField: HTMLElement;
  private searchButton: HTMLElement;
  private searchLabel: HTMLElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(SearchTemplate.content.cloneNode(true));

    this.searchForm = this.shadowRoot.querySelector('form');
    this.searchField = this.shadowRoot.querySelector('input[type="search"]');
    this.searchButton = this.shadowRoot.querySelector('search-bar-button');
    this.searchLabel = this.shadowRoot.querySelector('span');
  }

  // ----------------------------------------
  // Lifecycle methods
  // ----------------------------------------

  private connectedCallback() {
    this.searchField.addEventListener('input', this.setSearchValue);
    this.searchForm.addEventListener('submit', this.formSubmit);
    this.searchButton.addEventListener('speech-results', (e: any) => this.getSpeechResults(e.detail.results));
  }

  private disconnectedCallback() {
    this.searchForm.removeEventListener('submit', this.formSubmit);
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'placeholder':
        this.searchField.setAttribute('placeholder', newValue);
        break;
      case 'search':
        if(newValue) this.searchField.setAttribute('value', newValue);
        break;
    }
  }

  private static get observedAttributes() {
    return ['placeholder', 'search'];
  }

  // ----------------------------------------
  // Getters and Setters
  // ----------------------------------------

  private get placeholder() {
    return this.getAttribute('placeholder');
  }

  private set placeholder(newValue) {
    this.setAttribute('placeholder', newValue);
  }

  private get search() {
    return this.getAttribute('search');
  }

  private set search(newValue) {
    this.setAttribute('search', newValue);
  }

  // ----------------------------------------
  // Others Methods
  // ----------------------------------------

  private setSearchValue = (evt: any) => {
    this.search = evt.target.value;
  }

  private fetchBooks = async () => {
    const bookCarousel = document.querySelector('book-carousel');
    const fetchURL = this.searchForm.getAttribute('action');
    const responseApi = await fetch(`${fetchURL}?title=${this.search}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    let data = await responseApi.json();

    bookCarousel.setAttribute('books', JSON.stringify(data));
  }

  private formSubmit = (evt: MouseEvent) => {
    evt.preventDefault();
    this.fetchBooks();
  }

  private getSpeechResults = (data: string) => {
    this.search = data;
    this.fetchBooks();
  }
}