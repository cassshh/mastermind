import html from './html.mjs';
import './mm-board-row.mjs';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

    mm-board-row {
      display: flex;
      flex: 1;
      width: 100%;
      max-width: 600px;
      transition: all .5s ease;
    }
  </style>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
  <mm-board-row></mm-board-row>
`;

class MmBoard extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-board');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.rows = shadowRoot.querySelectorAll('mm-board-row');
    setTimeout(() => this.rows[this.rows.length - 1].setActive(true), 500);
  }
}
window.customElements.define('mm-board', MmBoard);
