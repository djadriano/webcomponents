const template = document.createElement('template');

template.innerHTML = `
  <style>
    section {
      position: relative;
      max-width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }

    div {
      scroll-snap-type: x mandatory;
      overflow-x: scroll;
      overflow-y: hidden;
      scroll-behavior: smooth;
      display: flex;
      align-items: center;
      -webkit-overflow-scrolling: touch;
      height: 100%;
    }

    ::slotted(book-carousel-item) {
      scroll-snap-align: start;
      position: relative;
      min-width: 37%;
      min-height: 100%;
      margin-right: 2rem;
    }

    ::slotted(p) {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      margin: 0;
      font-size: 1.6rem;
    }

    ::slotted(h2) {
      margin: 0 0 2rem;
      font-size: 2.4rem;
      color: #666;
    }

    @media screen and (min-width: 768px) {
      ::slotted(book-carousel-item) {
        min-width: 27%;
      }
    }
  </style>
  <section>
    <slot name="title"></slot>
    <div>
      <slot></slot>
    </div>
  </section>
`;

export default template;