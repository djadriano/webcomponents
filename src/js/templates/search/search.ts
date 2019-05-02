const template = document.createElement('template');
template.innerHTML = `
  <style>
    form {
      width: 100%;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input[type="search"] {
      width: 100%;
    }

    span {
      margin-top: 20px;
    }
  </style>
  <form action="http://openlibrary.org/search.json" noValidate>
    <div>
      <input type="search" placeholder="">
      <search-bar-button></search-bar-button>
    </div>
    <span></span>
  </form>
`;

export default template;