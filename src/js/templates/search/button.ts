const template = document.createElement('template');

template.innerHTML = `
  <style>
    button {
      margin-left: 10px;
      flex-shrink: 0;
    }
  </style>
  <button type="button">Microfone</button>
`;

export default template;