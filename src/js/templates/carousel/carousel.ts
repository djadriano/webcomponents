const template = document.createElement('template');

template.innerHTML = `
  <style>
    section {
      position: relative;
      max-width: 100%;
      border: 1px dotted;
    }

    div {
      scroll-snap-type: x mandatory;
      overflow-x: scroll;
      overflow-y: hidden;
      scroll-behavior: smooth;
      display: flex;
      align-items: center;
      height: 500px;
      -webkit-overflow-scrolling: touch;
    }

    ::slotted(book-carousel-item) {
      scroll-snap-align: start;
      position: relative;
      min-width: 100%;
      min-height: 100%;
      border-radius: 10px;
      border: 1px solid;
    }
  </style>
  <section>
    <div>
      <slot></slot>
    </div>
  </section>
`;

export default template;