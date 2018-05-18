!function(){"use strict";var a=String.raw;const b=document.createElement("template");b.innerHTML=a`
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
`,window.customElements.define("mm-toolbar",class extends HTMLElement{constructor(){super(),"undefined"!=typeof ShadyCSS&&(ShadyCSS.prepareTemplate(b,"mm-toolbar"),ShadyCSS.styleElement(this)),this.attachShadow({mode:"open"}).appendChild(b.content.cloneNode(!0))}});const c=document.createElement("template");c.innerHTML=a`
  <mm-toolbar>Mastermind</mm-toolbar>
`,window.customElements.define("mm-app",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(c.content.cloneNode(!0))}})}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2h0bWwubWpzIiwiLi4vLi4vc3JjL21tLXRvb2xiYXIubWpzIiwiLi4vLi4vc3JjL21tLWFwcC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSGFjayB0byBnZXQgaHRtbCBzeW50YXggaGlnaGxpZ2h0aW5nIHdpdGhpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuZXhwb3J0IGRlZmF1bHQgU3RyaW5nLnJhdztcbiIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbC5tanMnO1xuXG5jb25zdCB0bXBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRtcGwuaW5uZXJIVE1MID0gaHRtbGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgZGlzcGxheTogLW1vei1ib3g7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogNjRweDtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1jb2xvciwgI2VkMWE1OSk7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLnNsb3Qge1xuICAgICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMyMTIxMjEpO1xuICAgICAgZm9udC1zaXplOiAxLjc1ZW07XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c3BhbiBjbGFzcz1cInNsb3RcIj48c2xvdD48L3Nsb3Q+PC9zcGFuPlxuYDtcblxuY2xhc3MgTW1Ub29sYmFyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlb2YgU2hhZHlDU1MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBTaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGUodG1wbCwgJ21tLXRvb2xiYXInKTtcbiAgICAgIFNoYWR5Q1NTLnN0eWxlRWxlbWVudCh0aGlzKTtcbiAgICB9XG4gICAgLy8gQXR0YWNoIGEgc2hhZG93IHJvb3QgdG8gdGhlIGVsZW1lbnQuXG4gICAgbGV0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRtcGwuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtbS10b29sYmFyJywgTW1Ub29sYmFyKTtcbiIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbC5tanMnO1xuaW1wb3J0ICcuL21tLXRvb2xiYXIubWpzJztcblxuY29uc3QgdG1wbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50bXBsLmlubmVySFRNTCA9IGh0bWxgXG4gIDxtbS10b29sYmFyPk1hc3Rlcm1pbmQ8L21tLXRvb2xiYXI+XG5gO1xuXG5jbGFzcyBNbUFwcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdCB0byB0aGUgZWxlbWVudC5cbiAgICBsZXQgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodG1wbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21tLWFwcCcsIE1tQXBwKTtcbiJdLCJuYW1lcyI6WyJTdHJpbmciLCJyYXciLCJ0bXBsIiwiaW5uZXJIVE1MIiwiaHRtbCIsIndpbmRvdyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiSFRNTEVsZW1lbnQiLCJTaGFkeUNTUyIsInByZXBhcmVUZW1wbGF0ZSIsInN0eWxlRWxlbWVudCIsInRoaXMiLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiY2xvbmVOb2RlIl0sIm1hcHBpbmdzIjoiK0JBQ2VBLE9BQU9DLG1DQ0NjLFlBQ3BDQyxFQUFLQyxTQUFMRCxDQUFpQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW1DakJDLE9BQU9DLGNBQVBELENBQXNCRSxNQUF0QkYsQ0FBNkIsWUFBN0JBLGNBWndCRyxtQ0FHSSxtQkFBYkMsU0FBYSxZQUNiQyxrQkFBc0IsdUJBQ3RCQyxhQUFhQyxLQUZBLEVBS1BBLEtBQUtDLFlBQUxELEVBQW9CRSxLQUFNLE9BQTFCRixFQUNORyxXQURNSCxDQUNNVixFQUFLYyxPQUFMZCxDQUFhZSxTQUFiZixFQUF1QixDQUF2QkEsQ0FETlUsR0FJckJQLCtDQ2xDS0YsVUFBWUM7O0VBWWpCQyxPQUFPQyxjQUFQRCxDQUFzQkUsTUFBdEJGLENBQTZCLFFBQTdCQSxjQVJvQkcsbUNBSUNJLEtBQUtDLFlBQUxELEVBQW9CRSxLQUFNLE9BQTFCRixFQUNORyxXQURNSCxDQUNNVixFQUFLYyxPQUFMZCxDQUFhZSxTQUFiZixFQUF1QixDQUF2QkEsQ0FETlUsR0FJckJQIn0=
