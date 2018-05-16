import './mm-toolbar.mjs';

// Hack to get html syntax highlighting within template literals
const html = String.raw;

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <mm-toolbar>Mastermind</mm-toolbar>
`;

class MmApp extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
window.customElements.define('mm-app', MmApp);
