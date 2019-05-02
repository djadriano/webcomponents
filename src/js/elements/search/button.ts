import ButtonTemplate from 'templates/search/button';

export default class SearchButtonElement extends HTMLElement {
  private searchButton: HTMLElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(ButtonTemplate.content.cloneNode(true));

    this.searchButton = this.shadowRoot.querySelector('button');
  }

  // ---------------------------------
  // Lifecycle methods
  // ---------------------------------

  private connectedCallback() {
    this.searchButton.addEventListener('click', this.initializeSpeech);
  }

  private disconnectedCallback = () => {
    this.searchButton.removeEventListener('click', this.initializeSpeech);
  }

  // ---------------------------------
  // Others Methods
  // ---------------------------------

  private initializeSpeech = () => {
    const {SpeechRecognition, webkitSpeechRecognition} = (window as any);
    const SpeechRecognitionClass = SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();

    recognition.continuous = false;
    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = this.getRecognitionResults;
  }

  private getRecognitionResults = (evt: any) => {
    const { results } = evt;
    const { transcript } = results[results.length - 1][0];

    this.dispatchEvent(new CustomEvent('speech-results', {
      bubbles: true,
      composed: true,
      detail: { results: transcript }
    }));
  }
}