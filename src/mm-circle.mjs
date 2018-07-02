import html from './html.mjs';

/**
 * Template literal
 */
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

/**
 * Circle component
 */
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

  /**
   * set size to be square
   * @param width
   * @param height
   * @param spacing
   */
  setSize(width, height, spacing) {
    const size = `${width > height ? height - spacing : width - spacing}px`;
    this.style.width = size;
    this.style.height = size;
  }

  /**
   * Set color
   * @param color
   */
  setColor(color) {
    this.style.background = color;
  }

  /**
   * Set value
   * @param value
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Set selected
   * @param bool
   */
  setSelected(bool) {
    this.selected = bool;
    this.setActive(this.selected);
  }

  /**
   * Set active
   * @param bool
   */
  setActive(bool) {
    this.style.opacity = bool ? 1 : 0.2;
  }
}
/**
 * Define custom element
 */
window.customElements.define('mm-circle', MmCircle);
