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

    .solution {
      flex: 0;
    }

  </style>
  <mm-board-row class="solution"></mm-board-row>
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

export default class MmBoard extends HTMLElement {
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

    this.try = this.try.bind(this);

    this.rows = shadowRoot.querySelectorAll('mm-board-row:not(.solution)');
    this.solution = shadowRoot.querySelector('mm-board-row.solution');
  }

  setGame(master) {
    this.master = master;
    this.solution.setSolution(this.master.solution);
    this.setActive(master.tries - 1);
  }

  setActive(i) {
    this.rows.forEach((r, c) => {
      i === c
        ? r.addEventListener('try', this.try)
        : r.removeEventListener('try', this.try);
      setTimeout(() => {
        r.setActive(i === c);
      }, 0);
    });
  }

  try(e) {
    const result = this.master.try({ guess: e.detail.code });
    this.rows[result.tries].setResult(result);
    if (result.hits == 4) {
      this.rows[result.tries].setActive(false);
      this.solution.classList.remove('solution');
      this.solution.style.flex = 1.2;
      this.solution.showReplay();
      return console.log('WIN :D');
    }
    if (!result.tries) {
      this.rows[result.tries].setActive(false);
      this.solution.classList.remove('solution');
      this.solution.style.flex = 1.2;
      this.solution.showReplay();
      return console.log('Game over noob');
    }
    return this.setActive(result.tries - 1);
  }
}
window.customElements.define('mm-board', MmBoard);
