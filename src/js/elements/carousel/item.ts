import CarouselItemTemplate from 'templates/carousel/item';

export default class CarouselItemElement extends HTMLElement {
  private itemTitle: HTMLElement;
  private itemImage: HTMLElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CarouselItemTemplate.content.cloneNode(true));

    this.itemTitle = this.shadowRoot.querySelector('h2');
    this.itemImage = this.shadowRoot.querySelector('picture');
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private connectedCallback() {
    this.lazyLoadImages();
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        if(newValue) this.itemTitle.textContent = newValue;
        break;
      case 'cover-id':
        if(newValue) this.setImages(newValue);
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

  private setImages = (coverId: string) => {
    this.itemImage.innerHTML = `
      <source media="(min-width: 768px)" data-srcset="http://covers.openlibrary.org/b/id/${coverId}-M.jpg">
      <source media="(min-width: 1024px)" data-srcset="http://covers.openlibrary.org/b/id/${coverId}-L.jpg">
      <img data-src="http://covers.openlibrary.org/b/id/${coverId}-S.jpg">
    `;
  }

  private preloadImage = (target: HTMLElement) => {
    let images = target.querySelector('img');
    let sources = target.querySelectorAll('source');

    sources.forEach(source => {
      source.srcset = source.getAttribute('data-srcset');
    });

    images.src = images.getAttribute('data-src');
  }

  private lazyLoadImages = () => {
    const pictureEl = this.shadowRoot.querySelectorAll('picture');
    const observerConfig = {
      rootMargin: '0px 0px',
      threshold: 0
    };

    let observerImages = new IntersectionObserver((images, self) => {
      images.forEach((entry: any) => {
        if (entry.isIntersecting) {
          this.preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, observerConfig);

    pictureEl.forEach(image => observerImages.observe(image));
  }
}