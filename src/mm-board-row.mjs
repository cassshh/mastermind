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
      transition: opacity .3s ease-in-out;
    }

  </style>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-item></mm-board-item>
  <mm-board-result></mm-board-result>
`;

export default class MmBoardRow extends HTMLElement {
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

    this.onClick = this.onClick.bind(this);
    this.validateSend = this.validateSend.bind(this);
    this.validateCode = this.validateCode.bind(this);
    this.setResult = this.setResult.bind(this);

    this.items = shadowRoot.querySelectorAll('mm-board-item');
    this.result = shadowRoot.querySelector('mm-board-result');
  }

  onClick(e) {
    const i = e.target;
    if (i.active || i.dnd) return;
    let wait = false;
    this.items.forEach(i => {
      if (i.showingCircles) wait = true;
      i.setActive(false);
      i.animate();
    });
    i.setActive(true);
    setTimeout(() => {
      i.animate();
    }, wait ? 600 : 200);
  }

  setActive(bool) {
    this.style.flex = bool ? 1.1 : 1;
    this.style.opacity = bool || this.result.showResult ? 1 : 0.2;
    if (bool) {
      this.items.forEach(i => {
        i.addEventListener('click', this.onClick);
        i.addEventListener('selected', this.validateSend);
      });
      this.result.addEventListener('send', this.validateCode);
    } else {
      this.items.forEach(i => {
        i.removeEventListener('click', this.onClick);
        i.removeEventListener('selected', this.validateSend);
      });
      this.result.removeEventListener('send', this.validateCode);
    }
  }

  validateSend() {
    let allSelected = true;
    this.items.forEach(i => {
      if (!i.getSelected()) allSelected = false;
    });
    if (allSelected) this.result.showSend(true);
  }

  validateCode() {
    const code = [];
    this.items.forEach(i => {
      i.setActive(false);
      i.animate();
      code.push(i.getSelected().value);
    });
    this.dispatchEvent(new CustomEvent('try', { detail: { code } }));
  }

  setResult(result) {
    this.result.setResult(result);
  }

  setSolution(solution) {
    this.items.forEach((i, index) => {
      const color = solution[index];
      i.setColor(color);
    });
  }

  showReplay() {
    this.result.showReplay();
  }
}
window.customElements.define('mm-board-row', MmBoardRow);
