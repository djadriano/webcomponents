import CarouselTemplate from 'templates/carousel/carousel';

export default class CarouselElement extends HTMLElement {
  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CarouselTemplate.content.cloneNode(true));
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'books':
        if(newValue) {
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

  private addItems = (docs: any) => {
    this.innerHTML = `
      ${docs.map((item: any) => `
        <book-carousel-item>
          <h2 slot="title">${item.title}</h2>
        </book-carousel-item>
      `).join('')}
    `;
  }

}