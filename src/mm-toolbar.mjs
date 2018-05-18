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
      width: 100%;
      height: 64px;
      background: var(--accent-color, #ed1a59);
      align-items: center;
      justify-content: center;
    }

    .slot {
      color: var(--primary-color, #212121);
      font-size: 1.75em;
    }
  </style>
  <span class="slot"><slot></slot></span>
`;

class MmToolbar extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      ShadyCSS.prepareTemplate(tmpl, 'mm-toolbar');
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
window.customElements.define('mm-toolbar', MmToolbar);
