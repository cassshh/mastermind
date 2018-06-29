import html from './html.mjs';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      background: #343434;
      border-radius: 50%;
      transition: background .3s ease-in-out;
    }
  </style>
`;

class MmCircle extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-circle');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  size(width, height, spacing) {
    const size = `${width > height ? height - spacing : width - spacing}px`;
    this.style.width = size;
    this.style.height = size;
  }

  color(color) {
    this.style.background = color;
  }
}
window.customElements.define('mm-circle', MmCircle);
