import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';

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
      justify-content: space-evenly;
    }

    .transition {
      transition: all .5s ease-in-out;
    }

    .hidden{
      height: 0 !important;
      width: 0 !important;
      opacity: 0;
    }

  </style>
  <mm-circle></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
  <mm-circle class="hidden"></mm-circle>
`;

class MmBoardItem extends HTMLElement {
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

    this.circles = shadowRoot.querySelectorAll('mm-circle');
    this.circles.forEach(c => {
      if (!c.classList.contains('hidden')) c.active = true;
    });

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => {
          c.size(width, height, 5);
        });
      }
    });
    ro.observe(this);
  }

  setActive(bool) {
    this.active = bool;
    return this.active;
  }

  animate() {
    this.style.flex = this.active ? 10 : 1;
    if (this.active) {
      this.showCircles();
    } else {
      this.hideCircles();
    }
    // this.active ? this.showCircles() : this.hideCircles();
  }

  showCircles() {
    this.showingCircles = true;
    this.circles.forEach((c, i) => {
      c.classList.add('transition');
      setTimeout(() => {
        c.classList.remove('hidden');
      }, 100 * i);
    });
  }

  hideCircles() {
    if (!this.showingCircles) return;
    this.circles.forEach((c, i) => {
      if (!c.active) {
        setTimeout(() => {
          c.classList.add('hidden');
        }, 100 * i);
        setTimeout(() => {
          c.classList.remove('transition');
        }, 600 * i);
      } else {
        c.classList.remove('transition');
      }
    });
    this.showingCircles = false;
  }
}
window.customElements.define('mm-board-item', MmBoardItem);
