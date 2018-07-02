import html from './html.mjs';
import './mm-toolbar.mjs';
import './mm-board.mjs';
import Master from './master.mjs';

/**
 * Template literal
 */
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

    mm-toolbar {
      max-height: 52px;
      font-size: 1.75em;
    }
    
  </style>
  <mm-toolbar>Mastermind</mm-toolbar>
  <mm-board></mm-board>
`;

/**
 * App component
 */
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

    this.board = shadowRoot.querySelector('mm-board');
    this.board.addEventListener('replay', () => window.location.reload());

    this.newGame();
  }

  /**
   * Start new game
   */
  newGame() {
    this.master = new Master();
    this.board.setGame(this.master);
    // Uncomment next line for cheats
    // console.log(`Solution: ${this.master.solution}`);
  }
}
/**
 * Define custom element
 */
window.customElements.define('mm-app', MmApp);
