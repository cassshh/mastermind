import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 2px;
    }

    .keys-row {
      display: flex;
      width: 100%;
      align-items: center;
    }

    mm-circle {
      margin: 2px;
    }

  </style>
  <div class="keys-row">
    <mm-circle></mm-circle>
    <mm-circle></mm-circle>
  </div>
  <div class="keys-row">
    <mm-circle></mm-circle>
    <mm-circle></mm-circle>
  </div>
`;

class MmBoardResult extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-board-result');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.circles = shadowRoot.querySelectorAll('mm-circle');

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => {
          c.size(width / 2, height / 2, 5);
        });
      }
    });
    ro.observe(this);
  }

  setResult({ hits, pseudoHits }) {
    this.circles.forEach(c => {
      if (hits-- > 0) c.color('red');
      else if (pseudoHits-- > 0) c.color('white');
      return;
    });
  }
}
window.customElements.define('mm-board-result', MmBoardResult);
