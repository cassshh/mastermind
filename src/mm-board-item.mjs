import html from './html.mjs';
import './mm-circle.mjs';
import ResizeObserver from './../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js';
import { colors } from './config.mjs';

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
    this.animating = false;
    this.dnd = false;
    this.onClick = this.onClick.bind(this);

    this.circles = shadowRoot.querySelectorAll('mm-circle');
    this.circles.forEach((c, i) => {
      c.value(i);
      c.color(colors[i]);
      if (!c.classList.contains('hidden')) c.active = true;
    });

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.circles.forEach(c => {
          if (this.showingCircles || this.animating) {
            c.size(width / 1.2, height / 1.2, 5);
            c.style.margin = '0 2px';
          } else {
            c.size(width, height, 5);
            c.style.margin = '0';
          }
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
  }

  showCircles() {
    this.showingCircles = true;
    this.circles.forEach((c, i) => {
      c.addEventListener('click', this.onClick, true);
      c.classList.add('transition');
      setTimeout(() => {
        c.classList.remove('hidden');
      }, 100 * i);
    });
  }

  hideCircles() {
    if (!this.showingCircles) return;
    this.animating = true;
    this.dnd = true;
    this.circles.forEach((c, i) => {
      c.removeEventListener('click', this.onClick, true);
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

  onClick(e) {
    e.stopPropagation();
    this.circles.forEach(c => {
      c.active = c === e.target;
    });
    this.setActive(false);
    this.animate();
  }
}
window.customElements.define('mm-board-item', MmBoardItem);
