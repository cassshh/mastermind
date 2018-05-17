(function () {
  'use strict';

  // Hack to get html syntax highlighting within template literals
  var html = String.raw;

  const tmpl = document.createElement('template');
  tmpl.innerHTML = html`
  <style>
    :host{
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

    slot {
      color: var(--primary-color, #212121);
      font-size: 1.75em;
    }
  </style>
  <slot></slot>
`;

  class MmToolbar extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
  }
  window.customElements.define('mm-toolbar', MmToolbar);

  const tmpl$1 = document.createElement('template');
  tmpl$1.innerHTML = html`
  <mm-toolbar>Mastermind</mm-toolbar>
`;

  class MmApp extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl$1.content.cloneNode(true));
    }
  }
  window.customElements.define('mm-app', MmApp);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2h0bWwubWpzIiwiLi4vLi4vc3JjL21tLXRvb2xiYXIubWpzIiwiLi4vLi4vc3JjL21tLWFwcC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSGFjayB0byBnZXQgaHRtbCBzeW50YXggaGlnaGxpZ2h0aW5nIHdpdGhpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuZXhwb3J0IGRlZmF1bHQgU3RyaW5nLnJhdztcbiIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbC5tanMnO1xuXG5jb25zdCB0bXBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRtcGwuaW5uZXJIVE1MID0gaHRtbGBcbiAgPHN0eWxlPlxuICAgIDpob3N0e1xuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICBkaXNwbGF5OiAtbW96LWJveDtcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA2NHB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LWNvbG9yLCAjZWQxYTU5KTtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG5cbiAgICBzbG90IHtcbiAgICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMjEyMTIxKTtcbiAgICAgIGZvbnQtc2l6ZTogMS43NWVtO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuY2xhc3MgTW1Ub29sYmFyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIEF0dGFjaCBhIHNoYWRvdyByb290IHRvIHRoZSBlbGVtZW50LlxuICAgIGxldCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0bXBsLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW0tdG9vbGJhcicsIE1tVG9vbGJhcik7XG4iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwubWpzJztcbmltcG9ydCAnLi9tbS10b29sYmFyLm1qcyc7XG5cbmNvbnN0IHRtcGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudG1wbC5pbm5lckhUTUwgPSBodG1sYFxuICA8bW0tdG9vbGJhcj5NYXN0ZXJtaW5kPC9tbS10b29sYmFyPlxuYDtcblxuY2xhc3MgTW1BcHAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gQXR0YWNoIGEgc2hhZG93IHJvb3QgdG8gdGhlIGVsZW1lbnQuXG4gICAgbGV0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRtcGwuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtbS1hcHAnLCBNbUFwcCk7XG4iXSwibmFtZXMiOlsiU3RyaW5nIiwicmF3IiwidG1wbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImh0bWwiLCJNbVRvb2xiYXIiLCJIVE1MRWxlbWVudCIsImNvbnN0cnVjdG9yIiwic2hhZG93Um9vdCIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJhcHBlbmRDaGlsZCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJ3aW5kb3ciLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIk1tQXBwIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtBQUNBLGFBQWVBLE9BQU9DLEdBQXRCOztFQ0NBLE1BQU1DLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBYjtFQUNBRixLQUFLRyxTQUFMLEdBQWlCQyxJQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBdEI7O0VBdUJBLE1BQU1DLFNBQU4sU0FBd0JDLFdBQXhCLENBQW9DO0VBQ2xDQyxnQkFBYztFQUNaO0VBQ0E7RUFDQSxRQUFJQyxhQUFhLEtBQUtDLFlBQUwsQ0FBa0IsRUFBRUMsTUFBTSxNQUFSLEVBQWxCLENBQWpCO0VBQ0FGLGVBQVdHLFdBQVgsQ0FBdUJYLEtBQUtZLE9BQUwsQ0FBYUMsU0FBYixDQUF1QixJQUF2QixDQUF2QjtFQUNEO0VBTmlDO0VBUXBDQyxPQUFPQyxjQUFQLENBQXNCQyxNQUF0QixDQUE2QixZQUE3QixFQUEyQ1gsU0FBM0M7O0VDL0JBLE1BQU1MLFNBQU9DLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBYjtBQUNBRixTQUFLRyxTQUFMLEdBQWlCQyxJQUFLOztDQUF0Qjs7RUFJQSxNQUFNYSxLQUFOLFNBQW9CWCxXQUFwQixDQUFnQztFQUM5QkMsZ0JBQWM7RUFDWjtFQUNBO0VBQ0EsUUFBSUMsYUFBYSxLQUFLQyxZQUFMLENBQWtCLEVBQUVDLE1BQU0sTUFBUixFQUFsQixDQUFqQjtFQUNBRixlQUFXRyxXQUFYLENBQXVCWCxPQUFLWSxPQUFMLENBQWFDLFNBQWIsQ0FBdUIsSUFBdkIsQ0FBdkI7RUFDRDtFQU42QjtFQVFoQ0MsT0FBT0MsY0FBUCxDQUFzQkMsTUFBdEIsQ0FBNkIsUUFBN0IsRUFBdUNDLEtBQXZDOzs7OyJ9
