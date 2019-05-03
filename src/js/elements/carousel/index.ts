import CarouselTemplate from 'templates/carousel/carousel';

export default class CarouselElement extends HTMLElement {
  private slots: HTMLElement;
  private container: HTMLElement;
  private carouselPlayInterval: any;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CarouselTemplate.content.cloneNode(true));

    this.slots = this.shadowRoot.querySelector('slot');
    this.container = this.shadowRoot.querySelector('div');
    this.carouselPlayInterval;
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private connectedCallback() {
    this.slots.addEventListener('slotchange', this.initializeCarousel);
  }

  private disconnectedCallback() {
    this.unRegisterEvents();
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'books':
        if(newValue) {
          this.addItems(JSON.parse(newValue));
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

  private initializeCarousel = () => {
    this.registerEvents();
    this.play();
  }

  private registerEvents = () => {
    const carouselItems = this.querySelectorAll('book-carousel-item');

    carouselItems.forEach((item) => {
      item.addEventListener('mouseenter', this.stop);
      item.addEventListener('mouseleave', this.play);
    });
  }

  private unRegisterEvents = () => {
    const carouselItems = this.querySelectorAll('book-carousel-item');

    carouselItems.forEach((item) => {
      item.removeEventListener('mouseenter', this.stop);
      item.removeEventListener('mouseleave', this.play);
    });
  }

  private play = () => {
    this.carouselPlayInterval = setInterval(this.scrollToNext, 5000);
  }

  private stop = () => {
    if(this.carouselPlayInterval) clearInterval(this.carouselPlayInterval);
  }

  private scrollToNext = () => {
    this.container.scrollBy(this.container.clientWidth, 0);
  }

  private addItems = (docs: any) => {
    this.innerHTML = `
      <h2 slot="title">Results of your search</h2>
      ${docs.map((item: any) => `
        <book-carousel-item title="${item.title}" cover-id="${item.cover_i}" author="${item.author_name[0]}"></book-carousel-item>
      `).join('')}
    `;
  }

}