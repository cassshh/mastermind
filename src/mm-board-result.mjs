import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';

/**
 * Template literal
 */
const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0;
      margin: 2px;
      transition: all .5s ease-in-out;
    }

    .keys-row {
      display: flex;
      flex: 0;
      width: 100%;
      align-items: center;
      justify-content: center;
      transition: all .5s ease-in-out;
    }

    .send-container, .replay-container {
      display: flex;
      flex: 0;
      width: 100%;
      transition: all .5s ease-in-out;
    }

    .send, .replay {
      display: flex;
      flex: 0;
      height: unset;
      width: 0;
      transition: all .5s ease-in-out;
    }

    #arrow, #replay {
      fill: #FAFAFA;
    }

  </style>
  <div class="keys-row">
    <mm-circle></mm-circle>
    <mm-circle></mm-circle>
  </div>
  <div class="send-container">
    <svg class="send" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
      <g id="send-boxes"> <g id="ui_x5F_spec_x5F_header_copy_3" display="none"> </g> <path fill="none" d="M0,0h24v24H0V0z"/> </g> <g id="arrow"> <g id="ui_x5F_spec_x5F_header_copy_6" display="none"> </g> <path d="M3.4,20.4l17.45-7.48c0.81-0.35,0.81-1.49,0-1.84L3.4,3.6C2.74,3.31,2.01,3.8,2.01,4.51L2,9.12c0,0.5,0.37,0.93,0.87,0.99 L17,12L2.87,13.88C2.37,13.95,2,14.38,2,14.88l0.01,4.61C2.01,20.2,2.74,20.69,3.4,20.4z"/> </g>
    </svg>
  </div>
  <div class="replay-container">
    <svg class="replay" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
      <g id="replay-boxes" display="none"> <rect display="inline" fill="none" width="24" height="24"/> <rect display="inline" fill="none" width="24" height="24"/> <rect display="inline" fill="none" width="24" height="24"/> </g> <g id="replay"> <path d="M12,5V2.21c0-0.45-0.54-0.67-0.85-0.35L7.35,5.65c-0.2,0.2-0.2,0.51,0,0.71l3.79,3.79C11.46,10.46,12,10.24,12,9.79V7 c3.73,0,6.68,3.42,5.86,7.29c-0.47,2.27-2.31,4.1-4.57,4.57c-3.57,0.75-6.75-1.7-7.23-5.01C5.99,13.37,5.57,13,5.08,13h0 c-0.6,0-1.08,0.53-1,1.13c0.62,4.39,4.8,7.64,9.53,6.72c3.12-0.61,5.63-3.12,6.24-6.24C20.84,9.48,16.94,5,12,5z"/> </g>
    </svg>
  </div>
  <div class="keys-row">
    <mm-circle></mm-circle>
    <mm-circle></mm-circle>
  </div>
`;

/**
 * Board result component
 */
export default class MmBoardResult extends HTMLElement {
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

    this.showResult = false;

    this.onClick = this.onClick.bind(this);
    this.onReplayClick = this.onReplayClick.bind(this);

    this.sendContainer = shadowRoot.querySelector('.send-container');
    this.send = shadowRoot.querySelector('.send');
    this.send.addEventListener('click', this.onClick);

    this.replayContainer = shadowRoot.querySelector('.replay-container');
    this.replay = shadowRoot.querySelector('.replay');
    this.replay.addEventListener('click', this.onReplayClick);

    this.keysRows = shadowRoot.querySelectorAll('.keys-row');

    this.circles = shadowRoot.querySelectorAll('mm-circle');

    /**
     * Resize Observer
     * To adjust Circle compenents
     */
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => {
          if (this.showResult) c.setSize(width, height, 5);
        });
      }
    });
    this.keysRows.forEach(r => {
      ro.observe(r);
    });
  }

  /**
   * Send button animation
   * @param bool
   */
  showSend(bool) {
    if (bool && !this.showResult) {
      this.style.flex = 1;
      this.sendContainer.style.flex = 1;
      setTimeout(() => (this.send.style.flex = 1), 100);
    } else {
      this.showResult = true;
      this.sendContainer.style.justifyContent = 'flex-end';
      this.send.style.flex = 0;
      setTimeout(() => {
        this.sendContainer.style.flex = 0;
        this.keysRows.forEach(r => {
          r.style.flex = 1;
        });
        this.circles.forEach(c => {
          c.style.margin = '2px';
        });
      }, 150);
    }
  }

  /**
   * Show replay button
   */
  showReplay() {
    this.style.flex = 1;
    this.replayContainer.style.flex = 1;
    setTimeout(() => (this.replay.style.flex = 1), 100);
  }

  /**
   * Set result of guess
   * @param {}
   */
  setResult({ hits, pseudoHits }) {
    this.keysRows.forEach(r => (r.style.flex = 1));
    this.circles.forEach((c, i) => {
      c.setActive(true);
      if (hits-- > 0) setTimeout(() => c.setColor('red'), 300 * i);
      else if (pseudoHits-- > 0)
        setTimeout(() => c.setColor('#FAFAFA'), 300 * i);
      return;
    });
  }

  /**
   * On click listener
   * Dispatch send event
   */
  onClick() {
    this.showSend(false);
    this.dispatchEvent(new CustomEvent('send', {}));
  }

  /**
   * Dispatch replay event
   */
  onReplayClick() {
    this.dispatchEvent(new CustomEvent('replay', {}));
  }
}
/**
 * Define custom element
 */
window.customElements.define('mm-board-result', MmBoardResult);
