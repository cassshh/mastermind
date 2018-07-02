import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';
import { colors } from './config.mjs';

/**
 * Template literal
 */
const tmpl = document.createElement('template');
tmpl.innerHTML = html`
  <style>
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 2px;
      transition: all .7s ease-in-out;
    }

    .transition {
      transition: all .5s ease-in-out, margin 1s ease-in-out;
    }

    .hidden {
      height: 0 !important;
      width: 0 !important;
      opacity: 0;
    }

  </style>
  <mm-circle></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
`;

/**
 * Board item component
 */
export default class MmBoardItem extends HTMLElement {
  constructor() {
    super();
    if (typeof ShadyCSS !== 'undefined') {
      // eslint-disable-next-line no-undef
      ShadyCSS.prepareTemplate(tmpl, 'mm-board-item');
      // eslint-disable-next-line no-undef
      ShadyCSS.styleElement(this);
    }
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.active = false;
    this.animating = false;
    this.dnd = false; // Do Not Disturb animation
    this.onClick = this.onClick.bind(this);

    this.circles = shadowRoot.querySelectorAll('mm-circle');
    // Init colors and values
    this.circles.forEach((c, i) => {
      c.setValue(i);
      c.setColor(colors[i]);
      if (!c.classList.contains('hidden')) c.active = true;
    });

    /**
     * Resize Observer
     * To adjust Circle compenents according to states
     */
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => {
          if (this.showingCircles || this.animating) {
            c.setSize(width / 1.2, height / 1.2, 5);
            c.style.margin = '0 2px';
          } else {
            c.setSize(width, height, 5);
            c.style.margin = '0';
          }
        });
      }
    });
    ro.observe(this);
  }

  /**
   * Set active
   * @param bool
   */
  setActive(bool) {
    this.active = bool;
  }

  /**
   * Animation
   */
  animate() {
    this.style.flex = this.active ? 10 : 1;
    if (this.active) {
      this.showCircles();
    } else {
      this.hideCircles();
    }
  }

  /**
   * Animate showing circles
   */
  showCircles() {
    this.showingCircles = true;
    this.circles.forEach((c, i) => {
      c.addEventListener('click', this.onClick, true);
      c.setActive(true);
      c.classList.add('transition');
      setTimeout(() => {
        c.classList.remove('hidden');
      }, 100 * i);
    });
  }

  /**
   * Animate hiding circles
   */
  hideCircles() {
    if (!this.showingCircles) return;
    this.animating = true;
    this.dnd = true;
    this.circles.forEach((c, i) => {
      c.removeEventListener('click', this.onClick, true);
      c.setActive(c.selected);
      if (!c.active) {
        setTimeout(() => {
          c.classList.add('hidden');
          setTimeout(() => {
            c.classList.remove('transition');
          }, 600);
        }, 100 * i);
      } else {
        this.animating = false;
        setTimeout(() => {
          c.classList.remove('transition');
          this.dnd = false;
        }, 600);
      }
    });
    this.showingCircles = false;
  }

  /**
   * On click listener
   * @param e
   */
  onClick(e) {
    e.stopPropagation();
    this.circles.forEach(c => {
      c.active = c === e.target;
      c.setSelected(c === e.target);
    });
    this.setActive(false);
    this.animate();
    this.dispatchEvent(new CustomEvent('selected', {}));
  }

  /**
   * Get selected circle
   */
  getSelected() {
    let selected = null;
    this.circles.forEach(c => {
      if (c.selected) selected = c;
    });
    return selected;
  }

  /**
   * Set color
   * Used for the solution
   * @param color
   */
  setColor(color) {
    this.circles[0].setColor(colors[color]);
    this.circles[0].setActive(true);
  }
}
/**
 * Define custom element
 */
window.customElements.define('mm-board-item', MmBoardItem);
