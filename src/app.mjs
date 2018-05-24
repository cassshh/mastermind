!function(){"use strict";var b=String.raw;const c=document.createElement("template");c.innerHTML=b`
  <style>
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      width: 100%;
      flex: 1;
      max-height: 100%;
      background: var(--accent-color, #ed1a59);
      color: var(--primary-color, #212121);
      font-size: 2.75em;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 15px 15px;
      transition: max-height 1s ease, font-size .7s ease-in-out .3s;
    }
  </style>
  <slot></slot>
`,window.customElements.define("mm-toolbar",class extends HTMLElement{constructor(){super(),"undefined"!=typeof ShadyCSS&&(ShadyCSS.prepareTemplate(c,"mm-toolbar"),ShadyCSS.styleElement(this)),this.attachShadow({mode:"open"}).appendChild(c.content.cloneNode(!0))}});const d=document.createElement("template");d.innerHTML=b`
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
`,window.customElements.define("mm-game",class extends HTMLElement{constructor(){super(),"undefined"!=typeof ShadyCSS&&(ShadyCSS.prepareTemplate(d,"mm-game"),ShadyCSS.styleElement(this));let a=this.attachShadow({mode:"open"});a.appendChild(d.content.cloneNode(!0)),this.play=a.querySelector("#playButton")}setPlayListener(a){this.play.addEventListener("click",a)}});const f=document.createElement("template");f.innerHTML=b`
  <style>
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex: 1;
    }

    mm-toolbar.toolbar {
      max-height: 64px;
      font-size: 1.75em;
    }
  </style>
  <mm-toolbar>Mastermind</mm-toolbar>
  <mm-game></mm-game>
`,window.customElements.define("mm-app",class extends HTMLElement{constructor(){super();let a=this.attachShadow({mode:"open"});a.appendChild(f.content.cloneNode(!0)),this.toolbar=a.querySelector("mm-toolbar"),this.game=a.querySelector("mm-game"),this.game.setPlayListener(()=>{this.toolbar.classList.add("toolbar")})}})}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2h0bWwubWpzIiwiLi4vLi4vc3JjL21tLXRvb2xiYXIubWpzIiwiLi4vLi4vc3JjL21tLWdhbWUubWpzIiwiLi4vLi4vc3JjL21tLWFwcC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSGFjayB0byBnZXQgaHRtbCBzeW50YXggaGlnaGxpZ2h0aW5nIHdpdGhpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuZXhwb3J0IGRlZmF1bHQgU3RyaW5nLnJhdztcbiIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbC5tanMnO1xuXG5jb25zdCB0bXBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRtcGwuaW5uZXJIVE1MID0gaHRtbGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgZGlzcGxheTogLW1vei1ib3g7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LWNvbG9yLCAjZWQxYTU5KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMjEyMTIxKTtcbiAgICAgIGZvbnQtc2l6ZTogMi43NWVtO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogMCAwIDE1cHggMTVweDtcbiAgICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMXMgZWFzZSwgZm9udC1zaXplIC43cyBlYXNlLWluLW91dCAuM3M7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5jbGFzcyBNbVRvb2xiYXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHR5cGVvZiBTaGFkeUNTUyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIFNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZSh0bXBsLCAnbW0tdG9vbGJhcicpO1xuICAgICAgU2hhZHlDU1Muc3R5bGVFbGVtZW50KHRoaXMpO1xuICAgIH1cbiAgICAvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdCB0byB0aGUgZWxlbWVudC5cbiAgICBsZXQgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodG1wbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21tLXRvb2xiYXInLCBNbVRvb2xiYXIpO1xuIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9odG1sLm1qcyc7XG5cbmNvbnN0IHRtcGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudG1wbC5pbm5lckhUTUwgPSBodG1sYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICBkaXNwbGF5OiAtbW96LWJveDtcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmbGV4OiAxO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cblxuICAgIC5wbGF5IHtcbiAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IsICNlZDFhNTkpO1xuICAgICAgZm9udC1zaXplOiAyLjVlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBtZWRpdW07XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXI6IDFweCB2YXIoLS1hY2NlbnQtY29sb3IsICNlZDFhNTkpIHNvbGlkO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAuNXMgZWFzZTtcbiAgICB9XG5cbiAgICAucGxheTpob3ZlciB7XG4gICAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzIxMjEyMSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IsICNlZDFhNTkpO1xuICAgIH1cblxuICA8L3N0eWxlPlxuICA8c3BhbiBpZD1cInBsYXlCdXR0b25cIiBjbGFzcz1cInBsYXlcIj5QbGF5PC9zcGFuPlxuYDtcblxuY2xhc3MgTW1HYW1lIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlb2YgU2hhZHlDU1MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBTaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGUodG1wbCwgJ21tLWdhbWUnKTtcbiAgICAgIFNoYWR5Q1NTLnN0eWxlRWxlbWVudCh0aGlzKTtcbiAgICB9XG4gICAgLy8gQXR0YWNoIGEgc2hhZG93IHJvb3QgdG8gdGhlIGVsZW1lbnQuXG4gICAgbGV0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRtcGwuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgdGhpcy5wbGF5ID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjcGxheUJ1dHRvbicpO1xuICB9XG5cbiAgc2V0UGxheUxpc3RlbmVyKGMpIHtcbiAgICB0aGlzLnBsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjKTtcbiAgfVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW0tZ2FtZScsIE1tR2FtZSk7XG4iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwubWpzJztcbmltcG9ydCAnLi9tbS10b29sYmFyLm1qcyc7XG5pbXBvcnQgJy4vbW0tZ2FtZS5tanMnO1xuXG5jb25zdCB0bXBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRtcGwuaW5uZXJIVE1MID0gaHRtbGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgZGlzcGxheTogLW1vei1ib3g7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIG1tLXRvb2xiYXIudG9vbGJhciB7XG4gICAgICBtYXgtaGVpZ2h0OiA2NHB4O1xuICAgICAgZm9udC1zaXplOiAxLjc1ZW07XG4gICAgfVxuICA8L3N0eWxlPlxuICA8bW0tdG9vbGJhcj5NYXN0ZXJtaW5kPC9tbS10b29sYmFyPlxuICA8bW0tZ2FtZT48L21tLWdhbWU+XG5gO1xuXG5jbGFzcyBNbUFwcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdCB0byB0aGUgZWxlbWVudC5cbiAgICBsZXQgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodG1wbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLnRvb2xiYXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ21tLXRvb2xiYXInKTtcbiAgICB0aGlzLmdhbWUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ21tLWdhbWUnKTtcbiAgICB0aGlzLmdhbWUuc2V0UGxheUxpc3RlbmVyKCgpID0+IHtcbiAgICAgIHRoaXMudG9vbGJhci5jbGFzc0xpc3QuYWRkKCd0b29sYmFyJyk7XG4gICAgfSk7XG4gIH1cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21tLWFwcCcsIE1tQXBwKTtcbiJdLCJuYW1lcyI6WyJTdHJpbmciLCJyYXciLCJ0bXBsIiwiaW5uZXJIVE1MIiwiaHRtbCIsIndpbmRvdyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiSFRNTEVsZW1lbnQiLCJTaGFkeUNTUyIsInByZXBhcmVUZW1wbGF0ZSIsInN0eWxlRWxlbWVudCIsInRoaXMiLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwic2hhZG93Um9vdCIsInBsYXkiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvb2xiYXIiLCJnYW1lIiwic2V0UGxheUxpc3RlbmVyIiwiY2xhc3NMaXN0IiwiYWRkIl0sIm1hcHBpbmdzIjoiK0JBQ2VBLE9BQU9DLG1DQ0NjLFlBQ3BDQyxFQUFLQyxTQUFMRCxDQUFpQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW1DakJDLE9BQU9DLGNBQVBELENBQXNCRSxNQUF0QkYsQ0FBNkIsWUFBN0JBLGNBWndCRyxtQ0FHSSxtQkFBYkMsU0FBYSxZQUNiQyxrQkFBc0IsdUJBQ3RCQyxhQUFhQyxLQUZBLEVBS1BBLEtBQUtDLFlBQUxELEVBQW9CRSxLQUFNLE9BQTFCRixFQUNORyxXQURNSCxDQUNNVixFQUFLYyxPQUFMZCxDQUFhZSxTQUFiZixFQUF1QixDQUF2QkEsQ0FETlUsR0FJckJQLCtDQ25DS0YsVUFBWUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0RqQkMsT0FBT0MsY0FBUEQsQ0FBc0JFLE1BQXRCRixDQUE2QixTQUE3QkEsY0FsQnFCRyxtQ0FHTyxtQkFBYkMsU0FBYSxZQUNiQyxrQkFBc0Isb0JBQ3RCQyxhQUFhQyxLQUZBLEtBS3BCTSxHQUFhTixLQUFLQyxZQUFMRCxFQUFvQkUsS0FBTSxPQUExQkYsSUFDTkcsWUFBWWIsRUFBS2MsT0FBTGQsQ0FBYWUsU0FBYmYsRUFBdUIsQ0FBdkJBLFFBRWxCaUIsS0FBT0QsRUFBV0UsYUFBWEYsQ0FBeUIsYUFBekJBLDBCQUlQQyxLQUFLRSxpQkFBaUIsWUFHL0JoQiwrQ0NsREtGLFVBQVlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQ2pCQyxPQUFPQyxjQUFQRCxDQUFzQkUsTUFBdEJGLENBQTZCLFFBQTdCQSxjQWRvQkcsc0NBSVpVLEdBQWFOLEtBQUtDLFlBQUxELEVBQW9CRSxLQUFNLE9BQTFCRixJQUNORyxZQUFZYixFQUFLYyxPQUFMZCxDQUFhZSxTQUFiZixFQUF1QixDQUF2QkEsUUFFbEJvQixRQUFVSixFQUFXRSxhQUFYRixDQUF5QixZQUF6QkEsT0FDVkssS0FBT0wsRUFBV0UsYUFBWEYsQ0FBeUIsU0FBekJBLE9BQ1BLLEtBQUtDLGdCQUFnQixVQUNuQkYsUUFBUUcsVUFBVUMsSUFBSSxjQUlqQ3JCIn0=
