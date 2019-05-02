import CarouselItemTemplate from 'templates/carousel/item';

export default class CarouselItemElement extends HTMLElement {
  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CarouselItemTemplate.content.cloneNode(true));
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private connectedCallback() {
    console.log('carousel item connectedCallback');
  }

  private disconnectedCallback = () => {}

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'books':
        if(newValue) {
          console.log('changed books');
          this.addItems(JSON.parse(newValue).docs);
        }
        break;
    }
  }

  private static get observedAttributes() {
    return ['books'];
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