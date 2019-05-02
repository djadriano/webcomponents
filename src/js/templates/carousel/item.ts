const template = document.createElement('template');

template.innerHTML = `
  <style>
    div {
      scroll-snap-align: center;
      margin: 10px;
      position: relative;
      min-width: 75%;
      min-height: 95%;
      border-radius: 10px;
    }
  </style>
  <div>
    <slot name="image"></slot>
    <slot name="title"></slot>
  </div>
`;

export default template;