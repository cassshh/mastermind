import html from './html.mjs';
import './mm-board-item.mjs';
import './mm-board-result.mjs';

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

  </style>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-result></mm-board-result>
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

    this.items = shadowRoot.querySelectorAll('mm-board-item');
    this.items.forEach(i =>
      i.addEventListener('click', this.onClick.bind(this))
    );

    /* this.result = shadowRoot.querySelector('mm-board-result');
    setTimeout(() => {
      this.result.setResult({
        hits: Math.floor(Math.random() * 3),
        pseudoHits: Math.floor(Math.random() * 3)
      });
    }, 50); */
  }

  onClick(e) {
    const i = e.target;
    if (i.active) return;
    let wait = false;
    this.items.forEach(i => {
      if (i.showingCircles) wait = true;
      i.setActive(false);
      i.animate();
    });
    i.setActive(true);
    setTimeout(() => {
      i.animate();
    }, wait ? 400 : 200);
  }
}
window.customElements.define('mm-board-row', MmBoardRow);
