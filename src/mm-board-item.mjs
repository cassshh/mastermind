import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 2px;
      transition: all 1s ease-in-out;
    }

  </style>
  <mm-circle></mm-circle>
  <mm-circle hidden></mm-circle>
  <mm-circle hidden></mm-circle>
  <mm-circle hidden></mm-circle>
`;

class MmBoardItem extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-board-item');
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
          c.size(width, height, 5);
        });
      }
    });
    ro.observe(this);
  }
}
window.customElements.define('mm-board-item', MmBoardItem);
