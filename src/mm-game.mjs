import html from './html.mjs';

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

    .play {
      color: var(--accent-color, #ed1a59);
      font-size: 2.5em;
      font-weight: medium;
      padding: 1em;
      cursor: pointer;
      border: 1px var(--accent-color, #ed1a59) solid;
      border-radius: 15px;
      transition: all .5s ease;
    }

    .play:hover {
      color: var(--primary-color, #212121);
      background-color: var(--accent-color, #ed1a59);
    }

  </style>
  <span id="playButton" class="play">Play</span>
`;

class MmGame extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      ShadyCSS.prepareTemplate(tmpl, 'mm-game');
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.play = shadowRoot.querySelector('#playButton');
  }

  setPlayListener(c) {
    this.play.addEventListener('click', c);
  }
}
window.customElements.define('mm-game', MmGame);
