import html from './html.mjs';
import './mm-toolbar.mjs';
import './mm-game.mjs';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex: 1;
    }

    mm-toolbar.toolbar {
      max-height: 64px;
      font-size: 1.75em;
    }
  </style>
  <mm-toolbar>Mastermind</mm-toolbar>
  <mm-game></mm-game>
`;

class MmApp extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.toolbar = shadowRoot.querySelector('mm-toolbar');
    this.game = shadowRoot.querySelector('mm-game');
    this.game.setPlayListener(() => {
      this.toolbar.classList.add('toolbar');
    });
  }
}
window.customElements.define('mm-app', MmApp);
