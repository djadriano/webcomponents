const template = document.createElement('template');

template.innerHTML = `
  <style>
    figure {
      margin: 0;
    }

    img {
      width: 100%;
      height: 20vh;
      object-fit: cover;
      object-position: center;
    }

    h2, h6 {
      margin: 0;
    }

    h2 {
      font-size: 1.8rem;
      text-overflow: ellipsis;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h6 {
      font-size: 1.2rem;
      color: #666;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    @media screen and (min-width: 768px) {
      img {
        height: 30vh;
      }
    }
  </style>
  <div>
    <figure>
      <picture></picture>
      <figcaption>
        <h6></h6>
        <h2></h2>
      </figcaption>
    </figure>
  </div>
`;

export default template;