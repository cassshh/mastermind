import html from './html.mjs';
import './mm-toolbar.mjs';
import './mm-play.mjs';
import './mm-board.mjs';
import Master from './master.mjs';

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
  <mm-toolbar class="toolbar">Mastermind</mm-toolbar>
  <!-- <mm-play></mm-play> -->
  <mm-board></mm-board>
`;

export default class MmApp extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-app');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.toolbar = shadowRoot.querySelector('mm-toolbar');
    // this.play = shadowRoot.querySelector('mm-play');
    // this.play.setPlayListener(() => {
    //   this.toolbar.classList.add('toolbar');
    //   setTimeout(() => this.play.hide(), 500);
    // });
    this.board = shadowRoot.querySelector('mm-board');

    this.newGame();
  }

  newGame() {
    this.master = new Master();
    console.log(this.master.solution);
    this.board.setGame(this.master);
  }
}
window.customElements.define('mm-app', MmApp);
