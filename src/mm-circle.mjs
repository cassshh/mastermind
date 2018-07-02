import html from './html.mjs';

const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      background: #343434;
      border-radius: 50%;
      opacity: .2;
      transition: background .3s ease-in-out, opacity .3s ease-in-out;
    }
  </style>
`;

export default class MmCircle extends HTMLElement {
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

  setSize(width, height, spacing) {
    const size = `${width > height ? height - spacing : width - spacing}px`;
    this.style.width = size;
    this.style.height = size;
  }

  setColor(color) {
    this.style.background = color;
  }

  setValue(value) {
    this.value = value;
  }

  setSelected(bool) {
    this.selected = bool;
    this.setActive(this.selected);
  }

  setActive(bool) {
    this.style.opacity = bool ? 1 : 0.2;
  }
}
window.customElements.define('mm-circle', MmCircle);
