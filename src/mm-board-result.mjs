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

    .send-container {
      display: flex;
      flex: 0;
      width: 100%;
      transition: all .5s ease-in-out;
    }

    .send {
      display: flex;
      flex: 0;
      height: unset;
      width: 0;
      transition: all .5s ease-in-out;
    }

    #arrow {
      fill: #FAFAFA;
    }

  </style>
  <div class="keys-row">
    <mm-circle></mm-circle>
    <mm-circle></mm-circle>
  </div>
  <div class="send-container">
  <svg class="send" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g id="boxes"> <g id="ui_x5F_spec_x5F_header_copy_3" display="none"> </g> <path fill="none" d="M0,0h24v24H0V0z"/> </g> <g id="arrow"> <g id="ui_x5F_spec_x5F_header_copy_6" display="none"> </g> <path d="M3.4,20.4l17.45-7.48c0.81-0.35,0.81-1.49,0-1.84L3.4,3.6C2.74,3.31,2.01,3.8,2.01,4.51L2,9.12c0,0.5,0.37,0.93,0.87,0.99 L17,12L2.87,13.88C2.37,13.95,2,14.38,2,14.88l0.01,4.61C2.01,20.2,2.74,20.69,3.4,20.4z"/> </g>
  </svg>
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

    this.showResult = false;

    this.onClick = this.onClick.bind(this);

    this.sendContainer = shadowRoot.querySelector('.send-container');
    this.send = shadowRoot.querySelector('.send');
    this.send.addEventListener('click', this.onClick);

    this.keysRows = shadowRoot.querySelectorAll('.keys-row');

    this.circles = shadowRoot.querySelectorAll('mm-circle');

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

  setResult({ hits, pseudoHits }) {
    this.setSend(false);
    this.keysRows.forEach(r => (r.style.flex = 1));
    this.circles.forEach(c => {
      if (hits-- > 0) c.color('red');
      else if (pseudoHits-- > 0) c.color('white');
      return;
    });
  }

  onClick() {
    this.showSend(false);
    this.dispatchEvent(new CustomEvent('send', {}));
  }
}
window.customElements.define('mm-board-result', MmBoardResult);
