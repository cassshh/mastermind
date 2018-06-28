import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 2px;
    }

    .keys {
      display: flex;
      flex-direction: column;
    }

    .keys-row {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .key {
      margin: 2px;
    }

  </style>
  <div class="container">
    <mm-circle></mm-circle>
  </div>
  <div class="container">
    <mm-circle></mm-circle>
  </div>
  <div class="container">
    <mm-circle></mm-circle>
  </div>
  <div class="container">
    <mm-circle></mm-circle>
  </div>
  <div class="container keys">
    <div class="keys-row">
      <mm-circle class="key"></mm-circle>
      <mm-circle class="key"></mm-circle>
    </div>
    <div class="keys-row">
      <mm-circle class="key"></mm-circle>
      <mm-circle class="key"></mm-circle>
    </div>
  </div>
`;

class MmBoardRow extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-board-row');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.circles = shadowRoot.querySelectorAll('mm-circle:not(.key)');
    this.keys = shadowRoot.querySelectorAll('mm-circle.key');

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => c.size(width, height, 5));
        this.keys.forEach(k => k.size(width / 2, height / 2, 4));
      }
    });

    ro.observe(shadowRoot.querySelector('.container'));
  }
}
window.customElements.define('mm-board-row', MmBoardRow);
