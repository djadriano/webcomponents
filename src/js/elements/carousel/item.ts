import CarouselItemTemplate from 'templates/carousel/item';

export default class CarouselItemElement extends HTMLElement {
  private itemTitle: HTMLElement;
  private itemImage: HTMLElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CarouselItemTemplate.content.cloneNode(true));

    this.itemTitle = this.shadowRoot.querySelector('h2');
    this.itemImage = this.shadowRoot.querySelector('img');
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        if(newValue) this.itemTitle.textContent = newValue;
        break;
      case 'cover-id':
        if(newValue) this.itemImage.setAttribute('src', `http://covers.openlibrary.org/b/id/${newValue}-M.jpg`);
        break;
    }
  }

  private static get observedAttributes() {
    return ['title', 'cover-id'];
  }

  // ----------------------------------------
  // Getters and Setters
  // ----------------------------------------

  private get books() {
    return this.getAttribute('books');
  }

  private set books(newValue) {
    this.setAttribute('books', newValue);
  }

  // ---------------------------------
  // Others Methods
  // ---------------------------------

  private addItems = (docs: any) => {}

}