const template = document.createElement('template');

template.innerHTML = `
  <style>
    button {
      margin-left: 1rem;
      flex-shrink: 0;
      font-size: 2rem;
      background: transparent;
      border: 0;
    }
  </style>
  <button type="button">🎤</button>
`;

export default template;