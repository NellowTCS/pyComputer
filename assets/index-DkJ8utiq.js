(function(){const q=document.createElement("link").relList;if(q&&q.supports&&q.supports("modulepreload"))return;for(const $ of document.querySelectorAll('link[rel="modulepreload"]'))Z($);new MutationObserver($=>{for(const V of $)if(V.type==="childList")for(const A of V.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&Z(A)}).observe(document,{childList:!0,subtree:!0});function Q($){const V={};return $.integrity&&(V.integrity=$.integrity),$.referrerPolicy&&(V.referrerPolicy=$.referrerPolicy),$.crossOrigin==="use-credentials"?V.credentials="include":$.crossOrigin==="anonymous"?V.credentials="omit":V.credentials="same-origin",V}function Z($){if($.ep)return;$.ep=!0;const V=Q($);fetch($.href,V)}})();const De="modulepreload",Ae=function(K){return"/"+K},we={},Be=function(q,Q,Z){let $=Promise.resolve();if(Q&&Q.length>0){document.getElementsByTagName("link");const A=document.querySelector("meta[property=csp-nonce]"),i=(A==null?void 0:A.nonce)||(A==null?void 0:A.getAttribute("nonce"));$=Promise.allSettled(Q.map(o=>{if(o=Ae(o),o in we)return;we[o]=!0;const h=o.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${d}`))return;const n=document.createElement("link");if(n.rel=h?"stylesheet":De,h||(n.as="script"),n.crossOrigin="",n.href=o,i&&n.setAttribute("nonce",i),document.head.appendChild(n),h)return new Promise((f,u)=>{n.addEventListener("load",f),n.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})}))}function V(A){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=A,window.dispatchEvent(i),!i.defaultPrevented)throw A}return $.then(A=>{for(const i of A||[])i.status==="rejected"&&V(i.reason);return q().catch(V)})};var xe={exports:{}};(function(K,q){(function(Q,Z){K.exports=Z()})(globalThis,()=>(()=>{var Q={4567:function(A,i,o){var h=this&&this.__decorate||function(e,t,a,p){var _,m=arguments.length,c=m<3?t:p===null?p=Object.getOwnPropertyDescriptor(t,a):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,a,p);else for(var v=e.length-1;v>=0;v--)(_=e[v])&&(c=(m<3?_(c):m>3?_(t,a,c):_(t,a))||c);return m>3&&c&&Object.defineProperty(t,a,c),c},d=this&&this.__param||function(e,t){return function(a,p){t(a,p,e)}};Object.defineProperty(i,"__esModule",{value:!0}),i.AccessibilityManager=void 0;const n=o(9042),f=o(9924),u=o(844),g=o(4725),l=o(2585),s=o(3656);let r=i.AccessibilityManager=class extends u.Disposable{constructor(e,t,a,p){super(),this._terminal=e,this._coreBrowserService=a,this._renderService=p,this._rowColumns=new WeakMap,this._liveRegionLineCount=0,this._charsToConsume=[],this._charsToAnnounce="",this._accessibilityContainer=this._coreBrowserService.mainDocument.createElement("div"),this._accessibilityContainer.classList.add("xterm-accessibility"),this._rowContainer=this._coreBrowserService.mainDocument.createElement("div"),this._rowContainer.setAttribute("role","list"),this._rowContainer.classList.add("xterm-accessibility-tree"),this._rowElements=[];for(let _=0;_<this._terminal.rows;_++)this._rowElements[_]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[_]);if(this._topBoundaryFocusListener=_=>this._handleBoundaryFocus(_,0),this._bottomBoundaryFocusListener=_=>this._handleBoundaryFocus(_,1),this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions(),this._accessibilityContainer.appendChild(this._rowContainer),this._liveRegion=this._coreBrowserService.mainDocument.createElement("div"),this._liveRegion.classList.add("live-region"),this._liveRegion.setAttribute("aria-live","assertive"),this._accessibilityContainer.appendChild(this._liveRegion),this._liveRegionDebouncer=this.register(new f.TimeBasedDebouncer(this._renderRows.bind(this))),!this._terminal.element)throw new Error("Cannot enable accessibility before Terminal.open");this._terminal.element.insertAdjacentElement("afterbegin",this._accessibilityContainer),this.register(this._terminal.onResize(_=>this._handleResize(_.rows))),this.register(this._terminal.onRender(_=>this._refreshRows(_.start,_.end))),this.register(this._terminal.onScroll(()=>this._refreshRows())),this.register(this._terminal.onA11yChar(_=>this._handleChar(_))),this.register(this._terminal.onLineFeed(()=>this._handleChar(`
`))),this.register(this._terminal.onA11yTab(_=>this._handleTab(_))),this.register(this._terminal.onKey(_=>this._handleKey(_.key))),this.register(this._terminal.onBlur(()=>this._clearLiveRegion())),this.register(this._renderService.onDimensionsChange(()=>this._refreshRowsDimensions())),this.register((0,s.addDisposableDomListener)(document,"selectionchange",()=>this._handleSelectionChange())),this.register(this._coreBrowserService.onDprChange(()=>this._refreshRowsDimensions())),this._refreshRows(),this.register((0,u.toDisposable)(()=>{this._accessibilityContainer.remove(),this._rowElements.length=0}))}_handleTab(e){for(let t=0;t<e;t++)this._handleChar(" ")}_handleChar(e){this._liveRegionLineCount<21&&(this._charsToConsume.length>0?this._charsToConsume.shift()!==e&&(this._charsToAnnounce+=e):this._charsToAnnounce+=e,e===`
`&&(this._liveRegionLineCount++,this._liveRegionLineCount===21&&(this._liveRegion.textContent+=n.tooMuchOutput)))}_clearLiveRegion(){this._liveRegion.textContent="",this._liveRegionLineCount=0}_handleKey(e){this._clearLiveRegion(),new RegExp("\\p{Control}","u").test(e)||this._charsToConsume.push(e)}_refreshRows(e,t){this._liveRegionDebouncer.refresh(e,t,this._terminal.rows)}_renderRows(e,t){const a=this._terminal.buffer,p=a.lines.length.toString();for(let _=e;_<=t;_++){const m=a.lines.get(a.ydisp+_),c=[],v=(m==null?void 0:m.translateToString(!0,void 0,void 0,c))||"",C=(a.ydisp+_+1).toString(),x=this._rowElements[_];x&&(v.length===0?(x.innerText=" ",this._rowColumns.set(x,[0,1])):(x.textContent=v,this._rowColumns.set(x,c)),x.setAttribute("aria-posinset",C),x.setAttribute("aria-setsize",p))}this._announceCharacters()}_announceCharacters(){this._charsToAnnounce.length!==0&&(this._liveRegion.textContent+=this._charsToAnnounce,this._charsToAnnounce="")}_handleBoundaryFocus(e,t){const a=e.target,p=this._rowElements[t===0?1:this._rowElements.length-2];if(a.getAttribute("aria-posinset")===(t===0?"1":`${this._terminal.buffer.lines.length}`)||e.relatedTarget!==p)return;let _,m;if(t===0?(_=a,m=this._rowElements.pop(),this._rowContainer.removeChild(m)):(_=this._rowElements.shift(),m=a,this._rowContainer.removeChild(_)),_.removeEventListener("focus",this._topBoundaryFocusListener),m.removeEventListener("focus",this._bottomBoundaryFocusListener),t===0){const c=this._createAccessibilityTreeNode();this._rowElements.unshift(c),this._rowContainer.insertAdjacentElement("afterbegin",c)}else{const c=this._createAccessibilityTreeNode();this._rowElements.push(c),this._rowContainer.appendChild(c)}this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._terminal.scrollLines(t===0?-1:1),this._rowElements[t===0?1:this._rowElements.length-2].focus(),e.preventDefault(),e.stopImmediatePropagation()}_handleSelectionChange(){var v;if(this._rowElements.length===0)return;const e=document.getSelection();if(!e)return;if(e.isCollapsed)return void(this._rowContainer.contains(e.anchorNode)&&this._terminal.clearSelection());if(!e.anchorNode||!e.focusNode)return void console.error("anchorNode and/or focusNode are null");let t={node:e.anchorNode,offset:e.anchorOffset},a={node:e.focusNode,offset:e.focusOffset};if((t.node.compareDocumentPosition(a.node)&Node.DOCUMENT_POSITION_PRECEDING||t.node===a.node&&t.offset>a.offset)&&([t,a]=[a,t]),t.node.compareDocumentPosition(this._rowElements[0])&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_FOLLOWING)&&(t={node:this._rowElements[0].childNodes[0],offset:0}),!this._rowContainer.contains(t.node))return;const p=this._rowElements.slice(-1)[0];if(a.node.compareDocumentPosition(p)&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_PRECEDING)&&(a={node:p,offset:((v=p.textContent)==null?void 0:v.length)??0}),!this._rowContainer.contains(a.node))return;const _=({node:C,offset:x})=>{const k=C instanceof Text?C.parentNode:C;let w=parseInt(k==null?void 0:k.getAttribute("aria-posinset"),10)-1;if(isNaN(w))return console.warn("row is invalid. Race condition?"),null;const R=this._rowColumns.get(k);if(!R)return console.warn("columns is null. Race condition?"),null;let B=x<R.length?R[x]:R.slice(-1)[0]+1;return B>=this._terminal.cols&&(++w,B=0),{row:w,column:B}},m=_(t),c=_(a);if(m&&c){if(m.row>c.row||m.row===c.row&&m.column>=c.column)throw new Error("invalid range");this._terminal.select(m.column,m.row,(c.row-m.row)*this._terminal.cols-m.column+c.column)}}_handleResize(e){this._rowElements[this._rowElements.length-1].removeEventListener("focus",this._bottomBoundaryFocusListener);for(let t=this._rowContainer.children.length;t<this._terminal.rows;t++)this._rowElements[t]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[t]);for(;this._rowElements.length>e;)this._rowContainer.removeChild(this._rowElements.pop());this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions()}_createAccessibilityTreeNode(){const e=this._coreBrowserService.mainDocument.createElement("div");return e.setAttribute("role","listitem"),e.tabIndex=-1,this._refreshRowDimensions(e),e}_refreshRowsDimensions(){if(this._renderService.dimensions.css.cell.height){this._accessibilityContainer.style.width=`${this._renderService.dimensions.css.canvas.width}px`,this._rowElements.length!==this._terminal.rows&&this._handleResize(this._terminal.rows);for(let e=0;e<this._terminal.rows;e++)this._refreshRowDimensions(this._rowElements[e])}}_refreshRowDimensions(e){e.style.height=`${this._renderService.dimensions.css.cell.height}px`}};i.AccessibilityManager=r=h([d(1,l.IInstantiationService),d(2,g.ICoreBrowserService),d(3,g.IRenderService)],r)},3614:(A,i)=>{function o(f){return f.replace(/\r?\n/g,"\r")}function h(f,u){return u?"\x1B[200~"+f+"\x1B[201~":f}function d(f,u,g,l){f=h(f=o(f),g.decPrivateModes.bracketedPasteMode&&l.rawOptions.ignoreBracketedPasteMode!==!0),g.triggerDataEvent(f,!0),u.value=""}function n(f,u,g){const l=g.getBoundingClientRect(),s=f.clientX-l.left-10,r=f.clientY-l.top-10;u.style.width="20px",u.style.height="20px",u.style.left=`${s}px`,u.style.top=`${r}px`,u.style.zIndex="1000",u.focus()}Object.defineProperty(i,"__esModule",{value:!0}),i.rightClickHandler=i.moveTextAreaUnderMouseCursor=i.paste=i.handlePasteEvent=i.copyHandler=i.bracketTextForPaste=i.prepareTextForTerminal=void 0,i.prepareTextForTerminal=o,i.bracketTextForPaste=h,i.copyHandler=function(f,u){f.clipboardData&&f.clipboardData.setData("text/plain",u.selectionText),f.preventDefault()},i.handlePasteEvent=function(f,u,g,l){f.stopPropagation(),f.clipboardData&&d(f.clipboardData.getData("text/plain"),u,g,l)},i.paste=d,i.moveTextAreaUnderMouseCursor=n,i.rightClickHandler=function(f,u,g,l,s){n(f,u,g),s&&l.rightClickSelect(f),u.value=l.selectionText,u.select()}},7239:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ColorContrastCache=void 0;const h=o(1505);i.ColorContrastCache=class{constructor(){this._color=new h.TwoKeyMap,this._css=new h.TwoKeyMap}setCss(d,n,f){this._css.set(d,n,f)}getCss(d,n){return this._css.get(d,n)}setColor(d,n,f){this._color.set(d,n,f)}getColor(d,n){return this._color.get(d,n)}clear(){this._color.clear(),this._css.clear()}}},3656:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.addDisposableDomListener=void 0,i.addDisposableDomListener=function(o,h,d,n){o.addEventListener(h,d,n);let f=!1;return{dispose:()=>{f||(f=!0,o.removeEventListener(h,d,n))}}}},3551:function(A,i,o){var h=this&&this.__decorate||function(r,e,t,a){var p,_=arguments.length,m=_<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")m=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(p=r[c])&&(m=(_<3?p(m):_>3?p(e,t,m):p(e,t))||m);return _>3&&m&&Object.defineProperty(e,t,m),m},d=this&&this.__param||function(r,e){return function(t,a){e(t,a,r)}};Object.defineProperty(i,"__esModule",{value:!0}),i.Linkifier=void 0;const n=o(3656),f=o(8460),u=o(844),g=o(2585),l=o(4725);let s=i.Linkifier=class extends u.Disposable{get currentLink(){return this._currentLink}constructor(r,e,t,a,p){super(),this._element=r,this._mouseService=e,this._renderService=t,this._bufferService=a,this._linkProviderService=p,this._linkCacheDisposables=[],this._isMouseOut=!0,this._wasResized=!1,this._activeLine=-1,this._onShowLinkUnderline=this.register(new f.EventEmitter),this.onShowLinkUnderline=this._onShowLinkUnderline.event,this._onHideLinkUnderline=this.register(new f.EventEmitter),this.onHideLinkUnderline=this._onHideLinkUnderline.event,this.register((0,u.getDisposeArrayDisposable)(this._linkCacheDisposables)),this.register((0,u.toDisposable)(()=>{var _;this._lastMouseEvent=void 0,(_=this._activeProviderReplies)==null||_.clear()})),this.register(this._bufferService.onResize(()=>{this._clearCurrentLink(),this._wasResized=!0})),this.register((0,n.addDisposableDomListener)(this._element,"mouseleave",()=>{this._isMouseOut=!0,this._clearCurrentLink()})),this.register((0,n.addDisposableDomListener)(this._element,"mousemove",this._handleMouseMove.bind(this))),this.register((0,n.addDisposableDomListener)(this._element,"mousedown",this._handleMouseDown.bind(this))),this.register((0,n.addDisposableDomListener)(this._element,"mouseup",this._handleMouseUp.bind(this)))}_handleMouseMove(r){this._lastMouseEvent=r;const e=this._positionFromMouseEvent(r,this._element,this._mouseService);if(!e)return;this._isMouseOut=!1;const t=r.composedPath();for(let a=0;a<t.length;a++){const p=t[a];if(p.classList.contains("xterm"))break;if(p.classList.contains("xterm-hover"))return}this._lastBufferCell&&e.x===this._lastBufferCell.x&&e.y===this._lastBufferCell.y||(this._handleHover(e),this._lastBufferCell=e)}_handleHover(r){if(this._activeLine!==r.y||this._wasResized)return this._clearCurrentLink(),this._askForLink(r,!1),void(this._wasResized=!1);this._currentLink&&this._linkAtPosition(this._currentLink.link,r)||(this._clearCurrentLink(),this._askForLink(r,!0))}_askForLink(r,e){var a,p;this._activeProviderReplies&&e||((a=this._activeProviderReplies)==null||a.forEach(_=>{_==null||_.forEach(m=>{m.link.dispose&&m.link.dispose()})}),this._activeProviderReplies=new Map,this._activeLine=r.y);let t=!1;for(const[_,m]of this._linkProviderService.linkProviders.entries())e?(p=this._activeProviderReplies)!=null&&p.get(_)&&(t=this._checkLinkProviderResult(_,r,t)):m.provideLinks(r.y,c=>{var C,x;if(this._isMouseOut)return;const v=c==null?void 0:c.map(k=>({link:k}));(C=this._activeProviderReplies)==null||C.set(_,v),t=this._checkLinkProviderResult(_,r,t),((x=this._activeProviderReplies)==null?void 0:x.size)===this._linkProviderService.linkProviders.length&&this._removeIntersectingLinks(r.y,this._activeProviderReplies)})}_removeIntersectingLinks(r,e){const t=new Set;for(let a=0;a<e.size;a++){const p=e.get(a);if(p)for(let _=0;_<p.length;_++){const m=p[_],c=m.link.range.start.y<r?0:m.link.range.start.x,v=m.link.range.end.y>r?this._bufferService.cols:m.link.range.end.x;for(let C=c;C<=v;C++){if(t.has(C)){p.splice(_--,1);break}t.add(C)}}}}_checkLinkProviderResult(r,e,t){var _;if(!this._activeProviderReplies)return t;const a=this._activeProviderReplies.get(r);let p=!1;for(let m=0;m<r;m++)this._activeProviderReplies.has(m)&&!this._activeProviderReplies.get(m)||(p=!0);if(!p&&a){const m=a.find(c=>this._linkAtPosition(c.link,e));m&&(t=!0,this._handleNewLink(m))}if(this._activeProviderReplies.size===this._linkProviderService.linkProviders.length&&!t)for(let m=0;m<this._activeProviderReplies.size;m++){const c=(_=this._activeProviderReplies.get(m))==null?void 0:_.find(v=>this._linkAtPosition(v.link,e));if(c){t=!0,this._handleNewLink(c);break}}return t}_handleMouseDown(){this._mouseDownLink=this._currentLink}_handleMouseUp(r){if(!this._currentLink)return;const e=this._positionFromMouseEvent(r,this._element,this._mouseService);e&&this._mouseDownLink===this._currentLink&&this._linkAtPosition(this._currentLink.link,e)&&this._currentLink.link.activate(r,this._currentLink.link.text)}_clearCurrentLink(r,e){this._currentLink&&this._lastMouseEvent&&(!r||!e||this._currentLink.link.range.start.y>=r&&this._currentLink.link.range.end.y<=e)&&(this._linkLeave(this._element,this._currentLink.link,this._lastMouseEvent),this._currentLink=void 0,(0,u.disposeArray)(this._linkCacheDisposables))}_handleNewLink(r){if(!this._lastMouseEvent)return;const e=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);e&&this._linkAtPosition(r.link,e)&&(this._currentLink=r,this._currentLink.state={decorations:{underline:r.link.decorations===void 0||r.link.decorations.underline,pointerCursor:r.link.decorations===void 0||r.link.decorations.pointerCursor},isHovered:!0},this._linkHover(this._element,r.link,this._lastMouseEvent),r.link.decorations={},Object.defineProperties(r.link.decorations,{pointerCursor:{get:()=>{var t,a;return(a=(t=this._currentLink)==null?void 0:t.state)==null?void 0:a.decorations.pointerCursor},set:t=>{var a;(a=this._currentLink)!=null&&a.state&&this._currentLink.state.decorations.pointerCursor!==t&&(this._currentLink.state.decorations.pointerCursor=t,this._currentLink.state.isHovered&&this._element.classList.toggle("xterm-cursor-pointer",t))}},underline:{get:()=>{var t,a;return(a=(t=this._currentLink)==null?void 0:t.state)==null?void 0:a.decorations.underline},set:t=>{var a,p,_;(a=this._currentLink)!=null&&a.state&&((_=(p=this._currentLink)==null?void 0:p.state)==null?void 0:_.decorations.underline)!==t&&(this._currentLink.state.decorations.underline=t,this._currentLink.state.isHovered&&this._fireUnderlineEvent(r.link,t))}}}),this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(t=>{if(!this._currentLink)return;const a=t.start===0?0:t.start+1+this._bufferService.buffer.ydisp,p=this._bufferService.buffer.ydisp+1+t.end;if(this._currentLink.link.range.start.y>=a&&this._currentLink.link.range.end.y<=p&&(this._clearCurrentLink(a,p),this._lastMouseEvent)){const _=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);_&&this._askForLink(_,!1)}})))}_linkHover(r,e,t){var a;(a=this._currentLink)!=null&&a.state&&(this._currentLink.state.isHovered=!0,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(e,!0),this._currentLink.state.decorations.pointerCursor&&r.classList.add("xterm-cursor-pointer")),e.hover&&e.hover(t,e.text)}_fireUnderlineEvent(r,e){const t=r.range,a=this._bufferService.buffer.ydisp,p=this._createLinkUnderlineEvent(t.start.x-1,t.start.y-a-1,t.end.x,t.end.y-a-1,void 0);(e?this._onShowLinkUnderline:this._onHideLinkUnderline).fire(p)}_linkLeave(r,e,t){var a;(a=this._currentLink)!=null&&a.state&&(this._currentLink.state.isHovered=!1,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(e,!1),this._currentLink.state.decorations.pointerCursor&&r.classList.remove("xterm-cursor-pointer")),e.leave&&e.leave(t,e.text)}_linkAtPosition(r,e){const t=r.range.start.y*this._bufferService.cols+r.range.start.x,a=r.range.end.y*this._bufferService.cols+r.range.end.x,p=e.y*this._bufferService.cols+e.x;return t<=p&&p<=a}_positionFromMouseEvent(r,e,t){const a=t.getCoords(r,e,this._bufferService.cols,this._bufferService.rows);if(a)return{x:a[0],y:a[1]+this._bufferService.buffer.ydisp}}_createLinkUnderlineEvent(r,e,t,a,p){return{x1:r,y1:e,x2:t,y2:a,cols:this._bufferService.cols,fg:p}}};i.Linkifier=s=h([d(1,l.IMouseService),d(2,l.IRenderService),d(3,g.IBufferService),d(4,l.ILinkProviderService)],s)},9042:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.tooMuchOutput=i.promptLabel=void 0,i.promptLabel="Terminal input",i.tooMuchOutput="Too much output to announce, navigate to rows manually to read"},3730:function(A,i,o){var h=this&&this.__decorate||function(l,s,r,e){var t,a=arguments.length,p=a<3?s:e===null?e=Object.getOwnPropertyDescriptor(s,r):e;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")p=Reflect.decorate(l,s,r,e);else for(var _=l.length-1;_>=0;_--)(t=l[_])&&(p=(a<3?t(p):a>3?t(s,r,p):t(s,r))||p);return a>3&&p&&Object.defineProperty(s,r,p),p},d=this&&this.__param||function(l,s){return function(r,e){s(r,e,l)}};Object.defineProperty(i,"__esModule",{value:!0}),i.OscLinkProvider=void 0;const n=o(511),f=o(2585);let u=i.OscLinkProvider=class{constructor(l,s,r){this._bufferService=l,this._optionsService=s,this._oscLinkService=r}provideLinks(l,s){var v;const r=this._bufferService.buffer.lines.get(l-1);if(!r)return void s(void 0);const e=[],t=this._optionsService.rawOptions.linkHandler,a=new n.CellData,p=r.getTrimmedLength();let _=-1,m=-1,c=!1;for(let C=0;C<p;C++)if(m!==-1||r.hasContent(C)){if(r.loadCell(C,a),a.hasExtendedAttrs()&&a.extended.urlId){if(m===-1){m=C,_=a.extended.urlId;continue}c=a.extended.urlId!==_}else m!==-1&&(c=!0);if(c||m!==-1&&C===p-1){const x=(v=this._oscLinkService.getLinkData(_))==null?void 0:v.uri;if(x){const k={start:{x:m+1,y:l},end:{x:C+(c||C!==p-1?0:1),y:l}};let w=!1;if(!(t!=null&&t.allowNonHttpProtocols))try{const R=new URL(x);["http:","https:"].includes(R.protocol)||(w=!0)}catch{w=!0}w||e.push({text:x,range:k,activate:(R,B)=>t?t.activate(R,B,k):g(0,B),hover:(R,B)=>{var P;return(P=t==null?void 0:t.hover)==null?void 0:P.call(t,R,B,k)},leave:(R,B)=>{var P;return(P=t==null?void 0:t.leave)==null?void 0:P.call(t,R,B,k)}})}c=!1,a.hasExtendedAttrs()&&a.extended.urlId?(m=C,_=a.extended.urlId):(m=-1,_=-1)}}s(e)}};function g(l,s){if(confirm(`Do you want to navigate to ${s}?

WARNING: This link could potentially be dangerous`)){const r=window.open();if(r){try{r.opener=null}catch{}r.location.href=s}else console.warn("Opening link blocked as opener could not be cleared")}}i.OscLinkProvider=u=h([d(0,f.IBufferService),d(1,f.IOptionsService),d(2,f.IOscLinkService)],u)},6193:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.RenderDebouncer=void 0,i.RenderDebouncer=class{constructor(o,h){this._renderCallback=o,this._coreBrowserService=h,this._refreshCallbacks=[]}dispose(){this._animationFrame&&(this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),this._animationFrame=void 0)}addRefreshCallback(o){return this._refreshCallbacks.push(o),this._animationFrame||(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh())),this._animationFrame}refresh(o,h,d){this._rowCount=d,o=o!==void 0?o:0,h=h!==void 0?h:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,o):o,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,h):h,this._animationFrame||(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh()))}_innerRefresh(){if(this._animationFrame=void 0,this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return void this._runRefreshCallbacks();const o=Math.max(this._rowStart,0),h=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(o,h),this._runRefreshCallbacks()}_runRefreshCallbacks(){for(const o of this._refreshCallbacks)o(0);this._refreshCallbacks=[]}}},3236:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Terminal=void 0;const h=o(3614),d=o(3656),n=o(3551),f=o(9042),u=o(3730),g=o(1680),l=o(3107),s=o(5744),r=o(2950),e=o(1296),t=o(428),a=o(4269),p=o(5114),_=o(8934),m=o(3230),c=o(9312),v=o(4725),C=o(6731),x=o(8055),k=o(8969),w=o(8460),R=o(844),B=o(6114),P=o(8437),W=o(2584),M=o(7399),b=o(5941),S=o(9074),E=o(2585),T=o(5435),O=o(4567),H=o(779);class U extends k.CoreTerminal{get onFocus(){return this._onFocus.event}get onBlur(){return this._onBlur.event}get onA11yChar(){return this._onA11yCharEmitter.event}get onA11yTab(){return this._onA11yTabEmitter.event}get onWillOpen(){return this._onWillOpen.event}constructor(L={}){super(L),this.browser=B,this._keyDownHandled=!1,this._keyDownSeen=!1,this._keyPressHandled=!1,this._unprocessedDeadKey=!1,this._accessibilityManager=this.register(new R.MutableDisposable),this._onCursorMove=this.register(new w.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onKey=this.register(new w.EventEmitter),this.onKey=this._onKey.event,this._onRender=this.register(new w.EventEmitter),this.onRender=this._onRender.event,this._onSelectionChange=this.register(new w.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onTitleChange=this.register(new w.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onBell=this.register(new w.EventEmitter),this.onBell=this._onBell.event,this._onFocus=this.register(new w.EventEmitter),this._onBlur=this.register(new w.EventEmitter),this._onA11yCharEmitter=this.register(new w.EventEmitter),this._onA11yTabEmitter=this.register(new w.EventEmitter),this._onWillOpen=this.register(new w.EventEmitter),this._setup(),this._decorationService=this._instantiationService.createInstance(S.DecorationService),this._instantiationService.setService(E.IDecorationService,this._decorationService),this._linkProviderService=this._instantiationService.createInstance(H.LinkProviderService),this._instantiationService.setService(v.ILinkProviderService,this._linkProviderService),this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(u.OscLinkProvider)),this.register(this._inputHandler.onRequestBell(()=>this._onBell.fire())),this.register(this._inputHandler.onRequestRefreshRows((y,I)=>this.refresh(y,I))),this.register(this._inputHandler.onRequestSendFocus(()=>this._reportFocus())),this.register(this._inputHandler.onRequestReset(()=>this.reset())),this.register(this._inputHandler.onRequestWindowsOptionsReport(y=>this._reportWindowsOptions(y))),this.register(this._inputHandler.onColor(y=>this._handleColorEvent(y))),this.register((0,w.forwardEvent)(this._inputHandler.onCursorMove,this._onCursorMove)),this.register((0,w.forwardEvent)(this._inputHandler.onTitleChange,this._onTitleChange)),this.register((0,w.forwardEvent)(this._inputHandler.onA11yChar,this._onA11yCharEmitter)),this.register((0,w.forwardEvent)(this._inputHandler.onA11yTab,this._onA11yTabEmitter)),this.register(this._bufferService.onResize(y=>this._afterResize(y.cols,y.rows))),this.register((0,R.toDisposable)(()=>{var y,I;this._customKeyEventHandler=void 0,(I=(y=this.element)==null?void 0:y.parentNode)==null||I.removeChild(this.element)}))}_handleColorEvent(L){if(this._themeService)for(const y of L){let I,D="";switch(y.index){case 256:I="foreground",D="10";break;case 257:I="background",D="11";break;case 258:I="cursor",D="12";break;default:I="ansi",D="4;"+y.index}switch(y.type){case 0:const N=x.color.toColorRGB(I==="ansi"?this._themeService.colors.ansi[y.index]:this._themeService.colors[I]);this.coreService.triggerDataEvent(`${W.C0.ESC}]${D};${(0,b.toRgbString)(N)}${W.C1_ESCAPED.ST}`);break;case 1:if(I==="ansi")this._themeService.modifyColors(F=>F.ansi[y.index]=x.channels.toColor(...y.color));else{const F=I;this._themeService.modifyColors(G=>G[F]=x.channels.toColor(...y.color))}break;case 2:this._themeService.restoreColor(y.index)}}}_setup(){super._setup(),this._customKeyEventHandler=void 0}get buffer(){return this.buffers.active}focus(){this.textarea&&this.textarea.focus({preventScroll:!0})}_handleScreenReaderModeOptionChange(L){L?!this._accessibilityManager.value&&this._renderService&&(this._accessibilityManager.value=this._instantiationService.createInstance(O.AccessibilityManager,this)):this._accessibilityManager.clear()}_handleTextAreaFocus(L){this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(W.C0.ESC+"[I"),this.element.classList.add("focus"),this._showCursor(),this._onFocus.fire()}blur(){var L;return(L=this.textarea)==null?void 0:L.blur()}_handleTextAreaBlur(){this.textarea.value="",this.refresh(this.buffer.y,this.buffer.y),this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(W.C0.ESC+"[O"),this.element.classList.remove("focus"),this._onBlur.fire()}_syncTextArea(){if(!this.textarea||!this.buffer.isCursorInViewport||this._compositionHelper.isComposing||!this._renderService)return;const L=this.buffer.ybase+this.buffer.y,y=this.buffer.lines.get(L);if(!y)return;const I=Math.min(this.buffer.x,this.cols-1),D=this._renderService.dimensions.css.cell.height,N=y.getWidth(I),F=this._renderService.dimensions.css.cell.width*N,G=this.buffer.y*this._renderService.dimensions.css.cell.height,X=I*this._renderService.dimensions.css.cell.width;this.textarea.style.left=X+"px",this.textarea.style.top=G+"px",this.textarea.style.width=F+"px",this.textarea.style.height=D+"px",this.textarea.style.lineHeight=D+"px",this.textarea.style.zIndex="-5"}_initGlobal(){this._bindKeys(),this.register((0,d.addDisposableDomListener)(this.element,"copy",y=>{this.hasSelection()&&(0,h.copyHandler)(y,this._selectionService)}));const L=y=>(0,h.handlePasteEvent)(y,this.textarea,this.coreService,this.optionsService);this.register((0,d.addDisposableDomListener)(this.textarea,"paste",L)),this.register((0,d.addDisposableDomListener)(this.element,"paste",L)),B.isFirefox?this.register((0,d.addDisposableDomListener)(this.element,"mousedown",y=>{y.button===2&&(0,h.rightClickHandler)(y,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})):this.register((0,d.addDisposableDomListener)(this.element,"contextmenu",y=>{(0,h.rightClickHandler)(y,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})),B.isLinux&&this.register((0,d.addDisposableDomListener)(this.element,"auxclick",y=>{y.button===1&&(0,h.moveTextAreaUnderMouseCursor)(y,this.textarea,this.screenElement)}))}_bindKeys(){this.register((0,d.addDisposableDomListener)(this.textarea,"keyup",L=>this._keyUp(L),!0)),this.register((0,d.addDisposableDomListener)(this.textarea,"keydown",L=>this._keyDown(L),!0)),this.register((0,d.addDisposableDomListener)(this.textarea,"keypress",L=>this._keyPress(L),!0)),this.register((0,d.addDisposableDomListener)(this.textarea,"compositionstart",()=>this._compositionHelper.compositionstart())),this.register((0,d.addDisposableDomListener)(this.textarea,"compositionupdate",L=>this._compositionHelper.compositionupdate(L))),this.register((0,d.addDisposableDomListener)(this.textarea,"compositionend",()=>this._compositionHelper.compositionend())),this.register((0,d.addDisposableDomListener)(this.textarea,"input",L=>this._inputEvent(L),!0)),this.register(this.onRender(()=>this._compositionHelper.updateCompositionElements()))}open(L){var I;if(!L)throw new Error("Terminal requires a parent element.");if(L.isConnected||this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"),((I=this.element)==null?void 0:I.ownerDocument.defaultView)&&this._coreBrowserService)return void(this.element.ownerDocument.defaultView!==this._coreBrowserService.window&&(this._coreBrowserService.window=this.element.ownerDocument.defaultView));this._document=L.ownerDocument,this.options.documentOverride&&this.options.documentOverride instanceof Document&&(this._document=this.optionsService.rawOptions.documentOverride),this.element=this._document.createElement("div"),this.element.dir="ltr",this.element.classList.add("terminal"),this.element.classList.add("xterm"),L.appendChild(this.element);const y=this._document.createDocumentFragment();this._viewportElement=this._document.createElement("div"),this._viewportElement.classList.add("xterm-viewport"),y.appendChild(this._viewportElement),this._viewportScrollArea=this._document.createElement("div"),this._viewportScrollArea.classList.add("xterm-scroll-area"),this._viewportElement.appendChild(this._viewportScrollArea),this.screenElement=this._document.createElement("div"),this.screenElement.classList.add("xterm-screen"),this.register((0,d.addDisposableDomListener)(this.screenElement,"mousemove",D=>this.updateCursorStyle(D))),this._helperContainer=this._document.createElement("div"),this._helperContainer.classList.add("xterm-helpers"),this.screenElement.appendChild(this._helperContainer),y.appendChild(this.screenElement),this.textarea=this._document.createElement("textarea"),this.textarea.classList.add("xterm-helper-textarea"),this.textarea.setAttribute("aria-label",f.promptLabel),B.isChromeOS||this.textarea.setAttribute("aria-multiline","false"),this.textarea.setAttribute("autocorrect","off"),this.textarea.setAttribute("autocapitalize","off"),this.textarea.setAttribute("spellcheck","false"),this.textarea.tabIndex=0,this._coreBrowserService=this.register(this._instantiationService.createInstance(p.CoreBrowserService,this.textarea,L.ownerDocument.defaultView??window,this._document??typeof window<"u"?window.document:null)),this._instantiationService.setService(v.ICoreBrowserService,this._coreBrowserService),this.register((0,d.addDisposableDomListener)(this.textarea,"focus",D=>this._handleTextAreaFocus(D))),this.register((0,d.addDisposableDomListener)(this.textarea,"blur",()=>this._handleTextAreaBlur())),this._helperContainer.appendChild(this.textarea),this._charSizeService=this._instantiationService.createInstance(t.CharSizeService,this._document,this._helperContainer),this._instantiationService.setService(v.ICharSizeService,this._charSizeService),this._themeService=this._instantiationService.createInstance(C.ThemeService),this._instantiationService.setService(v.IThemeService,this._themeService),this._characterJoinerService=this._instantiationService.createInstance(a.CharacterJoinerService),this._instantiationService.setService(v.ICharacterJoinerService,this._characterJoinerService),this._renderService=this.register(this._instantiationService.createInstance(m.RenderService,this.rows,this.screenElement)),this._instantiationService.setService(v.IRenderService,this._renderService),this.register(this._renderService.onRenderedViewportChange(D=>this._onRender.fire(D))),this.onResize(D=>this._renderService.resize(D.cols,D.rows)),this._compositionView=this._document.createElement("div"),this._compositionView.classList.add("composition-view"),this._compositionHelper=this._instantiationService.createInstance(r.CompositionHelper,this.textarea,this._compositionView),this._helperContainer.appendChild(this._compositionView),this._mouseService=this._instantiationService.createInstance(_.MouseService),this._instantiationService.setService(v.IMouseService,this._mouseService),this.linkifier=this.register(this._instantiationService.createInstance(n.Linkifier,this.screenElement)),this.element.appendChild(y);try{this._onWillOpen.fire(this.element)}catch{}this._renderService.hasRenderer()||this._renderService.setRenderer(this._createRenderer()),this.viewport=this._instantiationService.createInstance(g.Viewport,this._viewportElement,this._viewportScrollArea),this.viewport.onRequestScrollLines(D=>this.scrollLines(D.amount,D.suppressScrollEvent,1)),this.register(this._inputHandler.onRequestSyncScrollBar(()=>this.viewport.syncScrollArea())),this.register(this.viewport),this.register(this.onCursorMove(()=>{this._renderService.handleCursorMove(),this._syncTextArea()})),this.register(this.onResize(()=>this._renderService.handleResize(this.cols,this.rows))),this.register(this.onBlur(()=>this._renderService.handleBlur())),this.register(this.onFocus(()=>this._renderService.handleFocus())),this.register(this._renderService.onDimensionsChange(()=>this.viewport.syncScrollArea())),this._selectionService=this.register(this._instantiationService.createInstance(c.SelectionService,this.element,this.screenElement,this.linkifier)),this._instantiationService.setService(v.ISelectionService,this._selectionService),this.register(this._selectionService.onRequestScrollLines(D=>this.scrollLines(D.amount,D.suppressScrollEvent))),this.register(this._selectionService.onSelectionChange(()=>this._onSelectionChange.fire())),this.register(this._selectionService.onRequestRedraw(D=>this._renderService.handleSelectionChanged(D.start,D.end,D.columnSelectMode))),this.register(this._selectionService.onLinuxMouseSelection(D=>{this.textarea.value=D,this.textarea.focus(),this.textarea.select()})),this.register(this._onScroll.event(D=>{this.viewport.syncScrollArea(),this._selectionService.refresh()})),this.register((0,d.addDisposableDomListener)(this._viewportElement,"scroll",()=>this._selectionService.refresh())),this.register(this._instantiationService.createInstance(l.BufferDecorationRenderer,this.screenElement)),this.register((0,d.addDisposableDomListener)(this.element,"mousedown",D=>this._selectionService.handleMouseDown(D))),this.coreMouseService.areMouseEventsActive?(this._selectionService.disable(),this.element.classList.add("enable-mouse-events")):this._selectionService.enable(),this.options.screenReaderMode&&(this._accessibilityManager.value=this._instantiationService.createInstance(O.AccessibilityManager,this)),this.register(this.optionsService.onSpecificOptionChange("screenReaderMode",D=>this._handleScreenReaderModeOptionChange(D))),this.options.overviewRulerWidth&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(s.OverviewRulerRenderer,this._viewportElement,this.screenElement))),this.optionsService.onSpecificOptionChange("overviewRulerWidth",D=>{!this._overviewRulerRenderer&&D&&this._viewportElement&&this.screenElement&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(s.OverviewRulerRenderer,this._viewportElement,this.screenElement)))}),this._charSizeService.measure(),this.refresh(0,this.rows-1),this._initGlobal(),this.bindMouse()}_createRenderer(){return this._instantiationService.createInstance(e.DomRenderer,this,this._document,this.element,this.screenElement,this._viewportElement,this._helperContainer,this.linkifier)}bindMouse(){const L=this,y=this.element;function I(F){const G=L._mouseService.getMouseReportCoords(F,L.screenElement);if(!G)return!1;let X,J;switch(F.overrideType||F.type){case"mousemove":J=32,F.buttons===void 0?(X=3,F.button!==void 0&&(X=F.button<3?F.button:3)):X=1&F.buttons?0:4&F.buttons?1:2&F.buttons?2:3;break;case"mouseup":J=0,X=F.button<3?F.button:3;break;case"mousedown":J=1,X=F.button<3?F.button:3;break;case"wheel":if(L._customWheelEventHandler&&L._customWheelEventHandler(F)===!1||L.viewport.getLinesScrolled(F)===0)return!1;J=F.deltaY<0?0:1,X=4;break;default:return!1}return!(J===void 0||X===void 0||X>4)&&L.coreMouseService.triggerMouseEvent({col:G.col,row:G.row,x:G.x,y:G.y,button:X,action:J,ctrl:F.ctrlKey,alt:F.altKey,shift:F.shiftKey})}const D={mouseup:null,wheel:null,mousedrag:null,mousemove:null},N={mouseup:F=>(I(F),F.buttons||(this._document.removeEventListener("mouseup",D.mouseup),D.mousedrag&&this._document.removeEventListener("mousemove",D.mousedrag)),this.cancel(F)),wheel:F=>(I(F),this.cancel(F,!0)),mousedrag:F=>{F.buttons&&I(F)},mousemove:F=>{F.buttons||I(F)}};this.register(this.coreMouseService.onProtocolChange(F=>{F?(this.optionsService.rawOptions.logLevel==="debug"&&this._logService.debug("Binding to mouse events:",this.coreMouseService.explainEvents(F)),this.element.classList.add("enable-mouse-events"),this._selectionService.disable()):(this._logService.debug("Unbinding from mouse events."),this.element.classList.remove("enable-mouse-events"),this._selectionService.enable()),8&F?D.mousemove||(y.addEventListener("mousemove",N.mousemove),D.mousemove=N.mousemove):(y.removeEventListener("mousemove",D.mousemove),D.mousemove=null),16&F?D.wheel||(y.addEventListener("wheel",N.wheel,{passive:!1}),D.wheel=N.wheel):(y.removeEventListener("wheel",D.wheel),D.wheel=null),2&F?D.mouseup||(D.mouseup=N.mouseup):(this._document.removeEventListener("mouseup",D.mouseup),D.mouseup=null),4&F?D.mousedrag||(D.mousedrag=N.mousedrag):(this._document.removeEventListener("mousemove",D.mousedrag),D.mousedrag=null)})),this.coreMouseService.activeProtocol=this.coreMouseService.activeProtocol,this.register((0,d.addDisposableDomListener)(y,"mousedown",F=>{if(F.preventDefault(),this.focus(),this.coreMouseService.areMouseEventsActive&&!this._selectionService.shouldForceSelection(F))return I(F),D.mouseup&&this._document.addEventListener("mouseup",D.mouseup),D.mousedrag&&this._document.addEventListener("mousemove",D.mousedrag),this.cancel(F)})),this.register((0,d.addDisposableDomListener)(y,"wheel",F=>{if(!D.wheel){if(this._customWheelEventHandler&&this._customWheelEventHandler(F)===!1)return!1;if(!this.buffer.hasScrollback){const G=this.viewport.getLinesScrolled(F);if(G===0)return;const X=W.C0.ESC+(this.coreService.decPrivateModes.applicationCursorKeys?"O":"[")+(F.deltaY<0?"A":"B");let J="";for(let te=0;te<Math.abs(G);te++)J+=X;return this.coreService.triggerDataEvent(J,!0),this.cancel(F,!0)}return this.viewport.handleWheel(F)?this.cancel(F):void 0}},{passive:!1})),this.register((0,d.addDisposableDomListener)(y,"touchstart",F=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchStart(F),this.cancel(F)},{passive:!0})),this.register((0,d.addDisposableDomListener)(y,"touchmove",F=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchMove(F)?void 0:this.cancel(F)},{passive:!1}))}refresh(L,y){var I;(I=this._renderService)==null||I.refreshRows(L,y)}updateCursorStyle(L){var y;(y=this._selectionService)!=null&&y.shouldColumnSelect(L)?this.element.classList.add("column-select"):this.element.classList.remove("column-select")}_showCursor(){this.coreService.isCursorInitialized||(this.coreService.isCursorInitialized=!0,this.refresh(this.buffer.y,this.buffer.y))}scrollLines(L,y,I=0){var D;I===1?(super.scrollLines(L,y,I),this.refresh(0,this.rows-1)):(D=this.viewport)==null||D.scrollLines(L)}paste(L){(0,h.paste)(L,this.textarea,this.coreService,this.optionsService)}attachCustomKeyEventHandler(L){this._customKeyEventHandler=L}attachCustomWheelEventHandler(L){this._customWheelEventHandler=L}registerLinkProvider(L){return this._linkProviderService.registerLinkProvider(L)}registerCharacterJoiner(L){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");const y=this._characterJoinerService.register(L);return this.refresh(0,this.rows-1),y}deregisterCharacterJoiner(L){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");this._characterJoinerService.deregister(L)&&this.refresh(0,this.rows-1)}get markers(){return this.buffer.markers}registerMarker(L){return this.buffer.addMarker(this.buffer.ybase+this.buffer.y+L)}registerDecoration(L){return this._decorationService.registerDecoration(L)}hasSelection(){return!!this._selectionService&&this._selectionService.hasSelection}select(L,y,I){this._selectionService.setSelection(L,y,I)}getSelection(){return this._selectionService?this._selectionService.selectionText:""}getSelectionPosition(){if(this._selectionService&&this._selectionService.hasSelection)return{start:{x:this._selectionService.selectionStart[0],y:this._selectionService.selectionStart[1]},end:{x:this._selectionService.selectionEnd[0],y:this._selectionService.selectionEnd[1]}}}clearSelection(){var L;(L=this._selectionService)==null||L.clearSelection()}selectAll(){var L;(L=this._selectionService)==null||L.selectAll()}selectLines(L,y){var I;(I=this._selectionService)==null||I.selectLines(L,y)}_keyDown(L){if(this._keyDownHandled=!1,this._keyDownSeen=!0,this._customKeyEventHandler&&this._customKeyEventHandler(L)===!1)return!1;const y=this.browser.isMac&&this.options.macOptionIsMeta&&L.altKey;if(!y&&!this._compositionHelper.keydown(L))return this.options.scrollOnUserInput&&this.buffer.ybase!==this.buffer.ydisp&&this.scrollToBottom(),!1;y||L.key!=="Dead"&&L.key!=="AltGraph"||(this._unprocessedDeadKey=!0);const I=(0,M.evaluateKeyboardEvent)(L,this.coreService.decPrivateModes.applicationCursorKeys,this.browser.isMac,this.options.macOptionIsMeta);if(this.updateCursorStyle(L),I.type===3||I.type===2){const D=this.rows-1;return this.scrollLines(I.type===2?-D:D),this.cancel(L,!0)}return I.type===1&&this.selectAll(),!!this._isThirdLevelShift(this.browser,L)||(I.cancel&&this.cancel(L,!0),!I.key||!!(L.key&&!L.ctrlKey&&!L.altKey&&!L.metaKey&&L.key.length===1&&L.key.charCodeAt(0)>=65&&L.key.charCodeAt(0)<=90)||(this._unprocessedDeadKey?(this._unprocessedDeadKey=!1,!0):(I.key!==W.C0.ETX&&I.key!==W.C0.CR||(this.textarea.value=""),this._onKey.fire({key:I.key,domEvent:L}),this._showCursor(),this.coreService.triggerDataEvent(I.key,!0),!this.optionsService.rawOptions.screenReaderMode||L.altKey||L.ctrlKey?this.cancel(L,!0):void(this._keyDownHandled=!0))))}_isThirdLevelShift(L,y){const I=L.isMac&&!this.options.macOptionIsMeta&&y.altKey&&!y.ctrlKey&&!y.metaKey||L.isWindows&&y.altKey&&y.ctrlKey&&!y.metaKey||L.isWindows&&y.getModifierState("AltGraph");return y.type==="keypress"?I:I&&(!y.keyCode||y.keyCode>47)}_keyUp(L){this._keyDownSeen=!1,this._customKeyEventHandler&&this._customKeyEventHandler(L)===!1||(function(y){return y.keyCode===16||y.keyCode===17||y.keyCode===18}(L)||this.focus(),this.updateCursorStyle(L),this._keyPressHandled=!1)}_keyPress(L){let y;if(this._keyPressHandled=!1,this._keyDownHandled||this._customKeyEventHandler&&this._customKeyEventHandler(L)===!1)return!1;if(this.cancel(L),L.charCode)y=L.charCode;else if(L.which===null||L.which===void 0)y=L.keyCode;else{if(L.which===0||L.charCode===0)return!1;y=L.which}return!(!y||(L.altKey||L.ctrlKey||L.metaKey)&&!this._isThirdLevelShift(this.browser,L)||(y=String.fromCharCode(y),this._onKey.fire({key:y,domEvent:L}),this._showCursor(),this.coreService.triggerDataEvent(y,!0),this._keyPressHandled=!0,this._unprocessedDeadKey=!1,0))}_inputEvent(L){if(L.data&&L.inputType==="insertText"&&(!L.composed||!this._keyDownSeen)&&!this.optionsService.rawOptions.screenReaderMode){if(this._keyPressHandled)return!1;this._unprocessedDeadKey=!1;const y=L.data;return this.coreService.triggerDataEvent(y,!0),this.cancel(L),!0}return!1}resize(L,y){L!==this.cols||y!==this.rows?super.resize(L,y):this._charSizeService&&!this._charSizeService.hasValidSize&&this._charSizeService.measure()}_afterResize(L,y){var I,D;(I=this._charSizeService)==null||I.measure(),(D=this.viewport)==null||D.syncScrollArea(!0)}clear(){var L;if(this.buffer.ybase!==0||this.buffer.y!==0){this.buffer.clearAllMarkers(),this.buffer.lines.set(0,this.buffer.lines.get(this.buffer.ybase+this.buffer.y)),this.buffer.lines.length=1,this.buffer.ydisp=0,this.buffer.ybase=0,this.buffer.y=0;for(let y=1;y<this.rows;y++)this.buffer.lines.push(this.buffer.getBlankLine(P.DEFAULT_ATTR_DATA));this._onScroll.fire({position:this.buffer.ydisp,source:0}),(L=this.viewport)==null||L.reset(),this.refresh(0,this.rows-1)}}reset(){var y,I;this.options.rows=this.rows,this.options.cols=this.cols;const L=this._customKeyEventHandler;this._setup(),super.reset(),(y=this._selectionService)==null||y.reset(),this._decorationService.reset(),(I=this.viewport)==null||I.reset(),this._customKeyEventHandler=L,this.refresh(0,this.rows-1)}clearTextureAtlas(){var L;(L=this._renderService)==null||L.clearTextureAtlas()}_reportFocus(){var L;(L=this.element)!=null&&L.classList.contains("focus")?this.coreService.triggerDataEvent(W.C0.ESC+"[I"):this.coreService.triggerDataEvent(W.C0.ESC+"[O")}_reportWindowsOptions(L){if(this._renderService)switch(L){case T.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:const y=this._renderService.dimensions.css.canvas.width.toFixed(0),I=this._renderService.dimensions.css.canvas.height.toFixed(0);this.coreService.triggerDataEvent(`${W.C0.ESC}[4;${I};${y}t`);break;case T.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:const D=this._renderService.dimensions.css.cell.width.toFixed(0),N=this._renderService.dimensions.css.cell.height.toFixed(0);this.coreService.triggerDataEvent(`${W.C0.ESC}[6;${N};${D}t`)}}cancel(L,y){if(this.options.cancelEvents||y)return L.preventDefault(),L.stopPropagation(),!1}}i.Terminal=U},9924:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.TimeBasedDebouncer=void 0,i.TimeBasedDebouncer=class{constructor(o,h=1e3){this._renderCallback=o,this._debounceThresholdMS=h,this._lastRefreshMs=0,this._additionalRefreshRequested=!1}dispose(){this._refreshTimeoutID&&clearTimeout(this._refreshTimeoutID)}refresh(o,h,d){this._rowCount=d,o=o!==void 0?o:0,h=h!==void 0?h:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,o):o,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,h):h;const n=Date.now();if(n-this._lastRefreshMs>=this._debounceThresholdMS)this._lastRefreshMs=n,this._innerRefresh();else if(!this._additionalRefreshRequested){const f=n-this._lastRefreshMs,u=this._debounceThresholdMS-f;this._additionalRefreshRequested=!0,this._refreshTimeoutID=window.setTimeout(()=>{this._lastRefreshMs=Date.now(),this._innerRefresh(),this._additionalRefreshRequested=!1,this._refreshTimeoutID=void 0},u)}}_innerRefresh(){if(this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return;const o=Math.max(this._rowStart,0),h=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(o,h)}}},1680:function(A,i,o){var h=this&&this.__decorate||function(r,e,t,a){var p,_=arguments.length,m=_<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")m=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(p=r[c])&&(m=(_<3?p(m):_>3?p(e,t,m):p(e,t))||m);return _>3&&m&&Object.defineProperty(e,t,m),m},d=this&&this.__param||function(r,e){return function(t,a){e(t,a,r)}};Object.defineProperty(i,"__esModule",{value:!0}),i.Viewport=void 0;const n=o(3656),f=o(4725),u=o(8460),g=o(844),l=o(2585);let s=i.Viewport=class extends g.Disposable{constructor(r,e,t,a,p,_,m,c){super(),this._viewportElement=r,this._scrollArea=e,this._bufferService=t,this._optionsService=a,this._charSizeService=p,this._renderService=_,this._coreBrowserService=m,this.scrollBarWidth=0,this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._wheelPartialScroll=0,this._refreshAnimationFrame=null,this._ignoreNextScrollEvent=!1,this._smoothScrollState={startTime:0,origin:-1,target:-1},this._onRequestScrollLines=this.register(new u.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this.scrollBarWidth=this._viewportElement.offsetWidth-this._scrollArea.offsetWidth||15,this.register((0,n.addDisposableDomListener)(this._viewportElement,"scroll",this._handleScroll.bind(this))),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate(v=>this._activeBuffer=v.activeBuffer)),this._renderDimensions=this._renderService.dimensions,this.register(this._renderService.onDimensionsChange(v=>this._renderDimensions=v)),this._handleThemeChange(c.colors),this.register(c.onChangeColors(v=>this._handleThemeChange(v))),this.register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.syncScrollArea())),setTimeout(()=>this.syncScrollArea())}_handleThemeChange(r){this._viewportElement.style.backgroundColor=r.background.css}reset(){this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._coreBrowserService.window.requestAnimationFrame(()=>this.syncScrollArea())}_refresh(r){if(r)return this._innerRefresh(),void(this._refreshAnimationFrame!==null&&this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));this._refreshAnimationFrame===null&&(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh()))}_innerRefresh(){if(this._charSizeService.height>0){this._currentRowHeight=this._renderDimensions.device.cell.height/this._coreBrowserService.dpr,this._currentDeviceCellHeight=this._renderDimensions.device.cell.height,this._lastRecordedViewportHeight=this._viewportElement.offsetHeight;const e=Math.round(this._currentRowHeight*this._lastRecordedBufferLength)+(this._lastRecordedViewportHeight-this._renderDimensions.css.canvas.height);this._lastRecordedBufferHeight!==e&&(this._lastRecordedBufferHeight=e,this._scrollArea.style.height=this._lastRecordedBufferHeight+"px")}const r=this._bufferService.buffer.ydisp*this._currentRowHeight;this._viewportElement.scrollTop!==r&&(this._ignoreNextScrollEvent=!0,this._viewportElement.scrollTop=r),this._refreshAnimationFrame=null}syncScrollArea(r=!1){if(this._lastRecordedBufferLength!==this._bufferService.buffer.lines.length)return this._lastRecordedBufferLength=this._bufferService.buffer.lines.length,void this._refresh(r);this._lastRecordedViewportHeight===this._renderService.dimensions.css.canvas.height&&this._lastScrollTop===this._activeBuffer.ydisp*this._currentRowHeight&&this._renderDimensions.device.cell.height===this._currentDeviceCellHeight||this._refresh(r)}_handleScroll(r){if(this._lastScrollTop=this._viewportElement.scrollTop,!this._viewportElement.offsetParent)return;if(this._ignoreNextScrollEvent)return this._ignoreNextScrollEvent=!1,void this._onRequestScrollLines.fire({amount:0,suppressScrollEvent:!0});const e=Math.round(this._lastScrollTop/this._currentRowHeight)-this._bufferService.buffer.ydisp;this._onRequestScrollLines.fire({amount:e,suppressScrollEvent:!0})}_smoothScroll(){if(this._isDisposed||this._smoothScrollState.origin===-1||this._smoothScrollState.target===-1)return;const r=this._smoothScrollPercent();this._viewportElement.scrollTop=this._smoothScrollState.origin+Math.round(r*(this._smoothScrollState.target-this._smoothScrollState.origin)),r<1?this._coreBrowserService.window.requestAnimationFrame(()=>this._smoothScroll()):this._clearSmoothScrollState()}_smoothScrollPercent(){return this._optionsService.rawOptions.smoothScrollDuration&&this._smoothScrollState.startTime?Math.max(Math.min((Date.now()-this._smoothScrollState.startTime)/this._optionsService.rawOptions.smoothScrollDuration,1),0):1}_clearSmoothScrollState(){this._smoothScrollState.startTime=0,this._smoothScrollState.origin=-1,this._smoothScrollState.target=-1}_bubbleScroll(r,e){const t=this._viewportElement.scrollTop+this._lastRecordedViewportHeight;return!(e<0&&this._viewportElement.scrollTop!==0||e>0&&t<this._lastRecordedBufferHeight)||(r.cancelable&&r.preventDefault(),!1)}handleWheel(r){const e=this._getPixelsScrolled(r);return e!==0&&(this._optionsService.rawOptions.smoothScrollDuration?(this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target===-1?this._smoothScrollState.target=this._viewportElement.scrollTop+e:this._smoothScrollState.target+=e,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()):this._viewportElement.scrollTop+=e,this._bubbleScroll(r,e))}scrollLines(r){if(r!==0)if(this._optionsService.rawOptions.smoothScrollDuration){const e=r*this._currentRowHeight;this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target=this._smoothScrollState.origin+e,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()}else this._onRequestScrollLines.fire({amount:r,suppressScrollEvent:!1})}_getPixelsScrolled(r){if(r.deltaY===0||r.shiftKey)return 0;let e=this._applyScrollModifier(r.deltaY,r);return r.deltaMode===WheelEvent.DOM_DELTA_LINE?e*=this._currentRowHeight:r.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(e*=this._currentRowHeight*this._bufferService.rows),e}getBufferElements(r,e){var c;let t,a="";const p=[],_=e??this._bufferService.buffer.lines.length,m=this._bufferService.buffer.lines;for(let v=r;v<_;v++){const C=m.get(v);if(!C)continue;const x=(c=m.get(v+1))==null?void 0:c.isWrapped;if(a+=C.translateToString(!x),!x||v===m.length-1){const k=document.createElement("div");k.textContent=a,p.push(k),a.length>0&&(t=k),a=""}}return{bufferElements:p,cursorElement:t}}getLinesScrolled(r){if(r.deltaY===0||r.shiftKey)return 0;let e=this._applyScrollModifier(r.deltaY,r);return r.deltaMode===WheelEvent.DOM_DELTA_PIXEL?(e/=this._currentRowHeight+0,this._wheelPartialScroll+=e,e=Math.floor(Math.abs(this._wheelPartialScroll))*(this._wheelPartialScroll>0?1:-1),this._wheelPartialScroll%=1):r.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(e*=this._bufferService.rows),e}_applyScrollModifier(r,e){const t=this._optionsService.rawOptions.fastScrollModifier;return t==="alt"&&e.altKey||t==="ctrl"&&e.ctrlKey||t==="shift"&&e.shiftKey?r*this._optionsService.rawOptions.fastScrollSensitivity*this._optionsService.rawOptions.scrollSensitivity:r*this._optionsService.rawOptions.scrollSensitivity}handleTouchStart(r){this._lastTouchY=r.touches[0].pageY}handleTouchMove(r){const e=this._lastTouchY-r.touches[0].pageY;return this._lastTouchY=r.touches[0].pageY,e!==0&&(this._viewportElement.scrollTop+=e,this._bubbleScroll(r,e))}};i.Viewport=s=h([d(2,l.IBufferService),d(3,l.IOptionsService),d(4,f.ICharSizeService),d(5,f.IRenderService),d(6,f.ICoreBrowserService),d(7,f.IThemeService)],s)},3107:function(A,i,o){var h=this&&this.__decorate||function(l,s,r,e){var t,a=arguments.length,p=a<3?s:e===null?e=Object.getOwnPropertyDescriptor(s,r):e;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")p=Reflect.decorate(l,s,r,e);else for(var _=l.length-1;_>=0;_--)(t=l[_])&&(p=(a<3?t(p):a>3?t(s,r,p):t(s,r))||p);return a>3&&p&&Object.defineProperty(s,r,p),p},d=this&&this.__param||function(l,s){return function(r,e){s(r,e,l)}};Object.defineProperty(i,"__esModule",{value:!0}),i.BufferDecorationRenderer=void 0;const n=o(4725),f=o(844),u=o(2585);let g=i.BufferDecorationRenderer=class extends f.Disposable{constructor(l,s,r,e,t){super(),this._screenElement=l,this._bufferService=s,this._coreBrowserService=r,this._decorationService=e,this._renderService=t,this._decorationElements=new Map,this._altBufferIsActive=!1,this._dimensionsChanged=!1,this._container=document.createElement("div"),this._container.classList.add("xterm-decoration-container"),this._screenElement.appendChild(this._container),this.register(this._renderService.onRenderedViewportChange(()=>this._doRefreshDecorations())),this.register(this._renderService.onDimensionsChange(()=>{this._dimensionsChanged=!0,this._queueRefresh()})),this.register(this._coreBrowserService.onDprChange(()=>this._queueRefresh())),this.register(this._bufferService.buffers.onBufferActivate(()=>{this._altBufferIsActive=this._bufferService.buffer===this._bufferService.buffers.alt})),this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh())),this.register(this._decorationService.onDecorationRemoved(a=>this._removeDecoration(a))),this.register((0,f.toDisposable)(()=>{this._container.remove(),this._decorationElements.clear()}))}_queueRefresh(){this._animationFrame===void 0&&(this._animationFrame=this._renderService.addRefreshCallback(()=>{this._doRefreshDecorations(),this._animationFrame=void 0}))}_doRefreshDecorations(){for(const l of this._decorationService.decorations)this._renderDecoration(l);this._dimensionsChanged=!1}_renderDecoration(l){this._refreshStyle(l),this._dimensionsChanged&&this._refreshXPosition(l)}_createElement(l){var e;const s=this._coreBrowserService.mainDocument.createElement("div");s.classList.add("xterm-decoration"),s.classList.toggle("xterm-decoration-top-layer",((e=l==null?void 0:l.options)==null?void 0:e.layer)==="top"),s.style.width=`${Math.round((l.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,s.style.height=(l.options.height||1)*this._renderService.dimensions.css.cell.height+"px",s.style.top=(l.marker.line-this._bufferService.buffers.active.ydisp)*this._renderService.dimensions.css.cell.height+"px",s.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`;const r=l.options.x??0;return r&&r>this._bufferService.cols&&(s.style.display="none"),this._refreshXPosition(l,s),s}_refreshStyle(l){const s=l.marker.line-this._bufferService.buffers.active.ydisp;if(s<0||s>=this._bufferService.rows)l.element&&(l.element.style.display="none",l.onRenderEmitter.fire(l.element));else{let r=this._decorationElements.get(l);r||(r=this._createElement(l),l.element=r,this._decorationElements.set(l,r),this._container.appendChild(r),l.onDispose(()=>{this._decorationElements.delete(l),r.remove()})),r.style.top=s*this._renderService.dimensions.css.cell.height+"px",r.style.display=this._altBufferIsActive?"none":"block",l.onRenderEmitter.fire(r)}}_refreshXPosition(l,s=l.element){if(!s)return;const r=l.options.x??0;(l.options.anchor||"left")==="right"?s.style.right=r?r*this._renderService.dimensions.css.cell.width+"px":"":s.style.left=r?r*this._renderService.dimensions.css.cell.width+"px":""}_removeDecoration(l){var s;(s=this._decorationElements.get(l))==null||s.remove(),this._decorationElements.delete(l),l.dispose()}};i.BufferDecorationRenderer=g=h([d(1,u.IBufferService),d(2,n.ICoreBrowserService),d(3,u.IDecorationService),d(4,n.IRenderService)],g)},5871:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ColorZoneStore=void 0,i.ColorZoneStore=class{constructor(){this._zones=[],this._zonePool=[],this._zonePoolIndex=0,this._linePadding={full:0,left:0,center:0,right:0}}get zones(){return this._zonePool.length=Math.min(this._zonePool.length,this._zones.length),this._zones}clear(){this._zones.length=0,this._zonePoolIndex=0}addDecoration(o){if(o.options.overviewRulerOptions){for(const h of this._zones)if(h.color===o.options.overviewRulerOptions.color&&h.position===o.options.overviewRulerOptions.position){if(this._lineIntersectsZone(h,o.marker.line))return;if(this._lineAdjacentToZone(h,o.marker.line,o.options.overviewRulerOptions.position))return void this._addLineToZone(h,o.marker.line)}if(this._zonePoolIndex<this._zonePool.length)return this._zonePool[this._zonePoolIndex].color=o.options.overviewRulerOptions.color,this._zonePool[this._zonePoolIndex].position=o.options.overviewRulerOptions.position,this._zonePool[this._zonePoolIndex].startBufferLine=o.marker.line,this._zonePool[this._zonePoolIndex].endBufferLine=o.marker.line,void this._zones.push(this._zonePool[this._zonePoolIndex++]);this._zones.push({color:o.options.overviewRulerOptions.color,position:o.options.overviewRulerOptions.position,startBufferLine:o.marker.line,endBufferLine:o.marker.line}),this._zonePool.push(this._zones[this._zones.length-1]),this._zonePoolIndex++}}setPadding(o){this._linePadding=o}_lineIntersectsZone(o,h){return h>=o.startBufferLine&&h<=o.endBufferLine}_lineAdjacentToZone(o,h,d){return h>=o.startBufferLine-this._linePadding[d||"full"]&&h<=o.endBufferLine+this._linePadding[d||"full"]}_addLineToZone(o,h){o.startBufferLine=Math.min(o.startBufferLine,h),o.endBufferLine=Math.max(o.endBufferLine,h)}}},5744:function(A,i,o){var h=this&&this.__decorate||function(t,a,p,_){var m,c=arguments.length,v=c<3?a:_===null?_=Object.getOwnPropertyDescriptor(a,p):_;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")v=Reflect.decorate(t,a,p,_);else for(var C=t.length-1;C>=0;C--)(m=t[C])&&(v=(c<3?m(v):c>3?m(a,p,v):m(a,p))||v);return c>3&&v&&Object.defineProperty(a,p,v),v},d=this&&this.__param||function(t,a){return function(p,_){a(p,_,t)}};Object.defineProperty(i,"__esModule",{value:!0}),i.OverviewRulerRenderer=void 0;const n=o(5871),f=o(4725),u=o(844),g=o(2585),l={full:0,left:0,center:0,right:0},s={full:0,left:0,center:0,right:0},r={full:0,left:0,center:0,right:0};let e=i.OverviewRulerRenderer=class extends u.Disposable{get _width(){return this._optionsService.options.overviewRulerWidth||0}constructor(t,a,p,_,m,c,v){var x;super(),this._viewportElement=t,this._screenElement=a,this._bufferService=p,this._decorationService=_,this._renderService=m,this._optionsService=c,this._coreBrowserService=v,this._colorZoneStore=new n.ColorZoneStore,this._shouldUpdateDimensions=!0,this._shouldUpdateAnchor=!0,this._lastKnownBufferLength=0,this._canvas=this._coreBrowserService.mainDocument.createElement("canvas"),this._canvas.classList.add("xterm-decoration-overview-ruler"),this._refreshCanvasDimensions(),(x=this._viewportElement.parentElement)==null||x.insertBefore(this._canvas,this._viewportElement);const C=this._canvas.getContext("2d");if(!C)throw new Error("Ctx cannot be null");this._ctx=C,this._registerDecorationListeners(),this._registerBufferChangeListeners(),this._registerDimensionChangeListeners(),this.register((0,u.toDisposable)(()=>{var k;(k=this._canvas)==null||k.remove()}))}_registerDecorationListeners(){this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh(void 0,!0))),this.register(this._decorationService.onDecorationRemoved(()=>this._queueRefresh(void 0,!0)))}_registerBufferChangeListeners(){this.register(this._renderService.onRenderedViewportChange(()=>this._queueRefresh())),this.register(this._bufferService.buffers.onBufferActivate(()=>{this._canvas.style.display=this._bufferService.buffer===this._bufferService.buffers.alt?"none":"block"})),this.register(this._bufferService.onScroll(()=>{this._lastKnownBufferLength!==this._bufferService.buffers.normal.lines.length&&(this._refreshDrawHeightConstants(),this._refreshColorZonePadding())}))}_registerDimensionChangeListeners(){this.register(this._renderService.onRender(()=>{this._containerHeight&&this._containerHeight===this._screenElement.clientHeight||(this._queueRefresh(!0),this._containerHeight=this._screenElement.clientHeight)})),this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth",()=>this._queueRefresh(!0))),this.register(this._coreBrowserService.onDprChange(()=>this._queueRefresh(!0))),this._queueRefresh(!0)}_refreshDrawConstants(){const t=Math.floor(this._canvas.width/3),a=Math.ceil(this._canvas.width/3);s.full=this._canvas.width,s.left=t,s.center=a,s.right=t,this._refreshDrawHeightConstants(),r.full=0,r.left=0,r.center=s.left,r.right=s.left+s.center}_refreshDrawHeightConstants(){l.full=Math.round(2*this._coreBrowserService.dpr);const t=this._canvas.height/this._bufferService.buffer.lines.length,a=Math.round(Math.max(Math.min(t,12),6)*this._coreBrowserService.dpr);l.left=a,l.center=a,l.right=a}_refreshColorZonePadding(){this._colorZoneStore.setPadding({full:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.full),left:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.left),center:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.center),right:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.right)}),this._lastKnownBufferLength=this._bufferService.buffers.normal.lines.length}_refreshCanvasDimensions(){this._canvas.style.width=`${this._width}px`,this._canvas.width=Math.round(this._width*this._coreBrowserService.dpr),this._canvas.style.height=`${this._screenElement.clientHeight}px`,this._canvas.height=Math.round(this._screenElement.clientHeight*this._coreBrowserService.dpr),this._refreshDrawConstants(),this._refreshColorZonePadding()}_refreshDecorations(){this._shouldUpdateDimensions&&this._refreshCanvasDimensions(),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._colorZoneStore.clear();for(const a of this._decorationService.decorations)this._colorZoneStore.addDecoration(a);this._ctx.lineWidth=1;const t=this._colorZoneStore.zones;for(const a of t)a.position!=="full"&&this._renderColorZone(a);for(const a of t)a.position==="full"&&this._renderColorZone(a);this._shouldUpdateDimensions=!1,this._shouldUpdateAnchor=!1}_renderColorZone(t){this._ctx.fillStyle=t.color,this._ctx.fillRect(r[t.position||"full"],Math.round((this._canvas.height-1)*(t.startBufferLine/this._bufferService.buffers.active.lines.length)-l[t.position||"full"]/2),s[t.position||"full"],Math.round((this._canvas.height-1)*((t.endBufferLine-t.startBufferLine)/this._bufferService.buffers.active.lines.length)+l[t.position||"full"]))}_queueRefresh(t,a){this._shouldUpdateDimensions=t||this._shouldUpdateDimensions,this._shouldUpdateAnchor=a||this._shouldUpdateAnchor,this._animationFrame===void 0&&(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>{this._refreshDecorations(),this._animationFrame=void 0}))}};i.OverviewRulerRenderer=e=h([d(2,g.IBufferService),d(3,g.IDecorationService),d(4,f.IRenderService),d(5,g.IOptionsService),d(6,f.ICoreBrowserService)],e)},2950:function(A,i,o){var h=this&&this.__decorate||function(l,s,r,e){var t,a=arguments.length,p=a<3?s:e===null?e=Object.getOwnPropertyDescriptor(s,r):e;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")p=Reflect.decorate(l,s,r,e);else for(var _=l.length-1;_>=0;_--)(t=l[_])&&(p=(a<3?t(p):a>3?t(s,r,p):t(s,r))||p);return a>3&&p&&Object.defineProperty(s,r,p),p},d=this&&this.__param||function(l,s){return function(r,e){s(r,e,l)}};Object.defineProperty(i,"__esModule",{value:!0}),i.CompositionHelper=void 0;const n=o(4725),f=o(2585),u=o(2584);let g=i.CompositionHelper=class{get isComposing(){return this._isComposing}constructor(l,s,r,e,t,a){this._textarea=l,this._compositionView=s,this._bufferService=r,this._optionsService=e,this._coreService=t,this._renderService=a,this._isComposing=!1,this._isSendingComposition=!1,this._compositionPosition={start:0,end:0},this._dataAlreadySent=""}compositionstart(){this._isComposing=!0,this._compositionPosition.start=this._textarea.value.length,this._compositionView.textContent="",this._dataAlreadySent="",this._compositionView.classList.add("active")}compositionupdate(l){this._compositionView.textContent=l.data,this.updateCompositionElements(),setTimeout(()=>{this._compositionPosition.end=this._textarea.value.length},0)}compositionend(){this._finalizeComposition(!0)}keydown(l){if(this._isComposing||this._isSendingComposition){if(l.keyCode===229||l.keyCode===16||l.keyCode===17||l.keyCode===18)return!1;this._finalizeComposition(!1)}return l.keyCode!==229||(this._handleAnyTextareaChanges(),!1)}_finalizeComposition(l){if(this._compositionView.classList.remove("active"),this._isComposing=!1,l){const s={start:this._compositionPosition.start,end:this._compositionPosition.end};this._isSendingComposition=!0,setTimeout(()=>{if(this._isSendingComposition){let r;this._isSendingComposition=!1,s.start+=this._dataAlreadySent.length,r=this._isComposing?this._textarea.value.substring(s.start,s.end):this._textarea.value.substring(s.start),r.length>0&&this._coreService.triggerDataEvent(r,!0)}},0)}else{this._isSendingComposition=!1;const s=this._textarea.value.substring(this._compositionPosition.start,this._compositionPosition.end);this._coreService.triggerDataEvent(s,!0)}}_handleAnyTextareaChanges(){const l=this._textarea.value;setTimeout(()=>{if(!this._isComposing){const s=this._textarea.value,r=s.replace(l,"");this._dataAlreadySent=r,s.length>l.length?this._coreService.triggerDataEvent(r,!0):s.length<l.length?this._coreService.triggerDataEvent(`${u.C0.DEL}`,!0):s.length===l.length&&s!==l&&this._coreService.triggerDataEvent(s,!0)}},0)}updateCompositionElements(l){if(this._isComposing){if(this._bufferService.buffer.isCursorInViewport){const s=Math.min(this._bufferService.buffer.x,this._bufferService.cols-1),r=this._renderService.dimensions.css.cell.height,e=this._bufferService.buffer.y*this._renderService.dimensions.css.cell.height,t=s*this._renderService.dimensions.css.cell.width;this._compositionView.style.left=t+"px",this._compositionView.style.top=e+"px",this._compositionView.style.height=r+"px",this._compositionView.style.lineHeight=r+"px",this._compositionView.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._compositionView.style.fontSize=this._optionsService.rawOptions.fontSize+"px";const a=this._compositionView.getBoundingClientRect();this._textarea.style.left=t+"px",this._textarea.style.top=e+"px",this._textarea.style.width=Math.max(a.width,1)+"px",this._textarea.style.height=Math.max(a.height,1)+"px",this._textarea.style.lineHeight=a.height+"px"}l||setTimeout(()=>this.updateCompositionElements(!0),0)}}};i.CompositionHelper=g=h([d(2,f.IBufferService),d(3,f.IOptionsService),d(4,f.ICoreService),d(5,n.IRenderService)],g)},9806:(A,i)=>{function o(h,d,n){const f=n.getBoundingClientRect(),u=h.getComputedStyle(n),g=parseInt(u.getPropertyValue("padding-left")),l=parseInt(u.getPropertyValue("padding-top"));return[d.clientX-f.left-g,d.clientY-f.top-l]}Object.defineProperty(i,"__esModule",{value:!0}),i.getCoords=i.getCoordsRelativeToElement=void 0,i.getCoordsRelativeToElement=o,i.getCoords=function(h,d,n,f,u,g,l,s,r){if(!g)return;const e=o(h,d,n);return e?(e[0]=Math.ceil((e[0]+(r?l/2:0))/l),e[1]=Math.ceil(e[1]/s),e[0]=Math.min(Math.max(e[0],1),f+(r?1:0)),e[1]=Math.min(Math.max(e[1],1),u),e):void 0}},9504:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.moveToCellSequence=void 0;const h=o(2584);function d(s,r,e,t){const a=s-n(s,e),p=r-n(r,e),_=Math.abs(a-p)-function(m,c,v){let C=0;const x=m-n(m,v),k=c-n(c,v);for(let w=0;w<Math.abs(x-k);w++){const R=f(m,c)==="A"?-1:1,B=v.buffer.lines.get(x+R*w);B!=null&&B.isWrapped&&C++}return C}(s,r,e);return l(_,g(f(s,r),t))}function n(s,r){let e=0,t=r.buffer.lines.get(s),a=t==null?void 0:t.isWrapped;for(;a&&s>=0&&s<r.rows;)e++,t=r.buffer.lines.get(--s),a=t==null?void 0:t.isWrapped;return e}function f(s,r){return s>r?"A":"B"}function u(s,r,e,t,a,p){let _=s,m=r,c="";for(;_!==e||m!==t;)_+=a?1:-1,a&&_>p.cols-1?(c+=p.buffer.translateBufferLineToString(m,!1,s,_),_=0,s=0,m++):!a&&_<0&&(c+=p.buffer.translateBufferLineToString(m,!1,0,s+1),_=p.cols-1,s=_,m--);return c+p.buffer.translateBufferLineToString(m,!1,s,_)}function g(s,r){const e=r?"O":"[";return h.C0.ESC+e+s}function l(s,r){s=Math.floor(s);let e="";for(let t=0;t<s;t++)e+=r;return e}i.moveToCellSequence=function(s,r,e,t){const a=e.buffer.x,p=e.buffer.y;if(!e.buffer.hasScrollback)return function(c,v,C,x,k,w){return d(v,x,k,w).length===0?"":l(u(c,v,c,v-n(v,k),!1,k).length,g("D",w))}(a,p,0,r,e,t)+d(p,r,e,t)+function(c,v,C,x,k,w){let R;R=d(v,x,k,w).length>0?x-n(x,k):v;const B=x,P=function(W,M,b,S,E,T){let O;return O=d(b,S,E,T).length>0?S-n(S,E):M,W<b&&O<=S||W>=b&&O<S?"C":"D"}(c,v,C,x,k,w);return l(u(c,R,C,B,P==="C",k).length,g(P,w))}(a,p,s,r,e,t);let _;if(p===r)return _=a>s?"D":"C",l(Math.abs(a-s),g(_,t));_=p>r?"D":"C";const m=Math.abs(p-r);return l(function(c,v){return v.cols-c}(p>r?s:a,e)+(m-1)*e.cols+1+((p>r?a:s)-1),g(_,t))}},1296:function(A,i,o){var h=this&&this.__decorate||function(w,R,B,P){var W,M=arguments.length,b=M<3?R:P===null?P=Object.getOwnPropertyDescriptor(R,B):P;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")b=Reflect.decorate(w,R,B,P);else for(var S=w.length-1;S>=0;S--)(W=w[S])&&(b=(M<3?W(b):M>3?W(R,B,b):W(R,B))||b);return M>3&&b&&Object.defineProperty(R,B,b),b},d=this&&this.__param||function(w,R){return function(B,P){R(B,P,w)}};Object.defineProperty(i,"__esModule",{value:!0}),i.DomRenderer=void 0;const n=o(3787),f=o(2550),u=o(2223),g=o(6171),l=o(6052),s=o(4725),r=o(8055),e=o(8460),t=o(844),a=o(2585),p="xterm-dom-renderer-owner-",_="xterm-rows",m="xterm-fg-",c="xterm-bg-",v="xterm-focus",C="xterm-selection";let x=1,k=i.DomRenderer=class extends t.Disposable{constructor(w,R,B,P,W,M,b,S,E,T,O,H,U){super(),this._terminal=w,this._document=R,this._element=B,this._screenElement=P,this._viewportElement=W,this._helperContainer=M,this._linkifier2=b,this._charSizeService=E,this._optionsService=T,this._bufferService=O,this._coreBrowserService=H,this._themeService=U,this._terminalClass=x++,this._rowElements=[],this._selectionRenderModel=(0,l.createSelectionRenderModel)(),this.onRequestRedraw=this.register(new e.EventEmitter).event,this._rowContainer=this._document.createElement("div"),this._rowContainer.classList.add(_),this._rowContainer.style.lineHeight="normal",this._rowContainer.setAttribute("aria-hidden","true"),this._refreshRowElements(this._bufferService.cols,this._bufferService.rows),this._selectionContainer=this._document.createElement("div"),this._selectionContainer.classList.add(C),this._selectionContainer.setAttribute("aria-hidden","true"),this.dimensions=(0,g.createRenderDimensions)(),this._updateDimensions(),this.register(this._optionsService.onOptionChange(()=>this._handleOptionsChanged())),this.register(this._themeService.onChangeColors(z=>this._injectCss(z))),this._injectCss(this._themeService.colors),this._rowFactory=S.createInstance(n.DomRendererRowFactory,document),this._element.classList.add(p+this._terminalClass),this._screenElement.appendChild(this._rowContainer),this._screenElement.appendChild(this._selectionContainer),this.register(this._linkifier2.onShowLinkUnderline(z=>this._handleLinkHover(z))),this.register(this._linkifier2.onHideLinkUnderline(z=>this._handleLinkLeave(z))),this.register((0,t.toDisposable)(()=>{this._element.classList.remove(p+this._terminalClass),this._rowContainer.remove(),this._selectionContainer.remove(),this._widthCache.dispose(),this._themeStyleElement.remove(),this._dimensionsStyleElement.remove()})),this._widthCache=new f.WidthCache(this._document,this._helperContainer),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}_updateDimensions(){const w=this._coreBrowserService.dpr;this.dimensions.device.char.width=this._charSizeService.width*w,this.dimensions.device.char.height=Math.ceil(this._charSizeService.height*w),this.dimensions.device.cell.width=this.dimensions.device.char.width+Math.round(this._optionsService.rawOptions.letterSpacing),this.dimensions.device.cell.height=Math.floor(this.dimensions.device.char.height*this._optionsService.rawOptions.lineHeight),this.dimensions.device.char.left=0,this.dimensions.device.char.top=0,this.dimensions.device.canvas.width=this.dimensions.device.cell.width*this._bufferService.cols,this.dimensions.device.canvas.height=this.dimensions.device.cell.height*this._bufferService.rows,this.dimensions.css.canvas.width=Math.round(this.dimensions.device.canvas.width/w),this.dimensions.css.canvas.height=Math.round(this.dimensions.device.canvas.height/w),this.dimensions.css.cell.width=this.dimensions.css.canvas.width/this._bufferService.cols,this.dimensions.css.cell.height=this.dimensions.css.canvas.height/this._bufferService.rows;for(const B of this._rowElements)B.style.width=`${this.dimensions.css.canvas.width}px`,B.style.height=`${this.dimensions.css.cell.height}px`,B.style.lineHeight=`${this.dimensions.css.cell.height}px`,B.style.overflow="hidden";this._dimensionsStyleElement||(this._dimensionsStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._dimensionsStyleElement));const R=`${this._terminalSelector} .${_} span { display: inline-block; height: 100%; vertical-align: top;}`;this._dimensionsStyleElement.textContent=R,this._selectionContainer.style.height=this._viewportElement.style.height,this._screenElement.style.width=`${this.dimensions.css.canvas.width}px`,this._screenElement.style.height=`${this.dimensions.css.canvas.height}px`}_injectCss(w){this._themeStyleElement||(this._themeStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._themeStyleElement));let R=`${this._terminalSelector} .${_} { color: ${w.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;R+=`${this._terminalSelector} .${_} .xterm-dim { color: ${r.color.multiplyOpacity(w.foreground,.5).css};}`,R+=`${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;const B=`blink_underline_${this._terminalClass}`,P=`blink_bar_${this._terminalClass}`,W=`blink_block_${this._terminalClass}`;R+=`@keyframes ${B} { 50% {  border-bottom-style: hidden; }}`,R+=`@keyframes ${P} { 50% {  box-shadow: none; }}`,R+=`@keyframes ${W} { 0% {  background-color: ${w.cursor.css};  color: ${w.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${w.cursor.css}; }}`,R+=`${this._terminalSelector} .${_}.${v} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${B} 1s step-end infinite;}${this._terminalSelector} .${_}.${v} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${P} 1s step-end infinite;}${this._terminalSelector} .${_}.${v} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${W} 1s step-end infinite;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block { background-color: ${w.cursor.css}; color: ${w.cursorAccent.css};}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${w.cursor.css} !important; color: ${w.cursorAccent.css} !important;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${w.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${w.cursor.css} inset;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${w.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`,R+=`${this._terminalSelector} .${C} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${C} div { position: absolute; background-color: ${w.selectionBackgroundOpaque.css};}${this._terminalSelector} .${C} div { position: absolute; background-color: ${w.selectionInactiveBackgroundOpaque.css};}`;for(const[M,b]of w.ansi.entries())R+=`${this._terminalSelector} .${m}${M} { color: ${b.css}; }${this._terminalSelector} .${m}${M}.xterm-dim { color: ${r.color.multiplyOpacity(b,.5).css}; }${this._terminalSelector} .${c}${M} { background-color: ${b.css}; }`;R+=`${this._terminalSelector} .${m}${u.INVERTED_DEFAULT_COLOR} { color: ${r.color.opaque(w.background).css}; }${this._terminalSelector} .${m}${u.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${r.color.multiplyOpacity(r.color.opaque(w.background),.5).css}; }${this._terminalSelector} .${c}${u.INVERTED_DEFAULT_COLOR} { background-color: ${w.foreground.css}; }`,this._themeStyleElement.textContent=R}_setDefaultSpacing(){const w=this.dimensions.css.cell.width-this._widthCache.get("W",!1,!1);this._rowContainer.style.letterSpacing=`${w}px`,this._rowFactory.defaultSpacing=w}handleDevicePixelRatioChange(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}_refreshRowElements(w,R){for(let B=this._rowElements.length;B<=R;B++){const P=this._document.createElement("div");this._rowContainer.appendChild(P),this._rowElements.push(P)}for(;this._rowElements.length>R;)this._rowContainer.removeChild(this._rowElements.pop())}handleResize(w,R){this._refreshRowElements(w,R),this._updateDimensions(),this.handleSelectionChanged(this._selectionRenderModel.selectionStart,this._selectionRenderModel.selectionEnd,this._selectionRenderModel.columnSelectMode)}handleCharSizeChanged(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}handleBlur(){this._rowContainer.classList.remove(v),this.renderRows(0,this._bufferService.rows-1)}handleFocus(){this._rowContainer.classList.add(v),this.renderRows(this._bufferService.buffer.y,this._bufferService.buffer.y)}handleSelectionChanged(w,R,B){if(this._selectionContainer.replaceChildren(),this._rowFactory.handleSelectionChanged(w,R,B),this.renderRows(0,this._bufferService.rows-1),!w||!R)return;this._selectionRenderModel.update(this._terminal,w,R,B);const P=this._selectionRenderModel.viewportStartRow,W=this._selectionRenderModel.viewportEndRow,M=this._selectionRenderModel.viewportCappedStartRow,b=this._selectionRenderModel.viewportCappedEndRow;if(M>=this._bufferService.rows||b<0)return;const S=this._document.createDocumentFragment();if(B){const E=w[0]>R[0];S.appendChild(this._createSelectionElement(M,E?R[0]:w[0],E?w[0]:R[0],b-M+1))}else{const E=P===M?w[0]:0,T=M===W?R[0]:this._bufferService.cols;S.appendChild(this._createSelectionElement(M,E,T));const O=b-M-1;if(S.appendChild(this._createSelectionElement(M+1,0,this._bufferService.cols,O)),M!==b){const H=W===b?R[0]:this._bufferService.cols;S.appendChild(this._createSelectionElement(b,0,H))}}this._selectionContainer.appendChild(S)}_createSelectionElement(w,R,B,P=1){const W=this._document.createElement("div"),M=R*this.dimensions.css.cell.width;let b=this.dimensions.css.cell.width*(B-R);return M+b>this.dimensions.css.canvas.width&&(b=this.dimensions.css.canvas.width-M),W.style.height=P*this.dimensions.css.cell.height+"px",W.style.top=w*this.dimensions.css.cell.height+"px",W.style.left=`${M}px`,W.style.width=`${b}px`,W}handleCursorMove(){}_handleOptionsChanged(){this._updateDimensions(),this._injectCss(this._themeService.colors),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}clear(){for(const w of this._rowElements)w.replaceChildren()}renderRows(w,R){const B=this._bufferService.buffer,P=B.ybase+B.y,W=Math.min(B.x,this._bufferService.cols-1),M=this._optionsService.rawOptions.cursorBlink,b=this._optionsService.rawOptions.cursorStyle,S=this._optionsService.rawOptions.cursorInactiveStyle;for(let E=w;E<=R;E++){const T=E+B.ydisp,O=this._rowElements[E],H=B.lines.get(T);if(!O||!H)break;O.replaceChildren(...this._rowFactory.createRow(H,T,T===P,b,S,W,M,this.dimensions.css.cell.width,this._widthCache,-1,-1))}}get _terminalSelector(){return`.${p}${this._terminalClass}`}_handleLinkHover(w){this._setCellUnderline(w.x1,w.x2,w.y1,w.y2,w.cols,!0)}_handleLinkLeave(w){this._setCellUnderline(w.x1,w.x2,w.y1,w.y2,w.cols,!1)}_setCellUnderline(w,R,B,P,W,M){B<0&&(w=0),P<0&&(R=0);const b=this._bufferService.rows-1;B=Math.max(Math.min(B,b),0),P=Math.max(Math.min(P,b),0),W=Math.min(W,this._bufferService.cols);const S=this._bufferService.buffer,E=S.ybase+S.y,T=Math.min(S.x,W-1),O=this._optionsService.rawOptions.cursorBlink,H=this._optionsService.rawOptions.cursorStyle,U=this._optionsService.rawOptions.cursorInactiveStyle;for(let z=B;z<=P;++z){const L=z+S.ydisp,y=this._rowElements[z],I=S.lines.get(L);if(!y||!I)break;y.replaceChildren(...this._rowFactory.createRow(I,L,L===E,H,U,T,O,this.dimensions.css.cell.width,this._widthCache,M?z===B?w:0:-1,M?(z===P?R:W)-1:-1))}}};i.DomRenderer=k=h([d(7,a.IInstantiationService),d(8,s.ICharSizeService),d(9,a.IOptionsService),d(10,a.IBufferService),d(11,s.ICoreBrowserService),d(12,s.IThemeService)],k)},3787:function(A,i,o){var h=this&&this.__decorate||function(_,m,c,v){var C,x=arguments.length,k=x<3?m:v===null?v=Object.getOwnPropertyDescriptor(m,c):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(_,m,c,v);else for(var w=_.length-1;w>=0;w--)(C=_[w])&&(k=(x<3?C(k):x>3?C(m,c,k):C(m,c))||k);return x>3&&k&&Object.defineProperty(m,c,k),k},d=this&&this.__param||function(_,m){return function(c,v){m(c,v,_)}};Object.defineProperty(i,"__esModule",{value:!0}),i.DomRendererRowFactory=void 0;const n=o(2223),f=o(643),u=o(511),g=o(2585),l=o(8055),s=o(4725),r=o(4269),e=o(6171),t=o(3734);let a=i.DomRendererRowFactory=class{constructor(_,m,c,v,C,x,k){this._document=_,this._characterJoinerService=m,this._optionsService=c,this._coreBrowserService=v,this._coreService=C,this._decorationService=x,this._themeService=k,this._workCell=new u.CellData,this._columnSelectMode=!1,this.defaultSpacing=0}handleSelectionChanged(_,m,c){this._selectionStart=_,this._selectionEnd=m,this._columnSelectMode=c}createRow(_,m,c,v,C,x,k,w,R,B,P){const W=[],M=this._characterJoinerService.getJoinedCharacters(m),b=this._themeService.colors;let S,E=_.getNoBgTrimmedLength();c&&E<x+1&&(E=x+1);let T=0,O="",H=0,U=0,z=0,L=!1,y=0,I=!1,D=0;const N=[],F=B!==-1&&P!==-1;for(let G=0;G<E;G++){_.loadCell(G,this._workCell);let X=this._workCell.getWidth();if(X===0)continue;let J=!1,te=G,j=this._workCell;if(M.length>0&&G===M[0][0]){J=!0;const Y=M.shift();j=new r.JoinedCellData(this._workCell,_.translateToString(!0,Y[0],Y[1]),Y[1]-Y[0]),te=Y[1]-1,X=j.getWidth()}const le=this._isCellInSelection(G,m),me=c&&G===x,ge=F&&G>=B&&G<=P;let ve=!1;this._decorationService.forEachDecorationAtCell(G,m,void 0,Y=>{ve=!0});let ue=j.getChars()||f.WHITESPACE_CELL_CHAR;if(ue===" "&&(j.isUnderline()||j.isOverline())&&(ue=" "),D=X*w-R.get(ue,j.isBold(),j.isItalic()),S){if(T&&(le&&I||!le&&!I&&j.bg===H)&&(le&&I&&b.selectionForeground||j.fg===U)&&j.extended.ext===z&&ge===L&&D===y&&!me&&!J&&!ve){j.isInvisible()?O+=f.WHITESPACE_CELL_CHAR:O+=ue,T++;continue}T&&(S.textContent=O),S=this._document.createElement("span"),T=0,O=""}else S=this._document.createElement("span");if(H=j.bg,U=j.fg,z=j.extended.ext,L=ge,y=D,I=le,J&&x>=G&&x<=te&&(x=G),!this._coreService.isCursorHidden&&me&&this._coreService.isCursorInitialized){if(N.push("xterm-cursor"),this._coreBrowserService.isFocused)k&&N.push("xterm-cursor-blink"),N.push(v==="bar"?"xterm-cursor-bar":v==="underline"?"xterm-cursor-underline":"xterm-cursor-block");else if(C)switch(C){case"outline":N.push("xterm-cursor-outline");break;case"block":N.push("xterm-cursor-block");break;case"bar":N.push("xterm-cursor-bar");break;case"underline":N.push("xterm-cursor-underline")}}if(j.isBold()&&N.push("xterm-bold"),j.isItalic()&&N.push("xterm-italic"),j.isDim()&&N.push("xterm-dim"),O=j.isInvisible()?f.WHITESPACE_CELL_CHAR:j.getChars()||f.WHITESPACE_CELL_CHAR,j.isUnderline()&&(N.push(`xterm-underline-${j.extended.underlineStyle}`),O===" "&&(O=" "),!j.isUnderlineColorDefault()))if(j.isUnderlineColorRGB())S.style.textDecorationColor=`rgb(${t.AttributeData.toColorRGB(j.getUnderlineColor()).join(",")})`;else{let Y=j.getUnderlineColor();this._optionsService.rawOptions.drawBoldTextInBrightColors&&j.isBold()&&Y<8&&(Y+=8),S.style.textDecorationColor=b.ansi[Y].css}j.isOverline()&&(N.push("xterm-overline"),O===" "&&(O=" ")),j.isStrikethrough()&&N.push("xterm-strikethrough"),ge&&(S.style.textDecoration="underline");let se=j.getFgColor(),ce=j.getFgColorMode(),re=j.getBgColor(),he=j.getBgColorMode();const be=!!j.isInverse();if(be){const Y=se;se=re,re=Y;const Re=ce;ce=he,he=Re}let ie,pe,ne,fe=!1;switch(this._decorationService.forEachDecorationAtCell(G,m,void 0,Y=>{Y.options.layer!=="top"&&fe||(Y.backgroundColorRGB&&(he=50331648,re=Y.backgroundColorRGB.rgba>>8&16777215,ie=Y.backgroundColorRGB),Y.foregroundColorRGB&&(ce=50331648,se=Y.foregroundColorRGB.rgba>>8&16777215,pe=Y.foregroundColorRGB),fe=Y.options.layer==="top")}),!fe&&le&&(ie=this._coreBrowserService.isFocused?b.selectionBackgroundOpaque:b.selectionInactiveBackgroundOpaque,re=ie.rgba>>8&16777215,he=50331648,fe=!0,b.selectionForeground&&(ce=50331648,se=b.selectionForeground.rgba>>8&16777215,pe=b.selectionForeground)),fe&&N.push("xterm-decoration-top"),he){case 16777216:case 33554432:ne=b.ansi[re],N.push(`xterm-bg-${re}`);break;case 50331648:ne=l.channels.toColor(re>>16,re>>8&255,255&re),this._addStyle(S,`background-color:#${p((re>>>0).toString(16),"0",6)}`);break;default:be?(ne=b.foreground,N.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)):ne=b.background}switch(ie||j.isDim()&&(ie=l.color.multiplyOpacity(ne,.5)),ce){case 16777216:case 33554432:j.isBold()&&se<8&&this._optionsService.rawOptions.drawBoldTextInBrightColors&&(se+=8),this._applyMinimumContrast(S,ne,b.ansi[se],j,ie,void 0)||N.push(`xterm-fg-${se}`);break;case 50331648:const Y=l.channels.toColor(se>>16&255,se>>8&255,255&se);this._applyMinimumContrast(S,ne,Y,j,ie,pe)||this._addStyle(S,`color:#${p(se.toString(16),"0",6)}`);break;default:this._applyMinimumContrast(S,ne,b.foreground,j,ie,pe)||be&&N.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`)}N.length&&(S.className=N.join(" "),N.length=0),me||J||ve?S.textContent=O:T++,D!==this.defaultSpacing&&(S.style.letterSpacing=`${D}px`),W.push(S),G=te}return S&&T&&(S.textContent=O),W}_applyMinimumContrast(_,m,c,v,C,x){if(this._optionsService.rawOptions.minimumContrastRatio===1||(0,e.treatGlyphAsBackgroundColor)(v.getCode()))return!1;const k=this._getContrastCache(v);let w;if(C||x||(w=k.getColor(m.rgba,c.rgba)),w===void 0){const R=this._optionsService.rawOptions.minimumContrastRatio/(v.isDim()?2:1);w=l.color.ensureContrastRatio(C||m,x||c,R),k.setColor((C||m).rgba,(x||c).rgba,w??null)}return!!w&&(this._addStyle(_,`color:${w.css}`),!0)}_getContrastCache(_){return _.isDim()?this._themeService.colors.halfContrastCache:this._themeService.colors.contrastCache}_addStyle(_,m){_.setAttribute("style",`${_.getAttribute("style")||""}${m};`)}_isCellInSelection(_,m){const c=this._selectionStart,v=this._selectionEnd;return!(!c||!v)&&(this._columnSelectMode?c[0]<=v[0]?_>=c[0]&&m>=c[1]&&_<v[0]&&m<=v[1]:_<c[0]&&m>=c[1]&&_>=v[0]&&m<=v[1]:m>c[1]&&m<v[1]||c[1]===v[1]&&m===c[1]&&_>=c[0]&&_<v[0]||c[1]<v[1]&&m===v[1]&&_<v[0]||c[1]<v[1]&&m===c[1]&&_>=c[0])}};function p(_,m,c){for(;_.length<c;)_=m+_;return _}i.DomRendererRowFactory=a=h([d(1,s.ICharacterJoinerService),d(2,g.IOptionsService),d(3,s.ICoreBrowserService),d(4,g.ICoreService),d(5,g.IDecorationService),d(6,s.IThemeService)],a)},2550:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.WidthCache=void 0,i.WidthCache=class{constructor(o,h){this._flat=new Float32Array(256),this._font="",this._fontSize=0,this._weight="normal",this._weightBold="bold",this._measureElements=[],this._container=o.createElement("div"),this._container.classList.add("xterm-width-cache-measure-container"),this._container.setAttribute("aria-hidden","true"),this._container.style.whiteSpace="pre",this._container.style.fontKerning="none";const d=o.createElement("span");d.classList.add("xterm-char-measure-element");const n=o.createElement("span");n.classList.add("xterm-char-measure-element"),n.style.fontWeight="bold";const f=o.createElement("span");f.classList.add("xterm-char-measure-element"),f.style.fontStyle="italic";const u=o.createElement("span");u.classList.add("xterm-char-measure-element"),u.style.fontWeight="bold",u.style.fontStyle="italic",this._measureElements=[d,n,f,u],this._container.appendChild(d),this._container.appendChild(n),this._container.appendChild(f),this._container.appendChild(u),h.appendChild(this._container),this.clear()}dispose(){this._container.remove(),this._measureElements.length=0,this._holey=void 0}clear(){this._flat.fill(-9999),this._holey=new Map}setFont(o,h,d,n){o===this._font&&h===this._fontSize&&d===this._weight&&n===this._weightBold||(this._font=o,this._fontSize=h,this._weight=d,this._weightBold=n,this._container.style.fontFamily=this._font,this._container.style.fontSize=`${this._fontSize}px`,this._measureElements[0].style.fontWeight=`${d}`,this._measureElements[1].style.fontWeight=`${n}`,this._measureElements[2].style.fontWeight=`${d}`,this._measureElements[3].style.fontWeight=`${n}`,this.clear())}get(o,h,d){let n=0;if(!h&&!d&&o.length===1&&(n=o.charCodeAt(0))<256){if(this._flat[n]!==-9999)return this._flat[n];const g=this._measure(o,0);return g>0&&(this._flat[n]=g),g}let f=o;h&&(f+="B"),d&&(f+="I");let u=this._holey.get(f);if(u===void 0){let g=0;h&&(g|=1),d&&(g|=2),u=this._measure(o,g),u>0&&this._holey.set(f,u)}return u}_measure(o,h){const d=this._measureElements[h];return d.textContent=o.repeat(32),d.offsetWidth/32}}},2223:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.TEXT_BASELINE=i.DIM_OPACITY=i.INVERTED_DEFAULT_COLOR=void 0;const h=o(6114);i.INVERTED_DEFAULT_COLOR=257,i.DIM_OPACITY=.5,i.TEXT_BASELINE=h.isFirefox||h.isLegacyEdge?"bottom":"ideographic"},6171:(A,i)=>{function o(d){return 57508<=d&&d<=57558}function h(d){return d>=128512&&d<=128591||d>=127744&&d<=128511||d>=128640&&d<=128767||d>=9728&&d<=9983||d>=9984&&d<=10175||d>=65024&&d<=65039||d>=129280&&d<=129535||d>=127462&&d<=127487}Object.defineProperty(i,"__esModule",{value:!0}),i.computeNextVariantOffset=i.createRenderDimensions=i.treatGlyphAsBackgroundColor=i.allowRescaling=i.isEmoji=i.isRestrictedPowerlineGlyph=i.isPowerlineGlyph=i.throwIfFalsy=void 0,i.throwIfFalsy=function(d){if(!d)throw new Error("value must not be falsy");return d},i.isPowerlineGlyph=o,i.isRestrictedPowerlineGlyph=function(d){return 57520<=d&&d<=57527},i.isEmoji=h,i.allowRescaling=function(d,n,f,u){return n===1&&f>Math.ceil(1.5*u)&&d!==void 0&&d>255&&!h(d)&&!o(d)&&!function(g){return 57344<=g&&g<=63743}(d)},i.treatGlyphAsBackgroundColor=function(d){return o(d)||function(n){return 9472<=n&&n<=9631}(d)},i.createRenderDimensions=function(){return{css:{canvas:{width:0,height:0},cell:{width:0,height:0}},device:{canvas:{width:0,height:0},cell:{width:0,height:0},char:{width:0,height:0,left:0,top:0}}}},i.computeNextVariantOffset=function(d,n,f=0){return(d-(2*Math.round(n)-f))%(2*Math.round(n))}},6052:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.createSelectionRenderModel=void 0;class o{constructor(){this.clear()}clear(){this.hasSelection=!1,this.columnSelectMode=!1,this.viewportStartRow=0,this.viewportEndRow=0,this.viewportCappedStartRow=0,this.viewportCappedEndRow=0,this.startCol=0,this.endCol=0,this.selectionStart=void 0,this.selectionEnd=void 0}update(d,n,f,u=!1){if(this.selectionStart=n,this.selectionEnd=f,!n||!f||n[0]===f[0]&&n[1]===f[1])return void this.clear();const g=d.buffers.active.ydisp,l=n[1]-g,s=f[1]-g,r=Math.max(l,0),e=Math.min(s,d.rows-1);r>=d.rows||e<0?this.clear():(this.hasSelection=!0,this.columnSelectMode=u,this.viewportStartRow=l,this.viewportEndRow=s,this.viewportCappedStartRow=r,this.viewportCappedEndRow=e,this.startCol=n[0],this.endCol=f[0])}isCellSelected(d,n,f){return!!this.hasSelection&&(f-=d.buffer.active.viewportY,this.columnSelectMode?this.startCol<=this.endCol?n>=this.startCol&&f>=this.viewportCappedStartRow&&n<this.endCol&&f<=this.viewportCappedEndRow:n<this.startCol&&f>=this.viewportCappedStartRow&&n>=this.endCol&&f<=this.viewportCappedEndRow:f>this.viewportStartRow&&f<this.viewportEndRow||this.viewportStartRow===this.viewportEndRow&&f===this.viewportStartRow&&n>=this.startCol&&n<this.endCol||this.viewportStartRow<this.viewportEndRow&&f===this.viewportEndRow&&n<this.endCol||this.viewportStartRow<this.viewportEndRow&&f===this.viewportStartRow&&n>=this.startCol)}}i.createSelectionRenderModel=function(){return new o}},456:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.SelectionModel=void 0,i.SelectionModel=class{constructor(o){this._bufferService=o,this.isSelectAllActive=!1,this.selectionStartLength=0}clearSelection(){this.selectionStart=void 0,this.selectionEnd=void 0,this.isSelectAllActive=!1,this.selectionStartLength=0}get finalSelectionStart(){return this.isSelectAllActive?[0,0]:this.selectionEnd&&this.selectionStart&&this.areSelectionValuesReversed()?this.selectionEnd:this.selectionStart}get finalSelectionEnd(){if(this.isSelectAllActive)return[this._bufferService.cols,this._bufferService.buffer.ybase+this._bufferService.rows-1];if(this.selectionStart){if(!this.selectionEnd||this.areSelectionValuesReversed()){const o=this.selectionStart[0]+this.selectionStartLength;return o>this._bufferService.cols?o%this._bufferService.cols==0?[this._bufferService.cols,this.selectionStart[1]+Math.floor(o/this._bufferService.cols)-1]:[o%this._bufferService.cols,this.selectionStart[1]+Math.floor(o/this._bufferService.cols)]:[o,this.selectionStart[1]]}if(this.selectionStartLength&&this.selectionEnd[1]===this.selectionStart[1]){const o=this.selectionStart[0]+this.selectionStartLength;return o>this._bufferService.cols?[o%this._bufferService.cols,this.selectionStart[1]+Math.floor(o/this._bufferService.cols)]:[Math.max(o,this.selectionEnd[0]),this.selectionEnd[1]]}return this.selectionEnd}}areSelectionValuesReversed(){const o=this.selectionStart,h=this.selectionEnd;return!(!o||!h)&&(o[1]>h[1]||o[1]===h[1]&&o[0]>h[0])}handleTrim(o){return this.selectionStart&&(this.selectionStart[1]-=o),this.selectionEnd&&(this.selectionEnd[1]-=o),this.selectionEnd&&this.selectionEnd[1]<0?(this.clearSelection(),!0):(this.selectionStart&&this.selectionStart[1]<0&&(this.selectionStart[1]=0),!1)}}},428:function(A,i,o){var h=this&&this.__decorate||function(e,t,a,p){var _,m=arguments.length,c=m<3?t:p===null?p=Object.getOwnPropertyDescriptor(t,a):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,a,p);else for(var v=e.length-1;v>=0;v--)(_=e[v])&&(c=(m<3?_(c):m>3?_(t,a,c):_(t,a))||c);return m>3&&c&&Object.defineProperty(t,a,c),c},d=this&&this.__param||function(e,t){return function(a,p){t(a,p,e)}};Object.defineProperty(i,"__esModule",{value:!0}),i.CharSizeService=void 0;const n=o(2585),f=o(8460),u=o(844);let g=i.CharSizeService=class extends u.Disposable{get hasValidSize(){return this.width>0&&this.height>0}constructor(e,t,a){super(),this._optionsService=a,this.width=0,this.height=0,this._onCharSizeChange=this.register(new f.EventEmitter),this.onCharSizeChange=this._onCharSizeChange.event;try{this._measureStrategy=this.register(new r(this._optionsService))}catch{this._measureStrategy=this.register(new s(e,t,this._optionsService))}this.register(this._optionsService.onMultipleOptionChange(["fontFamily","fontSize"],()=>this.measure()))}measure(){const e=this._measureStrategy.measure();e.width===this.width&&e.height===this.height||(this.width=e.width,this.height=e.height,this._onCharSizeChange.fire())}};i.CharSizeService=g=h([d(2,n.IOptionsService)],g);class l extends u.Disposable{constructor(){super(...arguments),this._result={width:0,height:0}}_validateAndSet(t,a){t!==void 0&&t>0&&a!==void 0&&a>0&&(this._result.width=t,this._result.height=a)}}class s extends l{constructor(t,a,p){super(),this._document=t,this._parentElement=a,this._optionsService=p,this._measureElement=this._document.createElement("span"),this._measureElement.classList.add("xterm-char-measure-element"),this._measureElement.textContent="W".repeat(32),this._measureElement.setAttribute("aria-hidden","true"),this._measureElement.style.whiteSpace="pre",this._measureElement.style.fontKerning="none",this._parentElement.appendChild(this._measureElement)}measure(){return this._measureElement.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._measureElement.style.fontSize=`${this._optionsService.rawOptions.fontSize}px`,this._validateAndSet(Number(this._measureElement.offsetWidth)/32,Number(this._measureElement.offsetHeight)),this._result}}class r extends l{constructor(t){super(),this._optionsService=t,this._canvas=new OffscreenCanvas(100,100),this._ctx=this._canvas.getContext("2d");const a=this._ctx.measureText("W");if(!("width"in a&&"fontBoundingBoxAscent"in a&&"fontBoundingBoxDescent"in a))throw new Error("Required font metrics not supported")}measure(){this._ctx.font=`${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;const t=this._ctx.measureText("W");return this._validateAndSet(t.width,t.fontBoundingBoxAscent+t.fontBoundingBoxDescent),this._result}}},4269:function(A,i,o){var h=this&&this.__decorate||function(r,e,t,a){var p,_=arguments.length,m=_<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")m=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(p=r[c])&&(m=(_<3?p(m):_>3?p(e,t,m):p(e,t))||m);return _>3&&m&&Object.defineProperty(e,t,m),m},d=this&&this.__param||function(r,e){return function(t,a){e(t,a,r)}};Object.defineProperty(i,"__esModule",{value:!0}),i.CharacterJoinerService=i.JoinedCellData=void 0;const n=o(3734),f=o(643),u=o(511),g=o(2585);class l extends n.AttributeData{constructor(e,t,a){super(),this.content=0,this.combinedData="",this.fg=e.fg,this.bg=e.bg,this.combinedData=t,this._width=a}isCombined(){return 2097152}getWidth(){return this._width}getChars(){return this.combinedData}getCode(){return 2097151}setFromCharData(e){throw new Error("not implemented")}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}i.JoinedCellData=l;let s=i.CharacterJoinerService=class ke{constructor(e){this._bufferService=e,this._characterJoiners=[],this._nextCharacterJoinerId=0,this._workCell=new u.CellData}register(e){const t={id:this._nextCharacterJoinerId++,handler:e};return this._characterJoiners.push(t),t.id}deregister(e){for(let t=0;t<this._characterJoiners.length;t++)if(this._characterJoiners[t].id===e)return this._characterJoiners.splice(t,1),!0;return!1}getJoinedCharacters(e){if(this._characterJoiners.length===0)return[];const t=this._bufferService.buffer.lines.get(e);if(!t||t.length===0)return[];const a=[],p=t.translateToString(!0);let _=0,m=0,c=0,v=t.getFg(0),C=t.getBg(0);for(let x=0;x<t.getTrimmedLength();x++)if(t.loadCell(x,this._workCell),this._workCell.getWidth()!==0){if(this._workCell.fg!==v||this._workCell.bg!==C){if(x-_>1){const k=this._getJoinedRanges(p,c,m,t,_);for(let w=0;w<k.length;w++)a.push(k[w])}_=x,c=m,v=this._workCell.fg,C=this._workCell.bg}m+=this._workCell.getChars().length||f.WHITESPACE_CELL_CHAR.length}if(this._bufferService.cols-_>1){const x=this._getJoinedRanges(p,c,m,t,_);for(let k=0;k<x.length;k++)a.push(x[k])}return a}_getJoinedRanges(e,t,a,p,_){const m=e.substring(t,a);let c=[];try{c=this._characterJoiners[0].handler(m)}catch(v){console.error(v)}for(let v=1;v<this._characterJoiners.length;v++)try{const C=this._characterJoiners[v].handler(m);for(let x=0;x<C.length;x++)ke._mergeRanges(c,C[x])}catch(C){console.error(C)}return this._stringRangesToCellRanges(c,p,_),c}_stringRangesToCellRanges(e,t,a){let p=0,_=!1,m=0,c=e[p];if(c){for(let v=a;v<this._bufferService.cols;v++){const C=t.getWidth(v),x=t.getString(v).length||f.WHITESPACE_CELL_CHAR.length;if(C!==0){if(!_&&c[0]<=m&&(c[0]=v,_=!0),c[1]<=m){if(c[1]=v,c=e[++p],!c)break;c[0]<=m?(c[0]=v,_=!0):_=!1}m+=x}}c&&(c[1]=this._bufferService.cols)}}static _mergeRanges(e,t){let a=!1;for(let p=0;p<e.length;p++){const _=e[p];if(a){if(t[1]<=_[0])return e[p-1][1]=t[1],e;if(t[1]<=_[1])return e[p-1][1]=Math.max(t[1],_[1]),e.splice(p,1),e;e.splice(p,1),p--}else{if(t[1]<=_[0])return e.splice(p,0,t),e;if(t[1]<=_[1])return _[0]=Math.min(t[0],_[0]),e;t[0]<_[1]&&(_[0]=Math.min(t[0],_[0]),a=!0)}}return a?e[e.length-1][1]=t[1]:e.push(t),e}};i.CharacterJoinerService=s=h([d(0,g.IBufferService)],s)},5114:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.CoreBrowserService=void 0;const h=o(844),d=o(8460),n=o(3656);class f extends h.Disposable{constructor(l,s,r){super(),this._textarea=l,this._window=s,this.mainDocument=r,this._isFocused=!1,this._cachedIsFocused=void 0,this._screenDprMonitor=new u(this._window),this._onDprChange=this.register(new d.EventEmitter),this.onDprChange=this._onDprChange.event,this._onWindowChange=this.register(new d.EventEmitter),this.onWindowChange=this._onWindowChange.event,this.register(this.onWindowChange(e=>this._screenDprMonitor.setWindow(e))),this.register((0,d.forwardEvent)(this._screenDprMonitor.onDprChange,this._onDprChange)),this._textarea.addEventListener("focus",()=>this._isFocused=!0),this._textarea.addEventListener("blur",()=>this._isFocused=!1)}get window(){return this._window}set window(l){this._window!==l&&(this._window=l,this._onWindowChange.fire(this._window))}get dpr(){return this.window.devicePixelRatio}get isFocused(){return this._cachedIsFocused===void 0&&(this._cachedIsFocused=this._isFocused&&this._textarea.ownerDocument.hasFocus(),queueMicrotask(()=>this._cachedIsFocused=void 0)),this._cachedIsFocused}}i.CoreBrowserService=f;class u extends h.Disposable{constructor(l){super(),this._parentWindow=l,this._windowResizeListener=this.register(new h.MutableDisposable),this._onDprChange=this.register(new d.EventEmitter),this.onDprChange=this._onDprChange.event,this._outerListener=()=>this._setDprAndFireIfDiffers(),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._updateDpr(),this._setWindowResizeListener(),this.register((0,h.toDisposable)(()=>this.clearListener()))}setWindow(l){this._parentWindow=l,this._setWindowResizeListener(),this._setDprAndFireIfDiffers()}_setWindowResizeListener(){this._windowResizeListener.value=(0,n.addDisposableDomListener)(this._parentWindow,"resize",()=>this._setDprAndFireIfDiffers())}_setDprAndFireIfDiffers(){this._parentWindow.devicePixelRatio!==this._currentDevicePixelRatio&&this._onDprChange.fire(this._parentWindow.devicePixelRatio),this._updateDpr()}_updateDpr(){var l;this._outerListener&&((l=this._resolutionMediaMatchList)==null||l.removeListener(this._outerListener),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._resolutionMediaMatchList=this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`),this._resolutionMediaMatchList.addListener(this._outerListener))}clearListener(){this._resolutionMediaMatchList&&this._outerListener&&(this._resolutionMediaMatchList.removeListener(this._outerListener),this._resolutionMediaMatchList=void 0,this._outerListener=void 0)}}},779:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.LinkProviderService=void 0;const h=o(844);class d extends h.Disposable{constructor(){super(),this.linkProviders=[],this.register((0,h.toDisposable)(()=>this.linkProviders.length=0))}registerLinkProvider(f){return this.linkProviders.push(f),{dispose:()=>{const u=this.linkProviders.indexOf(f);u!==-1&&this.linkProviders.splice(u,1)}}}}i.LinkProviderService=d},8934:function(A,i,o){var h=this&&this.__decorate||function(g,l,s,r){var e,t=arguments.length,a=t<3?l:r===null?r=Object.getOwnPropertyDescriptor(l,s):r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(g,l,s,r);else for(var p=g.length-1;p>=0;p--)(e=g[p])&&(a=(t<3?e(a):t>3?e(l,s,a):e(l,s))||a);return t>3&&a&&Object.defineProperty(l,s,a),a},d=this&&this.__param||function(g,l){return function(s,r){l(s,r,g)}};Object.defineProperty(i,"__esModule",{value:!0}),i.MouseService=void 0;const n=o(4725),f=o(9806);let u=i.MouseService=class{constructor(g,l){this._renderService=g,this._charSizeService=l}getCoords(g,l,s,r,e){return(0,f.getCoords)(window,g,l,s,r,this._charSizeService.hasValidSize,this._renderService.dimensions.css.cell.width,this._renderService.dimensions.css.cell.height,e)}getMouseReportCoords(g,l){const s=(0,f.getCoordsRelativeToElement)(window,g,l);if(this._charSizeService.hasValidSize)return s[0]=Math.min(Math.max(s[0],0),this._renderService.dimensions.css.canvas.width-1),s[1]=Math.min(Math.max(s[1],0),this._renderService.dimensions.css.canvas.height-1),{col:Math.floor(s[0]/this._renderService.dimensions.css.cell.width),row:Math.floor(s[1]/this._renderService.dimensions.css.cell.height),x:Math.floor(s[0]),y:Math.floor(s[1])}}};i.MouseService=u=h([d(0,n.IRenderService),d(1,n.ICharSizeService)],u)},3230:function(A,i,o){var h=this&&this.__decorate||function(e,t,a,p){var _,m=arguments.length,c=m<3?t:p===null?p=Object.getOwnPropertyDescriptor(t,a):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,a,p);else for(var v=e.length-1;v>=0;v--)(_=e[v])&&(c=(m<3?_(c):m>3?_(t,a,c):_(t,a))||c);return m>3&&c&&Object.defineProperty(t,a,c),c},d=this&&this.__param||function(e,t){return function(a,p){t(a,p,e)}};Object.defineProperty(i,"__esModule",{value:!0}),i.RenderService=void 0;const n=o(6193),f=o(4725),u=o(8460),g=o(844),l=o(7226),s=o(2585);let r=i.RenderService=class extends g.Disposable{get dimensions(){return this._renderer.value.dimensions}constructor(e,t,a,p,_,m,c,v){super(),this._rowCount=e,this._charSizeService=p,this._renderer=this.register(new g.MutableDisposable),this._pausedResizeTask=new l.DebouncedIdleTask,this._observerDisposable=this.register(new g.MutableDisposable),this._isPaused=!1,this._needsFullRefresh=!1,this._isNextRenderRedrawOnly=!0,this._needsSelectionRefresh=!1,this._canvasWidth=0,this._canvasHeight=0,this._selectionState={start:void 0,end:void 0,columnSelectMode:!1},this._onDimensionsChange=this.register(new u.EventEmitter),this.onDimensionsChange=this._onDimensionsChange.event,this._onRenderedViewportChange=this.register(new u.EventEmitter),this.onRenderedViewportChange=this._onRenderedViewportChange.event,this._onRender=this.register(new u.EventEmitter),this.onRender=this._onRender.event,this._onRefreshRequest=this.register(new u.EventEmitter),this.onRefreshRequest=this._onRefreshRequest.event,this._renderDebouncer=new n.RenderDebouncer((C,x)=>this._renderRows(C,x),c),this.register(this._renderDebouncer),this.register(c.onDprChange(()=>this.handleDevicePixelRatioChange())),this.register(m.onResize(()=>this._fullRefresh())),this.register(m.buffers.onBufferActivate(()=>{var C;return(C=this._renderer.value)==null?void 0:C.clear()})),this.register(a.onOptionChange(()=>this._handleOptionsChanged())),this.register(this._charSizeService.onCharSizeChange(()=>this.handleCharSizeChanged())),this.register(_.onDecorationRegistered(()=>this._fullRefresh())),this.register(_.onDecorationRemoved(()=>this._fullRefresh())),this.register(a.onMultipleOptionChange(["customGlyphs","drawBoldTextInBrightColors","letterSpacing","lineHeight","fontFamily","fontSize","fontWeight","fontWeightBold","minimumContrastRatio","rescaleOverlappingGlyphs"],()=>{this.clear(),this.handleResize(m.cols,m.rows),this._fullRefresh()})),this.register(a.onMultipleOptionChange(["cursorBlink","cursorStyle"],()=>this.refreshRows(m.buffer.y,m.buffer.y,!0))),this.register(v.onChangeColors(()=>this._fullRefresh())),this._registerIntersectionObserver(c.window,t),this.register(c.onWindowChange(C=>this._registerIntersectionObserver(C,t)))}_registerIntersectionObserver(e,t){if("IntersectionObserver"in e){const a=new e.IntersectionObserver(p=>this._handleIntersectionChange(p[p.length-1]),{threshold:0});a.observe(t),this._observerDisposable.value=(0,g.toDisposable)(()=>a.disconnect())}}_handleIntersectionChange(e){this._isPaused=e.isIntersecting===void 0?e.intersectionRatio===0:!e.isIntersecting,this._isPaused||this._charSizeService.hasValidSize||this._charSizeService.measure(),!this._isPaused&&this._needsFullRefresh&&(this._pausedResizeTask.flush(),this.refreshRows(0,this._rowCount-1),this._needsFullRefresh=!1)}refreshRows(e,t,a=!1){this._isPaused?this._needsFullRefresh=!0:(a||(this._isNextRenderRedrawOnly=!1),this._renderDebouncer.refresh(e,t,this._rowCount))}_renderRows(e,t){this._renderer.value&&(e=Math.min(e,this._rowCount-1),t=Math.min(t,this._rowCount-1),this._renderer.value.renderRows(e,t),this._needsSelectionRefresh&&(this._renderer.value.handleSelectionChanged(this._selectionState.start,this._selectionState.end,this._selectionState.columnSelectMode),this._needsSelectionRefresh=!1),this._isNextRenderRedrawOnly||this._onRenderedViewportChange.fire({start:e,end:t}),this._onRender.fire({start:e,end:t}),this._isNextRenderRedrawOnly=!0)}resize(e,t){this._rowCount=t,this._fireOnCanvasResize()}_handleOptionsChanged(){this._renderer.value&&(this.refreshRows(0,this._rowCount-1),this._fireOnCanvasResize())}_fireOnCanvasResize(){this._renderer.value&&(this._renderer.value.dimensions.css.canvas.width===this._canvasWidth&&this._renderer.value.dimensions.css.canvas.height===this._canvasHeight||this._onDimensionsChange.fire(this._renderer.value.dimensions))}hasRenderer(){return!!this._renderer.value}setRenderer(e){this._renderer.value=e,this._renderer.value&&(this._renderer.value.onRequestRedraw(t=>this.refreshRows(t.start,t.end,!0)),this._needsSelectionRefresh=!0,this._fullRefresh())}addRefreshCallback(e){return this._renderDebouncer.addRefreshCallback(e)}_fullRefresh(){this._isPaused?this._needsFullRefresh=!0:this.refreshRows(0,this._rowCount-1)}clearTextureAtlas(){var e,t;this._renderer.value&&((t=(e=this._renderer.value).clearTextureAtlas)==null||t.call(e),this._fullRefresh())}handleDevicePixelRatioChange(){this._charSizeService.measure(),this._renderer.value&&(this._renderer.value.handleDevicePixelRatioChange(),this.refreshRows(0,this._rowCount-1))}handleResize(e,t){this._renderer.value&&(this._isPaused?this._pausedResizeTask.set(()=>{var a;return(a=this._renderer.value)==null?void 0:a.handleResize(e,t)}):this._renderer.value.handleResize(e,t),this._fullRefresh())}handleCharSizeChanged(){var e;(e=this._renderer.value)==null||e.handleCharSizeChanged()}handleBlur(){var e;(e=this._renderer.value)==null||e.handleBlur()}handleFocus(){var e;(e=this._renderer.value)==null||e.handleFocus()}handleSelectionChanged(e,t,a){var p;this._selectionState.start=e,this._selectionState.end=t,this._selectionState.columnSelectMode=a,(p=this._renderer.value)==null||p.handleSelectionChanged(e,t,a)}handleCursorMove(){var e;(e=this._renderer.value)==null||e.handleCursorMove()}clear(){var e;(e=this._renderer.value)==null||e.clear()}};i.RenderService=r=h([d(2,s.IOptionsService),d(3,f.ICharSizeService),d(4,s.IDecorationService),d(5,s.IBufferService),d(6,f.ICoreBrowserService),d(7,f.IThemeService)],r)},9312:function(A,i,o){var h=this&&this.__decorate||function(c,v,C,x){var k,w=arguments.length,R=w<3?v:x===null?x=Object.getOwnPropertyDescriptor(v,C):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")R=Reflect.decorate(c,v,C,x);else for(var B=c.length-1;B>=0;B--)(k=c[B])&&(R=(w<3?k(R):w>3?k(v,C,R):k(v,C))||R);return w>3&&R&&Object.defineProperty(v,C,R),R},d=this&&this.__param||function(c,v){return function(C,x){v(C,x,c)}};Object.defineProperty(i,"__esModule",{value:!0}),i.SelectionService=void 0;const n=o(9806),f=o(9504),u=o(456),g=o(4725),l=o(8460),s=o(844),r=o(6114),e=o(4841),t=o(511),a=o(2585),p=" ",_=new RegExp(p,"g");let m=i.SelectionService=class extends s.Disposable{constructor(c,v,C,x,k,w,R,B,P){super(),this._element=c,this._screenElement=v,this._linkifier=C,this._bufferService=x,this._coreService=k,this._mouseService=w,this._optionsService=R,this._renderService=B,this._coreBrowserService=P,this._dragScrollAmount=0,this._enabled=!0,this._workCell=new t.CellData,this._mouseDownTimeStamp=0,this._oldHasSelection=!1,this._oldSelectionStart=void 0,this._oldSelectionEnd=void 0,this._onLinuxMouseSelection=this.register(new l.EventEmitter),this.onLinuxMouseSelection=this._onLinuxMouseSelection.event,this._onRedrawRequest=this.register(new l.EventEmitter),this.onRequestRedraw=this._onRedrawRequest.event,this._onSelectionChange=this.register(new l.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onRequestScrollLines=this.register(new l.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this._mouseMoveListener=W=>this._handleMouseMove(W),this._mouseUpListener=W=>this._handleMouseUp(W),this._coreService.onUserInput(()=>{this.hasSelection&&this.clearSelection()}),this._trimListener=this._bufferService.buffer.lines.onTrim(W=>this._handleTrim(W)),this.register(this._bufferService.buffers.onBufferActivate(W=>this._handleBufferActivate(W))),this.enable(),this._model=new u.SelectionModel(this._bufferService),this._activeSelectionMode=0,this.register((0,s.toDisposable)(()=>{this._removeMouseDownListeners()}))}reset(){this.clearSelection()}disable(){this.clearSelection(),this._enabled=!1}enable(){this._enabled=!0}get selectionStart(){return this._model.finalSelectionStart}get selectionEnd(){return this._model.finalSelectionEnd}get hasSelection(){const c=this._model.finalSelectionStart,v=this._model.finalSelectionEnd;return!(!c||!v||c[0]===v[0]&&c[1]===v[1])}get selectionText(){const c=this._model.finalSelectionStart,v=this._model.finalSelectionEnd;if(!c||!v)return"";const C=this._bufferService.buffer,x=[];if(this._activeSelectionMode===3){if(c[0]===v[0])return"";const k=c[0]<v[0]?c[0]:v[0],w=c[0]<v[0]?v[0]:c[0];for(let R=c[1];R<=v[1];R++){const B=C.translateBufferLineToString(R,!0,k,w);x.push(B)}}else{const k=c[1]===v[1]?v[0]:void 0;x.push(C.translateBufferLineToString(c[1],!0,c[0],k));for(let w=c[1]+1;w<=v[1]-1;w++){const R=C.lines.get(w),B=C.translateBufferLineToString(w,!0);R!=null&&R.isWrapped?x[x.length-1]+=B:x.push(B)}if(c[1]!==v[1]){const w=C.lines.get(v[1]),R=C.translateBufferLineToString(v[1],!0,0,v[0]);w&&w.isWrapped?x[x.length-1]+=R:x.push(R)}}return x.map(k=>k.replace(_," ")).join(r.isWindows?`\r
`:`
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(c){this._refreshAnimationFrame||(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._refresh())),r.isLinux&&c&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(c){const v=this._getMouseBufferCoords(c),C=this._model.finalSelectionStart,x=this._model.finalSelectionEnd;return!!(C&&x&&v)&&this._areCoordsInSelection(v,C,x)}isCellInSelection(c,v){const C=this._model.finalSelectionStart,x=this._model.finalSelectionEnd;return!(!C||!x)&&this._areCoordsInSelection([c,v],C,x)}_areCoordsInSelection(c,v,C){return c[1]>v[1]&&c[1]<C[1]||v[1]===C[1]&&c[1]===v[1]&&c[0]>=v[0]&&c[0]<C[0]||v[1]<C[1]&&c[1]===C[1]&&c[0]<C[0]||v[1]<C[1]&&c[1]===v[1]&&c[0]>=v[0]}_selectWordAtCursor(c,v){var k,w;const C=(w=(k=this._linkifier.currentLink)==null?void 0:k.link)==null?void 0:w.range;if(C)return this._model.selectionStart=[C.start.x-1,C.start.y-1],this._model.selectionStartLength=(0,e.getRangeLength)(C,this._bufferService.cols),this._model.selectionEnd=void 0,!0;const x=this._getMouseBufferCoords(c);return!!x&&(this._selectWordAt(x,v),this._model.selectionEnd=void 0,!0)}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(c,v){this._model.clearSelection(),c=Math.max(c,0),v=Math.min(v,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,c],this._model.selectionEnd=[this._bufferService.cols,v],this.refresh(),this._onSelectionChange.fire()}_handleTrim(c){this._model.handleTrim(c)&&this.refresh()}_getMouseBufferCoords(c){const v=this._mouseService.getCoords(c,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(v)return v[0]--,v[1]--,v[1]+=this._bufferService.buffer.ydisp,v}_getMouseEventScrollAmount(c){let v=(0,n.getCoordsRelativeToElement)(this._coreBrowserService.window,c,this._screenElement)[1];const C=this._renderService.dimensions.css.canvas.height;return v>=0&&v<=C?0:(v>C&&(v-=C),v=Math.min(Math.max(v,-50),50),v/=50,v/Math.abs(v)+Math.round(14*v))}shouldForceSelection(c){return r.isMac?c.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:c.shiftKey}handleMouseDown(c){if(this._mouseDownTimeStamp=c.timeStamp,(c.button!==2||!this.hasSelection)&&c.button===0){if(!this._enabled){if(!this.shouldForceSelection(c))return;c.stopPropagation()}c.preventDefault(),this._dragScrollAmount=0,this._enabled&&c.shiftKey?this._handleIncrementalClick(c):c.detail===1?this._handleSingleClick(c):c.detail===2?this._handleDoubleClick(c):c.detail===3&&this._handleTripleClick(c),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener("mouseup",this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval(()=>this._dragScroll(),50)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener("mouseup",this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(c){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(c))}_handleSingleClick(c){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(c)?3:0,this._model.selectionStart=this._getMouseBufferCoords(c),!this._model.selectionStart)return;this._model.selectionEnd=void 0;const v=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);v&&v.length!==this._model.selectionStart[0]&&v.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(c){this._selectWordAtCursor(c,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(c){const v=this._getMouseBufferCoords(c);v&&(this._activeSelectionMode=2,this._selectLineAt(v[1]))}shouldColumnSelect(c){return c.altKey&&!(r.isMac&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(c){if(c.stopImmediatePropagation(),!this._model.selectionStart)return;const v=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(c),!this._model.selectionEnd)return void this.refresh(!0);this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(c),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));const C=this._bufferService.buffer;if(this._model.selectionEnd[1]<C.lines.length){const x=C.lines.get(this._model.selectionEnd[1]);x&&x.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]<this._bufferService.cols&&this._model.selectionEnd[0]++}v&&v[0]===this._model.selectionEnd[0]&&v[1]===this._model.selectionEnd[1]||this.refresh(!0)}_dragScroll(){if(this._model.selectionEnd&&this._model.selectionStart&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});const c=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(c.ydisp+this._bufferService.rows,c.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=c.ydisp),this.refresh()}}_handleMouseUp(c){const v=c.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&v<500&&c.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){const C=this._mouseService.getCoords(c,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(C&&C[0]!==void 0&&C[1]!==void 0){const x=(0,f.moveToCellSequence)(C[0]-1,C[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent(x,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){const c=this._model.finalSelectionStart,v=this._model.finalSelectionEnd,C=!(!c||!v||c[0]===v[0]&&c[1]===v[1]);C?c&&v&&(this._oldSelectionStart&&this._oldSelectionEnd&&c[0]===this._oldSelectionStart[0]&&c[1]===this._oldSelectionStart[1]&&v[0]===this._oldSelectionEnd[0]&&v[1]===this._oldSelectionEnd[1]||this._fireOnSelectionChange(c,v,C)):this._oldHasSelection&&this._fireOnSelectionChange(c,v,C)}_fireOnSelectionChange(c,v,C){this._oldSelectionStart=c,this._oldSelectionEnd=v,this._oldHasSelection=C,this._onSelectionChange.fire()}_handleBufferActivate(c){this.clearSelection(),this._trimListener.dispose(),this._trimListener=c.activeBuffer.lines.onTrim(v=>this._handleTrim(v))}_convertViewportColToCharacterIndex(c,v){let C=v;for(let x=0;v>=x;x++){const k=c.loadCell(x,this._workCell).getChars().length;this._workCell.getWidth()===0?C--:k>1&&v!==x&&(C+=k-1)}return C}setSelection(c,v,C){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[c,v],this._model.selectionStartLength=C,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(c){this._isClickInSelection(c)||(this._selectWordAtCursor(c,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(c,v,C=!0,x=!0){if(c[0]>=this._bufferService.cols)return;const k=this._bufferService.buffer,w=k.lines.get(c[1]);if(!w)return;const R=k.translateBufferLineToString(c[1],!1);let B=this._convertViewportColToCharacterIndex(w,c[0]),P=B;const W=c[0]-B;let M=0,b=0,S=0,E=0;if(R.charAt(B)===" "){for(;B>0&&R.charAt(B-1)===" ";)B--;for(;P<R.length&&R.charAt(P+1)===" ";)P++}else{let H=c[0],U=c[0];w.getWidth(H)===0&&(M++,H--),w.getWidth(U)===2&&(b++,U++);const z=w.getString(U).length;for(z>1&&(E+=z-1,P+=z-1);H>0&&B>0&&!this._isCharWordSeparator(w.loadCell(H-1,this._workCell));){w.loadCell(H-1,this._workCell);const L=this._workCell.getChars().length;this._workCell.getWidth()===0?(M++,H--):L>1&&(S+=L-1,B-=L-1),B--,H--}for(;U<w.length&&P+1<R.length&&!this._isCharWordSeparator(w.loadCell(U+1,this._workCell));){w.loadCell(U+1,this._workCell);const L=this._workCell.getChars().length;this._workCell.getWidth()===2?(b++,U++):L>1&&(E+=L-1,P+=L-1),P++,U++}}P++;let T=B+W-M+S,O=Math.min(this._bufferService.cols,P-B+M+b-S-E);if(v||R.slice(B,P).trim()!==""){if(C&&T===0&&w.getCodePoint(0)!==32){const H=k.lines.get(c[1]-1);if(H&&w.isWrapped&&H.getCodePoint(this._bufferService.cols-1)!==32){const U=this._getWordAt([this._bufferService.cols-1,c[1]-1],!1,!0,!1);if(U){const z=this._bufferService.cols-U.start;T-=z,O+=z}}}if(x&&T+O===this._bufferService.cols&&w.getCodePoint(this._bufferService.cols-1)!==32){const H=k.lines.get(c[1]+1);if(H!=null&&H.isWrapped&&H.getCodePoint(0)!==32){const U=this._getWordAt([0,c[1]+1],!1,!1,!0);U&&(O+=U.length)}}return{start:T,length:O}}}_selectWordAt(c,v){const C=this._getWordAt(c,v);if(C){for(;C.start<0;)C.start+=this._bufferService.cols,c[1]--;this._model.selectionStart=[C.start,c[1]],this._model.selectionStartLength=C.length}}_selectToWordAt(c){const v=this._getWordAt(c,!0);if(v){let C=c[1];for(;v.start<0;)v.start+=this._bufferService.cols,C--;if(!this._model.areSelectionValuesReversed())for(;v.start+v.length>this._bufferService.cols;)v.length-=this._bufferService.cols,C++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?v.start:v.start+v.length,C]}}_isCharWordSeparator(c){return c.getWidth()!==0&&this._optionsService.rawOptions.wordSeparator.indexOf(c.getChars())>=0}_selectLineAt(c){const v=this._bufferService.buffer.getWrappedRangeForLine(c),C={start:{x:0,y:v.first},end:{x:this._bufferService.cols-1,y:v.last}};this._model.selectionStart=[0,v.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=(0,e.getRangeLength)(C,this._bufferService.cols)}};i.SelectionService=m=h([d(3,a.IBufferService),d(4,a.ICoreService),d(5,g.IMouseService),d(6,a.IOptionsService),d(7,g.IRenderService),d(8,g.ICoreBrowserService)],m)},4725:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ILinkProviderService=i.IThemeService=i.ICharacterJoinerService=i.ISelectionService=i.IRenderService=i.IMouseService=i.ICoreBrowserService=i.ICharSizeService=void 0;const h=o(8343);i.ICharSizeService=(0,h.createDecorator)("CharSizeService"),i.ICoreBrowserService=(0,h.createDecorator)("CoreBrowserService"),i.IMouseService=(0,h.createDecorator)("MouseService"),i.IRenderService=(0,h.createDecorator)("RenderService"),i.ISelectionService=(0,h.createDecorator)("SelectionService"),i.ICharacterJoinerService=(0,h.createDecorator)("CharacterJoinerService"),i.IThemeService=(0,h.createDecorator)("ThemeService"),i.ILinkProviderService=(0,h.createDecorator)("LinkProviderService")},6731:function(A,i,o){var h=this&&this.__decorate||function(m,c,v,C){var x,k=arguments.length,w=k<3?c:C===null?C=Object.getOwnPropertyDescriptor(c,v):C;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")w=Reflect.decorate(m,c,v,C);else for(var R=m.length-1;R>=0;R--)(x=m[R])&&(w=(k<3?x(w):k>3?x(c,v,w):x(c,v))||w);return k>3&&w&&Object.defineProperty(c,v,w),w},d=this&&this.__param||function(m,c){return function(v,C){c(v,C,m)}};Object.defineProperty(i,"__esModule",{value:!0}),i.ThemeService=i.DEFAULT_ANSI_COLORS=void 0;const n=o(7239),f=o(8055),u=o(8460),g=o(844),l=o(2585),s=f.css.toColor("#ffffff"),r=f.css.toColor("#000000"),e=f.css.toColor("#ffffff"),t=f.css.toColor("#000000"),a={css:"rgba(255, 255, 255, 0.3)",rgba:4294967117};i.DEFAULT_ANSI_COLORS=Object.freeze((()=>{const m=[f.css.toColor("#2e3436"),f.css.toColor("#cc0000"),f.css.toColor("#4e9a06"),f.css.toColor("#c4a000"),f.css.toColor("#3465a4"),f.css.toColor("#75507b"),f.css.toColor("#06989a"),f.css.toColor("#d3d7cf"),f.css.toColor("#555753"),f.css.toColor("#ef2929"),f.css.toColor("#8ae234"),f.css.toColor("#fce94f"),f.css.toColor("#729fcf"),f.css.toColor("#ad7fa8"),f.css.toColor("#34e2e2"),f.css.toColor("#eeeeec")],c=[0,95,135,175,215,255];for(let v=0;v<216;v++){const C=c[v/36%6|0],x=c[v/6%6|0],k=c[v%6];m.push({css:f.channels.toCss(C,x,k),rgba:f.channels.toRgba(C,x,k)})}for(let v=0;v<24;v++){const C=8+10*v;m.push({css:f.channels.toCss(C,C,C),rgba:f.channels.toRgba(C,C,C)})}return m})());let p=i.ThemeService=class extends g.Disposable{get colors(){return this._colors}constructor(m){super(),this._optionsService=m,this._contrastCache=new n.ColorContrastCache,this._halfContrastCache=new n.ColorContrastCache,this._onChangeColors=this.register(new u.EventEmitter),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:s,background:r,cursor:e,cursorAccent:t,selectionForeground:void 0,selectionBackgroundTransparent:a,selectionBackgroundOpaque:f.color.blend(r,a),selectionInactiveBackgroundTransparent:a,selectionInactiveBackgroundOpaque:f.color.blend(r,a),ansi:i.DEFAULT_ANSI_COLORS.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio",()=>this._contrastCache.clear())),this.register(this._optionsService.onSpecificOptionChange("theme",()=>this._setTheme(this._optionsService.rawOptions.theme)))}_setTheme(m={}){const c=this._colors;if(c.foreground=_(m.foreground,s),c.background=_(m.background,r),c.cursor=_(m.cursor,e),c.cursorAccent=_(m.cursorAccent,t),c.selectionBackgroundTransparent=_(m.selectionBackground,a),c.selectionBackgroundOpaque=f.color.blend(c.background,c.selectionBackgroundTransparent),c.selectionInactiveBackgroundTransparent=_(m.selectionInactiveBackground,c.selectionBackgroundTransparent),c.selectionInactiveBackgroundOpaque=f.color.blend(c.background,c.selectionInactiveBackgroundTransparent),c.selectionForeground=m.selectionForeground?_(m.selectionForeground,f.NULL_COLOR):void 0,c.selectionForeground===f.NULL_COLOR&&(c.selectionForeground=void 0),f.color.isOpaque(c.selectionBackgroundTransparent)&&(c.selectionBackgroundTransparent=f.color.opacity(c.selectionBackgroundTransparent,.3)),f.color.isOpaque(c.selectionInactiveBackgroundTransparent)&&(c.selectionInactiveBackgroundTransparent=f.color.opacity(c.selectionInactiveBackgroundTransparent,.3)),c.ansi=i.DEFAULT_ANSI_COLORS.slice(),c.ansi[0]=_(m.black,i.DEFAULT_ANSI_COLORS[0]),c.ansi[1]=_(m.red,i.DEFAULT_ANSI_COLORS[1]),c.ansi[2]=_(m.green,i.DEFAULT_ANSI_COLORS[2]),c.ansi[3]=_(m.yellow,i.DEFAULT_ANSI_COLORS[3]),c.ansi[4]=_(m.blue,i.DEFAULT_ANSI_COLORS[4]),c.ansi[5]=_(m.magenta,i.DEFAULT_ANSI_COLORS[5]),c.ansi[6]=_(m.cyan,i.DEFAULT_ANSI_COLORS[6]),c.ansi[7]=_(m.white,i.DEFAULT_ANSI_COLORS[7]),c.ansi[8]=_(m.brightBlack,i.DEFAULT_ANSI_COLORS[8]),c.ansi[9]=_(m.brightRed,i.DEFAULT_ANSI_COLORS[9]),c.ansi[10]=_(m.brightGreen,i.DEFAULT_ANSI_COLORS[10]),c.ansi[11]=_(m.brightYellow,i.DEFAULT_ANSI_COLORS[11]),c.ansi[12]=_(m.brightBlue,i.DEFAULT_ANSI_COLORS[12]),c.ansi[13]=_(m.brightMagenta,i.DEFAULT_ANSI_COLORS[13]),c.ansi[14]=_(m.brightCyan,i.DEFAULT_ANSI_COLORS[14]),c.ansi[15]=_(m.brightWhite,i.DEFAULT_ANSI_COLORS[15]),m.extendedAnsi){const v=Math.min(c.ansi.length-16,m.extendedAnsi.length);for(let C=0;C<v;C++)c.ansi[C+16]=_(m.extendedAnsi[C],i.DEFAULT_ANSI_COLORS[C+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(m){this._restoreColor(m),this._onChangeColors.fire(this.colors)}_restoreColor(m){if(m!==void 0)switch(m){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[m]=this._restoreColors.ansi[m]}else for(let c=0;c<this._restoreColors.ansi.length;++c)this._colors.ansi[c]=this._restoreColors.ansi[c]}modifyColors(m){m(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};function _(m,c){if(m!==void 0)try{return f.css.toColor(m)}catch{}return c}i.ThemeService=p=h([d(0,l.IOptionsService)],p)},6349:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.CircularList=void 0;const h=o(8460),d=o(844);class n extends d.Disposable{constructor(u){super(),this._maxLength=u,this.onDeleteEmitter=this.register(new h.EventEmitter),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this.register(new h.EventEmitter),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this.register(new h.EventEmitter),this.onTrim=this.onTrimEmitter.event,this._array=new Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(u){if(this._maxLength===u)return;const g=new Array(u);for(let l=0;l<Math.min(u,this.length);l++)g[l]=this._array[this._getCyclicIndex(l)];this._array=g,this._maxLength=u,this._startIndex=0}get length(){return this._length}set length(u){if(u>this._length)for(let g=this._length;g<u;g++)this._array[g]=void 0;this._length=u}get(u){return this._array[this._getCyclicIndex(u)]}set(u,g){this._array[this._getCyclicIndex(u)]=g}push(u){this._array[this._getCyclicIndex(this._length)]=u,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw new Error("Can only recycle when the buffer is full");return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(u,g,...l){if(g){for(let s=u;s<this._length-g;s++)this._array[this._getCyclicIndex(s)]=this._array[this._getCyclicIndex(s+g)];this._length-=g,this.onDeleteEmitter.fire({index:u,amount:g})}for(let s=this._length-1;s>=u;s--)this._array[this._getCyclicIndex(s+l.length)]=this._array[this._getCyclicIndex(s)];for(let s=0;s<l.length;s++)this._array[this._getCyclicIndex(u+s)]=l[s];if(l.length&&this.onInsertEmitter.fire({index:u,amount:l.length}),this._length+l.length>this._maxLength){const s=this._length+l.length-this._maxLength;this._startIndex+=s,this._length=this._maxLength,this.onTrimEmitter.fire(s)}else this._length+=l.length}trimStart(u){u>this._length&&(u=this._length),this._startIndex+=u,this._length-=u,this.onTrimEmitter.fire(u)}shiftElements(u,g,l){if(!(g<=0)){if(u<0||u>=this._length)throw new Error("start argument out of range");if(u+l<0)throw new Error("Cannot shift elements in list beyond index 0");if(l>0){for(let r=g-1;r>=0;r--)this.set(u+r+l,this.get(u+r));const s=u+g+l-this._length;if(s>0)for(this._length+=s;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let s=0;s<g;s++)this.set(u+s+l,this.get(u+s))}}_getCyclicIndex(u){return(this._startIndex+u)%this._maxLength}}i.CircularList=n},1439:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.clone=void 0,i.clone=function o(h,d=5){if(typeof h!="object")return h;const n=Array.isArray(h)?[]:{};for(const f in h)n[f]=d<=1?h[f]:h[f]&&o(h[f],d-1);return n}},8055:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.contrastRatio=i.toPaddedHex=i.rgba=i.rgb=i.css=i.color=i.channels=i.NULL_COLOR=void 0;let o=0,h=0,d=0,n=0;var f,u,g,l,s;function r(t){const a=t.toString(16);return a.length<2?"0"+a:a}function e(t,a){return t<a?(a+.05)/(t+.05):(t+.05)/(a+.05)}i.NULL_COLOR={css:"#00000000",rgba:0},function(t){t.toCss=function(a,p,_,m){return m!==void 0?`#${r(a)}${r(p)}${r(_)}${r(m)}`:`#${r(a)}${r(p)}${r(_)}`},t.toRgba=function(a,p,_,m=255){return(a<<24|p<<16|_<<8|m)>>>0},t.toColor=function(a,p,_,m){return{css:t.toCss(a,p,_,m),rgba:t.toRgba(a,p,_,m)}}}(f||(i.channels=f={})),function(t){function a(p,_){return n=Math.round(255*_),[o,h,d]=s.toChannels(p.rgba),{css:f.toCss(o,h,d,n),rgba:f.toRgba(o,h,d,n)}}t.blend=function(p,_){if(n=(255&_.rgba)/255,n===1)return{css:_.css,rgba:_.rgba};const m=_.rgba>>24&255,c=_.rgba>>16&255,v=_.rgba>>8&255,C=p.rgba>>24&255,x=p.rgba>>16&255,k=p.rgba>>8&255;return o=C+Math.round((m-C)*n),h=x+Math.round((c-x)*n),d=k+Math.round((v-k)*n),{css:f.toCss(o,h,d),rgba:f.toRgba(o,h,d)}},t.isOpaque=function(p){return(255&p.rgba)==255},t.ensureContrastRatio=function(p,_,m){const c=s.ensureContrastRatio(p.rgba,_.rgba,m);if(c)return f.toColor(c>>24&255,c>>16&255,c>>8&255)},t.opaque=function(p){const _=(255|p.rgba)>>>0;return[o,h,d]=s.toChannels(_),{css:f.toCss(o,h,d),rgba:_}},t.opacity=a,t.multiplyOpacity=function(p,_){return n=255&p.rgba,a(p,n*_/255)},t.toColorRGB=function(p){return[p.rgba>>24&255,p.rgba>>16&255,p.rgba>>8&255]}}(u||(i.color=u={})),function(t){let a,p;try{const _=document.createElement("canvas");_.width=1,_.height=1;const m=_.getContext("2d",{willReadFrequently:!0});m&&(a=m,a.globalCompositeOperation="copy",p=a.createLinearGradient(0,0,1,1))}catch{}t.toColor=function(_){if(_.match(/#[\da-f]{3,8}/i))switch(_.length){case 4:return o=parseInt(_.slice(1,2).repeat(2),16),h=parseInt(_.slice(2,3).repeat(2),16),d=parseInt(_.slice(3,4).repeat(2),16),f.toColor(o,h,d);case 5:return o=parseInt(_.slice(1,2).repeat(2),16),h=parseInt(_.slice(2,3).repeat(2),16),d=parseInt(_.slice(3,4).repeat(2),16),n=parseInt(_.slice(4,5).repeat(2),16),f.toColor(o,h,d,n);case 7:return{css:_,rgba:(parseInt(_.slice(1),16)<<8|255)>>>0};case 9:return{css:_,rgba:parseInt(_.slice(1),16)>>>0}}const m=_.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(m)return o=parseInt(m[1]),h=parseInt(m[2]),d=parseInt(m[3]),n=Math.round(255*(m[5]===void 0?1:parseFloat(m[5]))),f.toColor(o,h,d,n);if(!a||!p)throw new Error("css.toColor: Unsupported css format");if(a.fillStyle=p,a.fillStyle=_,typeof a.fillStyle!="string")throw new Error("css.toColor: Unsupported css format");if(a.fillRect(0,0,1,1),[o,h,d,n]=a.getImageData(0,0,1,1).data,n!==255)throw new Error("css.toColor: Unsupported css format");return{rgba:f.toRgba(o,h,d,n),css:_}}}(g||(i.css=g={})),function(t){function a(p,_,m){const c=p/255,v=_/255,C=m/255;return .2126*(c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4))+.7152*(v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4))+.0722*(C<=.03928?C/12.92:Math.pow((C+.055)/1.055,2.4))}t.relativeLuminance=function(p){return a(p>>16&255,p>>8&255,255&p)},t.relativeLuminance2=a}(l||(i.rgb=l={})),function(t){function a(_,m,c){const v=_>>24&255,C=_>>16&255,x=_>>8&255;let k=m>>24&255,w=m>>16&255,R=m>>8&255,B=e(l.relativeLuminance2(k,w,R),l.relativeLuminance2(v,C,x));for(;B<c&&(k>0||w>0||R>0);)k-=Math.max(0,Math.ceil(.1*k)),w-=Math.max(0,Math.ceil(.1*w)),R-=Math.max(0,Math.ceil(.1*R)),B=e(l.relativeLuminance2(k,w,R),l.relativeLuminance2(v,C,x));return(k<<24|w<<16|R<<8|255)>>>0}function p(_,m,c){const v=_>>24&255,C=_>>16&255,x=_>>8&255;let k=m>>24&255,w=m>>16&255,R=m>>8&255,B=e(l.relativeLuminance2(k,w,R),l.relativeLuminance2(v,C,x));for(;B<c&&(k<255||w<255||R<255);)k=Math.min(255,k+Math.ceil(.1*(255-k))),w=Math.min(255,w+Math.ceil(.1*(255-w))),R=Math.min(255,R+Math.ceil(.1*(255-R))),B=e(l.relativeLuminance2(k,w,R),l.relativeLuminance2(v,C,x));return(k<<24|w<<16|R<<8|255)>>>0}t.blend=function(_,m){if(n=(255&m)/255,n===1)return m;const c=m>>24&255,v=m>>16&255,C=m>>8&255,x=_>>24&255,k=_>>16&255,w=_>>8&255;return o=x+Math.round((c-x)*n),h=k+Math.round((v-k)*n),d=w+Math.round((C-w)*n),f.toRgba(o,h,d)},t.ensureContrastRatio=function(_,m,c){const v=l.relativeLuminance(_>>8),C=l.relativeLuminance(m>>8);if(e(v,C)<c){if(C<v){const w=a(_,m,c),R=e(v,l.relativeLuminance(w>>8));if(R<c){const B=p(_,m,c);return R>e(v,l.relativeLuminance(B>>8))?w:B}return w}const x=p(_,m,c),k=e(v,l.relativeLuminance(x>>8));if(k<c){const w=a(_,m,c);return k>e(v,l.relativeLuminance(w>>8))?x:w}return x}},t.reduceLuminance=a,t.increaseLuminance=p,t.toChannels=function(_){return[_>>24&255,_>>16&255,_>>8&255,255&_]}}(s||(i.rgba=s={})),i.toPaddedHex=r,i.contrastRatio=e},8969:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.CoreTerminal=void 0;const h=o(844),d=o(2585),n=o(4348),f=o(7866),u=o(744),g=o(7302),l=o(6975),s=o(8460),r=o(1753),e=o(1480),t=o(7994),a=o(9282),p=o(5435),_=o(5981),m=o(2660);let c=!1;class v extends h.Disposable{get onScroll(){return this._onScrollApi||(this._onScrollApi=this.register(new s.EventEmitter),this._onScroll.event(x=>{var k;(k=this._onScrollApi)==null||k.fire(x.position)})),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options(x){for(const k in x)this.optionsService.options[k]=x[k]}constructor(x){super(),this._windowsWrappingHeuristics=this.register(new h.MutableDisposable),this._onBinary=this.register(new s.EventEmitter),this.onBinary=this._onBinary.event,this._onData=this.register(new s.EventEmitter),this.onData=this._onData.event,this._onLineFeed=this.register(new s.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onResize=this.register(new s.EventEmitter),this.onResize=this._onResize.event,this._onWriteParsed=this.register(new s.EventEmitter),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this.register(new s.EventEmitter),this._instantiationService=new n.InstantiationService,this.optionsService=this.register(new g.OptionsService(x)),this._instantiationService.setService(d.IOptionsService,this.optionsService),this._bufferService=this.register(this._instantiationService.createInstance(u.BufferService)),this._instantiationService.setService(d.IBufferService,this._bufferService),this._logService=this.register(this._instantiationService.createInstance(f.LogService)),this._instantiationService.setService(d.ILogService,this._logService),this.coreService=this.register(this._instantiationService.createInstance(l.CoreService)),this._instantiationService.setService(d.ICoreService,this.coreService),this.coreMouseService=this.register(this._instantiationService.createInstance(r.CoreMouseService)),this._instantiationService.setService(d.ICoreMouseService,this.coreMouseService),this.unicodeService=this.register(this._instantiationService.createInstance(e.UnicodeService)),this._instantiationService.setService(d.IUnicodeService,this.unicodeService),this._charsetService=this._instantiationService.createInstance(t.CharsetService),this._instantiationService.setService(d.ICharsetService,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(m.OscLinkService),this._instantiationService.setService(d.IOscLinkService,this._oscLinkService),this._inputHandler=this.register(new p.InputHandler(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this.register((0,s.forwardEvent)(this._inputHandler.onLineFeed,this._onLineFeed)),this.register(this._inputHandler),this.register((0,s.forwardEvent)(this._bufferService.onResize,this._onResize)),this.register((0,s.forwardEvent)(this.coreService.onData,this._onData)),this.register((0,s.forwardEvent)(this.coreService.onBinary,this._onBinary)),this.register(this.coreService.onRequestScrollToBottom(()=>this.scrollToBottom())),this.register(this.coreService.onUserInput(()=>this._writeBuffer.handleUserInput())),this.register(this.optionsService.onMultipleOptionChange(["windowsMode","windowsPty"],()=>this._handleWindowsPtyOptionChange())),this.register(this._bufferService.onScroll(k=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this.register(this._inputHandler.onScroll(k=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this._writeBuffer=this.register(new _.WriteBuffer((k,w)=>this._inputHandler.parse(k,w))),this.register((0,s.forwardEvent)(this._writeBuffer.onWriteParsed,this._onWriteParsed))}write(x,k){this._writeBuffer.write(x,k)}writeSync(x,k){this._logService.logLevel<=d.LogLevelEnum.WARN&&!c&&(this._logService.warn("writeSync is unreliable and will be removed soon."),c=!0),this._writeBuffer.writeSync(x,k)}input(x,k=!0){this.coreService.triggerDataEvent(x,k)}resize(x,k){isNaN(x)||isNaN(k)||(x=Math.max(x,u.MINIMUM_COLS),k=Math.max(k,u.MINIMUM_ROWS),this._bufferService.resize(x,k))}scroll(x,k=!1){this._bufferService.scroll(x,k)}scrollLines(x,k,w){this._bufferService.scrollLines(x,k,w)}scrollPages(x){this.scrollLines(x*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(x){const k=x-this._bufferService.buffer.ydisp;k!==0&&this.scrollLines(k)}registerEscHandler(x,k){return this._inputHandler.registerEscHandler(x,k)}registerDcsHandler(x,k){return this._inputHandler.registerDcsHandler(x,k)}registerCsiHandler(x,k){return this._inputHandler.registerCsiHandler(x,k)}registerOscHandler(x,k){return this._inputHandler.registerOscHandler(x,k)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let x=!1;const k=this.optionsService.rawOptions.windowsPty;k&&k.buildNumber!==void 0&&k.buildNumber!==void 0?x=k.backend==="conpty"&&k.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&(x=!0),x?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){const x=[];x.push(this.onLineFeed(a.updateWindowsModeWrappedState.bind(null,this._bufferService))),x.push(this.registerCsiHandler({final:"H"},()=>((0,a.updateWindowsModeWrappedState)(this._bufferService),!1))),this._windowsWrappingHeuristics.value=(0,h.toDisposable)(()=>{for(const k of x)k.dispose()})}}}i.CoreTerminal=v},8460:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.runAndSubscribe=i.forwardEvent=i.EventEmitter=void 0,i.EventEmitter=class{constructor(){this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=o=>(this._listeners.push(o),{dispose:()=>{if(!this._disposed){for(let h=0;h<this._listeners.length;h++)if(this._listeners[h]===o)return void this._listeners.splice(h,1)}}})),this._event}fire(o,h){const d=[];for(let n=0;n<this._listeners.length;n++)d.push(this._listeners[n]);for(let n=0;n<d.length;n++)d[n].call(void 0,o,h)}dispose(){this.clearListeners(),this._disposed=!0}clearListeners(){this._listeners&&(this._listeners.length=0)}},i.forwardEvent=function(o,h){return o(d=>h.fire(d))},i.runAndSubscribe=function(o,h){return h(void 0),o(d=>h(d))}},5435:function(A,i,o){var h=this&&this.__decorate||function(M,b,S,E){var T,O=arguments.length,H=O<3?b:E===null?E=Object.getOwnPropertyDescriptor(b,S):E;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")H=Reflect.decorate(M,b,S,E);else for(var U=M.length-1;U>=0;U--)(T=M[U])&&(H=(O<3?T(H):O>3?T(b,S,H):T(b,S))||H);return O>3&&H&&Object.defineProperty(b,S,H),H},d=this&&this.__param||function(M,b){return function(S,E){b(S,E,M)}};Object.defineProperty(i,"__esModule",{value:!0}),i.InputHandler=i.WindowsOptionsReportType=void 0;const n=o(2584),f=o(7116),u=o(2015),g=o(844),l=o(482),s=o(8437),r=o(8460),e=o(643),t=o(511),a=o(3734),p=o(2585),_=o(1480),m=o(6242),c=o(6351),v=o(5941),C={"(":0,")":1,"*":2,"+":3,"-":1,".":2},x=131072;function k(M,b){if(M>24)return b.setWinLines||!1;switch(M){case 1:return!!b.restoreWin;case 2:return!!b.minimizeWin;case 3:return!!b.setWinPosition;case 4:return!!b.setWinSizePixels;case 5:return!!b.raiseWin;case 6:return!!b.lowerWin;case 7:return!!b.refreshWin;case 8:return!!b.setWinSizeChars;case 9:return!!b.maximizeWin;case 10:return!!b.fullscreenWin;case 11:return!!b.getWinState;case 13:return!!b.getWinPosition;case 14:return!!b.getWinSizePixels;case 15:return!!b.getScreenSizePixels;case 16:return!!b.getCellSizePixels;case 18:return!!b.getWinSizeChars;case 19:return!!b.getScreenSizeChars;case 20:return!!b.getIconTitle;case 21:return!!b.getWinTitle;case 22:return!!b.pushTitle;case 23:return!!b.popTitle;case 24:return!!b.setWinLines}return!1}var w;(function(M){M[M.GET_WIN_SIZE_PIXELS=0]="GET_WIN_SIZE_PIXELS",M[M.GET_CELL_SIZE_PIXELS=1]="GET_CELL_SIZE_PIXELS"})(w||(i.WindowsOptionsReportType=w={}));let R=0;class B extends g.Disposable{getAttrData(){return this._curAttrData}constructor(b,S,E,T,O,H,U,z,L=new u.EscapeSequenceParser){super(),this._bufferService=b,this._charsetService=S,this._coreService=E,this._logService=T,this._optionsService=O,this._oscLinkService=H,this._coreMouseService=U,this._unicodeService=z,this._parser=L,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new l.StringToUtf32,this._utf8Decoder=new l.Utf8ToUtf32,this._workCell=new t.CellData,this._windowTitle="",this._iconName="",this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=s.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=s.DEFAULT_ATTR_DATA.clone(),this._onRequestBell=this.register(new r.EventEmitter),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this.register(new r.EventEmitter),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this.register(new r.EventEmitter),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this.register(new r.EventEmitter),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this.register(new r.EventEmitter),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this.register(new r.EventEmitter),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this.register(new r.EventEmitter),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this.register(new r.EventEmitter),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this.register(new r.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this.register(new r.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onScroll=this.register(new r.EventEmitter),this.onScroll=this._onScroll.event,this._onTitleChange=this.register(new r.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onColor=this.register(new r.EventEmitter),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this.register(this._parser),this._dirtyRowTracker=new P(this._bufferService),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate(y=>this._activeBuffer=y.activeBuffer)),this._parser.setCsiHandlerFallback((y,I)=>{this._logService.debug("Unknown CSI code: ",{identifier:this._parser.identToString(y),params:I.toArray()})}),this._parser.setEscHandlerFallback(y=>{this._logService.debug("Unknown ESC code: ",{identifier:this._parser.identToString(y)})}),this._parser.setExecuteHandlerFallback(y=>{this._logService.debug("Unknown EXECUTE code: ",{code:y})}),this._parser.setOscHandlerFallback((y,I,D)=>{this._logService.debug("Unknown OSC code: ",{identifier:y,action:I,data:D})}),this._parser.setDcsHandlerFallback((y,I,D)=>{I==="HOOK"&&(D=D.toArray()),this._logService.debug("Unknown DCS code: ",{identifier:this._parser.identToString(y),action:I,payload:D})}),this._parser.setPrintHandler((y,I,D)=>this.print(y,I,D)),this._parser.registerCsiHandler({final:"@"},y=>this.insertChars(y)),this._parser.registerCsiHandler({intermediates:" ",final:"@"},y=>this.scrollLeft(y)),this._parser.registerCsiHandler({final:"A"},y=>this.cursorUp(y)),this._parser.registerCsiHandler({intermediates:" ",final:"A"},y=>this.scrollRight(y)),this._parser.registerCsiHandler({final:"B"},y=>this.cursorDown(y)),this._parser.registerCsiHandler({final:"C"},y=>this.cursorForward(y)),this._parser.registerCsiHandler({final:"D"},y=>this.cursorBackward(y)),this._parser.registerCsiHandler({final:"E"},y=>this.cursorNextLine(y)),this._parser.registerCsiHandler({final:"F"},y=>this.cursorPrecedingLine(y)),this._parser.registerCsiHandler({final:"G"},y=>this.cursorCharAbsolute(y)),this._parser.registerCsiHandler({final:"H"},y=>this.cursorPosition(y)),this._parser.registerCsiHandler({final:"I"},y=>this.cursorForwardTab(y)),this._parser.registerCsiHandler({final:"J"},y=>this.eraseInDisplay(y,!1)),this._parser.registerCsiHandler({prefix:"?",final:"J"},y=>this.eraseInDisplay(y,!0)),this._parser.registerCsiHandler({final:"K"},y=>this.eraseInLine(y,!1)),this._parser.registerCsiHandler({prefix:"?",final:"K"},y=>this.eraseInLine(y,!0)),this._parser.registerCsiHandler({final:"L"},y=>this.insertLines(y)),this._parser.registerCsiHandler({final:"M"},y=>this.deleteLines(y)),this._parser.registerCsiHandler({final:"P"},y=>this.deleteChars(y)),this._parser.registerCsiHandler({final:"S"},y=>this.scrollUp(y)),this._parser.registerCsiHandler({final:"T"},y=>this.scrollDown(y)),this._parser.registerCsiHandler({final:"X"},y=>this.eraseChars(y)),this._parser.registerCsiHandler({final:"Z"},y=>this.cursorBackwardTab(y)),this._parser.registerCsiHandler({final:"`"},y=>this.charPosAbsolute(y)),this._parser.registerCsiHandler({final:"a"},y=>this.hPositionRelative(y)),this._parser.registerCsiHandler({final:"b"},y=>this.repeatPrecedingCharacter(y)),this._parser.registerCsiHandler({final:"c"},y=>this.sendDeviceAttributesPrimary(y)),this._parser.registerCsiHandler({prefix:">",final:"c"},y=>this.sendDeviceAttributesSecondary(y)),this._parser.registerCsiHandler({final:"d"},y=>this.linePosAbsolute(y)),this._parser.registerCsiHandler({final:"e"},y=>this.vPositionRelative(y)),this._parser.registerCsiHandler({final:"f"},y=>this.hVPosition(y)),this._parser.registerCsiHandler({final:"g"},y=>this.tabClear(y)),this._parser.registerCsiHandler({final:"h"},y=>this.setMode(y)),this._parser.registerCsiHandler({prefix:"?",final:"h"},y=>this.setModePrivate(y)),this._parser.registerCsiHandler({final:"l"},y=>this.resetMode(y)),this._parser.registerCsiHandler({prefix:"?",final:"l"},y=>this.resetModePrivate(y)),this._parser.registerCsiHandler({final:"m"},y=>this.charAttributes(y)),this._parser.registerCsiHandler({final:"n"},y=>this.deviceStatus(y)),this._parser.registerCsiHandler({prefix:"?",final:"n"},y=>this.deviceStatusPrivate(y)),this._parser.registerCsiHandler({intermediates:"!",final:"p"},y=>this.softReset(y)),this._parser.registerCsiHandler({intermediates:" ",final:"q"},y=>this.setCursorStyle(y)),this._parser.registerCsiHandler({final:"r"},y=>this.setScrollRegion(y)),this._parser.registerCsiHandler({final:"s"},y=>this.saveCursor(y)),this._parser.registerCsiHandler({final:"t"},y=>this.windowOptions(y)),this._parser.registerCsiHandler({final:"u"},y=>this.restoreCursor(y)),this._parser.registerCsiHandler({intermediates:"'",final:"}"},y=>this.insertColumns(y)),this._parser.registerCsiHandler({intermediates:"'",final:"~"},y=>this.deleteColumns(y)),this._parser.registerCsiHandler({intermediates:'"',final:"q"},y=>this.selectProtected(y)),this._parser.registerCsiHandler({intermediates:"$",final:"p"},y=>this.requestMode(y,!0)),this._parser.registerCsiHandler({prefix:"?",intermediates:"$",final:"p"},y=>this.requestMode(y,!1)),this._parser.setExecuteHandler(n.C0.BEL,()=>this.bell()),this._parser.setExecuteHandler(n.C0.LF,()=>this.lineFeed()),this._parser.setExecuteHandler(n.C0.VT,()=>this.lineFeed()),this._parser.setExecuteHandler(n.C0.FF,()=>this.lineFeed()),this._parser.setExecuteHandler(n.C0.CR,()=>this.carriageReturn()),this._parser.setExecuteHandler(n.C0.BS,()=>this.backspace()),this._parser.setExecuteHandler(n.C0.HT,()=>this.tab()),this._parser.setExecuteHandler(n.C0.SO,()=>this.shiftOut()),this._parser.setExecuteHandler(n.C0.SI,()=>this.shiftIn()),this._parser.setExecuteHandler(n.C1.IND,()=>this.index()),this._parser.setExecuteHandler(n.C1.NEL,()=>this.nextLine()),this._parser.setExecuteHandler(n.C1.HTS,()=>this.tabSet()),this._parser.registerOscHandler(0,new m.OscHandler(y=>(this.setTitle(y),this.setIconName(y),!0))),this._parser.registerOscHandler(1,new m.OscHandler(y=>this.setIconName(y))),this._parser.registerOscHandler(2,new m.OscHandler(y=>this.setTitle(y))),this._parser.registerOscHandler(4,new m.OscHandler(y=>this.setOrReportIndexedColor(y))),this._parser.registerOscHandler(8,new m.OscHandler(y=>this.setHyperlink(y))),this._parser.registerOscHandler(10,new m.OscHandler(y=>this.setOrReportFgColor(y))),this._parser.registerOscHandler(11,new m.OscHandler(y=>this.setOrReportBgColor(y))),this._parser.registerOscHandler(12,new m.OscHandler(y=>this.setOrReportCursorColor(y))),this._parser.registerOscHandler(104,new m.OscHandler(y=>this.restoreIndexedColor(y))),this._parser.registerOscHandler(110,new m.OscHandler(y=>this.restoreFgColor(y))),this._parser.registerOscHandler(111,new m.OscHandler(y=>this.restoreBgColor(y))),this._parser.registerOscHandler(112,new m.OscHandler(y=>this.restoreCursorColor(y))),this._parser.registerEscHandler({final:"7"},()=>this.saveCursor()),this._parser.registerEscHandler({final:"8"},()=>this.restoreCursor()),this._parser.registerEscHandler({final:"D"},()=>this.index()),this._parser.registerEscHandler({final:"E"},()=>this.nextLine()),this._parser.registerEscHandler({final:"H"},()=>this.tabSet()),this._parser.registerEscHandler({final:"M"},()=>this.reverseIndex()),this._parser.registerEscHandler({final:"="},()=>this.keypadApplicationMode()),this._parser.registerEscHandler({final:">"},()=>this.keypadNumericMode()),this._parser.registerEscHandler({final:"c"},()=>this.fullReset()),this._parser.registerEscHandler({final:"n"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"o"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"|"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"}"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"~"},()=>this.setgLevel(1)),this._parser.registerEscHandler({intermediates:"%",final:"@"},()=>this.selectDefaultCharset()),this._parser.registerEscHandler({intermediates:"%",final:"G"},()=>this.selectDefaultCharset());for(const y in f.CHARSETS)this._parser.registerEscHandler({intermediates:"(",final:y},()=>this.selectCharset("("+y)),this._parser.registerEscHandler({intermediates:")",final:y},()=>this.selectCharset(")"+y)),this._parser.registerEscHandler({intermediates:"*",final:y},()=>this.selectCharset("*"+y)),this._parser.registerEscHandler({intermediates:"+",final:y},()=>this.selectCharset("+"+y)),this._parser.registerEscHandler({intermediates:"-",final:y},()=>this.selectCharset("-"+y)),this._parser.registerEscHandler({intermediates:".",final:y},()=>this.selectCharset("."+y)),this._parser.registerEscHandler({intermediates:"/",final:y},()=>this.selectCharset("/"+y));this._parser.registerEscHandler({intermediates:"#",final:"8"},()=>this.screenAlignmentPattern()),this._parser.setErrorHandler(y=>(this._logService.error("Parsing error: ",y),y)),this._parser.registerDcsHandler({intermediates:"$",final:"q"},new c.DcsHandler((y,I)=>this.requestStatusString(y,I)))}_preserveStack(b,S,E,T){this._parseStack.paused=!0,this._parseStack.cursorStartX=b,this._parseStack.cursorStartY=S,this._parseStack.decodedLength=E,this._parseStack.position=T}_logSlowResolvingAsync(b){this._logService.logLevel<=p.LogLevelEnum.WARN&&Promise.race([b,new Promise((S,E)=>setTimeout(()=>E("#SLOW_TIMEOUT"),5e3))]).catch(S=>{if(S!=="#SLOW_TIMEOUT")throw S;console.warn("async parser handler taking longer than 5000 ms")})}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(b,S){let E,T=this._activeBuffer.x,O=this._activeBuffer.y,H=0;const U=this._parseStack.paused;if(U){if(E=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,S))return this._logSlowResolvingAsync(E),E;T=this._parseStack.cursorStartX,O=this._parseStack.cursorStartY,this._parseStack.paused=!1,b.length>x&&(H=this._parseStack.position+x)}if(this._logService.logLevel<=p.LogLevelEnum.DEBUG&&this._logService.debug("parsing data"+(typeof b=="string"?` "${b}"`:` "${Array.prototype.map.call(b,y=>String.fromCharCode(y)).join("")}"`),typeof b=="string"?b.split("").map(y=>y.charCodeAt(0)):b),this._parseBuffer.length<b.length&&this._parseBuffer.length<x&&(this._parseBuffer=new Uint32Array(Math.min(b.length,x))),U||this._dirtyRowTracker.clearRange(),b.length>x)for(let y=H;y<b.length;y+=x){const I=y+x<b.length?y+x:b.length,D=typeof b=="string"?this._stringDecoder.decode(b.substring(y,I),this._parseBuffer):this._utf8Decoder.decode(b.subarray(y,I),this._parseBuffer);if(E=this._parser.parse(this._parseBuffer,D))return this._preserveStack(T,O,D,y),this._logSlowResolvingAsync(E),E}else if(!U){const y=typeof b=="string"?this._stringDecoder.decode(b,this._parseBuffer):this._utf8Decoder.decode(b,this._parseBuffer);if(E=this._parser.parse(this._parseBuffer,y))return this._preserveStack(T,O,y,0),this._logSlowResolvingAsync(E),E}this._activeBuffer.x===T&&this._activeBuffer.y===O||this._onCursorMove.fire();const z=this._dirtyRowTracker.end+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp),L=this._dirtyRowTracker.start+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp);L<this._bufferService.rows&&this._onRequestRefreshRows.fire(Math.min(L,this._bufferService.rows-1),Math.min(z,this._bufferService.rows-1))}print(b,S,E){let T,O;const H=this._charsetService.charset,U=this._optionsService.rawOptions.screenReaderMode,z=this._bufferService.cols,L=this._coreService.decPrivateModes.wraparound,y=this._coreService.modes.insertMode,I=this._curAttrData;let D=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&E-S>0&&D.getWidth(this._activeBuffer.x-1)===2&&D.setCellFromCodepoint(this._activeBuffer.x-1,0,1,I);let N=this._parser.precedingJoinState;for(let F=S;F<E;++F){if(T=b[F],T<127&&H){const te=H[String.fromCharCode(T)];te&&(T=te.charCodeAt(0))}const G=this._unicodeService.charProperties(T,N);O=_.UnicodeService.extractWidth(G);const X=_.UnicodeService.extractShouldJoin(G),J=X?_.UnicodeService.extractWidth(N):0;if(N=G,U&&this._onA11yChar.fire((0,l.stringFromCodePoint)(T)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),this._activeBuffer.x+O-J>z){if(L){const te=D;let j=this._activeBuffer.x-J;for(this._activeBuffer.x=J,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),D=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y),J>0&&D instanceof s.BufferLine&&D.copyCellsFrom(te,j,0,J,!1);j<z;)te.setCellFromCodepoint(j++,0,1,I)}else if(this._activeBuffer.x=z-1,O===2)continue}if(X&&this._activeBuffer.x){const te=D.getWidth(this._activeBuffer.x-1)?1:2;D.addCodepointToCell(this._activeBuffer.x-te,T,O);for(let j=O-J;--j>=0;)D.setCellFromCodepoint(this._activeBuffer.x++,0,0,I)}else if(y&&(D.insertCells(this._activeBuffer.x,O-J,this._activeBuffer.getNullCell(I)),D.getWidth(z-1)===2&&D.setCellFromCodepoint(z-1,e.NULL_CELL_CODE,e.NULL_CELL_WIDTH,I)),D.setCellFromCodepoint(this._activeBuffer.x++,T,O,I),O>0)for(;--O;)D.setCellFromCodepoint(this._activeBuffer.x++,0,0,I)}this._parser.precedingJoinState=N,this._activeBuffer.x<z&&E-S>0&&D.getWidth(this._activeBuffer.x)===0&&!D.hasContent(this._activeBuffer.x)&&D.setCellFromCodepoint(this._activeBuffer.x,0,1,I),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(b,S){return b.final!=="t"||b.prefix||b.intermediates?this._parser.registerCsiHandler(b,S):this._parser.registerCsiHandler(b,E=>!k(E.params[0],this._optionsService.rawOptions.windowOptions)||S(E))}registerDcsHandler(b,S){return this._parser.registerDcsHandler(b,new c.DcsHandler(S))}registerEscHandler(b,S){return this._parser.registerEscHandler(b,S)}registerOscHandler(b,S){return this._parser.registerOscHandler(b,new m.OscHandler(S))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){var b;if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&((b=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y))!=null&&b.isWrapped)){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;const S=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);S.hasWidth(this._activeBuffer.x)&&!S.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;const b=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-b),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(b=this._bufferService.cols-1){this._activeBuffer.x=Math.min(b,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(b,S){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=b,this._activeBuffer.y=this._activeBuffer.scrollTop+S):(this._activeBuffer.x=b,this._activeBuffer.y=S),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(b,S){this._restrictCursor(),this._setCursor(this._activeBuffer.x+b,this._activeBuffer.y+S)}cursorUp(b){const S=this._activeBuffer.y-this._activeBuffer.scrollTop;return S>=0?this._moveCursor(0,-Math.min(S,b.params[0]||1)):this._moveCursor(0,-(b.params[0]||1)),!0}cursorDown(b){const S=this._activeBuffer.scrollBottom-this._activeBuffer.y;return S>=0?this._moveCursor(0,Math.min(S,b.params[0]||1)):this._moveCursor(0,b.params[0]||1),!0}cursorForward(b){return this._moveCursor(b.params[0]||1,0),!0}cursorBackward(b){return this._moveCursor(-(b.params[0]||1),0),!0}cursorNextLine(b){return this.cursorDown(b),this._activeBuffer.x=0,!0}cursorPrecedingLine(b){return this.cursorUp(b),this._activeBuffer.x=0,!0}cursorCharAbsolute(b){return this._setCursor((b.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(b){return this._setCursor(b.length>=2?(b.params[1]||1)-1:0,(b.params[0]||1)-1),!0}charPosAbsolute(b){return this._setCursor((b.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(b){return this._moveCursor(b.params[0]||1,0),!0}linePosAbsolute(b){return this._setCursor(this._activeBuffer.x,(b.params[0]||1)-1),!0}vPositionRelative(b){return this._moveCursor(0,b.params[0]||1),!0}hVPosition(b){return this.cursorPosition(b),!0}tabClear(b){const S=b.params[0];return S===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:S===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(b){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let S=b.params[0]||1;for(;S--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(b){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let S=b.params[0]||1;for(;S--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(b){const S=b.params[0];return S===1&&(this._curAttrData.bg|=536870912),S!==2&&S!==0||(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(b,S,E,T=!1,O=!1){const H=this._activeBuffer.lines.get(this._activeBuffer.ybase+b);H.replaceCells(S,E,this._activeBuffer.getNullCell(this._eraseAttrData()),O),T&&(H.isWrapped=!1)}_resetBufferLine(b,S=!1){const E=this._activeBuffer.lines.get(this._activeBuffer.ybase+b);E&&(E.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),S),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+b),E.isWrapped=!1)}eraseInDisplay(b,S=!1){let E;switch(this._restrictCursor(this._bufferService.cols),b.params[0]){case 0:for(E=this._activeBuffer.y,this._dirtyRowTracker.markDirty(E),this._eraseInBufferLine(E++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,S);E<this._bufferService.rows;E++)this._resetBufferLine(E,S);this._dirtyRowTracker.markDirty(E);break;case 1:for(E=this._activeBuffer.y,this._dirtyRowTracker.markDirty(E),this._eraseInBufferLine(E,0,this._activeBuffer.x+1,!0,S),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(E+1).isWrapped=!1);E--;)this._resetBufferLine(E,S);this._dirtyRowTracker.markDirty(0);break;case 2:for(E=this._bufferService.rows,this._dirtyRowTracker.markDirty(E-1);E--;)this._resetBufferLine(E,S);this._dirtyRowTracker.markDirty(0);break;case 3:const T=this._activeBuffer.lines.length-this._bufferService.rows;T>0&&(this._activeBuffer.lines.trimStart(T),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-T,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-T,0),this._onScroll.fire(0))}return!0}eraseInLine(b,S=!1){switch(this._restrictCursor(this._bufferService.cols),b.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,S);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,S);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,S)}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(b){this._restrictCursor();let S=b.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const E=this._activeBuffer.ybase+this._activeBuffer.y,T=this._bufferService.rows-1-this._activeBuffer.scrollBottom,O=this._bufferService.rows-1+this._activeBuffer.ybase-T+1;for(;S--;)this._activeBuffer.lines.splice(O-1,1),this._activeBuffer.lines.splice(E,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(b){this._restrictCursor();let S=b.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const E=this._activeBuffer.ybase+this._activeBuffer.y;let T;for(T=this._bufferService.rows-1-this._activeBuffer.scrollBottom,T=this._bufferService.rows-1+this._activeBuffer.ybase-T;S--;)this._activeBuffer.lines.splice(E,1),this._activeBuffer.lines.splice(T,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(b){this._restrictCursor();const S=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return S&&(S.insertCells(this._activeBuffer.x,b.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(b){this._restrictCursor();const S=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return S&&(S.deleteCells(this._activeBuffer.x,b.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(b){let S=b.params[0]||1;for(;S--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(b){let S=b.params[0]||1;for(;S--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(s.DEFAULT_ATTR_DATA));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(b){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const S=b.params[0]||1;for(let E=this._activeBuffer.scrollTop;E<=this._activeBuffer.scrollBottom;++E){const T=this._activeBuffer.lines.get(this._activeBuffer.ybase+E);T.deleteCells(0,S,this._activeBuffer.getNullCell(this._eraseAttrData())),T.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(b){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const S=b.params[0]||1;for(let E=this._activeBuffer.scrollTop;E<=this._activeBuffer.scrollBottom;++E){const T=this._activeBuffer.lines.get(this._activeBuffer.ybase+E);T.insertCells(0,S,this._activeBuffer.getNullCell(this._eraseAttrData())),T.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(b){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const S=b.params[0]||1;for(let E=this._activeBuffer.scrollTop;E<=this._activeBuffer.scrollBottom;++E){const T=this._activeBuffer.lines.get(this._activeBuffer.ybase+E);T.insertCells(this._activeBuffer.x,S,this._activeBuffer.getNullCell(this._eraseAttrData())),T.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(b){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const S=b.params[0]||1;for(let E=this._activeBuffer.scrollTop;E<=this._activeBuffer.scrollBottom;++E){const T=this._activeBuffer.lines.get(this._activeBuffer.ybase+E);T.deleteCells(this._activeBuffer.x,S,this._activeBuffer.getNullCell(this._eraseAttrData())),T.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(b){this._restrictCursor();const S=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return S&&(S.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(b.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(b){const S=this._parser.precedingJoinState;if(!S)return!0;const E=b.params[0]||1,T=_.UnicodeService.extractWidth(S),O=this._activeBuffer.x-T,H=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).getString(O),U=new Uint32Array(H.length*E);let z=0;for(let y=0;y<H.length;){const I=H.codePointAt(y)||0;U[z++]=I,y+=I>65535?2:1}let L=z;for(let y=1;y<E;++y)U.copyWithin(L,0,z),L+=z;return this.print(U,0,L),!0}sendDeviceAttributesPrimary(b){return b.params[0]>0||(this._is("xterm")||this._is("rxvt-unicode")||this._is("screen")?this._coreService.triggerDataEvent(n.C0.ESC+"[?1;2c"):this._is("linux")&&this._coreService.triggerDataEvent(n.C0.ESC+"[?6c")),!0}sendDeviceAttributesSecondary(b){return b.params[0]>0||(this._is("xterm")?this._coreService.triggerDataEvent(n.C0.ESC+"[>0;276;0c"):this._is("rxvt-unicode")?this._coreService.triggerDataEvent(n.C0.ESC+"[>85;95;0c"):this._is("linux")?this._coreService.triggerDataEvent(b.params[0]+"c"):this._is("screen")&&this._coreService.triggerDataEvent(n.C0.ESC+"[>83;40003;0c")),!0}_is(b){return(this._optionsService.rawOptions.termName+"").indexOf(b)===0}setMode(b){for(let S=0;S<b.length;S++)switch(b.params[S]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0}return!0}setModePrivate(b){for(let S=0;S<b.length;S++)switch(b.params[S]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),this._charsetService.setgCharset(1,f.DEFAULT_CHARSET),this._charsetService.setgCharset(2,f.DEFAULT_CHARSET),this._charsetService.setgCharset(3,f.DEFAULT_CHARSET);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol="X10";break;case 1e3:this._coreMouseService.activeProtocol="VT200";break;case 1002:this._coreMouseService.activeProtocol="DRAG";break;case 1003:this._coreMouseService.activeProtocol="ANY";break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug("DECSET 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="SGR";break;case 1015:this._logService.debug("DECSET 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="SGR_PIXELS";break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0}return!0}resetMode(b){for(let S=0;S<b.length;S++)switch(b.params[S]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1}return!0}resetModePrivate(b){for(let S=0;S<b.length;S++)switch(b.params[S]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol="NONE";break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug("DECRST 1005 not supported (see #2507)");break;case 1006:case 1016:this._coreMouseService.activeEncoding="DEFAULT";break;case 1015:this._logService.debug("DECRST 1015 not supported (see #2507)");break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),b.params[S]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1}return!0}requestMode(b,S){const E=this._coreService.decPrivateModes,{activeProtocol:T,activeEncoding:O}=this._coreMouseService,H=this._coreService,{buffers:U,cols:z}=this._bufferService,{active:L,alt:y}=U,I=this._optionsService.rawOptions,D=X=>X?1:2,N=b.params[0];return F=N,G=S?N===2?4:N===4?D(H.modes.insertMode):N===12?3:N===20?D(I.convertEol):0:N===1?D(E.applicationCursorKeys):N===3?I.windowOptions.setWinLines?z===80?2:z===132?1:0:0:N===6?D(E.origin):N===7?D(E.wraparound):N===8?3:N===9?D(T==="X10"):N===12?D(I.cursorBlink):N===25?D(!H.isCursorHidden):N===45?D(E.reverseWraparound):N===66?D(E.applicationKeypad):N===67?4:N===1e3?D(T==="VT200"):N===1002?D(T==="DRAG"):N===1003?D(T==="ANY"):N===1004?D(E.sendFocus):N===1005?4:N===1006?D(O==="SGR"):N===1015?4:N===1016?D(O==="SGR_PIXELS"):N===1048?1:N===47||N===1047||N===1049?D(L===y):N===2004?D(E.bracketedPasteMode):0,H.triggerDataEvent(`${n.C0.ESC}[${S?"":"?"}${F};${G}$y`),!0;var F,G}_updateAttrColor(b,S,E,T,O){return S===2?(b|=50331648,b&=-16777216,b|=a.AttributeData.fromColorRGB([E,T,O])):S===5&&(b&=-50331904,b|=33554432|255&E),b}_extractColor(b,S,E){const T=[0,0,-1,0,0,0];let O=0,H=0;do{if(T[H+O]=b.params[S+H],b.hasSubParams(S+H)){const U=b.getSubParams(S+H);let z=0;do T[1]===5&&(O=1),T[H+z+1+O]=U[z];while(++z<U.length&&z+H+1+O<T.length);break}if(T[1]===5&&H+O>=2||T[1]===2&&H+O>=5)break;T[1]&&(O=1)}while(++H+S<b.length&&H+O<T.length);for(let U=2;U<T.length;++U)T[U]===-1&&(T[U]=0);switch(T[0]){case 38:E.fg=this._updateAttrColor(E.fg,T[1],T[3],T[4],T[5]);break;case 48:E.bg=this._updateAttrColor(E.bg,T[1],T[3],T[4],T[5]);break;case 58:E.extended=E.extended.clone(),E.extended.underlineColor=this._updateAttrColor(E.extended.underlineColor,T[1],T[3],T[4],T[5])}return H}_processUnderline(b,S){S.extended=S.extended.clone(),(!~b||b>5)&&(b=1),S.extended.underlineStyle=b,S.fg|=268435456,b===0&&(S.fg&=-268435457),S.updateExtended()}_processSGR0(b){b.fg=s.DEFAULT_ATTR_DATA.fg,b.bg=s.DEFAULT_ATTR_DATA.bg,b.extended=b.extended.clone(),b.extended.underlineStyle=0,b.extended.underlineColor&=-67108864,b.updateExtended()}charAttributes(b){if(b.length===1&&b.params[0]===0)return this._processSGR0(this._curAttrData),!0;const S=b.length;let E;const T=this._curAttrData;for(let O=0;O<S;O++)E=b.params[O],E>=30&&E<=37?(T.fg&=-50331904,T.fg|=16777216|E-30):E>=40&&E<=47?(T.bg&=-50331904,T.bg|=16777216|E-40):E>=90&&E<=97?(T.fg&=-50331904,T.fg|=16777224|E-90):E>=100&&E<=107?(T.bg&=-50331904,T.bg|=16777224|E-100):E===0?this._processSGR0(T):E===1?T.fg|=134217728:E===3?T.bg|=67108864:E===4?(T.fg|=268435456,this._processUnderline(b.hasSubParams(O)?b.getSubParams(O)[0]:1,T)):E===5?T.fg|=536870912:E===7?T.fg|=67108864:E===8?T.fg|=1073741824:E===9?T.fg|=2147483648:E===2?T.bg|=134217728:E===21?this._processUnderline(2,T):E===22?(T.fg&=-134217729,T.bg&=-134217729):E===23?T.bg&=-67108865:E===24?(T.fg&=-268435457,this._processUnderline(0,T)):E===25?T.fg&=-536870913:E===27?T.fg&=-67108865:E===28?T.fg&=-1073741825:E===29?T.fg&=2147483647:E===39?(T.fg&=-67108864,T.fg|=16777215&s.DEFAULT_ATTR_DATA.fg):E===49?(T.bg&=-67108864,T.bg|=16777215&s.DEFAULT_ATTR_DATA.bg):E===38||E===48||E===58?O+=this._extractColor(b,O,T):E===53?T.bg|=1073741824:E===55?T.bg&=-1073741825:E===59?(T.extended=T.extended.clone(),T.extended.underlineColor=-1,T.updateExtended()):E===100?(T.fg&=-67108864,T.fg|=16777215&s.DEFAULT_ATTR_DATA.fg,T.bg&=-67108864,T.bg|=16777215&s.DEFAULT_ATTR_DATA.bg):this._logService.debug("Unknown SGR attribute: %d.",E);return!0}deviceStatus(b){switch(b.params[0]){case 5:this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);break;case 6:const S=this._activeBuffer.y+1,E=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${n.C0.ESC}[${S};${E}R`)}return!0}deviceStatusPrivate(b){if(b.params[0]===6){const S=this._activeBuffer.y+1,E=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${n.C0.ESC}[?${S};${E}R`)}return!0}softReset(b){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=s.DEFAULT_ATTR_DATA.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(b){const S=b.params[0]||1;switch(S){case 1:case 2:this._optionsService.options.cursorStyle="block";break;case 3:case 4:this._optionsService.options.cursorStyle="underline";break;case 5:case 6:this._optionsService.options.cursorStyle="bar"}const E=S%2==1;return this._optionsService.options.cursorBlink=E,!0}setScrollRegion(b){const S=b.params[0]||1;let E;return(b.length<2||(E=b.params[1])>this._bufferService.rows||E===0)&&(E=this._bufferService.rows),E>S&&(this._activeBuffer.scrollTop=S-1,this._activeBuffer.scrollBottom=E-1,this._setCursor(0,0)),!0}windowOptions(b){if(!k(b.params[0],this._optionsService.rawOptions.windowOptions))return!0;const S=b.length>1?b.params[1]:0;switch(b.params[0]){case 14:S!==2&&this._onRequestWindowsOptionsReport.fire(w.GET_WIN_SIZE_PIXELS);break;case 16:this._onRequestWindowsOptionsReport.fire(w.GET_CELL_SIZE_PIXELS);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:S!==0&&S!==2||(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>10&&this._windowTitleStack.shift()),S!==0&&S!==1||(this._iconNameStack.push(this._iconName),this._iconNameStack.length>10&&this._iconNameStack.shift());break;case 23:S!==0&&S!==2||this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),S!==0&&S!==1||this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop())}return!0}saveCursor(b){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(b){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(b){return this._windowTitle=b,this._onTitleChange.fire(b),!0}setIconName(b){return this._iconName=b,!0}setOrReportIndexedColor(b){const S=[],E=b.split(";");for(;E.length>1;){const T=E.shift(),O=E.shift();if(/^\d+$/.exec(T)){const H=parseInt(T);if(W(H))if(O==="?")S.push({type:0,index:H});else{const U=(0,v.parseColor)(O);U&&S.push({type:1,index:H,color:U})}}}return S.length&&this._onColor.fire(S),!0}setHyperlink(b){const S=b.split(";");return!(S.length<2)&&(S[1]?this._createHyperlink(S[0],S[1]):!S[0]&&this._finishHyperlink())}_createHyperlink(b,S){this._getCurrentLinkId()&&this._finishHyperlink();const E=b.split(":");let T;const O=E.findIndex(H=>H.startsWith("id="));return O!==-1&&(T=E[O].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:T,uri:S}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(b,S){const E=b.split(";");for(let T=0;T<E.length&&!(S>=this._specialColors.length);++T,++S)if(E[T]==="?")this._onColor.fire([{type:0,index:this._specialColors[S]}]);else{const O=(0,v.parseColor)(E[T]);O&&this._onColor.fire([{type:1,index:this._specialColors[S],color:O}])}return!0}setOrReportFgColor(b){return this._setOrReportSpecialColor(b,0)}setOrReportBgColor(b){return this._setOrReportSpecialColor(b,1)}setOrReportCursorColor(b){return this._setOrReportSpecialColor(b,2)}restoreIndexedColor(b){if(!b)return this._onColor.fire([{type:2}]),!0;const S=[],E=b.split(";");for(let T=0;T<E.length;++T)if(/^\d+$/.exec(E[T])){const O=parseInt(E[T]);W(O)&&S.push({type:2,index:O})}return S.length&&this._onColor.fire(S),!0}restoreFgColor(b){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(b){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(b){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),!0}selectCharset(b){return b.length!==2?(this.selectDefaultCharset(),!0):(b[0]==="/"||this._charsetService.setgCharset(C[b[0]],f.CHARSETS[b[1]]||f.DEFAULT_CHARSET),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){const b=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,b,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=s.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=s.DEFAULT_ATTR_DATA.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=67108863&this._curAttrData.bg,this._eraseAttrDataInternal}setgLevel(b){return this._charsetService.setgLevel(b),!0}screenAlignmentPattern(){const b=new t.CellData;b.content=4194373,b.fg=this._curAttrData.fg,b.bg=this._curAttrData.bg,this._setCursor(0,0);for(let S=0;S<this._bufferService.rows;++S){const E=this._activeBuffer.ybase+this._activeBuffer.y+S,T=this._activeBuffer.lines.get(E);T&&(T.fill(b),T.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(b,S){const E=this._bufferService.buffer,T=this._optionsService.rawOptions;return(O=>(this._coreService.triggerDataEvent(`${n.C0.ESC}${O}${n.C0.ESC}\\`),!0))(b==='"q'?`P1$r${this._curAttrData.isProtected()?1:0}"q`:b==='"p'?'P1$r61;1"p':b==="r"?`P1$r${E.scrollTop+1};${E.scrollBottom+1}r`:b==="m"?"P1$r0m":b===" q"?`P1$r${{block:2,underline:4,bar:6}[T.cursorStyle]-(T.cursorBlink?1:0)} q`:"P0$r")}markRangeDirty(b,S){this._dirtyRowTracker.markRangeDirty(b,S)}}i.InputHandler=B;let P=class{constructor(M){this._bufferService=M,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(M){M<this.start?this.start=M:M>this.end&&(this.end=M)}markRangeDirty(M,b){M>b&&(R=M,M=b,b=R),M<this.start&&(this.start=M),b>this.end&&(this.end=b)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};function W(M){return 0<=M&&M<256}P=h([d(0,p.IBufferService)],P)},844:(A,i)=>{function o(h){for(const d of h)d.dispose();h.length=0}Object.defineProperty(i,"__esModule",{value:!0}),i.getDisposeArrayDisposable=i.disposeArray=i.toDisposable=i.MutableDisposable=i.Disposable=void 0,i.Disposable=class{constructor(){this._disposables=[],this._isDisposed=!1}dispose(){this._isDisposed=!0;for(const h of this._disposables)h.dispose();this._disposables.length=0}register(h){return this._disposables.push(h),h}unregister(h){const d=this._disposables.indexOf(h);d!==-1&&this._disposables.splice(d,1)}},i.MutableDisposable=class{constructor(){this._isDisposed=!1}get value(){return this._isDisposed?void 0:this._value}set value(h){var d;this._isDisposed||h===this._value||((d=this._value)==null||d.dispose(),this._value=h)}clear(){this.value=void 0}dispose(){var h;this._isDisposed=!0,(h=this._value)==null||h.dispose(),this._value=void 0}},i.toDisposable=function(h){return{dispose:h}},i.disposeArray=o,i.getDisposeArrayDisposable=function(h){return{dispose:()=>o(h)}}},1505:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.FourKeyMap=i.TwoKeyMap=void 0;class o{constructor(){this._data={}}set(d,n,f){this._data[d]||(this._data[d]={}),this._data[d][n]=f}get(d,n){return this._data[d]?this._data[d][n]:void 0}clear(){this._data={}}}i.TwoKeyMap=o,i.FourKeyMap=class{constructor(){this._data=new o}set(h,d,n,f,u){this._data.get(h,d)||this._data.set(h,d,new o),this._data.get(h,d).set(n,f,u)}get(h,d,n,f){var u;return(u=this._data.get(h,d))==null?void 0:u.get(n,f)}clear(){this._data.clear()}}},6114:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.isChromeOS=i.isLinux=i.isWindows=i.isIphone=i.isIpad=i.isMac=i.getSafariVersion=i.isSafari=i.isLegacyEdge=i.isFirefox=i.isNode=void 0,i.isNode=typeof process<"u"&&"title"in process;const o=i.isNode?"node":navigator.userAgent,h=i.isNode?"node":navigator.platform;i.isFirefox=o.includes("Firefox"),i.isLegacyEdge=o.includes("Edge"),i.isSafari=/^((?!chrome|android).)*safari/i.test(o),i.getSafariVersion=function(){if(!i.isSafari)return 0;const d=o.match(/Version\/(\d+)/);return d===null||d.length<2?0:parseInt(d[1])},i.isMac=["Macintosh","MacIntel","MacPPC","Mac68K"].includes(h),i.isIpad=h==="iPad",i.isIphone=h==="iPhone",i.isWindows=["Windows","Win16","Win32","WinCE"].includes(h),i.isLinux=h.indexOf("Linux")>=0,i.isChromeOS=/\bCrOS\b/.test(o)},6106:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.SortedList=void 0;let o=0;i.SortedList=class{constructor(h){this._getKey=h,this._array=[]}clear(){this._array.length=0}insert(h){this._array.length!==0?(o=this._search(this._getKey(h)),this._array.splice(o,0,h)):this._array.push(h)}delete(h){if(this._array.length===0)return!1;const d=this._getKey(h);if(d===void 0||(o=this._search(d),o===-1)||this._getKey(this._array[o])!==d)return!1;do if(this._array[o]===h)return this._array.splice(o,1),!0;while(++o<this._array.length&&this._getKey(this._array[o])===d);return!1}*getKeyIterator(h){if(this._array.length!==0&&(o=this._search(h),!(o<0||o>=this._array.length)&&this._getKey(this._array[o])===h))do yield this._array[o];while(++o<this._array.length&&this._getKey(this._array[o])===h)}forEachByKey(h,d){if(this._array.length!==0&&(o=this._search(h),!(o<0||o>=this._array.length)&&this._getKey(this._array[o])===h))do d(this._array[o]);while(++o<this._array.length&&this._getKey(this._array[o])===h)}values(){return[...this._array].values()}_search(h){let d=0,n=this._array.length-1;for(;n>=d;){let f=d+n>>1;const u=this._getKey(this._array[f]);if(u>h)n=f-1;else{if(!(u<h)){for(;f>0&&this._getKey(this._array[f-1])===h;)f--;return f}d=f+1}}return d}}},7226:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.DebouncedIdleTask=i.IdleTaskQueue=i.PriorityTaskQueue=void 0;const h=o(6114);class d{constructor(){this._tasks=[],this._i=0}enqueue(u){this._tasks.push(u),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&(this._cancelCallback(this._idleCallback),this._idleCallback=void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||(this._idleCallback=this._requestCallback(this._process.bind(this)))}_process(u){this._idleCallback=void 0;let g=0,l=0,s=u.timeRemaining(),r=0;for(;this._i<this._tasks.length;){if(g=Date.now(),this._tasks[this._i]()||this._i++,g=Math.max(1,Date.now()-g),l=Math.max(g,l),r=u.timeRemaining(),1.5*l>r)return s-g<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s-g))}ms`),void this._start();s=r}this.clear()}}class n extends d{_requestCallback(u){return setTimeout(()=>u(this._createDeadline(16)))}_cancelCallback(u){clearTimeout(u)}_createDeadline(u){const g=Date.now()+u;return{timeRemaining:()=>Math.max(0,g-Date.now())}}}i.PriorityTaskQueue=n,i.IdleTaskQueue=!h.isNode&&"requestIdleCallback"in window?class extends d{_requestCallback(f){return requestIdleCallback(f)}_cancelCallback(f){cancelIdleCallback(f)}}:n,i.DebouncedIdleTask=class{constructor(){this._queue=new i.IdleTaskQueue}set(f){this._queue.clear(),this._queue.enqueue(f)}flush(){this._queue.flush()}}},9282:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.updateWindowsModeWrappedState=void 0;const h=o(643);i.updateWindowsModeWrappedState=function(d){const n=d.buffer.lines.get(d.buffer.ybase+d.buffer.y-1),f=n==null?void 0:n.get(d.cols-1),u=d.buffer.lines.get(d.buffer.ybase+d.buffer.y);u&&f&&(u.isWrapped=f[h.CHAR_DATA_CODE_INDEX]!==h.NULL_CELL_CODE&&f[h.CHAR_DATA_CODE_INDEX]!==h.WHITESPACE_CELL_CODE)}},3734:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ExtendedAttrs=i.AttributeData=void 0;class o{constructor(){this.fg=0,this.bg=0,this.extended=new h}static toColorRGB(n){return[n>>>16&255,n>>>8&255,255&n]}static fromColorRGB(n){return(255&n[0])<<16|(255&n[1])<<8|255&n[2]}clone(){const n=new o;return n.fg=this.fg,n.bg=this.bg,n.extended=this.extended.clone(),n}isInverse(){return 67108864&this.fg}isBold(){return 134217728&this.fg}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:268435456&this.fg}isBlink(){return 536870912&this.fg}isInvisible(){return 1073741824&this.fg}isItalic(){return 67108864&this.bg}isDim(){return 134217728&this.bg}isStrikethrough(){return 2147483648&this.fg}isProtected(){return 536870912&this.bg}isOverline(){return 1073741824&this.bg}getFgColorMode(){return 50331648&this.fg}getBgColorMode(){return 50331648&this.bg}isFgRGB(){return(50331648&this.fg)==50331648}isBgRGB(){return(50331648&this.bg)==50331648}isFgPalette(){return(50331648&this.fg)==16777216||(50331648&this.fg)==33554432}isBgPalette(){return(50331648&this.bg)==16777216||(50331648&this.bg)==33554432}isFgDefault(){return(50331648&this.fg)==0}isBgDefault(){return(50331648&this.bg)==0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(50331648&this.fg){case 16777216:case 33554432:return 255&this.fg;case 50331648:return 16777215&this.fg;default:return-1}}getBgColor(){switch(50331648&this.bg){case 16777216:case 33554432:return 255&this.bg;case 50331648:return 16777215&this.bg;default:return-1}}hasExtendedAttrs(){return 268435456&this.bg}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(268435456&this.bg&&~this.extended.underlineColor)switch(50331648&this.extended.underlineColor){case 16777216:case 33554432:return 255&this.extended.underlineColor;case 50331648:return 16777215&this.extended.underlineColor;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return 268435456&this.bg&&~this.extended.underlineColor?50331648&this.extended.underlineColor:this.getFgColorMode()}isUnderlineColorRGB(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==50331648:this.isFgRGB()}isUnderlineColorPalette(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==16777216||(50331648&this.extended.underlineColor)==33554432:this.isFgPalette()}isUnderlineColorDefault(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==0:this.isFgDefault()}getUnderlineStyle(){return 268435456&this.fg?268435456&this.bg?this.extended.underlineStyle:1:0}getUnderlineVariantOffset(){return this.extended.underlineVariantOffset}}i.AttributeData=o;class h{get ext(){return this._urlId?-469762049&this._ext|this.underlineStyle<<26:this._ext}set ext(n){this._ext=n}get underlineStyle(){return this._urlId?5:(469762048&this._ext)>>26}set underlineStyle(n){this._ext&=-469762049,this._ext|=n<<26&469762048}get underlineColor(){return 67108863&this._ext}set underlineColor(n){this._ext&=-67108864,this._ext|=67108863&n}get urlId(){return this._urlId}set urlId(n){this._urlId=n}get underlineVariantOffset(){const n=(3758096384&this._ext)>>29;return n<0?4294967288^n:n}set underlineVariantOffset(n){this._ext&=536870911,this._ext|=n<<29&3758096384}constructor(n=0,f=0){this._ext=0,this._urlId=0,this._ext=n,this._urlId=f}clone(){return new h(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}}i.ExtendedAttrs=h},9092:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Buffer=i.MAX_BUFFER_SIZE=void 0;const h=o(6349),d=o(7226),n=o(3734),f=o(8437),u=o(4634),g=o(511),l=o(643),s=o(4863),r=o(7116);i.MAX_BUFFER_SIZE=4294967295,i.Buffer=class{constructor(e,t,a){this._hasScrollback=e,this._optionsService=t,this._bufferService=a,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=f.DEFAULT_ATTR_DATA.clone(),this.savedCharset=r.DEFAULT_CHARSET,this.markers=[],this._nullCell=g.CellData.fromCharData([0,l.NULL_CELL_CHAR,l.NULL_CELL_WIDTH,l.NULL_CELL_CODE]),this._whitespaceCell=g.CellData.fromCharData([0,l.WHITESPACE_CELL_CHAR,l.WHITESPACE_CELL_WIDTH,l.WHITESPACE_CELL_CODE]),this._isClearing=!1,this._memoryCleanupQueue=new d.IdleTaskQueue,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new h.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(e){return e?(this._nullCell.fg=e.fg,this._nullCell.bg=e.bg,this._nullCell.extended=e.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new n.ExtendedAttrs),this._nullCell}getWhitespaceCell(e){return e?(this._whitespaceCell.fg=e.fg,this._whitespaceCell.bg=e.bg,this._whitespaceCell.extended=e.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new n.ExtendedAttrs),this._whitespaceCell}getBlankLine(e,t){return new f.BufferLine(this._bufferService.cols,this.getNullCell(e),t)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){const e=this.ybase+this.y-this.ydisp;return e>=0&&e<this._rows}_getCorrectBufferLength(e){if(!this._hasScrollback)return e;const t=e+this._optionsService.rawOptions.scrollback;return t>i.MAX_BUFFER_SIZE?i.MAX_BUFFER_SIZE:t}fillViewportRows(e){if(this.lines.length===0){e===void 0&&(e=f.DEFAULT_ATTR_DATA);let t=this._rows;for(;t--;)this.lines.push(this.getBlankLine(e))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new h.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(e,t){const a=this.getNullCell(f.DEFAULT_ATTR_DATA);let p=0;const _=this._getCorrectBufferLength(t);if(_>this.lines.maxLength&&(this.lines.maxLength=_),this.lines.length>0){if(this._cols<e)for(let c=0;c<this.lines.length;c++)p+=+this.lines.get(c).resize(e,a);let m=0;if(this._rows<t)for(let c=this._rows;c<t;c++)this.lines.length<t+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new f.BufferLine(e,a)):this.ybase>0&&this.lines.length<=this.ybase+this.y+m+1?(this.ybase--,m++,this.ydisp>0&&this.ydisp--):this.lines.push(new f.BufferLine(e,a)));else for(let c=this._rows;c>t;c--)this.lines.length>t+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(_<this.lines.maxLength){const c=this.lines.length-_;c>0&&(this.lines.trimStart(c),this.ybase=Math.max(this.ybase-c,0),this.ydisp=Math.max(this.ydisp-c,0),this.savedY=Math.max(this.savedY-c,0)),this.lines.maxLength=_}this.x=Math.min(this.x,e-1),this.y=Math.min(this.y,t-1),m&&(this.y+=m),this.savedX=Math.min(this.savedX,e-1),this.scrollTop=0}if(this.scrollBottom=t-1,this._isReflowEnabled&&(this._reflow(e,t),this._cols>e))for(let m=0;m<this.lines.length;m++)p+=+this.lines.get(m).resize(e,a);this._cols=e,this._rows=t,this._memoryCleanupQueue.clear(),p>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue(()=>this._batchedMemoryCleanup()))}_batchedMemoryCleanup(){let e=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,e=!1);let t=0;for(;this._memoryCleanupPosition<this.lines.length;)if(t+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),t>100)return!0;return e}get _isReflowEnabled(){const e=this._optionsService.rawOptions.windowsPty;return e&&e.buildNumber?this._hasScrollback&&e.backend==="conpty"&&e.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(e,t){this._cols!==e&&(e>this._cols?this._reflowLarger(e,t):this._reflowSmaller(e,t))}_reflowLarger(e,t){const a=(0,u.reflowLargerGetLinesToRemove)(this.lines,this._cols,e,this.ybase+this.y,this.getNullCell(f.DEFAULT_ATTR_DATA));if(a.length>0){const p=(0,u.reflowLargerCreateNewLayout)(this.lines,a);(0,u.reflowLargerApplyNewLayout)(this.lines,p.layout),this._reflowLargerAdjustViewport(e,t,p.countRemoved)}}_reflowLargerAdjustViewport(e,t,a){const p=this.getNullCell(f.DEFAULT_ATTR_DATA);let _=a;for(;_-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<t&&this.lines.push(new f.BufferLine(e,p))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-a,0)}_reflowSmaller(e,t){const a=this.getNullCell(f.DEFAULT_ATTR_DATA),p=[];let _=0;for(let m=this.lines.length-1;m>=0;m--){let c=this.lines.get(m);if(!c||!c.isWrapped&&c.getTrimmedLength()<=e)continue;const v=[c];for(;c.isWrapped&&m>0;)c=this.lines.get(--m),v.unshift(c);const C=this.ybase+this.y;if(C>=m&&C<m+v.length)continue;const x=v[v.length-1].getTrimmedLength(),k=(0,u.reflowSmallerGetNewLineLengths)(v,this._cols,e),w=k.length-v.length;let R;R=this.ybase===0&&this.y!==this.lines.length-1?Math.max(0,this.y-this.lines.maxLength+w):Math.max(0,this.lines.length-this.lines.maxLength+w);const B=[];for(let E=0;E<w;E++){const T=this.getBlankLine(f.DEFAULT_ATTR_DATA,!0);B.push(T)}B.length>0&&(p.push({start:m+v.length+_,newLines:B}),_+=B.length),v.push(...B);let P=k.length-1,W=k[P];W===0&&(P--,W=k[P]);let M=v.length-w-1,b=x;for(;M>=0;){const E=Math.min(b,W);if(v[P]===void 0)break;if(v[P].copyCellsFrom(v[M],b-E,W-E,E,!0),W-=E,W===0&&(P--,W=k[P]),b-=E,b===0){M--;const T=Math.max(M,0);b=(0,u.getWrappedLineTrimmedLength)(v,T,this._cols)}}for(let E=0;E<v.length;E++)k[E]<e&&v[E].setCell(k[E],a);let S=w-R;for(;S-- >0;)this.ybase===0?this.y<t-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+_)-t&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+w,this.ybase+t-1)}if(p.length>0){const m=[],c=[];for(let P=0;P<this.lines.length;P++)c.push(this.lines.get(P));const v=this.lines.length;let C=v-1,x=0,k=p[x];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+_);let w=0;for(let P=Math.min(this.lines.maxLength-1,v+_-1);P>=0;P--)if(k&&k.start>C+w){for(let W=k.newLines.length-1;W>=0;W--)this.lines.set(P--,k.newLines[W]);P++,m.push({index:C+1,amount:k.newLines.length}),w+=k.newLines.length,k=p[++x]}else this.lines.set(P,c[C--]);let R=0;for(let P=m.length-1;P>=0;P--)m[P].index+=R,this.lines.onInsertEmitter.fire(m[P]),R+=m[P].amount;const B=Math.max(0,v+_-this.lines.maxLength);B>0&&this.lines.onTrimEmitter.fire(B)}}translateBufferLineToString(e,t,a=0,p){const _=this.lines.get(e);return _?_.translateToString(t,a,p):""}getWrappedRangeForLine(e){let t=e,a=e;for(;t>0&&this.lines.get(t).isWrapped;)t--;for(;a+1<this.lines.length&&this.lines.get(a+1).isWrapped;)a++;return{first:t,last:a}}setupTabStops(e){for(e!=null?this.tabs[e]||(e=this.prevStop(e)):(this.tabs={},e=0);e<this._cols;e+=this._optionsService.rawOptions.tabStopWidth)this.tabs[e]=!0}prevStop(e){for(e==null&&(e=this.x);!this.tabs[--e]&&e>0;);return e>=this._cols?this._cols-1:e<0?0:e}nextStop(e){for(e==null&&(e=this.x);!this.tabs[++e]&&e<this._cols;);return e>=this._cols?this._cols-1:e<0?0:e}clearMarkers(e){this._isClearing=!0;for(let t=0;t<this.markers.length;t++)this.markers[t].line===e&&(this.markers[t].dispose(),this.markers.splice(t--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let e=0;e<this.markers.length;e++)this.markers[e].dispose(),this.markers.splice(e--,1);this._isClearing=!1}addMarker(e){const t=new s.Marker(e);return this.markers.push(t),t.register(this.lines.onTrim(a=>{t.line-=a,t.line<0&&t.dispose()})),t.register(this.lines.onInsert(a=>{t.line>=a.index&&(t.line+=a.amount)})),t.register(this.lines.onDelete(a=>{t.line>=a.index&&t.line<a.index+a.amount&&t.dispose(),t.line>a.index&&(t.line-=a.amount)})),t.register(t.onDispose(()=>this._removeMarker(t))),t}_removeMarker(e){this._isClearing||this.markers.splice(this.markers.indexOf(e),1)}}},8437:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.BufferLine=i.DEFAULT_ATTR_DATA=void 0;const h=o(3734),d=o(511),n=o(643),f=o(482);i.DEFAULT_ATTR_DATA=Object.freeze(new h.AttributeData);let u=0;class g{constructor(s,r,e=!1){this.isWrapped=e,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(3*s);const t=r||d.CellData.fromCharData([0,n.NULL_CELL_CHAR,n.NULL_CELL_WIDTH,n.NULL_CELL_CODE]);for(let a=0;a<s;++a)this.setCell(a,t);this.length=s}get(s){const r=this._data[3*s+0],e=2097151&r;return[this._data[3*s+1],2097152&r?this._combined[s]:e?(0,f.stringFromCodePoint)(e):"",r>>22,2097152&r?this._combined[s].charCodeAt(this._combined[s].length-1):e]}set(s,r){this._data[3*s+1]=r[n.CHAR_DATA_ATTR_INDEX],r[n.CHAR_DATA_CHAR_INDEX].length>1?(this._combined[s]=r[1],this._data[3*s+0]=2097152|s|r[n.CHAR_DATA_WIDTH_INDEX]<<22):this._data[3*s+0]=r[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|r[n.CHAR_DATA_WIDTH_INDEX]<<22}getWidth(s){return this._data[3*s+0]>>22}hasWidth(s){return 12582912&this._data[3*s+0]}getFg(s){return this._data[3*s+1]}getBg(s){return this._data[3*s+2]}hasContent(s){return 4194303&this._data[3*s+0]}getCodePoint(s){const r=this._data[3*s+0];return 2097152&r?this._combined[s].charCodeAt(this._combined[s].length-1):2097151&r}isCombined(s){return 2097152&this._data[3*s+0]}getString(s){const r=this._data[3*s+0];return 2097152&r?this._combined[s]:2097151&r?(0,f.stringFromCodePoint)(2097151&r):""}isProtected(s){return 536870912&this._data[3*s+2]}loadCell(s,r){return u=3*s,r.content=this._data[u+0],r.fg=this._data[u+1],r.bg=this._data[u+2],2097152&r.content&&(r.combinedData=this._combined[s]),268435456&r.bg&&(r.extended=this._extendedAttrs[s]),r}setCell(s,r){2097152&r.content&&(this._combined[s]=r.combinedData),268435456&r.bg&&(this._extendedAttrs[s]=r.extended),this._data[3*s+0]=r.content,this._data[3*s+1]=r.fg,this._data[3*s+2]=r.bg}setCellFromCodepoint(s,r,e,t){268435456&t.bg&&(this._extendedAttrs[s]=t.extended),this._data[3*s+0]=r|e<<22,this._data[3*s+1]=t.fg,this._data[3*s+2]=t.bg}addCodepointToCell(s,r,e){let t=this._data[3*s+0];2097152&t?this._combined[s]+=(0,f.stringFromCodePoint)(r):2097151&t?(this._combined[s]=(0,f.stringFromCodePoint)(2097151&t)+(0,f.stringFromCodePoint)(r),t&=-2097152,t|=2097152):t=r|4194304,e&&(t&=-12582913,t|=e<<22),this._data[3*s+0]=t}insertCells(s,r,e){if((s%=this.length)&&this.getWidth(s-1)===2&&this.setCellFromCodepoint(s-1,0,1,e),r<this.length-s){const t=new d.CellData;for(let a=this.length-s-r-1;a>=0;--a)this.setCell(s+r+a,this.loadCell(s+a,t));for(let a=0;a<r;++a)this.setCell(s+a,e)}else for(let t=s;t<this.length;++t)this.setCell(t,e);this.getWidth(this.length-1)===2&&this.setCellFromCodepoint(this.length-1,0,1,e)}deleteCells(s,r,e){if(s%=this.length,r<this.length-s){const t=new d.CellData;for(let a=0;a<this.length-s-r;++a)this.setCell(s+a,this.loadCell(s+r+a,t));for(let a=this.length-r;a<this.length;++a)this.setCell(a,e)}else for(let t=s;t<this.length;++t)this.setCell(t,e);s&&this.getWidth(s-1)===2&&this.setCellFromCodepoint(s-1,0,1,e),this.getWidth(s)!==0||this.hasContent(s)||this.setCellFromCodepoint(s,0,1,e)}replaceCells(s,r,e,t=!1){if(t)for(s&&this.getWidth(s-1)===2&&!this.isProtected(s-1)&&this.setCellFromCodepoint(s-1,0,1,e),r<this.length&&this.getWidth(r-1)===2&&!this.isProtected(r)&&this.setCellFromCodepoint(r,0,1,e);s<r&&s<this.length;)this.isProtected(s)||this.setCell(s,e),s++;else for(s&&this.getWidth(s-1)===2&&this.setCellFromCodepoint(s-1,0,1,e),r<this.length&&this.getWidth(r-1)===2&&this.setCellFromCodepoint(r,0,1,e);s<r&&s<this.length;)this.setCell(s++,e)}resize(s,r){if(s===this.length)return 4*this._data.length*2<this._data.buffer.byteLength;const e=3*s;if(s>this.length){if(this._data.buffer.byteLength>=4*e)this._data=new Uint32Array(this._data.buffer,0,e);else{const t=new Uint32Array(e);t.set(this._data),this._data=t}for(let t=this.length;t<s;++t)this.setCell(t,r)}else{this._data=this._data.subarray(0,e);const t=Object.keys(this._combined);for(let p=0;p<t.length;p++){const _=parseInt(t[p],10);_>=s&&delete this._combined[_]}const a=Object.keys(this._extendedAttrs);for(let p=0;p<a.length;p++){const _=parseInt(a[p],10);_>=s&&delete this._extendedAttrs[_]}}return this.length=s,4*e*2<this._data.buffer.byteLength}cleanupMemory(){if(4*this._data.length*2<this._data.buffer.byteLength){const s=new Uint32Array(this._data.length);return s.set(this._data),this._data=s,1}return 0}fill(s,r=!1){if(r)for(let e=0;e<this.length;++e)this.isProtected(e)||this.setCell(e,s);else{this._combined={},this._extendedAttrs={};for(let e=0;e<this.length;++e)this.setCell(e,s)}}copyFrom(s){this.length!==s.length?this._data=new Uint32Array(s._data):this._data.set(s._data),this.length=s.length,this._combined={};for(const r in s._combined)this._combined[r]=s._combined[r];this._extendedAttrs={};for(const r in s._extendedAttrs)this._extendedAttrs[r]=s._extendedAttrs[r];this.isWrapped=s.isWrapped}clone(){const s=new g(0);s._data=new Uint32Array(this._data),s.length=this.length;for(const r in this._combined)s._combined[r]=this._combined[r];for(const r in this._extendedAttrs)s._extendedAttrs[r]=this._extendedAttrs[r];return s.isWrapped=this.isWrapped,s}getTrimmedLength(){for(let s=this.length-1;s>=0;--s)if(4194303&this._data[3*s+0])return s+(this._data[3*s+0]>>22);return 0}getNoBgTrimmedLength(){for(let s=this.length-1;s>=0;--s)if(4194303&this._data[3*s+0]||50331648&this._data[3*s+2])return s+(this._data[3*s+0]>>22);return 0}copyCellsFrom(s,r,e,t,a){const p=s._data;if(a)for(let m=t-1;m>=0;m--){for(let c=0;c<3;c++)this._data[3*(e+m)+c]=p[3*(r+m)+c];268435456&p[3*(r+m)+2]&&(this._extendedAttrs[e+m]=s._extendedAttrs[r+m])}else for(let m=0;m<t;m++){for(let c=0;c<3;c++)this._data[3*(e+m)+c]=p[3*(r+m)+c];268435456&p[3*(r+m)+2]&&(this._extendedAttrs[e+m]=s._extendedAttrs[r+m])}const _=Object.keys(s._combined);for(let m=0;m<_.length;m++){const c=parseInt(_[m],10);c>=r&&(this._combined[c-r+e]=s._combined[c])}}translateToString(s,r,e,t){r=r??0,e=e??this.length,s&&(e=Math.min(e,this.getTrimmedLength())),t&&(t.length=0);let a="";for(;r<e;){const p=this._data[3*r+0],_=2097151&p,m=2097152&p?this._combined[r]:_?(0,f.stringFromCodePoint)(_):n.WHITESPACE_CELL_CHAR;if(a+=m,t)for(let c=0;c<m.length;++c)t.push(r);r+=p>>22||1}return t&&t.push(r),a}}i.BufferLine=g},4841:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.getRangeLength=void 0,i.getRangeLength=function(o,h){if(o.start.y>o.end.y)throw new Error(`Buffer range end (${o.end.x}, ${o.end.y}) cannot be before start (${o.start.x}, ${o.start.y})`);return h*(o.end.y-o.start.y)+(o.end.x-o.start.x+1)}},4634:(A,i)=>{function o(h,d,n){if(d===h.length-1)return h[d].getTrimmedLength();const f=!h[d].hasContent(n-1)&&h[d].getWidth(n-1)===1,u=h[d+1].getWidth(0)===2;return f&&u?n-1:n}Object.defineProperty(i,"__esModule",{value:!0}),i.getWrappedLineTrimmedLength=i.reflowSmallerGetNewLineLengths=i.reflowLargerApplyNewLayout=i.reflowLargerCreateNewLayout=i.reflowLargerGetLinesToRemove=void 0,i.reflowLargerGetLinesToRemove=function(h,d,n,f,u){const g=[];for(let l=0;l<h.length-1;l++){let s=l,r=h.get(++s);if(!r.isWrapped)continue;const e=[h.get(l)];for(;s<h.length&&r.isWrapped;)e.push(r),r=h.get(++s);if(f>=l&&f<s){l+=e.length-1;continue}let t=0,a=o(e,t,d),p=1,_=0;for(;p<e.length;){const c=o(e,p,d),v=c-_,C=n-a,x=Math.min(v,C);e[t].copyCellsFrom(e[p],_,a,x,!1),a+=x,a===n&&(t++,a=0),_+=x,_===c&&(p++,_=0),a===0&&t!==0&&e[t-1].getWidth(n-1)===2&&(e[t].copyCellsFrom(e[t-1],n-1,a++,1,!1),e[t-1].setCell(n-1,u))}e[t].replaceCells(a,n,u);let m=0;for(let c=e.length-1;c>0&&(c>t||e[c].getTrimmedLength()===0);c--)m++;m>0&&(g.push(l+e.length-m),g.push(m)),l+=e.length-1}return g},i.reflowLargerCreateNewLayout=function(h,d){const n=[];let f=0,u=d[f],g=0;for(let l=0;l<h.length;l++)if(u===l){const s=d[++f];h.onDeleteEmitter.fire({index:l-g,amount:s}),l+=s-1,g+=s,u=d[++f]}else n.push(l);return{layout:n,countRemoved:g}},i.reflowLargerApplyNewLayout=function(h,d){const n=[];for(let f=0;f<d.length;f++)n.push(h.get(d[f]));for(let f=0;f<n.length;f++)h.set(f,n[f]);h.length=d.length},i.reflowSmallerGetNewLineLengths=function(h,d,n){const f=[],u=h.map((r,e)=>o(h,e,d)).reduce((r,e)=>r+e);let g=0,l=0,s=0;for(;s<u;){if(u-s<n){f.push(u-s);break}g+=n;const r=o(h,l,d);g>r&&(g-=r,l++);const e=h[l].getWidth(g-1)===2;e&&g--;const t=e?n-1:n;f.push(t),s+=t}return f},i.getWrappedLineTrimmedLength=o},5295:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.BufferSet=void 0;const h=o(8460),d=o(844),n=o(9092);class f extends d.Disposable{constructor(g,l){super(),this._optionsService=g,this._bufferService=l,this._onBufferActivate=this.register(new h.EventEmitter),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this.register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.resize(this._bufferService.cols,this._bufferService.rows))),this.register(this._optionsService.onSpecificOptionChange("tabStopWidth",()=>this.setupTabStops()))}reset(){this._normal=new n.Buffer(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new n.Buffer(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(g){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(g),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(g,l){this._normal.resize(g,l),this._alt.resize(g,l),this.setupTabStops(g)}setupTabStops(g){this._normal.setupTabStops(g),this._alt.setupTabStops(g)}}i.BufferSet=f},511:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.CellData=void 0;const h=o(482),d=o(643),n=o(3734);class f extends n.AttributeData{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new n.ExtendedAttrs,this.combinedData=""}static fromCharData(g){const l=new f;return l.setFromCharData(g),l}isCombined(){return 2097152&this.content}getWidth(){return this.content>>22}getChars(){return 2097152&this.content?this.combinedData:2097151&this.content?(0,h.stringFromCodePoint)(2097151&this.content):""}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):2097151&this.content}setFromCharData(g){this.fg=g[d.CHAR_DATA_ATTR_INDEX],this.bg=0;let l=!1;if(g[d.CHAR_DATA_CHAR_INDEX].length>2)l=!0;else if(g[d.CHAR_DATA_CHAR_INDEX].length===2){const s=g[d.CHAR_DATA_CHAR_INDEX].charCodeAt(0);if(55296<=s&&s<=56319){const r=g[d.CHAR_DATA_CHAR_INDEX].charCodeAt(1);56320<=r&&r<=57343?this.content=1024*(s-55296)+r-56320+65536|g[d.CHAR_DATA_WIDTH_INDEX]<<22:l=!0}else l=!0}else this.content=g[d.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|g[d.CHAR_DATA_WIDTH_INDEX]<<22;l&&(this.combinedData=g[d.CHAR_DATA_CHAR_INDEX],this.content=2097152|g[d.CHAR_DATA_WIDTH_INDEX]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}i.CellData=f},643:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.WHITESPACE_CELL_CODE=i.WHITESPACE_CELL_WIDTH=i.WHITESPACE_CELL_CHAR=i.NULL_CELL_CODE=i.NULL_CELL_WIDTH=i.NULL_CELL_CHAR=i.CHAR_DATA_CODE_INDEX=i.CHAR_DATA_WIDTH_INDEX=i.CHAR_DATA_CHAR_INDEX=i.CHAR_DATA_ATTR_INDEX=i.DEFAULT_EXT=i.DEFAULT_ATTR=i.DEFAULT_COLOR=void 0,i.DEFAULT_COLOR=0,i.DEFAULT_ATTR=256|i.DEFAULT_COLOR<<9,i.DEFAULT_EXT=0,i.CHAR_DATA_ATTR_INDEX=0,i.CHAR_DATA_CHAR_INDEX=1,i.CHAR_DATA_WIDTH_INDEX=2,i.CHAR_DATA_CODE_INDEX=3,i.NULL_CELL_CHAR="",i.NULL_CELL_WIDTH=1,i.NULL_CELL_CODE=0,i.WHITESPACE_CELL_CHAR=" ",i.WHITESPACE_CELL_WIDTH=1,i.WHITESPACE_CELL_CODE=32},4863:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Marker=void 0;const h=o(8460),d=o(844);class n{get id(){return this._id}constructor(u){this.line=u,this.isDisposed=!1,this._disposables=[],this._id=n._nextId++,this._onDispose=this.register(new h.EventEmitter),this.onDispose=this._onDispose.event}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),(0,d.disposeArray)(this._disposables),this._disposables.length=0)}register(u){return this._disposables.push(u),u}}i.Marker=n,n._nextId=1},7116:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.DEFAULT_CHARSET=i.CHARSETS=void 0,i.CHARSETS={},i.DEFAULT_CHARSET=i.CHARSETS.B,i.CHARSETS[0]={"`":"◆",a:"▒",b:"␉",c:"␌",d:"␍",e:"␊",f:"°",g:"±",h:"␤",i:"␋",j:"┘",k:"┐",l:"┌",m:"└",n:"┼",o:"⎺",p:"⎻",q:"─",r:"⎼",s:"⎽",t:"├",u:"┤",v:"┴",w:"┬",x:"│",y:"≤",z:"≥","{":"π","|":"≠","}":"£","~":"·"},i.CHARSETS.A={"#":"£"},i.CHARSETS.B=void 0,i.CHARSETS[4]={"#":"£","@":"¾","[":"ij","\\":"½","]":"|","{":"¨","|":"f","}":"¼","~":"´"},i.CHARSETS.C=i.CHARSETS[5]={"[":"Ä","\\":"Ö","]":"Å","^":"Ü","`":"é","{":"ä","|":"ö","}":"å","~":"ü"},i.CHARSETS.R={"#":"£","@":"à","[":"°","\\":"ç","]":"§","{":"é","|":"ù","}":"è","~":"¨"},i.CHARSETS.Q={"@":"à","[":"â","\\":"ç","]":"ê","^":"î","`":"ô","{":"é","|":"ù","}":"è","~":"û"},i.CHARSETS.K={"@":"§","[":"Ä","\\":"Ö","]":"Ü","{":"ä","|":"ö","}":"ü","~":"ß"},i.CHARSETS.Y={"#":"£","@":"§","[":"°","\\":"ç","]":"é","`":"ù","{":"à","|":"ò","}":"è","~":"ì"},i.CHARSETS.E=i.CHARSETS[6]={"@":"Ä","[":"Æ","\\":"Ø","]":"Å","^":"Ü","`":"ä","{":"æ","|":"ø","}":"å","~":"ü"},i.CHARSETS.Z={"#":"£","@":"§","[":"¡","\\":"Ñ","]":"¿","{":"°","|":"ñ","}":"ç"},i.CHARSETS.H=i.CHARSETS[7]={"@":"É","[":"Ä","\\":"Ö","]":"Å","^":"Ü","`":"é","{":"ä","|":"ö","}":"å","~":"ü"},i.CHARSETS["="]={"#":"ù","@":"à","[":"é","\\":"ç","]":"ê","^":"î",_:"è","`":"ô","{":"ä","|":"ö","}":"ü","~":"û"}},2584:(A,i)=>{var o,h,d;Object.defineProperty(i,"__esModule",{value:!0}),i.C1_ESCAPED=i.C1=i.C0=void 0,function(n){n.NUL="\0",n.SOH="",n.STX="",n.ETX="",n.EOT="",n.ENQ="",n.ACK="",n.BEL="\x07",n.BS="\b",n.HT="	",n.LF=`
`,n.VT="\v",n.FF="\f",n.CR="\r",n.SO="",n.SI="",n.DLE="",n.DC1="",n.DC2="",n.DC3="",n.DC4="",n.NAK="",n.SYN="",n.ETB="",n.CAN="",n.EM="",n.SUB="",n.ESC="\x1B",n.FS="",n.GS="",n.RS="",n.US="",n.SP=" ",n.DEL=""}(o||(i.C0=o={})),function(n){n.PAD="",n.HOP="",n.BPH="",n.NBH="",n.IND="",n.NEL="",n.SSA="",n.ESA="",n.HTS="",n.HTJ="",n.VTS="",n.PLD="",n.PLU="",n.RI="",n.SS2="",n.SS3="",n.DCS="",n.PU1="",n.PU2="",n.STS="",n.CCH="",n.MW="",n.SPA="",n.EPA="",n.SOS="",n.SGCI="",n.SCI="",n.CSI="",n.ST="",n.OSC="",n.PM="",n.APC=""}(h||(i.C1=h={})),function(n){n.ST=`${o.ESC}\\`}(d||(i.C1_ESCAPED=d={}))},7399:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.evaluateKeyboardEvent=void 0;const h=o(2584),d={48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']};i.evaluateKeyboardEvent=function(n,f,u,g){const l={type:0,cancel:!1,key:void 0},s=(n.shiftKey?1:0)|(n.altKey?2:0)|(n.ctrlKey?4:0)|(n.metaKey?8:0);switch(n.keyCode){case 0:n.key==="UIKeyInputUpArrow"?l.key=f?h.C0.ESC+"OA":h.C0.ESC+"[A":n.key==="UIKeyInputLeftArrow"?l.key=f?h.C0.ESC+"OD":h.C0.ESC+"[D":n.key==="UIKeyInputRightArrow"?l.key=f?h.C0.ESC+"OC":h.C0.ESC+"[C":n.key==="UIKeyInputDownArrow"&&(l.key=f?h.C0.ESC+"OB":h.C0.ESC+"[B");break;case 8:l.key=n.ctrlKey?"\b":h.C0.DEL,n.altKey&&(l.key=h.C0.ESC+l.key);break;case 9:if(n.shiftKey){l.key=h.C0.ESC+"[Z";break}l.key=h.C0.HT,l.cancel=!0;break;case 13:l.key=n.altKey?h.C0.ESC+h.C0.CR:h.C0.CR,l.cancel=!0;break;case 27:l.key=h.C0.ESC,n.altKey&&(l.key=h.C0.ESC+h.C0.ESC),l.cancel=!0;break;case 37:if(n.metaKey)break;s?(l.key=h.C0.ESC+"[1;"+(s+1)+"D",l.key===h.C0.ESC+"[1;3D"&&(l.key=h.C0.ESC+(u?"b":"[1;5D"))):l.key=f?h.C0.ESC+"OD":h.C0.ESC+"[D";break;case 39:if(n.metaKey)break;s?(l.key=h.C0.ESC+"[1;"+(s+1)+"C",l.key===h.C0.ESC+"[1;3C"&&(l.key=h.C0.ESC+(u?"f":"[1;5C"))):l.key=f?h.C0.ESC+"OC":h.C0.ESC+"[C";break;case 38:if(n.metaKey)break;s?(l.key=h.C0.ESC+"[1;"+(s+1)+"A",u||l.key!==h.C0.ESC+"[1;3A"||(l.key=h.C0.ESC+"[1;5A")):l.key=f?h.C0.ESC+"OA":h.C0.ESC+"[A";break;case 40:if(n.metaKey)break;s?(l.key=h.C0.ESC+"[1;"+(s+1)+"B",u||l.key!==h.C0.ESC+"[1;3B"||(l.key=h.C0.ESC+"[1;5B")):l.key=f?h.C0.ESC+"OB":h.C0.ESC+"[B";break;case 45:n.shiftKey||n.ctrlKey||(l.key=h.C0.ESC+"[2~");break;case 46:l.key=s?h.C0.ESC+"[3;"+(s+1)+"~":h.C0.ESC+"[3~";break;case 36:l.key=s?h.C0.ESC+"[1;"+(s+1)+"H":f?h.C0.ESC+"OH":h.C0.ESC+"[H";break;case 35:l.key=s?h.C0.ESC+"[1;"+(s+1)+"F":f?h.C0.ESC+"OF":h.C0.ESC+"[F";break;case 33:n.shiftKey?l.type=2:n.ctrlKey?l.key=h.C0.ESC+"[5;"+(s+1)+"~":l.key=h.C0.ESC+"[5~";break;case 34:n.shiftKey?l.type=3:n.ctrlKey?l.key=h.C0.ESC+"[6;"+(s+1)+"~":l.key=h.C0.ESC+"[6~";break;case 112:l.key=s?h.C0.ESC+"[1;"+(s+1)+"P":h.C0.ESC+"OP";break;case 113:l.key=s?h.C0.ESC+"[1;"+(s+1)+"Q":h.C0.ESC+"OQ";break;case 114:l.key=s?h.C0.ESC+"[1;"+(s+1)+"R":h.C0.ESC+"OR";break;case 115:l.key=s?h.C0.ESC+"[1;"+(s+1)+"S":h.C0.ESC+"OS";break;case 116:l.key=s?h.C0.ESC+"[15;"+(s+1)+"~":h.C0.ESC+"[15~";break;case 117:l.key=s?h.C0.ESC+"[17;"+(s+1)+"~":h.C0.ESC+"[17~";break;case 118:l.key=s?h.C0.ESC+"[18;"+(s+1)+"~":h.C0.ESC+"[18~";break;case 119:l.key=s?h.C0.ESC+"[19;"+(s+1)+"~":h.C0.ESC+"[19~";break;case 120:l.key=s?h.C0.ESC+"[20;"+(s+1)+"~":h.C0.ESC+"[20~";break;case 121:l.key=s?h.C0.ESC+"[21;"+(s+1)+"~":h.C0.ESC+"[21~";break;case 122:l.key=s?h.C0.ESC+"[23;"+(s+1)+"~":h.C0.ESC+"[23~";break;case 123:l.key=s?h.C0.ESC+"[24;"+(s+1)+"~":h.C0.ESC+"[24~";break;default:if(!n.ctrlKey||n.shiftKey||n.altKey||n.metaKey)if(u&&!g||!n.altKey||n.metaKey)!u||n.altKey||n.ctrlKey||n.shiftKey||!n.metaKey?n.key&&!n.ctrlKey&&!n.altKey&&!n.metaKey&&n.keyCode>=48&&n.key.length===1?l.key=n.key:n.key&&n.ctrlKey&&(n.key==="_"&&(l.key=h.C0.US),n.key==="@"&&(l.key=h.C0.NUL)):n.keyCode===65&&(l.type=1);else{const r=d[n.keyCode],e=r==null?void 0:r[n.shiftKey?1:0];if(e)l.key=h.C0.ESC+e;else if(n.keyCode>=65&&n.keyCode<=90){const t=n.ctrlKey?n.keyCode-64:n.keyCode+32;let a=String.fromCharCode(t);n.shiftKey&&(a=a.toUpperCase()),l.key=h.C0.ESC+a}else if(n.keyCode===32)l.key=h.C0.ESC+(n.ctrlKey?h.C0.NUL:" ");else if(n.key==="Dead"&&n.code.startsWith("Key")){let t=n.code.slice(3,4);n.shiftKey||(t=t.toLowerCase()),l.key=h.C0.ESC+t,l.cancel=!0}}else n.keyCode>=65&&n.keyCode<=90?l.key=String.fromCharCode(n.keyCode-64):n.keyCode===32?l.key=h.C0.NUL:n.keyCode>=51&&n.keyCode<=55?l.key=String.fromCharCode(n.keyCode-51+27):n.keyCode===56?l.key=h.C0.DEL:n.keyCode===219?l.key=h.C0.ESC:n.keyCode===220?l.key=h.C0.FS:n.keyCode===221&&(l.key=h.C0.GS)}return l}},482:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Utf8ToUtf32=i.StringToUtf32=i.utf32ToString=i.stringFromCodePoint=void 0,i.stringFromCodePoint=function(o){return o>65535?(o-=65536,String.fromCharCode(55296+(o>>10))+String.fromCharCode(o%1024+56320)):String.fromCharCode(o)},i.utf32ToString=function(o,h=0,d=o.length){let n="";for(let f=h;f<d;++f){let u=o[f];u>65535?(u-=65536,n+=String.fromCharCode(55296+(u>>10))+String.fromCharCode(u%1024+56320)):n+=String.fromCharCode(u)}return n},i.StringToUtf32=class{constructor(){this._interim=0}clear(){this._interim=0}decode(o,h){const d=o.length;if(!d)return 0;let n=0,f=0;if(this._interim){const u=o.charCodeAt(f++);56320<=u&&u<=57343?h[n++]=1024*(this._interim-55296)+u-56320+65536:(h[n++]=this._interim,h[n++]=u),this._interim=0}for(let u=f;u<d;++u){const g=o.charCodeAt(u);if(55296<=g&&g<=56319){if(++u>=d)return this._interim=g,n;const l=o.charCodeAt(u);56320<=l&&l<=57343?h[n++]=1024*(g-55296)+l-56320+65536:(h[n++]=g,h[n++]=l)}else g!==65279&&(h[n++]=g)}return n}},i.Utf8ToUtf32=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(o,h){const d=o.length;if(!d)return 0;let n,f,u,g,l=0,s=0,r=0;if(this.interim[0]){let a=!1,p=this.interim[0];p&=(224&p)==192?31:(240&p)==224?15:7;let _,m=0;for(;(_=63&this.interim[++m])&&m<4;)p<<=6,p|=_;const c=(224&this.interim[0])==192?2:(240&this.interim[0])==224?3:4,v=c-m;for(;r<v;){if(r>=d)return 0;if(_=o[r++],(192&_)!=128){r--,a=!0;break}this.interim[m++]=_,p<<=6,p|=63&_}a||(c===2?p<128?r--:h[l++]=p:c===3?p<2048||p>=55296&&p<=57343||p===65279||(h[l++]=p):p<65536||p>1114111||(h[l++]=p)),this.interim.fill(0)}const e=d-4;let t=r;for(;t<d;){for(;!(!(t<e)||128&(n=o[t])||128&(f=o[t+1])||128&(u=o[t+2])||128&(g=o[t+3]));)h[l++]=n,h[l++]=f,h[l++]=u,h[l++]=g,t+=4;if(n=o[t++],n<128)h[l++]=n;else if((224&n)==192){if(t>=d)return this.interim[0]=n,l;if(f=o[t++],(192&f)!=128){t--;continue}if(s=(31&n)<<6|63&f,s<128){t--;continue}h[l++]=s}else if((240&n)==224){if(t>=d)return this.interim[0]=n,l;if(f=o[t++],(192&f)!=128){t--;continue}if(t>=d)return this.interim[0]=n,this.interim[1]=f,l;if(u=o[t++],(192&u)!=128){t--;continue}if(s=(15&n)<<12|(63&f)<<6|63&u,s<2048||s>=55296&&s<=57343||s===65279)continue;h[l++]=s}else if((248&n)==240){if(t>=d)return this.interim[0]=n,l;if(f=o[t++],(192&f)!=128){t--;continue}if(t>=d)return this.interim[0]=n,this.interim[1]=f,l;if(u=o[t++],(192&u)!=128){t--;continue}if(t>=d)return this.interim[0]=n,this.interim[1]=f,this.interim[2]=u,l;if(g=o[t++],(192&g)!=128){t--;continue}if(s=(7&n)<<18|(63&f)<<12|(63&u)<<6|63&g,s<65536||s>1114111)continue;h[l++]=s}}return l}}},225:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.UnicodeV6=void 0;const h=o(1480),d=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],n=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]];let f;i.UnicodeV6=class{constructor(){if(this.version="6",!f){f=new Uint8Array(65536),f.fill(1),f[0]=0,f.fill(0,1,32),f.fill(0,127,160),f.fill(2,4352,4448),f[9001]=2,f[9002]=2,f.fill(2,11904,42192),f[12351]=1,f.fill(2,44032,55204),f.fill(2,63744,64256),f.fill(2,65040,65050),f.fill(2,65072,65136),f.fill(2,65280,65377),f.fill(2,65504,65511);for(let u=0;u<d.length;++u)f.fill(0,d[u][0],d[u][1]+1)}}wcwidth(u){return u<32?0:u<127?1:u<65536?f[u]:function(g,l){let s,r=0,e=l.length-1;if(g<l[0][0]||g>l[e][1])return!1;for(;e>=r;)if(s=r+e>>1,g>l[s][1])r=s+1;else{if(!(g<l[s][0]))return!0;e=s-1}return!1}(u,n)?0:u>=131072&&u<=196605||u>=196608&&u<=262141?2:1}charProperties(u,g){let l=this.wcwidth(u),s=l===0&&g!==0;if(s){const r=h.UnicodeService.extractWidth(g);r===0?s=!1:r>l&&(l=r)}return h.UnicodeService.createPropertyValue(0,l,s)}}},5981:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.WriteBuffer=void 0;const h=o(8460),d=o(844);class n extends d.Disposable{constructor(u){super(),this._action=u,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this.register(new h.EventEmitter),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(u,g){if(g!==void 0&&this._syncCalls>g)return void(this._syncCalls=0);if(this._pendingData+=u.length,this._writeBuffer.push(u),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;let l;for(this._isSyncWriting=!0;l=this._writeBuffer.shift();){this._action(l);const s=this._callbacks.shift();s&&s()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(u,g){if(this._pendingData>5e7)throw new Error("write data discarded, use flow control to avoid losing data");if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput)return this._didUserInput=!1,this._pendingData+=u.length,this._writeBuffer.push(u),this._callbacks.push(g),void this._innerWrite();setTimeout(()=>this._innerWrite())}this._pendingData+=u.length,this._writeBuffer.push(u),this._callbacks.push(g)}_innerWrite(u=0,g=!0){const l=u||Date.now();for(;this._writeBuffer.length>this._bufferOffset;){const s=this._writeBuffer[this._bufferOffset],r=this._action(s,g);if(r){const t=a=>Date.now()-l>=12?setTimeout(()=>this._innerWrite(0,a)):this._innerWrite(l,a);return void r.catch(a=>(queueMicrotask(()=>{throw a}),Promise.resolve(!1))).then(t)}const e=this._callbacks[this._bufferOffset];if(e&&e(),this._bufferOffset++,this._pendingData-=s.length,Date.now()-l>=12)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>50&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout(()=>this._innerWrite())):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}}i.WriteBuffer=n},5941:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.toRgbString=i.parseColor=void 0;const o=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,h=/^[\da-f]+$/;function d(n,f){const u=n.toString(16),g=u.length<2?"0"+u:u;switch(f){case 4:return u[0];case 8:return g;case 12:return(g+g).slice(0,3);default:return g+g}}i.parseColor=function(n){if(!n)return;let f=n.toLowerCase();if(f.indexOf("rgb:")===0){f=f.slice(4);const u=o.exec(f);if(u){const g=u[1]?15:u[4]?255:u[7]?4095:65535;return[Math.round(parseInt(u[1]||u[4]||u[7]||u[10],16)/g*255),Math.round(parseInt(u[2]||u[5]||u[8]||u[11],16)/g*255),Math.round(parseInt(u[3]||u[6]||u[9]||u[12],16)/g*255)]}}else if(f.indexOf("#")===0&&(f=f.slice(1),h.exec(f)&&[3,6,9,12].includes(f.length))){const u=f.length/3,g=[0,0,0];for(let l=0;l<3;++l){const s=parseInt(f.slice(u*l,u*l+u),16);g[l]=u===1?s<<4:u===2?s:u===3?s>>4:s>>8}return g}},i.toRgbString=function(n,f=16){const[u,g,l]=n;return`rgb:${d(u,f)}/${d(g,f)}/${d(l,f)}`}},5770:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.PAYLOAD_LIMIT=void 0,i.PAYLOAD_LIMIT=1e7},6351:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.DcsHandler=i.DcsParser=void 0;const h=o(482),d=o(8742),n=o(5770),f=[];i.DcsParser=class{constructor(){this._handlers=Object.create(null),this._active=f,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=f}registerHandler(g,l){this._handlers[g]===void 0&&(this._handlers[g]=[]);const s=this._handlers[g];return s.push(l),{dispose:()=>{const r=s.indexOf(l);r!==-1&&s.splice(r,1)}}}clearHandler(g){this._handlers[g]&&delete this._handlers[g]}setHandlerFallback(g){this._handlerFb=g}reset(){if(this._active.length)for(let g=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;g>=0;--g)this._active[g].unhook(!1);this._stack.paused=!1,this._active=f,this._ident=0}hook(g,l){if(this.reset(),this._ident=g,this._active=this._handlers[g]||f,this._active.length)for(let s=this._active.length-1;s>=0;s--)this._active[s].hook(l);else this._handlerFb(this._ident,"HOOK",l)}put(g,l,s){if(this._active.length)for(let r=this._active.length-1;r>=0;r--)this._active[r].put(g,l,s);else this._handlerFb(this._ident,"PUT",(0,h.utf32ToString)(g,l,s))}unhook(g,l=!0){if(this._active.length){let s=!1,r=this._active.length-1,e=!1;if(this._stack.paused&&(r=this._stack.loopPosition-1,s=l,e=this._stack.fallThrough,this._stack.paused=!1),!e&&s===!1){for(;r>=0&&(s=this._active[r].unhook(g),s!==!0);r--)if(s instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!1,s;r--}for(;r>=0;r--)if(s=this._active[r].unhook(!1),s instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!0,s}else this._handlerFb(this._ident,"UNHOOK",g);this._active=f,this._ident=0}};const u=new d.Params;u.addParam(0),i.DcsHandler=class{constructor(g){this._handler=g,this._data="",this._params=u,this._hitLimit=!1}hook(g){this._params=g.length>1||g.params[0]?g.clone():u,this._data="",this._hitLimit=!1}put(g,l,s){this._hitLimit||(this._data+=(0,h.utf32ToString)(g,l,s),this._data.length>n.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}unhook(g){let l=!1;if(this._hitLimit)l=!1;else if(g&&(l=this._handler(this._data,this._params),l instanceof Promise))return l.then(s=>(this._params=u,this._data="",this._hitLimit=!1,s));return this._params=u,this._data="",this._hitLimit=!1,l}}},2015:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.EscapeSequenceParser=i.VT500_TRANSITION_TABLE=i.TransitionTable=void 0;const h=o(844),d=o(8742),n=o(6242),f=o(6351);class u{constructor(r){this.table=new Uint8Array(r)}setDefault(r,e){this.table.fill(r<<4|e)}add(r,e,t,a){this.table[e<<8|r]=t<<4|a}addMany(r,e,t,a){for(let p=0;p<r.length;p++)this.table[e<<8|r[p]]=t<<4|a}}i.TransitionTable=u;const g=160;i.VT500_TRANSITION_TABLE=function(){const s=new u(4095),r=Array.apply(null,Array(256)).map((m,c)=>c),e=(m,c)=>r.slice(m,c),t=e(32,127),a=e(0,24);a.push(25),a.push.apply(a,e(28,32));const p=e(0,14);let _;for(_ in s.setDefault(1,0),s.addMany(t,0,2,0),p)s.addMany([24,26,153,154],_,3,0),s.addMany(e(128,144),_,3,0),s.addMany(e(144,152),_,3,0),s.add(156,_,0,0),s.add(27,_,11,1),s.add(157,_,4,8),s.addMany([152,158,159],_,0,7),s.add(155,_,11,3),s.add(144,_,11,9);return s.addMany(a,0,3,0),s.addMany(a,1,3,1),s.add(127,1,0,1),s.addMany(a,8,0,8),s.addMany(a,3,3,3),s.add(127,3,0,3),s.addMany(a,4,3,4),s.add(127,4,0,4),s.addMany(a,6,3,6),s.addMany(a,5,3,5),s.add(127,5,0,5),s.addMany(a,2,3,2),s.add(127,2,0,2),s.add(93,1,4,8),s.addMany(t,8,5,8),s.add(127,8,5,8),s.addMany([156,27,24,26,7],8,6,0),s.addMany(e(28,32),8,0,8),s.addMany([88,94,95],1,0,7),s.addMany(t,7,0,7),s.addMany(a,7,0,7),s.add(156,7,0,0),s.add(127,7,0,7),s.add(91,1,11,3),s.addMany(e(64,127),3,7,0),s.addMany(e(48,60),3,8,4),s.addMany([60,61,62,63],3,9,4),s.addMany(e(48,60),4,8,4),s.addMany(e(64,127),4,7,0),s.addMany([60,61,62,63],4,0,6),s.addMany(e(32,64),6,0,6),s.add(127,6,0,6),s.addMany(e(64,127),6,0,0),s.addMany(e(32,48),3,9,5),s.addMany(e(32,48),5,9,5),s.addMany(e(48,64),5,0,6),s.addMany(e(64,127),5,7,0),s.addMany(e(32,48),4,9,5),s.addMany(e(32,48),1,9,2),s.addMany(e(32,48),2,9,2),s.addMany(e(48,127),2,10,0),s.addMany(e(48,80),1,10,0),s.addMany(e(81,88),1,10,0),s.addMany([89,90,92],1,10,0),s.addMany(e(96,127),1,10,0),s.add(80,1,11,9),s.addMany(a,9,0,9),s.add(127,9,0,9),s.addMany(e(28,32),9,0,9),s.addMany(e(32,48),9,9,12),s.addMany(e(48,60),9,8,10),s.addMany([60,61,62,63],9,9,10),s.addMany(a,11,0,11),s.addMany(e(32,128),11,0,11),s.addMany(e(28,32),11,0,11),s.addMany(a,10,0,10),s.add(127,10,0,10),s.addMany(e(28,32),10,0,10),s.addMany(e(48,60),10,8,10),s.addMany([60,61,62,63],10,0,11),s.addMany(e(32,48),10,9,12),s.addMany(a,12,0,12),s.add(127,12,0,12),s.addMany(e(28,32),12,0,12),s.addMany(e(32,48),12,9,12),s.addMany(e(48,64),12,0,11),s.addMany(e(64,127),12,12,13),s.addMany(e(64,127),10,12,13),s.addMany(e(64,127),9,12,13),s.addMany(a,13,13,13),s.addMany(t,13,13,13),s.add(127,13,0,13),s.addMany([27,156,24,26],13,14,0),s.add(g,0,2,0),s.add(g,8,5,8),s.add(g,6,0,6),s.add(g,11,0,11),s.add(g,13,13,13),s}();class l extends h.Disposable{constructor(r=i.VT500_TRANSITION_TABLE){super(),this._transitions=r,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new d.Params,this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._printHandlerFb=(e,t,a)=>{},this._executeHandlerFb=e=>{},this._csiHandlerFb=(e,t)=>{},this._escHandlerFb=e=>{},this._errorHandlerFb=e=>e,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this.register((0,h.toDisposable)(()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)})),this._oscParser=this.register(new n.OscParser),this._dcsParser=this.register(new f.DcsParser),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:"\\"},()=>!0)}_identifier(r,e=[64,126]){let t=0;if(r.prefix){if(r.prefix.length>1)throw new Error("only one byte as prefix supported");if(t=r.prefix.charCodeAt(0),t&&60>t||t>63)throw new Error("prefix must be in range 0x3c .. 0x3f")}if(r.intermediates){if(r.intermediates.length>2)throw new Error("only two bytes as intermediates are supported");for(let p=0;p<r.intermediates.length;++p){const _=r.intermediates.charCodeAt(p);if(32>_||_>47)throw new Error("intermediate must be in range 0x20 .. 0x2f");t<<=8,t|=_}}if(r.final.length!==1)throw new Error("final must be a single byte");const a=r.final.charCodeAt(0);if(e[0]>a||a>e[1])throw new Error(`final must be in range ${e[0]} .. ${e[1]}`);return t<<=8,t|=a,t}identToString(r){const e=[];for(;r;)e.push(String.fromCharCode(255&r)),r>>=8;return e.reverse().join("")}setPrintHandler(r){this._printHandler=r}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(r,e){const t=this._identifier(r,[48,126]);this._escHandlers[t]===void 0&&(this._escHandlers[t]=[]);const a=this._escHandlers[t];return a.push(e),{dispose:()=>{const p=a.indexOf(e);p!==-1&&a.splice(p,1)}}}clearEscHandler(r){this._escHandlers[this._identifier(r,[48,126])]&&delete this._escHandlers[this._identifier(r,[48,126])]}setEscHandlerFallback(r){this._escHandlerFb=r}setExecuteHandler(r,e){this._executeHandlers[r.charCodeAt(0)]=e}clearExecuteHandler(r){this._executeHandlers[r.charCodeAt(0)]&&delete this._executeHandlers[r.charCodeAt(0)]}setExecuteHandlerFallback(r){this._executeHandlerFb=r}registerCsiHandler(r,e){const t=this._identifier(r);this._csiHandlers[t]===void 0&&(this._csiHandlers[t]=[]);const a=this._csiHandlers[t];return a.push(e),{dispose:()=>{const p=a.indexOf(e);p!==-1&&a.splice(p,1)}}}clearCsiHandler(r){this._csiHandlers[this._identifier(r)]&&delete this._csiHandlers[this._identifier(r)]}setCsiHandlerFallback(r){this._csiHandlerFb=r}registerDcsHandler(r,e){return this._dcsParser.registerHandler(this._identifier(r),e)}clearDcsHandler(r){this._dcsParser.clearHandler(this._identifier(r))}setDcsHandlerFallback(r){this._dcsParser.setHandlerFallback(r)}registerOscHandler(r,e){return this._oscParser.registerHandler(r,e)}clearOscHandler(r){this._oscParser.clearHandler(r)}setOscHandlerFallback(r){this._oscParser.setHandlerFallback(r)}setErrorHandler(r){this._errorHandler=r}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(r,e,t,a,p){this._parseStack.state=r,this._parseStack.handlers=e,this._parseStack.handlerPos=t,this._parseStack.transition=a,this._parseStack.chunkPos=p}parse(r,e,t){let a,p=0,_=0,m=0;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,m=this._parseStack.chunkPos+1;else{if(t===void 0||this._parseStack.state===1)throw this._parseStack.state=1,new Error("improper continuation due to previous async handler, giving up parsing");const c=this._parseStack.handlers;let v=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(t===!1&&v>-1){for(;v>=0&&(a=c[v](this._params),a!==!0);v--)if(a instanceof Promise)return this._parseStack.handlerPos=v,a}this._parseStack.handlers=[];break;case 4:if(t===!1&&v>-1){for(;v>=0&&(a=c[v](),a!==!0);v--)if(a instanceof Promise)return this._parseStack.handlerPos=v,a}this._parseStack.handlers=[];break;case 6:if(p=r[this._parseStack.chunkPos],a=this._dcsParser.unhook(p!==24&&p!==26,t),a)return a;p===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(p=r[this._parseStack.chunkPos],a=this._oscParser.end(p!==24&&p!==26,t),a)return a;p===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0}this._parseStack.state=0,m=this._parseStack.chunkPos+1,this.precedingJoinState=0,this.currentState=15&this._parseStack.transition}for(let c=m;c<e;++c){switch(p=r[c],_=this._transitions.table[this.currentState<<8|(p<160?p:g)],_>>4){case 2:for(let w=c+1;;++w){if(w>=e||(p=r[w])<32||p>126&&p<g){this._printHandler(r,c,w),c=w-1;break}if(++w>=e||(p=r[w])<32||p>126&&p<g){this._printHandler(r,c,w),c=w-1;break}if(++w>=e||(p=r[w])<32||p>126&&p<g){this._printHandler(r,c,w),c=w-1;break}if(++w>=e||(p=r[w])<32||p>126&&p<g){this._printHandler(r,c,w),c=w-1;break}}break;case 3:this._executeHandlers[p]?this._executeHandlers[p]():this._executeHandlerFb(p),this.precedingJoinState=0;break;case 0:break;case 1:if(this._errorHandler({position:c,code:p,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:const v=this._csiHandlers[this._collect<<8|p];let C=v?v.length-1:-1;for(;C>=0&&(a=v[C](this._params),a!==!0);C--)if(a instanceof Promise)return this._preserveStack(3,v,C,_,c),a;C<0&&this._csiHandlerFb(this._collect<<8|p,this._params),this.precedingJoinState=0;break;case 8:do switch(p){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(p-48)}while(++c<e&&(p=r[c])>47&&p<60);c--;break;case 9:this._collect<<=8,this._collect|=p;break;case 10:const x=this._escHandlers[this._collect<<8|p];let k=x?x.length-1:-1;for(;k>=0&&(a=x[k](),a!==!0);k--)if(a instanceof Promise)return this._preserveStack(4,x,k,_,c),a;k<0&&this._escHandlerFb(this._collect<<8|p),this.precedingJoinState=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|p,this._params);break;case 13:for(let w=c+1;;++w)if(w>=e||(p=r[w])===24||p===26||p===27||p>127&&p<g){this._dcsParser.put(r,c,w),c=w-1;break}break;case 14:if(a=this._dcsParser.unhook(p!==24&&p!==26),a)return this._preserveStack(6,[],0,_,c),a;p===27&&(_|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0;break;case 4:this._oscParser.start();break;case 5:for(let w=c+1;;w++)if(w>=e||(p=r[w])<32||p>127&&p<g){this._oscParser.put(r,c,w),c=w-1;break}break;case 6:if(a=this._oscParser.end(p!==24&&p!==26),a)return this._preserveStack(5,[],0,_,c),a;p===27&&(_|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0}this.currentState=15&_}}}i.EscapeSequenceParser=l},6242:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.OscHandler=i.OscParser=void 0;const h=o(5770),d=o(482),n=[];i.OscParser=class{constructor(){this._state=0,this._active=n,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(f,u){this._handlers[f]===void 0&&(this._handlers[f]=[]);const g=this._handlers[f];return g.push(u),{dispose:()=>{const l=g.indexOf(u);l!==-1&&g.splice(l,1)}}}clearHandler(f){this._handlers[f]&&delete this._handlers[f]}setHandlerFallback(f){this._handlerFb=f}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=n}reset(){if(this._state===2)for(let f=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;f>=0;--f)this._active[f].end(!1);this._stack.paused=!1,this._active=n,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||n,this._active.length)for(let f=this._active.length-1;f>=0;f--)this._active[f].start();else this._handlerFb(this._id,"START")}_put(f,u,g){if(this._active.length)for(let l=this._active.length-1;l>=0;l--)this._active[l].put(f,u,g);else this._handlerFb(this._id,"PUT",(0,d.utf32ToString)(f,u,g))}start(){this.reset(),this._state=1}put(f,u,g){if(this._state!==3){if(this._state===1)for(;u<g;){const l=f[u++];if(l===59){this._state=2,this._start();break}if(l<48||57<l)return void(this._state=3);this._id===-1&&(this._id=0),this._id=10*this._id+l-48}this._state===2&&g-u>0&&this._put(f,u,g)}}end(f,u=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),this._active.length){let g=!1,l=this._active.length-1,s=!1;if(this._stack.paused&&(l=this._stack.loopPosition-1,g=u,s=this._stack.fallThrough,this._stack.paused=!1),!s&&g===!1){for(;l>=0&&(g=this._active[l].end(f),g!==!0);l--)if(g instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=l,this._stack.fallThrough=!1,g;l--}for(;l>=0;l--)if(g=this._active[l].end(!1),g instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=l,this._stack.fallThrough=!0,g}else this._handlerFb(this._id,"END",f);this._active=n,this._id=-1,this._state=0}}},i.OscHandler=class{constructor(f){this._handler=f,this._data="",this._hitLimit=!1}start(){this._data="",this._hitLimit=!1}put(f,u,g){this._hitLimit||(this._data+=(0,d.utf32ToString)(f,u,g),this._data.length>h.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}end(f){let u=!1;if(this._hitLimit)u=!1;else if(f&&(u=this._handler(this._data),u instanceof Promise))return u.then(g=>(this._data="",this._hitLimit=!1,g));return this._data="",this._hitLimit=!1,u}}},8742:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Params=void 0;const o=2147483647;class h{static fromArray(n){const f=new h;if(!n.length)return f;for(let u=Array.isArray(n[0])?1:0;u<n.length;++u){const g=n[u];if(Array.isArray(g))for(let l=0;l<g.length;++l)f.addSubParam(g[l]);else f.addParam(g)}return f}constructor(n=32,f=32){if(this.maxLength=n,this.maxSubParamsLength=f,f>256)throw new Error("maxSubParamsLength must not be greater than 256");this.params=new Int32Array(n),this.length=0,this._subParams=new Int32Array(f),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(n),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}clone(){const n=new h(this.maxLength,this.maxSubParamsLength);return n.params.set(this.params),n.length=this.length,n._subParams.set(this._subParams),n._subParamsLength=this._subParamsLength,n._subParamsIdx.set(this._subParamsIdx),n._rejectDigits=this._rejectDigits,n._rejectSubDigits=this._rejectSubDigits,n._digitIsSub=this._digitIsSub,n}toArray(){const n=[];for(let f=0;f<this.length;++f){n.push(this.params[f]);const u=this._subParamsIdx[f]>>8,g=255&this._subParamsIdx[f];g-u>0&&n.push(Array.prototype.slice.call(this._subParams,u,g))}return n}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(n){if(this._digitIsSub=!1,this.length>=this.maxLength)this._rejectDigits=!0;else{if(n<-1)throw new Error("values lesser than -1 are not allowed");this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=n>o?o:n}}addSubParam(n){if(this._digitIsSub=!0,this.length)if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength)this._rejectSubDigits=!0;else{if(n<-1)throw new Error("values lesser than -1 are not allowed");this._subParams[this._subParamsLength++]=n>o?o:n,this._subParamsIdx[this.length-1]++}}hasSubParams(n){return(255&this._subParamsIdx[n])-(this._subParamsIdx[n]>>8)>0}getSubParams(n){const f=this._subParamsIdx[n]>>8,u=255&this._subParamsIdx[n];return u-f>0?this._subParams.subarray(f,u):null}getSubParamsAll(){const n={};for(let f=0;f<this.length;++f){const u=this._subParamsIdx[f]>>8,g=255&this._subParamsIdx[f];g-u>0&&(n[f]=this._subParams.slice(u,g))}return n}addDigit(n){let f;if(this._rejectDigits||!(f=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;const u=this._digitIsSub?this._subParams:this.params,g=u[f-1];u[f-1]=~g?Math.min(10*g+n,o):n}}i.Params=h},5741:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.AddonManager=void 0,i.AddonManager=class{constructor(){this._addons=[]}dispose(){for(let o=this._addons.length-1;o>=0;o--)this._addons[o].instance.dispose()}loadAddon(o,h){const d={instance:h,dispose:h.dispose,isDisposed:!1};this._addons.push(d),h.dispose=()=>this._wrappedAddonDispose(d),h.activate(o)}_wrappedAddonDispose(o){if(o.isDisposed)return;let h=-1;for(let d=0;d<this._addons.length;d++)if(this._addons[d]===o){h=d;break}if(h===-1)throw new Error("Could not dispose an addon that has not been loaded");o.isDisposed=!0,o.dispose.apply(o.instance),this._addons.splice(h,1)}}},8771:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.BufferApiView=void 0;const h=o(3785),d=o(511);i.BufferApiView=class{constructor(n,f){this._buffer=n,this.type=f}init(n){return this._buffer=n,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(n){const f=this._buffer.lines.get(n);if(f)return new h.BufferLineApiView(f)}getNullCell(){return new d.CellData}}},3785:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.BufferLineApiView=void 0;const h=o(511);i.BufferLineApiView=class{constructor(d){this._line=d}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(d,n){if(!(d<0||d>=this._line.length))return n?(this._line.loadCell(d,n),n):this._line.loadCell(d,new h.CellData)}translateToString(d,n,f){return this._line.translateToString(d,n,f)}}},8285:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.BufferNamespaceApi=void 0;const h=o(8771),d=o(8460),n=o(844);class f extends n.Disposable{constructor(g){super(),this._core=g,this._onBufferChange=this.register(new d.EventEmitter),this.onBufferChange=this._onBufferChange.event,this._normal=new h.BufferApiView(this._core.buffers.normal,"normal"),this._alternate=new h.BufferApiView(this._core.buffers.alt,"alternate"),this._core.buffers.onBufferActivate(()=>this._onBufferChange.fire(this.active))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw new Error("Active buffer is neither normal nor alternate")}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}}i.BufferNamespaceApi=f},7975:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ParserApi=void 0,i.ParserApi=class{constructor(o){this._core=o}registerCsiHandler(o,h){return this._core.registerCsiHandler(o,d=>h(d.toArray()))}addCsiHandler(o,h){return this.registerCsiHandler(o,h)}registerDcsHandler(o,h){return this._core.registerDcsHandler(o,(d,n)=>h(d,n.toArray()))}addDcsHandler(o,h){return this.registerDcsHandler(o,h)}registerEscHandler(o,h){return this._core.registerEscHandler(o,h)}addEscHandler(o,h){return this.registerEscHandler(o,h)}registerOscHandler(o,h){return this._core.registerOscHandler(o,h)}addOscHandler(o,h){return this.registerOscHandler(o,h)}}},7090:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.UnicodeApi=void 0,i.UnicodeApi=class{constructor(o){this._core=o}register(o){this._core.unicodeService.register(o)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(o){this._core.unicodeService.activeVersion=o}}},744:function(A,i,o){var h=this&&this.__decorate||function(s,r,e,t){var a,p=arguments.length,_=p<3?r:t===null?t=Object.getOwnPropertyDescriptor(r,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")_=Reflect.decorate(s,r,e,t);else for(var m=s.length-1;m>=0;m--)(a=s[m])&&(_=(p<3?a(_):p>3?a(r,e,_):a(r,e))||_);return p>3&&_&&Object.defineProperty(r,e,_),_},d=this&&this.__param||function(s,r){return function(e,t){r(e,t,s)}};Object.defineProperty(i,"__esModule",{value:!0}),i.BufferService=i.MINIMUM_ROWS=i.MINIMUM_COLS=void 0;const n=o(8460),f=o(844),u=o(5295),g=o(2585);i.MINIMUM_COLS=2,i.MINIMUM_ROWS=1;let l=i.BufferService=class extends f.Disposable{get buffer(){return this.buffers.active}constructor(s){super(),this.isUserScrolling=!1,this._onResize=this.register(new n.EventEmitter),this.onResize=this._onResize.event,this._onScroll=this.register(new n.EventEmitter),this.onScroll=this._onScroll.event,this.cols=Math.max(s.rawOptions.cols||0,i.MINIMUM_COLS),this.rows=Math.max(s.rawOptions.rows||0,i.MINIMUM_ROWS),this.buffers=this.register(new u.BufferSet(s,this))}resize(s,r){this.cols=s,this.rows=r,this.buffers.resize(s,r),this._onResize.fire({cols:s,rows:r})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(s,r=!1){const e=this.buffer;let t;t=this._cachedBlankLine,t&&t.length===this.cols&&t.getFg(0)===s.fg&&t.getBg(0)===s.bg||(t=e.getBlankLine(s,r),this._cachedBlankLine=t),t.isWrapped=r;const a=e.ybase+e.scrollTop,p=e.ybase+e.scrollBottom;if(e.scrollTop===0){const _=e.lines.isFull;p===e.lines.length-1?_?e.lines.recycle().copyFrom(t):e.lines.push(t.clone()):e.lines.splice(p+1,0,t.clone()),_?this.isUserScrolling&&(e.ydisp=Math.max(e.ydisp-1,0)):(e.ybase++,this.isUserScrolling||e.ydisp++)}else{const _=p-a+1;e.lines.shiftElements(a+1,_-1,-1),e.lines.set(p,t.clone())}this.isUserScrolling||(e.ydisp=e.ybase),this._onScroll.fire(e.ydisp)}scrollLines(s,r,e){const t=this.buffer;if(s<0){if(t.ydisp===0)return;this.isUserScrolling=!0}else s+t.ydisp>=t.ybase&&(this.isUserScrolling=!1);const a=t.ydisp;t.ydisp=Math.max(Math.min(t.ydisp+s,t.ybase),0),a!==t.ydisp&&(r||this._onScroll.fire(t.ydisp))}};i.BufferService=l=h([d(0,g.IOptionsService)],l)},7994:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.CharsetService=void 0,i.CharsetService=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(o){this.glevel=o,this.charset=this._charsets[o]}setgCharset(o,h){this._charsets[o]=h,this.glevel===o&&(this.charset=h)}}},1753:function(A,i,o){var h=this&&this.__decorate||function(t,a,p,_){var m,c=arguments.length,v=c<3?a:_===null?_=Object.getOwnPropertyDescriptor(a,p):_;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")v=Reflect.decorate(t,a,p,_);else for(var C=t.length-1;C>=0;C--)(m=t[C])&&(v=(c<3?m(v):c>3?m(a,p,v):m(a,p))||v);return c>3&&v&&Object.defineProperty(a,p,v),v},d=this&&this.__param||function(t,a){return function(p,_){a(p,_,t)}};Object.defineProperty(i,"__esModule",{value:!0}),i.CoreMouseService=void 0;const n=o(2585),f=o(8460),u=o(844),g={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:t=>t.button!==4&&t.action===1&&(t.ctrl=!1,t.alt=!1,t.shift=!1,!0)},VT200:{events:19,restrict:t=>t.action!==32},DRAG:{events:23,restrict:t=>t.action!==32||t.button!==3},ANY:{events:31,restrict:t=>!0}};function l(t,a){let p=(t.ctrl?16:0)|(t.shift?4:0)|(t.alt?8:0);return t.button===4?(p|=64,p|=t.action):(p|=3&t.button,4&t.button&&(p|=64),8&t.button&&(p|=128),t.action===32?p|=32:t.action!==0||a||(p|=3)),p}const s=String.fromCharCode,r={DEFAULT:t=>{const a=[l(t,!1)+32,t.col+32,t.row+32];return a[0]>255||a[1]>255||a[2]>255?"":`\x1B[M${s(a[0])}${s(a[1])}${s(a[2])}`},SGR:t=>{const a=t.action===0&&t.button!==4?"m":"M";return`\x1B[<${l(t,!0)};${t.col};${t.row}${a}`},SGR_PIXELS:t=>{const a=t.action===0&&t.button!==4?"m":"M";return`\x1B[<${l(t,!0)};${t.x};${t.y}${a}`}};let e=i.CoreMouseService=class extends u.Disposable{constructor(t,a){super(),this._bufferService=t,this._coreService=a,this._protocols={},this._encodings={},this._activeProtocol="",this._activeEncoding="",this._lastEvent=null,this._onProtocolChange=this.register(new f.EventEmitter),this.onProtocolChange=this._onProtocolChange.event;for(const p of Object.keys(g))this.addProtocol(p,g[p]);for(const p of Object.keys(r))this.addEncoding(p,r[p]);this.reset()}addProtocol(t,a){this._protocols[t]=a}addEncoding(t,a){this._encodings[t]=a}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(t){if(!this._protocols[t])throw new Error(`unknown protocol "${t}"`);this._activeProtocol=t,this._onProtocolChange.fire(this._protocols[t].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(t){if(!this._encodings[t])throw new Error(`unknown encoding "${t}"`);this._activeEncoding=t}reset(){this.activeProtocol="NONE",this.activeEncoding="DEFAULT",this._lastEvent=null}triggerMouseEvent(t){if(t.col<0||t.col>=this._bufferService.cols||t.row<0||t.row>=this._bufferService.rows||t.button===4&&t.action===32||t.button===3&&t.action!==32||t.button!==4&&(t.action===2||t.action===3)||(t.col++,t.row++,t.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,t,this._activeEncoding==="SGR_PIXELS"))||!this._protocols[this._activeProtocol].restrict(t))return!1;const a=this._encodings[this._activeEncoding](t);return a&&(this._activeEncoding==="DEFAULT"?this._coreService.triggerBinaryEvent(a):this._coreService.triggerDataEvent(a,!0)),this._lastEvent=t,!0}explainEvents(t){return{down:!!(1&t),up:!!(2&t),drag:!!(4&t),move:!!(8&t),wheel:!!(16&t)}}_equalEvents(t,a,p){if(p){if(t.x!==a.x||t.y!==a.y)return!1}else if(t.col!==a.col||t.row!==a.row)return!1;return t.button===a.button&&t.action===a.action&&t.ctrl===a.ctrl&&t.alt===a.alt&&t.shift===a.shift}};i.CoreMouseService=e=h([d(0,n.IBufferService),d(1,n.ICoreService)],e)},6975:function(A,i,o){var h=this&&this.__decorate||function(e,t,a,p){var _,m=arguments.length,c=m<3?t:p===null?p=Object.getOwnPropertyDescriptor(t,a):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,a,p);else for(var v=e.length-1;v>=0;v--)(_=e[v])&&(c=(m<3?_(c):m>3?_(t,a,c):_(t,a))||c);return m>3&&c&&Object.defineProperty(t,a,c),c},d=this&&this.__param||function(e,t){return function(a,p){t(a,p,e)}};Object.defineProperty(i,"__esModule",{value:!0}),i.CoreService=void 0;const n=o(1439),f=o(8460),u=o(844),g=o(2585),l=Object.freeze({insertMode:!1}),s=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,origin:!1,reverseWraparound:!1,sendFocus:!1,wraparound:!0});let r=i.CoreService=class extends u.Disposable{constructor(e,t,a){super(),this._bufferService=e,this._logService=t,this._optionsService=a,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this.register(new f.EventEmitter),this.onData=this._onData.event,this._onUserInput=this.register(new f.EventEmitter),this.onUserInput=this._onUserInput.event,this._onBinary=this.register(new f.EventEmitter),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this.register(new f.EventEmitter),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=(0,n.clone)(l),this.decPrivateModes=(0,n.clone)(s)}reset(){this.modes=(0,n.clone)(l),this.decPrivateModes=(0,n.clone)(s)}triggerDataEvent(e,t=!1){if(this._optionsService.rawOptions.disableStdin)return;const a=this._bufferService.buffer;t&&this._optionsService.rawOptions.scrollOnUserInput&&a.ybase!==a.ydisp&&this._onRequestScrollToBottom.fire(),t&&this._onUserInput.fire(),this._logService.debug(`sending data "${e}"`,()=>e.split("").map(p=>p.charCodeAt(0))),this._onData.fire(e)}triggerBinaryEvent(e){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${e}"`,()=>e.split("").map(t=>t.charCodeAt(0))),this._onBinary.fire(e))}};i.CoreService=r=h([d(0,g.IBufferService),d(1,g.ILogService),d(2,g.IOptionsService)],r)},9074:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.DecorationService=void 0;const h=o(8055),d=o(8460),n=o(844),f=o(6106);let u=0,g=0;class l extends n.Disposable{get decorations(){return this._decorations.values()}constructor(){super(),this._decorations=new f.SortedList(e=>e==null?void 0:e.marker.line),this._onDecorationRegistered=this.register(new d.EventEmitter),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this.register(new d.EventEmitter),this.onDecorationRemoved=this._onDecorationRemoved.event,this.register((0,n.toDisposable)(()=>this.reset()))}registerDecoration(e){if(e.marker.isDisposed)return;const t=new s(e);if(t){const a=t.marker.onDispose(()=>t.dispose());t.onDispose(()=>{t&&(this._decorations.delete(t)&&this._onDecorationRemoved.fire(t),a.dispose())}),this._decorations.insert(t),this._onDecorationRegistered.fire(t)}return t}reset(){for(const e of this._decorations.values())e.dispose();this._decorations.clear()}*getDecorationsAtCell(e,t,a){let p=0,_=0;for(const m of this._decorations.getKeyIterator(t))p=m.options.x??0,_=p+(m.options.width??1),e>=p&&e<_&&(!a||(m.options.layer??"bottom")===a)&&(yield m)}forEachDecorationAtCell(e,t,a,p){this._decorations.forEachByKey(t,_=>{u=_.options.x??0,g=u+(_.options.width??1),e>=u&&e<g&&(!a||(_.options.layer??"bottom")===a)&&p(_)})}}i.DecorationService=l;class s extends n.Disposable{get isDisposed(){return this._isDisposed}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=h.css.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=h.css.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}constructor(e){super(),this.options=e,this.onRenderEmitter=this.register(new d.EventEmitter),this.onRender=this.onRenderEmitter.event,this._onDispose=this.register(new d.EventEmitter),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=e.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position="full")}dispose(){this._onDispose.fire(),super.dispose()}}},4348:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.InstantiationService=i.ServiceCollection=void 0;const h=o(2585),d=o(8343);class n{constructor(...u){this._entries=new Map;for(const[g,l]of u)this.set(g,l)}set(u,g){const l=this._entries.get(u);return this._entries.set(u,g),l}forEach(u){for(const[g,l]of this._entries.entries())u(g,l)}has(u){return this._entries.has(u)}get(u){return this._entries.get(u)}}i.ServiceCollection=n,i.InstantiationService=class{constructor(){this._services=new n,this._services.set(h.IInstantiationService,this)}setService(f,u){this._services.set(f,u)}getService(f){return this._services.get(f)}createInstance(f,...u){const g=(0,d.getServiceDependencies)(f).sort((r,e)=>r.index-e.index),l=[];for(const r of g){const e=this._services.get(r.id);if(!e)throw new Error(`[createInstance] ${f.name} depends on UNKNOWN service ${r.id}.`);l.push(e)}const s=g.length>0?g[0].index:u.length;if(u.length!==s)throw new Error(`[createInstance] First service dependency of ${f.name} at position ${s+1} conflicts with ${u.length} static arguments`);return new f(...u,...l)}}},7866:function(A,i,o){var h=this&&this.__decorate||function(s,r,e,t){var a,p=arguments.length,_=p<3?r:t===null?t=Object.getOwnPropertyDescriptor(r,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")_=Reflect.decorate(s,r,e,t);else for(var m=s.length-1;m>=0;m--)(a=s[m])&&(_=(p<3?a(_):p>3?a(r,e,_):a(r,e))||_);return p>3&&_&&Object.defineProperty(r,e,_),_},d=this&&this.__param||function(s,r){return function(e,t){r(e,t,s)}};Object.defineProperty(i,"__esModule",{value:!0}),i.traceCall=i.setTraceLogger=i.LogService=void 0;const n=o(844),f=o(2585),u={trace:f.LogLevelEnum.TRACE,debug:f.LogLevelEnum.DEBUG,info:f.LogLevelEnum.INFO,warn:f.LogLevelEnum.WARN,error:f.LogLevelEnum.ERROR,off:f.LogLevelEnum.OFF};let g,l=i.LogService=class extends n.Disposable{get logLevel(){return this._logLevel}constructor(s){super(),this._optionsService=s,this._logLevel=f.LogLevelEnum.OFF,this._updateLogLevel(),this.register(this._optionsService.onSpecificOptionChange("logLevel",()=>this._updateLogLevel())),g=this}_updateLogLevel(){this._logLevel=u[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(s){for(let r=0;r<s.length;r++)typeof s[r]=="function"&&(s[r]=s[r]())}_log(s,r,e){this._evalLazyOptionalParams(e),s.call(console,(this._optionsService.options.logger?"":"xterm.js: ")+r,...e)}trace(s,...r){var e;this._logLevel<=f.LogLevelEnum.TRACE&&this._log(((e=this._optionsService.options.logger)==null?void 0:e.trace.bind(this._optionsService.options.logger))??console.log,s,r)}debug(s,...r){var e;this._logLevel<=f.LogLevelEnum.DEBUG&&this._log(((e=this._optionsService.options.logger)==null?void 0:e.debug.bind(this._optionsService.options.logger))??console.log,s,r)}info(s,...r){var e;this._logLevel<=f.LogLevelEnum.INFO&&this._log(((e=this._optionsService.options.logger)==null?void 0:e.info.bind(this._optionsService.options.logger))??console.info,s,r)}warn(s,...r){var e;this._logLevel<=f.LogLevelEnum.WARN&&this._log(((e=this._optionsService.options.logger)==null?void 0:e.warn.bind(this._optionsService.options.logger))??console.warn,s,r)}error(s,...r){var e;this._logLevel<=f.LogLevelEnum.ERROR&&this._log(((e=this._optionsService.options.logger)==null?void 0:e.error.bind(this._optionsService.options.logger))??console.error,s,r)}};i.LogService=l=h([d(0,f.IOptionsService)],l),i.setTraceLogger=function(s){g=s},i.traceCall=function(s,r,e){if(typeof e.value!="function")throw new Error("not supported");const t=e.value;e.value=function(...a){if(g.logLevel!==f.LogLevelEnum.TRACE)return t.apply(this,a);g.trace(`GlyphRenderer#${t.name}(${a.map(_=>JSON.stringify(_)).join(", ")})`);const p=t.apply(this,a);return g.trace(`GlyphRenderer#${t.name} return`,p),p}}},7302:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.OptionsService=i.DEFAULT_OPTIONS=void 0;const h=o(8460),d=o(844),n=o(6114);i.DEFAULT_OPTIONS={cols:80,rows:24,cursorBlink:!1,cursorStyle:"block",cursorWidth:1,cursorInactiveStyle:"outline",customGlyphs:!0,drawBoldTextInBrightColors:!0,documentOverride:null,fastScrollModifier:"alt",fastScrollSensitivity:5,fontFamily:"courier-new, courier, monospace",fontSize:15,fontWeight:"normal",fontWeightBold:"bold",ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:"info",logger:null,scrollback:1e3,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},rescaleOverlappingGlyphs:!1,rightClickSelectsWord:n.isMac,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:" ()[]{}',\"`",altClickMovesCursor:!0,convertEol:!1,termName:"xterm",cancelEvents:!1,overviewRulerWidth:0};const f=["normal","bold","100","200","300","400","500","600","700","800","900"];class u extends d.Disposable{constructor(l){super(),this._onOptionChange=this.register(new h.EventEmitter),this.onOptionChange=this._onOptionChange.event;const s={...i.DEFAULT_OPTIONS};for(const r in l)if(r in s)try{const e=l[r];s[r]=this._sanitizeAndValidateOption(r,e)}catch(e){console.error(e)}this.rawOptions=s,this.options={...s},this._setupOptions(),this.register((0,d.toDisposable)(()=>{this.rawOptions.linkHandler=null,this.rawOptions.documentOverride=null}))}onSpecificOptionChange(l,s){return this.onOptionChange(r=>{r===l&&s(this.rawOptions[l])})}onMultipleOptionChange(l,s){return this.onOptionChange(r=>{l.indexOf(r)!==-1&&s()})}_setupOptions(){const l=r=>{if(!(r in i.DEFAULT_OPTIONS))throw new Error(`No option with key "${r}"`);return this.rawOptions[r]},s=(r,e)=>{if(!(r in i.DEFAULT_OPTIONS))throw new Error(`No option with key "${r}"`);e=this._sanitizeAndValidateOption(r,e),this.rawOptions[r]!==e&&(this.rawOptions[r]=e,this._onOptionChange.fire(r))};for(const r in this.rawOptions){const e={get:l.bind(this,r),set:s.bind(this,r)};Object.defineProperty(this.options,r,e)}}_sanitizeAndValidateOption(l,s){switch(l){case"cursorStyle":if(s||(s=i.DEFAULT_OPTIONS[l]),!function(r){return r==="block"||r==="underline"||r==="bar"}(s))throw new Error(`"${s}" is not a valid value for ${l}`);break;case"wordSeparator":s||(s=i.DEFAULT_OPTIONS[l]);break;case"fontWeight":case"fontWeightBold":if(typeof s=="number"&&1<=s&&s<=1e3)break;s=f.includes(s)?s:i.DEFAULT_OPTIONS[l];break;case"cursorWidth":s=Math.floor(s);case"lineHeight":case"tabStopWidth":if(s<1)throw new Error(`${l} cannot be less than 1, value: ${s}`);break;case"minimumContrastRatio":s=Math.max(1,Math.min(21,Math.round(10*s)/10));break;case"scrollback":if((s=Math.min(s,4294967295))<0)throw new Error(`${l} cannot be less than 0, value: ${s}`);break;case"fastScrollSensitivity":case"scrollSensitivity":if(s<=0)throw new Error(`${l} cannot be less than or equal to 0, value: ${s}`);break;case"rows":case"cols":if(!s&&s!==0)throw new Error(`${l} must be numeric, value: ${s}`);break;case"windowsPty":s=s??{}}return s}}i.OptionsService=u},2660:function(A,i,o){var h=this&&this.__decorate||function(u,g,l,s){var r,e=arguments.length,t=e<3?g:s===null?s=Object.getOwnPropertyDescriptor(g,l):s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(u,g,l,s);else for(var a=u.length-1;a>=0;a--)(r=u[a])&&(t=(e<3?r(t):e>3?r(g,l,t):r(g,l))||t);return e>3&&t&&Object.defineProperty(g,l,t),t},d=this&&this.__param||function(u,g){return function(l,s){g(l,s,u)}};Object.defineProperty(i,"__esModule",{value:!0}),i.OscLinkService=void 0;const n=o(2585);let f=i.OscLinkService=class{constructor(u){this._bufferService=u,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(u){const g=this._bufferService.buffer;if(u.id===void 0){const a=g.addMarker(g.ybase+g.y),p={data:u,id:this._nextId++,lines:[a]};return a.onDispose(()=>this._removeMarkerFromLink(p,a)),this._dataByLinkId.set(p.id,p),p.id}const l=u,s=this._getEntryIdKey(l),r=this._entriesWithId.get(s);if(r)return this.addLineToLink(r.id,g.ybase+g.y),r.id;const e=g.addMarker(g.ybase+g.y),t={id:this._nextId++,key:this._getEntryIdKey(l),data:l,lines:[e]};return e.onDispose(()=>this._removeMarkerFromLink(t,e)),this._entriesWithId.set(t.key,t),this._dataByLinkId.set(t.id,t),t.id}addLineToLink(u,g){const l=this._dataByLinkId.get(u);if(l&&l.lines.every(s=>s.line!==g)){const s=this._bufferService.buffer.addMarker(g);l.lines.push(s),s.onDispose(()=>this._removeMarkerFromLink(l,s))}}getLinkData(u){var g;return(g=this._dataByLinkId.get(u))==null?void 0:g.data}_getEntryIdKey(u){return`${u.id};;${u.uri}`}_removeMarkerFromLink(u,g){const l=u.lines.indexOf(g);l!==-1&&(u.lines.splice(l,1),u.lines.length===0&&(u.data.id!==void 0&&this._entriesWithId.delete(u.key),this._dataByLinkId.delete(u.id)))}};i.OscLinkService=f=h([d(0,n.IBufferService)],f)},8343:(A,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.createDecorator=i.getServiceDependencies=i.serviceRegistry=void 0;const o="di$target",h="di$dependencies";i.serviceRegistry=new Map,i.getServiceDependencies=function(d){return d[h]||[]},i.createDecorator=function(d){if(i.serviceRegistry.has(d))return i.serviceRegistry.get(d);const n=function(f,u,g){if(arguments.length!==3)throw new Error("@IServiceName-decorator can only be used to decorate a parameter");(function(l,s,r){s[o]===s?s[h].push({id:l,index:r}):(s[h]=[{id:l,index:r}],s[o]=s)})(n,f,g)};return n.toString=()=>d,i.serviceRegistry.set(d,n),n}},2585:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.IDecorationService=i.IUnicodeService=i.IOscLinkService=i.IOptionsService=i.ILogService=i.LogLevelEnum=i.IInstantiationService=i.ICharsetService=i.ICoreService=i.ICoreMouseService=i.IBufferService=void 0;const h=o(8343);var d;i.IBufferService=(0,h.createDecorator)("BufferService"),i.ICoreMouseService=(0,h.createDecorator)("CoreMouseService"),i.ICoreService=(0,h.createDecorator)("CoreService"),i.ICharsetService=(0,h.createDecorator)("CharsetService"),i.IInstantiationService=(0,h.createDecorator)("InstantiationService"),function(n){n[n.TRACE=0]="TRACE",n[n.DEBUG=1]="DEBUG",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.OFF=5]="OFF"}(d||(i.LogLevelEnum=d={})),i.ILogService=(0,h.createDecorator)("LogService"),i.IOptionsService=(0,h.createDecorator)("OptionsService"),i.IOscLinkService=(0,h.createDecorator)("OscLinkService"),i.IUnicodeService=(0,h.createDecorator)("UnicodeService"),i.IDecorationService=(0,h.createDecorator)("DecorationService")},1480:(A,i,o)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.UnicodeService=void 0;const h=o(8460),d=o(225);class n{static extractShouldJoin(u){return(1&u)!=0}static extractWidth(u){return u>>1&3}static extractCharKind(u){return u>>3}static createPropertyValue(u,g,l=!1){return(16777215&u)<<3|(3&g)<<1|(l?1:0)}constructor(){this._providers=Object.create(null),this._active="",this._onChange=new h.EventEmitter,this.onChange=this._onChange.event;const u=new d.UnicodeV6;this.register(u),this._active=u.version,this._activeProvider=u}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(u){if(!this._providers[u])throw new Error(`unknown Unicode version "${u}"`);this._active=u,this._activeProvider=this._providers[u],this._onChange.fire(u)}register(u){this._providers[u.version]=u}wcwidth(u){return this._activeProvider.wcwidth(u)}getStringCellWidth(u){let g=0,l=0;const s=u.length;for(let r=0;r<s;++r){let e=u.charCodeAt(r);if(55296<=e&&e<=56319){if(++r>=s)return g+this.wcwidth(e);const p=u.charCodeAt(r);56320<=p&&p<=57343?e=1024*(e-55296)+p-56320+65536:g+=this.wcwidth(p)}const t=this.charProperties(e,l);let a=n.extractWidth(t);n.extractShouldJoin(t)&&(a-=n.extractWidth(l)),g+=a,l=t}return g}charProperties(u,g){return this._activeProvider.charProperties(u,g)}}i.UnicodeService=n}},Z={};function $(A){var i=Z[A];if(i!==void 0)return i.exports;var o=Z[A]={exports:{}};return Q[A].call(o.exports,o,o.exports,$),o.exports}var V={};return(()=>{var A=V;Object.defineProperty(A,"__esModule",{value:!0}),A.Terminal=void 0;const i=$(9042),o=$(3236),h=$(844),d=$(5741),n=$(8285),f=$(7975),u=$(7090),g=["cols","rows"];class l extends h.Disposable{constructor(r){super(),this._core=this.register(new o.Terminal(r)),this._addonManager=this.register(new d.AddonManager),this._publicOptions={...this._core.options};const e=a=>this._core.options[a],t=(a,p)=>{this._checkReadonlyOptions(a),this._core.options[a]=p};for(const a in this._core.options){const p={get:e.bind(this,a),set:t.bind(this,a)};Object.defineProperty(this._publicOptions,a,p)}}_checkReadonlyOptions(r){if(g.includes(r))throw new Error(`Option "${r}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw new Error("You must set the allowProposedApi option to true to use proposed API")}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||(this._parser=new f.ParserApi(this._core)),this._parser}get unicode(){return this._checkProposedApi(),new u.UnicodeApi(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||(this._buffer=this.register(new n.BufferNamespaceApi(this._core))),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){const r=this._core.coreService.decPrivateModes;let e="none";switch(this._core.coreMouseService.activeProtocol){case"X10":e="x10";break;case"VT200":e="vt200";break;case"DRAG":e="drag";break;case"ANY":e="any"}return{applicationCursorKeysMode:r.applicationCursorKeys,applicationKeypadMode:r.applicationKeypad,bracketedPasteMode:r.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:e,originMode:r.origin,reverseWraparoundMode:r.reverseWraparound,sendFocusMode:r.sendFocus,wraparoundMode:r.wraparound}}get options(){return this._publicOptions}set options(r){for(const e in r)this._publicOptions[e]=r[e]}blur(){this._core.blur()}focus(){this._core.focus()}input(r,e=!0){this._core.input(r,e)}resize(r,e){this._verifyIntegers(r,e),this._core.resize(r,e)}open(r){this._core.open(r)}attachCustomKeyEventHandler(r){this._core.attachCustomKeyEventHandler(r)}attachCustomWheelEventHandler(r){this._core.attachCustomWheelEventHandler(r)}registerLinkProvider(r){return this._core.registerLinkProvider(r)}registerCharacterJoiner(r){return this._checkProposedApi(),this._core.registerCharacterJoiner(r)}deregisterCharacterJoiner(r){this._checkProposedApi(),this._core.deregisterCharacterJoiner(r)}registerMarker(r=0){return this._verifyIntegers(r),this._core.registerMarker(r)}registerDecoration(r){return this._checkProposedApi(),this._verifyPositiveIntegers(r.x??0,r.width??0,r.height??0),this._core.registerDecoration(r)}hasSelection(){return this._core.hasSelection()}select(r,e,t){this._verifyIntegers(r,e,t),this._core.select(r,e,t)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(r,e){this._verifyIntegers(r,e),this._core.selectLines(r,e)}dispose(){super.dispose()}scrollLines(r){this._verifyIntegers(r),this._core.scrollLines(r)}scrollPages(r){this._verifyIntegers(r),this._core.scrollPages(r)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(r){this._verifyIntegers(r),this._core.scrollToLine(r)}clear(){this._core.clear()}write(r,e){this._core.write(r,e)}writeln(r,e){this._core.write(r),this._core.write(`\r
`,e)}paste(r){this._core.paste(r)}refresh(r,e){this._verifyIntegers(r,e),this._core.refresh(r,e)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(r){this._addonManager.loadAddon(this,r)}static get strings(){return i}_verifyIntegers(...r){for(const e of r)if(e===1/0||isNaN(e)||e%1!=0)throw new Error("This API only accepts integers")}_verifyPositiveIntegers(...r){for(const e of r)if(e&&(e===1/0||isNaN(e)||e%1!=0||e<0))throw new Error("This API only accepts positive integers")}}A.Terminal=l})(),V})())})(xe);var Oe=xe.exports,Te={exports:{}};(function(K,q){(function(Q,Z){K.exports=Z()})(self,()=>(()=>{var Q={};return(()=>{var Z=Q;Object.defineProperty(Z,"__esModule",{value:!0}),Z.FitAddon=void 0,Z.FitAddon=class{activate($){this._terminal=$}dispose(){}fit(){const $=this.proposeDimensions();if(!$||!this._terminal||isNaN($.cols)||isNaN($.rows))return;const V=this._terminal._core;this._terminal.rows===$.rows&&this._terminal.cols===$.cols||(V._renderService.clear(),this._terminal.resize($.cols,$.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;const $=this._terminal._core,V=$._renderService.dimensions;if(V.css.cell.width===0||V.css.cell.height===0)return;const A=this._terminal.options.scrollback===0?0:$.viewport.scrollBarWidth,i=window.getComputedStyle(this._terminal.element.parentElement),o=parseInt(i.getPropertyValue("height")),h=Math.max(0,parseInt(i.getPropertyValue("width"))),d=window.getComputedStyle(this._terminal.element),n=o-(parseInt(d.getPropertyValue("padding-top"))+parseInt(d.getPropertyValue("padding-bottom"))),f=h-(parseInt(d.getPropertyValue("padding-right"))+parseInt(d.getPropertyValue("padding-left")))-A;return{cols:Math.max(2,Math.floor(f/V.css.cell.width)),rows:Math.max(1,Math.floor(n/V.css.cell.height))}}}})(),Q})())})(Te);var Ie=Te.exports;const Pe={".python-version":`3.12
`,"README.md":`# pyComputer

\`\`\`txt
                            _/_/_/                                                  _/                          
     _/_/_/    _/    _/  _/          _/_/    _/_/_/  _/_/    _/_/_/    _/    _/  _/_/_/_/    _/_/    _/  _/_/   
    _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/_/_/_/  _/_/        
   _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/        _/           
  _/_/_/      _/_/_/    _/_/_/    _/_/    _/    _/    _/  _/_/_/      _/_/_/      _/_/    _/_/_/  _/            
 _/              _/                                      _/                                                     
_/          _/_/                                        _/                                                      
\`\`\`


## Web Demo

Try pyComputer instantly in your browser: [nellowtcs.me/pyComputer](https://nellowtcs.me/pyComputer)

## Overview

**pyComputer** is a Python-based virtual computer environment that simulates a full operating system experience, complete with a shell, virtual file system, package management, and user applications. Includes a built-in IDE and a variety of demo apps.


## Features

- **Custom Shell**: Built-in shell with ze Linux commands (\`ls\`, \`cd\`, \`cat\`, \`edit\`, \`echo\`, \`clear\`, \`help\`, \`exit\`, etc.)
- **Virtual File System**: Filesystem (yes a real one, see the root folder) for file and directory operations
- **App Loader**: Run and manage user applications (see \`root/usr/apps/\`)
- **IDE**: Built-in TUI IDE with file tree, editor, toolbar, and run output (\`run ide\`)
- **Package Manager**: Install, list, and remove apps with \`pkg\` command
- **User Authentication**: Optional password protection and user settings
- **Theming**: Changeable UI themes
- **System Info**: \`pyfetch\` command as a neofetch clone
- **Extensible**: Add your own shell commands and apps easily


## Built-in Apps

| App         | Description                                              |
|-------------|----------------------------------------------------------|
| calculator  | A simple calculator app for pyComputer                   |
| ide         | TUI IDE with editor, file tree, toolbar, and run output  |
| matrix      | Matrix-style terminal rain animation                     |
| notes       | Simple notes app                                         |
| settings    | Configure theme, username, and system preferences        |
| snake       | A seemingly simple Snake game                            |

Launch any app with \`run <appname>\`, e.g. \`run ide\` or \`run calculator\`.

## How to Use

### Installation

Clone the repository and ensure you have Python 3.8+ installed.

\`\`\`bash
git clone https://github.com/NellowTCS/pyComputer.git
cd pyComputer/pyComputer
python main.py
\`\`\`

### Basic Shell Commands

- \`help\` - List available commands
- \`ls [dir]\` - List files in a directory
- \`cd [dir]\` - Change current directory
- \`cat <file>\` - View file contents
- \`edit <file>\` - Append a line to a file
- \`echo <text>\` - Print text
- \`clear\` - Clear the terminal
- \`exit\` - Exit the shell
- \`pyfetch\` - Show system info and ASCII art
- \`run <app>\` - Run an installed app
- \`pkg [list|install|remove]\` - Manage apps/packages
- \`rm [-r] <file>\` - Remove files or directories

### Running Apps

Apps are located in \`root/usr/apps/\`. To run an app:

\`\`\`bash
run calculator
\`\`\`

### Package Management

- List installed apps: \`pkg list\`
- Install an app: \`pkg install <source_path>\`
- Remove an app: \`pkg remove <app_name>\`

### Settings & Theming

Open the Settings app to change your settings:
\`\`\`bash
run settings
\`\`\`

## Contributing

Feel free to open issues or pull requests to add features, fix bugs, or improve documentation.

## License

This project is licensed under the MIT License.
`,"main.py":`"""
pyComputer entry point
"""

from src.kernel.kernel import main

if __name__ == "__main__":
    main()
`,"pyproject.toml":`[project]
name = "pycomputer"
version = "0.1.0"
description = "A text-based and TUI computer made in Python."
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "requests>=2.33.1",
    "tuiro>=0.1.1",
]
`,"src/fs/__init__.py":`# pyComputer fs package
`,"src/fs/opfs.py":`"""
opfs.py: Persistent storage: file-based fallback for browser OPFS.
"""

import os
import json
from typing import Optional, Any


class OPFS:
    def __init__(self, base_path: str = ".opfs"):
        self.base_path = base_path
        os.makedirs(base_path, exist_ok=True)

    def _get_path(self, path: str) -> str:
        return os.path.join(self.base_path, path.lstrip("/"))

    def write(self, path: str, data: str) -> bool:
        try:
            full_path = self._get_path(path)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "w") as f:
                f.write(data)
            return True
        except Exception:
            return False

    def read(self, path: str) -> Optional[str]:
        try:
            with open(self._get_path(path), "r") as f:
                return f.read()
        except Exception:
            return None

    def delete(self, path: str) -> bool:
        try:
            os.remove(self._get_path(path))
            return True
        except Exception:
            return False

    def exists(self, path: str) -> bool:
        return os.path.exists(self._get_path(path))

    def listdir(self, path: str = "") -> list[str]:
        try:
            full = os.path.join(self.base_path, path.lstrip("/"))
            if not os.path.isdir(full):
                return []
            return os.listdir(full)
        except Exception:
            return []

    def mkdir(self, path: str) -> bool:
        try:
            os.makedirs(self._get_path(path), exist_ok=True)
            return True
        except Exception:
            return False

    def write_json(self, path: str, data: Any) -> bool:
        return self.write(path, json.dumps(data, indent=2))

    def read_json(self, path: str) -> Optional[Any]:
        data = self.read(path + ".json")
        if data is None:
            return None
        try:
            return json.loads(data)
        except Exception:
            return None


_default = OPFS()


def write(path: str, data: str) -> bool:
    return _default.write(path, data)


def read(path: str) -> Optional[str]:
    return _default.read(path)


def delete(path: str) -> bool:
    return _default.delete(path)


def exists(path: str) -> bool:
    return _default.exists(path)


def listdir(path: str = "") -> list[str]:
    return _default.listdir(path)


def mkdir(path: str) -> bool:
    return _default.mkdir(path)
`,"src/fs/paths.py":`"""
paths.py: Defines canonical paths for the virtual filesystem.
"""

BOOT_PATH = "/boot/"
SYS_PATH = "/sys/"
APPS_PATH = "/usr/apps/"
HOME_PATH = "/home/user/"
TMP_PATH = "/tmp/"
NET_CACHE_PATH = "/net/cache/"
`,"src/fs/vfs.py":`"""
VFS: High-level FS API, path normalization, directory creation (real implementation).
"""

import os
import shutil

from src.utils.platform import is_web


class VFS:
    def __init__(self, root=None):
        if root is None:
            repo_root = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "../../../root")
            )
            if is_web():
                web_root = "/root"
                pycomputer_root = "/pyComputer/root"
                if os.path.exists(web_root):
                    self.root = web_root
                elif os.path.exists(pycomputer_root):
                    self.root = pycomputer_root
                else:
                    self.root = repo_root
            else:
                self.root = repo_root
        else:
            self.root = os.path.abspath(root)

    def abspath(self, path):
        if path == "/" or path == "":
            return self.root
        if os.path.isabs(path):
            return os.path.join(self.root, path.lstrip("/"))
        return os.path.abspath(os.path.join(self.root, path))

    def open(self, path, mode="r"):
        return open(self.abspath(path), mode)

    def read(self, path):
        with self.open(path, "r") as f:
            return f.read()

    def write(self, path, data):
        with self.open(path, "w") as f:
            f.write(data)

    def listdir(self, path="."):
        return os.listdir(self.abspath(path))

    def exists(self, path):
        return os.path.exists(self.abspath(path))

    def mkdir(self, path):
        os.makedirs(self.abspath(path), exist_ok=True)

    def remove(self, path):
        abs_path = self.abspath(path)
        if os.path.isdir(abs_path):
            shutil.rmtree(abs_path)
        else:
            os.remove(abs_path)

    def move(self, src, dst):
        shutil.move(self.abspath(src), self.abspath(dst))
`,"src/kernel/__init__.py":`# pyComputer kernel package
`,"src/kernel/boot.py":`"""
Boot subsystem: renders ASCII logo, prints fake hardware logs.
"""

import os
import time

from src.fs.vfs import VFS


def _load_settings():
    settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
    if os.path.exists(settings_path):
        try:
            import json
            with open(settings_path) as f:
                return json.load(f)
        except Exception:
            pass
    return {}


class Boot:
    def __init__(self, logo_path=None):
        self.vfs = VFS()
        if logo_path is None:
            self.logo_path = self.vfs.abspath("boot/logo.txt")
        else:
            self.logo_path = self.vfs.abspath(logo_path)
        self.start_time = time.time()
        self.settings = _load_settings()

    def render_logo(self):
        if not self.settings.get("show_splash", True):
            print("\\033[2J\\033[H", end="")
            return
        try:
            with open(self.logo_path) as f:
                print(f.read())
        except FileNotFoundError:
            print(f"[boot] Logo not found at {self.logo_path}.")

    def print_hardware_logs(self):
        print("[boot] pyComputer Kernel v0.1.0")
        print("[boot] Initializing subsystems...")
        print("[boot] Checking memory...")
        print("[boot] All systems normal.")
        print(f"[boot] Uptime: {self.uptime():.2f} seconds")

    def uptime(self):
        return time.time() - self.start_time
`,"src/kernel/io.py":`"""
IO subsystem: routes stdin/stdout, supports fullscreen TUI mode.
"""

import sys


class IO:
    def __init__(self):
        self.stdin = sys.stdin
        self.stdout = sys.stdout
        self.fullscreen = False
        self.tui_output = None

    def set_fullscreen(self, enable: bool):
        self.fullscreen = enable

    def set_tui_output(self, output_func):
        self.tui_output = output_func

    def write(self, data: str):
        if self.fullscreen and self.tui_output:
            self.tui_output(data)
        else:
            self.stdout.write(data)
            self.stdout.flush()

    def read(self):
        return self.stdin.readline()
`,"src/kernel/kernel.py":`"""
pyComputer Kernel
Initializes subsystems, starts boot sequence, launches shell, runs main async event loop.
"""

import asyncio
import hashlib
import os
import json
from ..shell.shell import Shell
from .boot import Boot
from .process import Process
from .scheduler import Scheduler
from .io import IO
from .loader import Loader
from .registry import Registry
from ..ui.renderer import Renderer


def _load_settings():
    settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
    if os.path.exists(settings_path):
        try:
            with open(settings_path) as f:
                return json.load(f)
        except Exception:
            pass
    return {"theme": "default"}


_settings = _load_settings()


def _require_login():
    password_hash = _settings.get("password", "")
    if not password_hash:
        return None
    from src.stdlib.appstdlib import input, error
    import hashlib
    while True:
        pw = input("Password: ").strip()
        if not pw:
            error("Login required.")
            continue
        hashpw = hashlib.sha256(pw.encode()).hexdigest()[:16]
        if hashpw == password_hash:
            return _settings.get("username", "user")
        error("Invalid password.")


class Kernel:
    def __init__(self):
        self.boot = Boot()
        self.scheduler = Scheduler()
        self.io = IO()
        self.loader = Loader()
        self.registry = Registry()
        self.shell = Shell(kernel=self)

    def initialize(self):
        print("[kernel] Initializing subsystems...")

    def boot_sequence(self):
        print("[kernel] Boot sequence starting...")
        self.boot.render_logo()
        self.boot.print_hardware_logs()

    def launch_shell(self):
        print("[kernel] Launching shell...")

        async def shell_coro():
            self.shell.run()

        self.scheduler.add_process(Process(shell_coro(), name="shell"))

    async def run(self):
        print("[kernel] Running main event loop...")
        try:
            await self.scheduler.run()
        except asyncio.CancelledError:
            print("[kernel] Event loop cancelled.")


def main():
    global _settings
    _settings = _load_settings()
    theme = _settings.get("theme", "default")
    from ..stdlib.appstdlib import set_theme
    set_theme(theme)
    
    if _settings.get("password"):
        user = _require_login()
        if not user:
            print("[kernel] Authentication required. Exiting.")
            return
        print(f"[kernel] Welcome back, {user}!")
    
    kernel = Kernel()
    kernel.initialize()
    kernel.boot_sequence()
    kernel.launch_shell()
    try:
        asyncio.run(kernel.run())
    except (KeyboardInterrupt, asyncio.CancelledError):
        print("[kernel] Shutdown complete.")
`,"src/kernel/loader.py":`"""
Loader subsystem: discovers apps, loads manifests, imports entrypoints dynamically.
"""

import importlib.util
import os
import json
import sys
from src.fs.vfs import VFS


class Loader:
    def __init__(self, apps_path=None):
        self.vfs = VFS()
        if apps_path is None:
            self.apps_path = self.vfs.abspath("usr/apps")
        else:
            self.apps_path = self.vfs.abspath(apps_path)
        self.apps = []

    def discover_apps(self):
        self.apps = []
        if not os.path.isdir(self.apps_path):
            print(f"[loader] Apps path not found: {self.apps_path}")
            return
        for name in os.listdir(self.apps_path):
            app_dir = os.path.join(self.apps_path, name)
            if os.path.isdir(app_dir) and os.path.isfile(
                os.path.join(app_dir, "manifest.json")
            ):
                self.apps.append(name)

    def load_manifest(self, app_name):
        manifest_path = os.path.join(self.apps_path, app_name, "manifest.json")
        try:
            with open(manifest_path) as f:
                return json.load(f)
        except FileNotFoundError:
            return None

    def import_entrypoint(self, app_name):
        app_dir = os.path.join(self.apps_path, app_name)
        manifest = self.load_manifest(app_name)
        if not manifest:
            print(f"[loader] Manifest not found for app '{app_name}'")
            return None
        entry = manifest.get("entry", "main.py")
        entry_path = os.path.join(app_dir, entry)
        if not os.path.isfile(entry_path):
            print(f"[loader] Entrypoint '{entry}' not found for app '{app_name}'")
            return None
        # Ensure pyComputer/src and app_dir are in sys.path for import
        src_path = os.path.join(os.path.dirname(self.apps_path), "../../pyComputer/src")
        src_path = os.path.normpath(src_path)
        sys.path.insert(0, src_path)
        sys.path.insert(0, app_dir)
        spec = importlib.util.spec_from_file_location(f"{app_name}_main", entry_path)
        if spec is None or spec.loader is None:
            print(f"[loader] Failed to create import spec for app '{app_name}'")
            sys.path.pop(0)
            return None
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
            sys.path.pop(0)
            return getattr(module, "main", None)
        except Exception as e:
            sys.path.pop(0)
            print(f"[loader] Failed to import app '{app_name}': {e}")
            return None
`,"src/kernel/process.py":`"""
Process subsystem: defines Process objects, wraps coroutines, tracks state.
"""

import asyncio
from typing import Coroutine, Any


class Process:
    def __init__(self, coro: Coroutine, name: str = "process"):
        self.coro = coro
        self.name = name
        self.state = "ready"  # ready, running, waiting, terminated
        self.task = None

    def start(self):
        if not self.task or self.task.done():
            self.task = asyncio.create_task(self.coro)
            self.state = "running"

    def wait(self):
        self.state = "waiting"

    def wake(self):
        if self.state == "waiting":
            self.state = "ready"

    def terminate(self):
        if self.task:
            self.task.cancel()
        self.state = "terminated"
`,"src/kernel/registry.py":`"""
Registry subsystem: stores installed apps list, persists to /sys/apps.json.
"""

import json
import os


from src.fs.vfs import VFS


class Registry:
    def __init__(self, registry_path=None):
        self.vfs = VFS()
        if registry_path is None:
            self.registry_path = self.vfs.abspath("sys/apps.json")
        else:
            self.registry_path = self.vfs.abspath(registry_path)
        # Ensure the registry directory exists
        import os

        reg_dir = os.path.dirname(self.registry_path)
        if not self.vfs.exists(reg_dir):
            self.vfs.mkdir(reg_dir)
        self.apps = []
        self.load()

    def load(self):
        try:
            with open(self.registry_path) as f:
                self.apps = json.load(f)
        except FileNotFoundError:
            self.apps = []
            # Ensure the file is created even if empty
            self.save()

    def save(self):
        with open(self.registry_path, "w") as f:
            json.dump(self.apps, f)

    def add_app(self, app_name):
        if app_name not in self.apps:
            self.apps.append(app_name)
            self.save()

    def remove_app(self, app_name):
        if app_name in self.apps:
            self.apps.remove(app_name)
            self.save()
`,"src/kernel/scheduler.py":`"""
Scheduler subsystem: round-robin (no, not Red Robin, sadly) scheduling, yields between processes.
"""

import asyncio
from .process import Process


class Scheduler:
    def __init__(self):
        self.processes = []

    def add_process(self, process: Process):
        self.processes.append(process)

    def wake_process(self, process: Process):
        if process.state == "waiting":
            process.state = "ready"

    async def run(self):
        while self.processes:
            for process in list(self.processes):
                if process.state == "terminated":
                    self.processes.remove(process)
                    continue
                if process.state == "ready":
                    process.start()
                if process.task:
                    try:
                        await asyncio.wait([process.task], timeout=0.01)
                    except Exception:
                        pass
                if process.task and process.task.done():
                    process.state = "terminated"
            await asyncio.sleep(0)  # Yield to event loop
`,"src/net/__init__.py":`# pyComputer net package
`,"src/net/http.py":`"""
http.py: Networking layer, get/post, JSON helpers, cache
"""

try:
    import requests
except ImportError:
    requests = None
import json


class HTTP:
    def get(self, url):
        if requests:
            try:
                resp = requests.get(url)
                resp.raise_for_status()
                return resp.text
            except Exception as e:
                print(f"[net] GET error: {e}")
                return None
        print(f"[net] GET {url} (requests not installed)")
        return None

    def post(self, url, data=None):
        if requests:
            try:
                resp = requests.post(url, data=data)
                resp.raise_for_status()
                return resp.text
            except Exception as e:
                print(f"[net] POST error: {e}")
                return None
        print(f"[net] POST {url} (requests not installed)")
        return None

    def get_json(self, url):
        text = self.get(url)
        if text:
            try:
                return json.loads(text)
            except Exception as e:
                print(f"[net] JSON decode error: {e}")
        return None
`,"src/pkg/__init__.py":`# pyComputer pkg package
`,"src/pkg/manager.py":`"""
manager.py: Install/update/remove apps from URL or local file
"""

import os
import shutil
from ..fs.vfs import VFS
from ..kernel.registry import Registry
from .manifest import Manifest, ManifestError


class PackageManager:
    def __init__(self, apps_path=None):
        self.vfs = VFS()
        if apps_path is None:
            self.apps_path = self.vfs.abspath("usr/apps")
        else:
            self.apps_path = self.vfs.abspath(apps_path)
        self.registry = Registry()

    def install(self, source):
        # For now, source is a path to a local app directory
        app_name = os.path.basename(source.rstrip("/"))
        dest = os.path.join(self.apps_path, app_name)
        manifest_path = os.path.join(source, "manifest.json")
        if not os.path.exists(manifest_path):
            print(f"[pkg] ERROR: manifest.json missing in '{app_name}'.")
            return
        try:
            Manifest.from_file(manifest_path)
        except ManifestError as e:
            print(f"[pkg] ERROR: Invalid manifest for '{app_name}': {e}")
            return
        if os.path.exists(dest):
            print(f"[pkg] App '{app_name}' already installed.")
            return
        shutil.copytree(source, dest)
        self.registry.add_app(app_name)
        print(f"[pkg] Installed '{app_name}'.")

    def remove(self, app_name):
        dest = os.path.join(self.apps_path, app_name)
        if not os.path.exists(dest):
            print(f"[pkg] App '{app_name}' not found.")
            return
        shutil.rmtree(dest)
        self.registry.remove_app(app_name)
        print(f"[pkg] Removed '{app_name}'.")

    def list(self):
        self.registry.load()
        print("[pkg] Installed apps:")
        for app in self.registry.apps:
            print(f"  {app}")
`,"src/pkg/manifest.py":`"""
manifest.py: Manifest schema and validation for pyComputer apps.
"""

import json

REQUIRED_FIELDS = {
	"name": str,
	"version": str,
	"entry": str,
	"description": str,
	"permissions": list,
}

class ManifestError(Exception):
	pass

class Manifest:
	def __init__(self, data):
		self.data = data
		self.validate()

	@classmethod
	def from_file(cls, path):
		with open(path, "r", encoding="utf-8") as f:
			data = json.load(f)
		return cls(data)

	def validate(self):
		for field, typ in REQUIRED_FIELDS.items():
			if field not in self.data:
				raise ManifestError(f"Missing required field: {field}")
			if not isinstance(self.data[field], typ):
				raise ManifestError(f"Field '{field}' must be {typ.__name__}")
		if not self.data["entry"].endswith(".py"):
			raise ManifestError("'entry' must be a .py file")
		# Permissions must be a list of strings
		if not all(isinstance(p, str) for p in self.data["permissions"]):
			raise ManifestError("All permissions must be strings")

	def get(self, key, default=None):
		return self.data.get(key, default)
`,"src/shell/__init__.py":`# pyComputer shell package
`,"src/shell/commands/__init__.py":`# Makes shell.commands a package

from .help import cmd_help
from .exit import cmd_exit
from .echo import cmd_echo
from .ls import cmd_ls
from .cat import cmd_cat
from .edit import cmd_edit
from .run import cmd_run
from .pkg import cmd_pkg
from .clear import cmd_clear
from .cd import cmd_cd
from .pyfetch import cmd_pyfetch
from .rm import cmd_rm

BUILTIN_COMMANDS = {
    "help": cmd_help,
    "exit": cmd_exit,
    "echo": cmd_echo,
    "ls": cmd_ls,
    "cat": cmd_cat,
    "edit": cmd_edit,
    "run": cmd_run,
    "pkg": cmd_pkg,
    "clear": cmd_clear,
    "cd": cmd_cd,
    "pyfetch": cmd_pyfetch,
    "rm": cmd_rm,
}
`,"src/shell/commands/cat.py":`def cmd_cat(shell, *args):
    if not args:
        print("Usage: cat <filename>")
        return
    filename = args[0]
    try:
        with open(filename, "r") as f:
            print(f.read())
    except Exception as e:
        print(f"[cat] Error: {e}")
`,"src/shell/commands/cd.py":`"""
cd.py: Change directory command for shell
"""

from src.fs.vfs import VFS
import os


def cmd_cd(shell, *args):
    vfs = VFS()
    if not hasattr(shell, "cwd"):
        shell.cwd = "/"
    if not args:
        shell.cwd = "/"
        os.chdir(vfs.abspath("/"))
        return
    path = args[0]
    abspath = vfs.abspath(path)
    if vfs.exists(path) and os.path.isdir(abspath):
        shell.cwd = path
        os.chdir(abspath)
    else:
        print(f"[cd] Directory not found: {path}")
`,"src/shell/commands/clear.py":`"""
Shell command: clear the terminal screen.
"""

from src.utils.platform import is_web


def cmd_clear(shell, *args):
    if is_web():
        print("\\033[2J\\033[H", end="")
    else:
        import os

        os.system("clear")
`,"src/shell/commands/echo.py":`def cmd_echo(shell, *args):
    print(" ".join(args))
`,"src/shell/commands/edit.py":`from src.utils.platform import pyc_input

def cmd_edit(shell, *args):
    if not args:
        print("Usage: edit <filename>")
        return
    filename = args[0]
    try:
        line = pyc_input(f"Enter a line to append to {filename}: ")
        with open(filename, "a") as f:
            f.write(line + "\\n")
        print(f"[edit] Line appended to {filename}.")
    except Exception as e:
        print(f"[edit] Error: {e}")
`,"src/shell/commands/exit.py":`from src.utils.platform import is_web


def cmd_exit(shell, *args):
    if is_web():
        print("[shell] HAHA nice try, but you can't exit the shell in a web environment! >:3")
        return
    else:
        print("[shell] Exiting shell.")
    raise SystemExit
`,"src/shell/commands/help.py":`def cmd_help(shell, *args):
    print("Available commands: help, exit, echo, ls, cat, edit, run, pkg, rm, cd, pyfetch, clear")
`,"src/shell/commands/ls.py":`from src.fs.vfs import VFS


def cmd_ls(shell, *args):
    vfs = VFS()
    cwd = getattr(shell, "cwd", "/")
    path = args[0] if args else cwd
    try:
        files = vfs.listdir(path)
        for f in files:
            print(f)
    except Exception as e:
        print(f"[ls] {e}")
`,"src/shell/commands/pkg.py":`def cmd_pkg(shell, *args):
    from src.pkg.manager import PackageManager

    pm = PackageManager()
    if not args:
        pm.list()
        return
    action = args[0]
    if action == "list":
        pm.list()
    elif action == "install":
        if len(args) < 2:
            print("Usage: pkg install <source_path>")
            return
        pm.install(args[1])
    elif action == "remove":
        if len(args) < 2:
            print("Usage: pkg remove <app_name>")
            return
        pm.remove(args[1])
    else:
        print("Usage: pkg [list|install <source>|remove <app>]")
`,"src/shell/commands/pyfetch.py":`"""
pyfetch: Python/pyComputer system info and ASCII art (neofetch clone)
thanks to https://github.com/o2sh/onefetch for the python ascii :3
"""

import platform
import sys
import os
from src.stdlib.appstdlib import info, banner

# ANSI color codes
BLUE = "\\033[34m"
YELLOW = "\\033[33m"
RESET = "\\033[0m"

PYTHON_ASCII = f"""
{BLUE}               =========
{BLUE}            ===============
{BLUE}           =================
{BLUE}          ===  ==============
{BLUE}          ===================
{BLUE}                   ==========
{BLUE}   ========================== {YELLOW}=======
{BLUE} ============================ {YELLOW}========
{BLUE}============================= {YELLOW}=========
{BLUE}============================ {YELLOW}==========
{BLUE}========================== {YELLOW}============
{BLUE}============ {YELLOW}==========================
{BLUE}========== {YELLOW}============================
{BLUE}========= {YELLOW}=============================
{BLUE} ======== {YELLOW}============================
{BLUE}  ======= {YELLOW}==========================
{YELLOW}          ==========
{YELLOW}          ===================
{YELLOW}          ==============  ===
{YELLOW}           =================
{YELLOW}            ===============
{YELLOW}               ========={RESET}
"""

def get_mem():
    # Web: Use navigator.deviceMemory if available
    try:
        import js
        ram = getattr(js.navigator, "deviceMemory", None)
        if ram:
            return f"{ram} GiB"
    except Exception:
        pass

    # Linux: /proc/meminfo
    if sys.platform.startswith("linux"):
        try:
            with open("/proc/meminfo") as f:
                for line in f:
                    if line.startswith("MemTotal:"):
                        kb = int(line.split()[1])
                        return f"{kb // 1024} MB"
        except Exception:
            pass

    # macOS: sysctl
    if sys.platform == "darwin":
        try:
            import subprocess
            out = subprocess.check_output(["sysctl", "-n", "hw.memsize"])
            bytes_ = int(out.strip())
            return f"{bytes_ // (1024*1024)} MB"
        except Exception:
            pass

    # Windows: ctypes
    if sys.platform.startswith("win"):
        try:
            import ctypes
            class MEMORYSTATUSEX(ctypes.Structure):
                _fields_ = [
                    ("dwLength", ctypes.c_ulong),
                    ("dwMemoryLoad", ctypes.c_ulong),
                    ("ullTotalPhys", ctypes.c_ulonglong),
                    ("ullAvailPhys", ctypes.c_ulonglong),
                    ("ullTotalPageFile", ctypes.c_ulonglong),
                    ("ullAvailPageFile", ctypes.c_ulonglong),
                    ("ullTotalVirtual", ctypes.c_ulonglong),
                    ("ullAvailVirtual", ctypes.c_ulonglong),
                    ("sullAvailExtendedVirtual", ctypes.c_ulonglong),
                ]
            stat = MEMORYSTATUSEX()
            stat.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(stat))
            return f"{stat.ullTotalPhys // (1024*1024)} MB"
        except Exception:
            pass

    return "?"

def cmd_pyfetch(shell, *args):
    banner("pyfetch")
    print(PYTHON_ASCII)
    info(f"User: {os.getenv('USER') or os.getenv('USERNAME') or '?'}")
    info(f"OS: {platform.system()} {platform.release()}")
    info(f"Python: {platform.python_version()} ({platform.python_implementation()})")
    info(f"Platform: {platform.platform()}")
    info(f"Machine: {platform.machine()}")
    info(f"Memory: {get_mem()}")
    info(f"Shell: pyComputer")
    info(f"Executable: {sys.executable}")
`,"src/shell/commands/rm.py":`import os
from src.fs.vfs import VFS
from src.stdlib.appstdlib import confirm


def _load_settings():
    try:
        import json
        settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
        if os.path.exists(settings_path):
            with open(settings_path) as f:
                return json.load(f)
    except:
        pass
    return {}


def cmd_rm(shell, *args):
    if not args:
        print("Usage: rm [-r] <file>")
        return
    
    recursive = False
    paths = []
    for arg in args:
        if arg == "-r":
            recursive = True
        else:
            paths.append(arg)
    
    if not paths:
        print("Usage: rm [-r] <file>")
        return
    
    settings = _load_settings()
    vfs = VFS()
    
    for path in paths:
        try:
            if not vfs.exists(path):
                print(f"[rm] File not found: {path}")
                continue
            
            if recursive or os.path.isdir(vfs.abspath(path)):
                if settings.get("confirm_actions"):
                    if not confirm(f"Remove {path} and contents? [y/N] "):
                        print(f"[rm] Skipped: {path}")
                        continue
                vfs.remove(path)
                print(f"[rm] Removed: {path}")
            else:
                if settings.get("confirm_actions"):
                    if not confirm(f"Remove {path}? [y/N] "):
                        print(f"[rm] Skipped: {path}")
                        continue
                vfs.remove(path)
                print(f"[rm] Removed: {path}")
        except Exception as e:
            print(f"[rm] {e}")`,"src/shell/commands/run.py":`def cmd_run(shell, *args):
    if not args:
        print("Usage: run <app>")
        return
    app_name = args[0]
    shell.kernel.loader.discover_apps()
    if app_name not in shell.kernel.loader.apps:
        print(f"[run] App '{app_name}' not found.")
        return
    entry = shell.kernel.loader.import_entrypoint(app_name)
    if entry:
        entry(*args[1:])
    else:
        print(f"[run] Failed to launch '{app_name}'.")
`,"src/shell/commands.py":`"""
Shell commands: built-in commands
"""

from .commands.help import cmd_help
from .commands.exit import cmd_exit
from .commands.echo import cmd_echo
from .commands.ls import cmd_ls
from .commands.cat import cmd_cat
from .commands.edit import cmd_edit
from .commands.run import cmd_run
from .commands.pkg import cmd_pkg
from .commands.clear import cmd_clear
from .commands.cd import cmd_cd
from .commands.rm import cmd_rm

BUILTIN_COMMANDS = {
    "help": cmd_help,
    "exit": cmd_exit,
    "echo": cmd_echo,
    "ls": cmd_ls,
    "cat": cmd_cat,
    "edit": cmd_edit,
    "run": cmd_run,
    "pkg": cmd_pkg,
    "clear": cmd_clear,
    "cd": cmd_cd,
    "rm": cmd_rm,
}
`,"src/shell/parser.py":`"""
Shell parser: tokenization, quoting rules.
"""

import shlex


def parse_command(cmd):
    """Parse a shell command string into command and args, handling quotes."""
    return shlex.split(cmd)
`,"src/shell/shell.py":`"""
Shell subsystem: main command loop, history, autocomplete.
"""

from .commands import BUILTIN_COMMANDS
from .parser import parse_command

try:
    import readline
except ImportError:
    readline = None

from src.utils.platform import pyc_input

class Shell:
    def __init__(self, kernel=None):
        self.history = []
        self.kernel = kernel
        if readline is not None:
            self._setup_readline()

    def _setup_readline(self):
        if hasattr(readline, 'parse_and_bind') and hasattr(readline, 'set_completer'):
            readline.parse_and_bind("tab: complete")
            readline.set_completer(self._completer)

    def _completer(self, text, state):
        options = [cmd for cmd in BUILTIN_COMMANDS if cmd.startswith(text)]
        if state < len(options):
            return options[state]
        return None

    def run(self):
        print("[shell] Welcome to pyComputer shell!")
        if not hasattr(self, "cwd"):
            self.cwd = "/"
        while True:
            try:
                prompt = f"[{self.cwd}] $ "
                cmd = pyc_input(prompt)
                if not cmd.strip():
                    continue
                self.history.append(cmd)
                self.execute(cmd)
            except (EOFError, KeyboardInterrupt, SystemExit):
                print("\\n[shell] Exiting shell.")
                break

    def execute(self, cmd):
        parts = parse_command(cmd)
        if not parts:
            return
        command, *args = parts
        func = BUILTIN_COMMANDS.get(command)
        if func:
            try:
                func(self, *args)
            except SystemExit:
                raise
            except Exception as e:
                print(f"[shell] Error: {e}")
        else:
            print(f"[shell] Unknown command: {command}")
`,"src/stdlib/appstdlib.py":`"""
appstdlib.py: Standard library for pyComputer apps.
Provides unified input/output, error reporting, and common helpers.
"""


from src.utils.platform import pyc_input, is_web, is_native
from src.ui.renderer import Renderer
from src.utils.text import truncate, wrap, indent, pad_center, pad_left, pad_right, strip_ansi
from src.fs.vfs import VFS
from src.utils.logging import Logger, Level
import sys
import traceback
import time
import os

__all__ = [
    # I/O
    "input", "info", "error", "success", "warning", "confirm", "pause",
    # UI/Renderer
    "section", "subsection", "banner", "table", "spinner", "step",
    "clear", "clear_line", "hide_cursor", "show_cursor",
    "bold", "dim", "green", "red", "yellow", "cyan",
    "box", "box_at",
    # Text utils
    "truncate", "wrap", "indent", "pad_center", "pad_left", "pad_right", "strip_ansi",
    # FS
    "VFS",
    # Logging
    "Logger", "Level",
    # Other
    "print_exception", "sleep", "get_env", "set_env", "app_exit", "print_table", "print_banner", "ask_choice",
    # Renderer
    "r", "set_theme",
]

def print_exception(e: Exception):
    """Print a formatted exception with traceback."""
    tb = ''.join(traceback.format_exception(type(e), e, e.__traceback__))
    error(tb)

def sleep(seconds: float):
    time.sleep(seconds)

def get_env(key: str, default=None):
    return os.environ.get(key, default)

def set_env(key: str, value: str):
    os.environ[key] = value

def app_exit(code=0):
    sys.exit(code)

def print_table(rows):
    """Print a table (list of lists)."""
    r.table(rows)

def print_banner(msg: str):
    r.banner(msg)

def ask_choice(prompt: str, choices: list) -> str:
    """Prompt user to select from choices."""
    while True:
        ans = pyc_input(f"{prompt} {choices}: ").strip().lower()
        if ans in choices:
            return ans
        warning(f"Invalid choice: {ans}")

r = Renderer()

def set_theme(theme: str):
    r.set_theme(theme)
    try:
        import js
        if hasattr(js, 'setWebTheme'):
            js.setWebTheme(theme)
    except Exception:
        pass

def get_theme() -> str:
    return r.get_theme()

# I/O
def input(prompt: str = "") -> str:
    """Unified input for apps (web/native)."""
    return pyc_input(prompt)

def info(msg: str):
    r.info(msg)

def error(msg: str):
    r.error(msg)

def success(msg: str):
    r.success(msg)

def warning(msg: str):
    r.warning(msg)

def confirm(prompt: str = "Are you sure? [y/N] ") -> bool:
    ans = pyc_input(prompt).strip().lower()
    return ans in ("y", "yes")

def pause(msg: str = "Press Enter to continue..."):
    pyc_input(msg)

# UI/Renderer
def section(title: str):
    r.section(title)

def subsection(title: str):
    r.subsection(title)

def banner(title: str):
    r.banner(title)

def table(rows):
    r.table(rows)

def spinner(message: str):
    return r.spinner(message)

def step(title: str):
    return r.step(title)

def clear():
    r.clear()

def clear_line():
    r.clear_line()

def hide_cursor():
    r.hide_cursor()

def show_cursor():
    r.show_cursor()

def bold(text: str):
    return r.bold(text)

def dim(text: str):
    return r.dim(text)

def green(text: str):
    return r.green(text)

def red(text: str):
    return r.red(text)

def yellow(text: str):
    return r.yellow(text)

def cyan(text: str):
    return r.cyan(text)

def box(width, height, title=None):
    return r.box(width, height, title)

def box_at(x, y, width, height, title=None):
    return r.box_at(x, y, width, height, title)

# Text utils: truncate, wrap, indent, pad_center, pad_left, pad_right, strip_ansi (imported)
# FS: VFS (imported)
# Logging: Logger, Level (imported)
`,"src/ui/__init__.py":`# pyComputer ui package
`,"src/ui/input.py":`"""
input.py: Keyboard events, keybindings, input handling.
"""

import sys
import os
import ctypes
import ctypes.util
from typing import Callable, Optional
from src.utils.platform import is_web

web_input_queue: list = []

if sys.platform != "win32" and not is_web():
    _libc_name = ctypes.util.find_library("c")
    _libc = ctypes.CDLL(_libc_name, use_errno=True)

    NCCS = 32
    TCSANOW = 0
    TCSADRAIN = 1
    ICANON = 0o000002
    ECHO = 0o000010
    VMIN = 6
    VTIME = 5

    class Termios(ctypes.Structure):
        _fields_ = [
            ("c_iflag", ctypes.c_uint32),
            ("c_oflag", ctypes.c_uint32),
            ("c_cflag", ctypes.c_uint32),
            ("c_lflag", ctypes.c_uint32),
            ("c_line", ctypes.c_uint8),
            ("c_cc", ctypes.c_uint8 * NCCS),
            ("c_ispeed", ctypes.c_uint32),
            ("c_ospeed", ctypes.c_uint32),
        ]

    _libc.tcgetattr.argtypes = [ctypes.c_int, ctypes.POINTER(Termios)]
    _libc.tcgetattr.restype = ctypes.c_int
    _libc.tcsetattr.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.POINTER(Termios)]
    _libc.tcsetattr.restype = ctypes.c_int

    def _tcgetattr(fd: int) -> Termios:
        t = Termios()
        if _libc.tcgetattr(fd, ctypes.byref(t)) != 0:
            raise OSError(ctypes.get_errno(), "tcgetattr failed")
        return t

    def _tcsetattr(fd: int, when: int, t: Termios):
        if _libc.tcsetattr(fd, when, ctypes.byref(t)) != 0:
            raise OSError(ctypes.get_errno(), "tcsetattr failed")

    def _setraw(fd: int, old: Termios) -> None:
        raw = Termios()
        ctypes.memmove(
            ctypes.addressof(raw), ctypes.addressof(old), ctypes.sizeof(Termios)
        )
        raw.c_lflag &= ~(ICANON | ECHO)
        raw.c_cc[VMIN] = 1
        raw.c_cc[VTIME] = 0
        _tcsetattr(fd, TCSANOW, raw)


class Key:
    UP = "\\x1b[A"
    DOWN = "\\x1b[B"
    RIGHT = "\\x1b[C"
    LEFT = "\\x1b[D"
    ENTER = "\\r"
    ESCAPE = "\\x1b"
    TAB = "\\t"
    BACKSPACE = "\\x7f"
    DELETE = "\\x1b[3~"
    HOME = "\\x1b[H"
    END = "\\x1b[F"
    PAGE_UP = "\\x1b[5~"
    PAGE_DOWN = "\\x1b[6~"
    F1 = "\\x1bOP"
    F2 = "\\x1bOQ"
    F3 = "\\x1bOR"
    F4 = "\\x1bOS"


def get_key() -> Optional[str]:
    if is_web():
        if web_input_queue:
            return web_input_queue.pop(0)
        return None

    if sys.platform == "win32":
        try:
            import msvcrt

            if msvcrt.kbhit():
                ch = msvcrt.getch()
                if ch == b"\\xe0":
                    return msvcrt.getch()
                return ch.decode("utf-8", errors="replace")
        except:
            pass
        return None

    try:
        fd = sys.stdin.fileno()
        # Non-blocking read: if no byte is ready, return None immediately
        import fcntl

        flags = fcntl.fcntl(fd, fcntl.F_GETFL)
        fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)
        try:
            ch = os.read(fd, 1).decode("utf-8", errors="replace")
        except BlockingIOError:
            return None
        finally:
            fcntl.fcntl(fd, fcntl.F_SETFL, flags)
            
        if ch == "\\x1b":
            # Start of an escape sequence
            seq = ch
            # Set to non-blocking to read the rest of the sequence
            fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)
            try:
                # Read first char after ESC
                nxt = os.read(fd, 1).decode("utf-8", errors="replace")
                seq += nxt
                if nxt == "[":
                    # CSI sequence - read until terminator (alpha or ~)
                    while True:
                        try:
                            c = os.read(fd, 1).decode("utf-8", errors="replace")
                            seq += c
                            if c.isalpha() or c in ("~",):
                                break
                        except BlockingIOError:
                            break
                elif nxt == "O":
                    # SS3 sequence - usually 1 more char
                    try:
                        seq += os.read(fd, 1).decode("utf-8", errors="replace")
                    except BlockingIOError:
                        pass
            except BlockingIOError:
                pass
            finally:
                fcntl.fcntl(fd, fcntl.F_SETFL, flags)
            return seq
        return ch
    except:
        return None


def read_line(
    prompt: str = "",
    history: Optional[list] = None,
    completer: Optional[Callable] = None,
) -> str:
    if history is None:
        history = []
    line = ""
    pos = 0
    hist_idx = -1

    sys.stdout.write(prompt)
    sys.stdout.flush()

    while True:
        key = get_key()
        if key is None:
            continue

        if key == Key.ENTER:
            sys.stdout.write("\\n")
            sys.stdout.flush()
            if line:
                history.append(line)
            return line

        elif key == Key.ESCAPE:
            return ""

        elif key == Key.BACKSPACE:
            if pos > 0:
                line = line[: pos - 1] + line[pos:]
                pos -= 1

        elif key == Key.UP:
            if history and hist_idx < len(history) - 1:
                hist_idx += 1
                line = history[-1 - hist_idx]
                pos = len(line)

        elif key == Key.DOWN:
            if hist_idx > 0:
                hist_idx -= 1
                line = history[-1 - hist_idx]
                pos = len(line)
            elif hist_idx == 0:
                hist_idx = -1
                line = ""
                pos = 0

        else:
            line = line[:pos] + key + line[pos:]
            pos += 1


class KeyBinding:
    def __init__(self, key: str, handler: Callable):
        self.key = key
        self.handler = handler


class KeyMap:
    def __init__(self):
        self.bindings: list[KeyBinding] = []

    def bind(self, key: str):
        def decorator(fn: Callable):
            self.bindings.append(KeyBinding(key, fn))
            return fn

        return decorator

    def handle(self, key: str) -> bool:
        for binding in self.bindings:
            if key == binding.key:
                binding.handler()
                return True
        return False


def keybind(keys: dict[str, Callable]) -> KeyMap:
    km = KeyMap()
    for key, handler in keys.items():
        km.bindings.append(KeyBinding(key, handler))
    return km


def setup_raw():
    if is_web():
        try:
            import js

            js.setRawInput(True)
        except Exception:
            pass
        return None
    if sys.platform == "win32":
        return None
    fd = sys.stdin.fileno()
    old = _tcgetattr(fd)
    _setraw(fd, old)
    return old


def restore(settings):
    if is_web():
        try:
            import js

            js.setRawInput(False)
        except Exception:
            pass
        return
    if settings is None:
        return
    if sys.platform == "win32":
        return
    fd = sys.stdin.fileno()
    _tcsetattr(fd, TCSADRAIN, settings)


def cleanup():
    sys.stdout.write("\\033[2J\\033[H\\033[?25h\\r\\n")
    sys.stdout.flush()
`,"src/ui/layout.py":`"""
layout.py: Window manager, stacking, focus (stub).
"""

# Placeholder for layout manager
`,"src/ui/palettes.py":`"""
Custom palettes for pyComputer themes.
"""

from tuiro.palette import Palette
from tuiro.colors import Colors


class RetroPalette(Palette):
    """Retro green phosphor theme."""
    info = Colors.BRIGHT_GREEN
    success = Colors.BRIGHT_GREEN
    warning = Colors.BRIGHT_YELLOW
    error = Colors.BRIGHT_RED
    accent = Colors.BRIGHT_GREEN
    dim = Colors.BRIGHT_BLACK
    text = Colors.BRIGHT_GREEN


class LightPalette(Palette):
    """Light theme for daytime use."""
    info = Colors.BLUE
    success = Colors.GREEN
    warning = Colors.YELLOW
    error = Colors.RED
    accent = Colors.BLUE
    dim = Colors.BLACK
    text = Colors.BLACK


class DarkPalette(Palette):
    """Dark theme for nighttime use."""
    info = Colors.BRIGHT_CYAN
    success = Colors.BRIGHT_GREEN
    warning = Colors.BRIGHT_YELLOW
    error = Colors.BRIGHT_RED
    accent = Colors.BRIGHT_MAGENTA
    dim = Colors.BLACK
    text = Colors.WHITE`,"src/ui/renderer.py":`"""
renderer.py: TUI renderer using tuiro, double-buffering.
"""

import sys
from tuiro import TUI
from src.ui.theme import Color, Style, RESET
from src.ui.palettes import RetroPalette, LightPalette, DarkPalette


_current_theme = "default"

_TUIRO_THEMES = ["default", "mono", "pastel"]

_CUSTOM_THEMES = {
    "retro": RetroPalette,
    "light": LightPalette,
    "dark": DarkPalette,
}


class Renderer:
    def __init__(self, ci_mode=False, theme="default"):
        if theme in _CUSTOM_THEMES:
            self.tui = TUI(ci_mode=ci_mode, theme=_CUSTOM_THEMES[theme]())
        else:
            self.tui = TUI(ci_mode=ci_mode, theme=theme)
        global _current_theme
        _current_theme = theme

    def set_theme(self, theme_name):
        global _current_theme
        if theme_name in _CUSTOM_THEMES:
            _current_theme = theme_name
            self.tui = TUI(theme=_CUSTOM_THEMES[theme_name])
        elif theme_name in _TUIRO_THEMES:
            _current_theme = theme_name
            self.tui = TUI(theme=theme_name)
        else:
            _current_theme = "default"
            self.tui = TUI(theme="default")

    def get_theme(self):
        global _current_theme
        return _current_theme

    def section(self, title):
        self.tui.section(title)

    def subsection(self, title):
        self.tui.subsection(title)

    def success(self, message):
        self.tui.success(message)

    def info(self, message):
        self.tui.info(message)

    def warning(self, message):
        self.tui.warning(message)

    def error(self, message):
        self.tui.error(message)

    def command(self, cmd):
        self.tui.command(cmd)

    def result(self, label, value):
        self.tui.result(label, value)

    def table(self, rows):
        self.tui.table(rows)

    def banner(self, title):
        self.tui.banner(title)

    def spinner(self, message):
        return self.tui.spinner(message)

    def step(self, title):
        return self.tui.step(title)

    def move(self, x, y):
        sys.stdout.write(f"\\033[{y};{x}H")
        return self

    def write(self, text):
        sys.stdout.write(text)
        return self

    def flush(self):
        sys.stdout.flush()
        return self

    def clear(self):
        sys.stdout.write("\\033[2J\\033[H")
        return self

    def clear_line(self):
        sys.stdout.write("\\033[2K")
        return self

    def hide_cursor(self):
        sys.stdout.write("\\033[?25l")
        return self

    def show_cursor(self):
        sys.stdout.write("\\033[?25h")
        return self

    def bold(self, text):
        return f"{Style.BOLD}{text}{RESET}"

    def dim(self, text):
        return f"{Style.DIM}{text}{RESET}"

    def green(self, text):
        return f"{Color.GREEN}{text}{RESET}"

    def bright_green(self, text):
        return f"{Color.BRIGHT_GREEN}{text}{RESET}"

    def red(self, text):
        return f"{Color.RED}{text}{RESET}"

    def bright_red(self, text):
        return f"{Color.BRIGHT_RED}{text}{RESET}"

    def yellow(self, text):
        return f"{Color.YELLOW}{text}{RESET}"

    def cyan(self, text):
        return f"{Color.CYAN}{text}{RESET}"

    def box(self, width, height, title=None):
        lines = []
        lines.append("╔" + "═" * (width - 2) + "╗")
        if title:
            title_line = f"║ {title} " + " " * (width - len(title) - 4) + "║"
            title_line = title_line[: width - 1] + "║"
            lines.append(title_line)
            if height > 3:
                lines.append("╠" + "═" * (width - 2) + "╣")
        else:
            lines.append("║" + " " * (width - 2) + "║")
        for _ in range(height - 2 - (1 if title else 0)):
            lines.append("║" + " " * (width - 2) + "║")
        lines.append("╚" + "═" * (width - 2) + "╝")
        return "\\n".join(lines)

    def box_at(self, x, y, width, height, title=None):
        box_str = self.box(width, height, title)
        lines = box_str.split("\\n")
        for i, line in enumerate(lines):
            self.move(x, y + i).write(line)
        return self
`,"src/ui/theme.py":`"""
theme.py: Colors, styles, presets for TUI rendering.
"""

from typing import Optional

RESET = "\\033[0m"


class Color:
    BLACK = "\\033[30m"
    RED = "\\033[31m"
    GREEN = "\\033[32m"
    YELLOW = "\\033[33m"
    BLUE = "\\033[34m"
    MAGENTA = "\\033[35m"
    CYAN = "\\033[36m"
    WHITE = "\\033[37m"

    BRIGHT_BLACK = "\\033[90m"
    BRIGHT_RED = "\\033[91m"
    BRIGHT_GREEN = "\\033[92m"
    BRIGHT_YELLOW = "\\033[93m"
    BRIGHT_BLUE = "\\033[94m"
    BRIGHT_MAGENTA = "\\033[95m"
    BRIGHT_CYAN = "\\033[96m"
    BRIGHT_WHITE = "\\033[97m"


class Bg:
    BLACK = "\\033[40m"
    RED = "\\033[41m"
    GREEN = "\\033[42m"
    YELLOW = "\\033[43m"
    BLUE = "\\033[44m"
    MAGENTA = "\\033[45m"
    CYAN = "\\033[46m"
    WHITE = "\\033[47m"


class Style:
    BOLD = "\\033[1m"
    DIM = "\\033[2m"
    ITALIC = "\\033[3m"
    UNDERLINE = "\\033[4m"
    BLINK = "\\033[5m"
    REVERSE = "\\033[7m"
    HIDDEN = "\\033[8m"


class Preset:
    def __init__(self, name: str, fg: str, bg: str = "", bold: bool = False):
        self.name = name
        self.fg = fg
        self.bg = bg
        self.bold = bold

    def apply(self, text: str) -> str:
        result = self.fg + text + RESET
        if self.bg:
            result = self.bg + result + RESET
        if self.bold:
            result = Style.BOLD + result + RESET
        return result


class Theme:
    def __init__(self, name: str = "default"):
        self.name = name
        self.presets = {}
        self._load_defaults()

    def _load_defaults(self):
        self.presets = {
            "header": Preset("header", Color.CYAN, bold=True),
            "success": Preset("success", Color.GREEN),
            "warning": Preset("warning", Color.YELLOW),
            "error": Preset("error", Color.RED),
            "info": Preset("info", Color.BLUE),
            "muted": Preset("muted", Color.BRIGHT_BLACK),
            "highlight": Preset("highlight", Color.BRIGHT_CYAN, bold=True),
            "border": Preset("border", Color.WHITE),
            "selected": Preset("selected", Color.BLUE, Bg.BLUE, bold=True),
            "text": Preset("text", Color.WHITE),
        }

    def get(self, name: str) -> Optional[Preset]:
        return self.presets.get(name)

    def add(self, name: str, preset: Preset):
        self.presets[name] = preset


default = Theme()

retro = Theme("retro")
retro.add("green", Preset("green", "\\033[92m", bold=True))
retro.add("amber", Preset("amber", "\\033[93m", bold=True))

light = Theme("light")
light.add("header", Preset("header", "\\033[34m", bold=True))
light.add("success", Preset("success", "\\033[32m"))
light.add("warning", Preset("warning", "\\033[33m"))
light.add("error", Preset("error", "\\033[31m"))
light.add("info", Preset("info", "\\033[34m"))
light.add("muted", Preset("muted", "\\033[90m"))
light.add("highlight", Preset("highlight", "\\033[36m", bold=True))
light.add("border", Preset("border", "\\033[30m"))
light.add("selected", Preset("selected", "\\033[37m", "\\033[47m", bold=True))
light.add("text", Preset("text", "\\033[30m"))

dark = Theme("dark")
dark.add("header", Preset("header", "\\033[96m", bold=True))
dark.add("success", Preset("success", "\\033[92m"))
dark.add("warning", Preset("warning", "\\033[93m"))
dark.add("error", Preset("error", "\\033[91m"))
dark.add("info", Preset("info", "\\033[94m"))
dark.add("muted", Preset("muted", "\\033[90m"))
dark.add("highlight", Preset("highlight", "\\033[96m", bold=True))
dark.add("border", Preset("border", "\\033[37m"))
dark.add("selected", Preset("selected", "\\033[30m", "\\033[47m", bold=True))
dark.add("text", Preset("text", "\\033[37m"))


def apply(name: str, text: str) -> str:
    preset = default.get(name)
    if preset:
        return preset.apply(text)
    return text
`,"src/ui/widgets.py":`"""
widgets.py: TUI widgets: buttons, lists, menus, dialogs, progress bar.
"""

from typing import Callable, Optional, Any


class Widget:
    def __init__(self, x: int = 0, y: int = 0, width: int = 0, height: int = 0):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.focused = False

    def render(self) -> str:
        return ""

    def handle_key(self, key: str) -> bool:
        return False


class Button(Widget):
    def __init__(
        self, label: str, x: int = 0, y: int = 0, on_click: Optional[Callable] = None
    ):
        super().__init__(x, y, len(label) + 2, 1)
        self.label = label
        self.on_click = on_click

    def render(self) -> str:
        prefix = ">" if self.focused else " "
        return f"[{prefix} {self.label} {prefix}]"

    def handle_key(self, key: str) -> bool:
        if key == "\\r" and self.on_click:
            self.on_click()
            return True
        return False


class ListBox(Widget):
    def __init__(
        self,
        items: list[str],
        x: int = 0,
        y: int = 0,
        width: int = 20,
        height: int = 10,
        on_select: Optional[Callable] = None,
    ):
        super().__init__(x, y, width, height)
        self.items = items
        self.selected = 0
        self.scroll = 0
        self.on_select = on_select

    def render(self) -> str:
        lines = []
        visible = self.items[self.scroll : self.scroll + self.height]
        for i, item in enumerate(visible):
            idx = self.scroll + i
            prefix = ">" if idx == self.selected else " "
            truncated = item[: self.width - 2]
            lines.append(f"{prefix}{truncated}")
        return "\\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key == "\\x1b[A":
            self.selected = max(0, self.selected - 1)
            return True
        elif key == "\\x1b[B":
            self.selected = min(len(self.items) - 1, self.selected + 1)
            return True
        elif key == "\\r" and self.on_select:
            self.on_select(self.items[self.selected])
            return True
        return False


class Menu(Widget):
    def __init__(
        self,
        items: list[tuple[str, Callable]],
        x: int = 0,
        y: int = 0,
        on_select: Optional[Callable] = None,
    ):
        super().__init__(x, y, 20, len(items))
        self.items = items
        self.selected = 0
        self.on_select = on_select

    def render(self) -> str:
        lines = []
        for i, (label, _) in enumerate(self.items):
            prefix = ">" if i == self.selected else " "
            lines.append(f"{prefix} {label}")
        return "\\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key == "\\x1b[A":
            self.selected = max(0, self.selected - 1)
            return True
        elif key == "\\x1b[B":
            self.selected = min(len(self.items) - 1, self.selected + 1)
            return True
        elif key == "\\r":
            label, handler = self.items[self.selected]
            if handler:
                handler()
            if self.on_select:
                self.on_select(label)
            return True
        return False


class Dialog(Widget):
    def __init__(
        self,
        title: str,
        message: str,
        buttons: list[tuple[str, Callable]],
        x: int = 0,
        y: int = 0,
        width: int = 30,
        height: int = 5,
    ):
        super().__init__(x, y, width, height)
        self.title = title
        self.message = message
        self.buttons = buttons
        self.selected = 0

    def render(self) -> str:
        lines = []
        lines.append("╔" + "═" * (self.width - 2) + "╗")
        lines.append("║" + self.title.center(self.width - 2) + "║")
        lines.append("╠" + "═" * (self.width - 2) + "╣")
        # Split message on newlines, then pad/center each line
        msg_lines = []
        for part in self.message.split("\\n"):
            # Wrap each part to width-2
            import textwrap

            wrapped = textwrap.wrap(part, width=self.width - 2) or [""]
            msg_lines.extend(wrapped)
        for line in msg_lines:
            lines.append("║" + line.center(self.width - 2)[: self.width - 2] + "║")
        button_str = "  ".join(f"[{b[0]}]" for b in self.buttons)
        lines.append("║" + button_str.center(self.width - 2) + "║")
        lines.append("╚" + "═" * (self.width - 2) + "╝")
        return "\\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key in [str(i) for i in range(len(self.buttons))]:
            idx = int(key)
            if 0 <= idx < len(self.buttons):
                _, handler = self.buttons[idx]
                if handler:
                    handler()
                return True
        return False


class ProgressBar(Widget):
    def __init__(
        self, value: float = 0, x: int = 0, y: int = 0, width: int = 20, label: str = ""
    ):
        super().__init__(x, y, width, 1)
        self.value = value
        self.label = label

    def set_value(self, value: float):
        self.value = max(0, min(1, value))

    def render(self) -> str:
        filled = int(self.value * (self.width - 2))
        bar = "█" * filled + "░" * (self.width - 2 - filled)
        return f"{self.label}: [{bar}]"


class Input(Widget):
    def __init__(
        self,
        x: int = 0,
        y: int = 0,
        width: int = 20,
        placeholder: str = "",
        on_change: Optional[Callable] = None,
    ):
        super().__init__(x, y, width, 1)
        self.value = ""
        self.placeholder = placeholder
        self.on_change = on_change
        self.cursor = 0

    def render(self) -> str:
        text = self.value or self.placeholder
        cursor_char = "_" if self.focused else ""
        return f"> {text}{cursor_char}"

    def handle_key(self, key: str) -> bool:
        if key == "\\x7f":
            if self.value and self.cursor > 0:
                self.value = self.value[: self.cursor - 1] + self.value[self.cursor :]
                self.cursor -= 1
        elif key == "\\x1b[D":
            self.cursor = max(0, self.cursor - 1)
        elif key == "\\x1b[C":
            self.cursor = min(len(self.value), self.cursor + 1)
        else:
            self.value = self.value[: self.cursor] + key + self.value[self.cursor :]
            self.cursor += 1
            if self.on_change:
                self.on_change(self.value)
        return True
`,"src/utils/__init__.py":`# pyComputer utils package

from .platform import is_native, is_web, pyc_input

__all__ = ["is_native", "is_web", "pyc_input"]
`,"src/utils/async_tools.py":`"""
async_tools.py: Async helpers: debounce, throttle, background tasks, cancellation.
"""

import asyncio
import functools
from typing import Callable, Any


async def debounce(wait: float):
    def decorator(fn: Callable):
        task = None

        async def debounced(*args, **kwargs):
            nonlocal task
            if task:
                task.cancel()
            task = asyncio.create_task(asyncio.sleep(wait))
            try:
                await task
            except asyncio.CancelledError:
                return
            return await fn(*args, **kwargs)

        return debounced

    return decorator


async def throttle(wait: float):
    last_call = 0

    async def decorator(fn: Callable):
        async def throttled(*args, **kwargs):
            nonlocal last_call
            now = asyncio.get_event_loop().time()
            if now - last_call < wait:
                return
            last_call = now
            return await fn(*args, **kwargs)

        return throttled

    return decorator


async def with_timeout(coro, timeout: float, default=None):
    try:
        return await asyncio.wait_for(coro, timeout=timeout)
    except asyncio.TimeoutError:
        return default


class BackgroundTask:
    def __init__(self, coro: Callable, *args, **kwargs):
        self.coro = coro
        self.args = args
        self.kwargs = kwargs
        self.task = None

    def start(self):
        self.task = asyncio.create_task(self.coro(*self.args, **self.kwargs))
        return self.task

    def cancel(self):
        if self.task:
            self.task.cancel()

    async def wait(self):
        if self.task:
            await self.task


async def run_in_background(fn: Callable, *args, **kwargs) -> BackgroundTask:
    task = BackgroundTask(fn, *args, **kwargs)
    task.start()
    return task


def synced(fn: Callable):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return asyncio.get_event_loop().run_until_complete(fn(*args, **kwargs))

    return wrapper


class AsyncQueue:
    def __init__(self, maxsize: int = 0):
        self._queue = asyncio.Queue(maxsize=maxsize)

    async def put(self, item):
        await self._queue.put(item)

    async def get(self):
        return await self._queue.get()

    def qsize(self):
        return self._queue.qsize()

    def empty(self):
        return self._queue.empty()

    def full(self):
        return self._queue.full()
`,"src/utils/logging.py":`"""
logging.py: Logging utilities with levels, formatting, handlers.
"""

import sys
import time
from enum import IntEnum
from typing import Optional


class Level(IntEnum):
    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40
    CRITICAL = 50


class Logger:
    def __init__(self, name: str = "", level: int = Level.INFO):
        self.name = name
        self.level = level
        self.handlers = [sys.stderr]
        self.format = "%(level)s%(message)s%(reset)s"
        self.colors = {
            Level.DEBUG: "\\033[90m",
            Level.INFO: "\\033[32m",
            Level.WARNING: "\\033[33m",
            Level.ERROR: "\\033[31m",
            Level.CRITICAL: "\\033[35;1m",
        }
        self.reset = "\\033[0m"

    def log(self, level: Level, message: str):
        if level < self.level:
            return
        color = self.colors.get(level, "")
        formatted = (
            self.format.replace("%(level)s", color)
            .replace("%(message)s", message)
            .replace("%(reset)s", self.reset)
        )
        for handler in self.handlers:
            handler.write(formatted + "\\n")
            handler.flush()

    def debug(self, message: str):
        self.log(Level.DEBUG, f"[{self.name}] {message}" if self.name else message)

    def info(self, message: str):
        self.log(Level.INFO, f"[{self.name}] {message}" if self.name else message)

    def warning(self, message: str):
        self.log(Level.WARNING, f"[{self.name}] {message}" if self.name else message)

    def error(self, message: str):
        self.log(Level.ERROR, f"[{self.name}] {message}" if self.name else message)

    def critical(self, message: str):
        self.log(Level.CRITICAL, f"[{self.name}] {message}" if self.name else message)


_default = Logger()


def debug(msg: str):
    _default.debug(msg)


def info(msg: str):
    _default.info(msg)


def warning(msg: str):
    _default.warning(msg)


def error(msg: str):
    _default.error(msg)


def critical(msg: str):
    _default.critical(msg)
`,"src/utils/platform.py":`"""Platform helpers for web vs native runtime detection."""

import sys


def is_web() -> bool:
    """Return True if running in a browser-based Python runtime like Pyodide."""
    if sys.platform in ("emscripten", "wasi"):
        return True

    if "pyodide" in sys.version.lower():
        return True

    try:
        import js  # type: ignore

        return hasattr(js, "window") or hasattr(js, "document")
    except Exception:
        return False


def is_native() -> bool:
    """Return True if running in a normal native Python runtime."""
    return not is_web()


def pyc_input(prompt: str = "") -> str:
    """
    Cross-platform input() replacement that works on web and native.
    Use this everywhere instead of input() for web compatibility.
    """
    if is_native():
        return input(prompt)

    import sys
    sys.stdout.write(prompt)
    sys.stdout.flush()

    try:
        import js
        from pyodide.ffi import run_sync
        return run_sync(js.pyc_readline())
    except Exception:
        return ""
`,"src/utils/text.py":`"""
text.py: Text utilities for formatting, manipulation.
"""

import re
from typing import Optional


def truncate(text: str, length: int, ellipsis: str = "...") -> str:
    if len(text) <= length:
        return text
    return text[: length - len(ellipsis)] + ellipsis


def wrap(text: str, width: int) -> list[str]:
    words = text.split()
    lines = []
    current = []
    for word in words:
        if not current:
            current.append(word)
        elif len(" ".join(current)) + len(word) + 1 <= width:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def indent(text: str, spaces: int = 4, first: bool = False) -> str:
    prefix = " " * spaces
    lines = text.split("\\n")
    if not first:
        return "\\n".join(prefix + line for line in lines)
    return lines[0] + "\\n" + "\\n".join(prefix + line for line in lines[1:])


def pad_center(text: str, width: int, fill: str = " ") -> str:
    padding = width - len(text)
    if padding <= 0:
        return text
    left = padding // 2
    right = padding - left
    return fill * left + text + fill * right


def pad_left(text: str, width: int, fill: str = " ") -> str:
    return fill * (width - len(text)) + text if width > len(text) else text


def pad_right(text: str, width: int, fill: str = " ") -> str:
    return text + fill * (width - len(text)) if width > len(text) else text


def strip_ansi(text: str) -> str:
    return re.sub(r"\\x1b\\[[0-9;]*m", "", text)


def strip_color(text: str) -> str:
    return strip_ansi(text)


def highlight(text: str, term: str, fill: Optional[str] = None) -> str:
    if not term:
        return text
    pattern = re.compile(re.escape(term), re.IGNORECASE)
    if fill:
        return pattern.sub(fill, text)
    return pattern.sub(lambda m: f"\\033[1m{m.group()}\\033[0m", text)


def lines(text: str) -> list[str]:
    return text.split("\\n")


def unlines(lines: list[str]) -> str:
    return "\\n".join(lines)


def uniq(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result
`,"uv.lock":`version = 1
revision = 3
requires-python = ">=3.12"

[[package]]
name = "certifi"
version = "2026.4.22"
source = { registry = "https://pypi.org/simple" }
sdist = { url = "https://files.pythonhosted.org/packages/25/ee/6caf7a40c36a1220410afe15a1cc64993a1f864871f698c0f93acb72842a/certifi-2026.4.22.tar.gz", hash = "sha256:8d455352a37b71bf76a79caa83a3d6c25afee4a385d632127b6afb3963f1c580", size = 137077, upload-time = "2026-04-22T11:26:11.191Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/22/30/7cd8fdcdfbc5b869528b079bfb76dcdf6056b1a2097a662e5e8c04f42965/certifi-2026.4.22-py3-none-any.whl", hash = "sha256:3cb2210c8f88ba2318d29b0388d1023c8492ff72ecdde4ebdaddbb13a31b1c4a", size = 135707, upload-time = "2026-04-22T11:26:09.372Z" },
]

[[package]]
name = "charset-normalizer"
version = "3.4.7"
source = { registry = "https://pypi.org/simple" }
sdist = { url = "https://files.pythonhosted.org/packages/e7/a1/67fe25fac3c7642725500a3f6cfe5821ad557c3abb11c9d20d12c7008d3e/charset_normalizer-3.4.7.tar.gz", hash = "sha256:ae89db9e5f98a11a4bf50407d4363e7b09b31e55bc117b4f7d80aab97ba009e5", size = 144271, upload-time = "2026-04-02T09:28:39.342Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/0c/eb/4fc8d0a7110eb5fc9cc161723a34a8a6c200ce3b4fbf681bc86feee22308/charset_normalizer-3.4.7-cp312-cp312-macosx_10_13_universal2.whl", hash = "sha256:eca9705049ad3c7345d574e3510665cb2cf844c2f2dcfe675332677f081cbd46", size = 311328, upload-time = "2026-04-02T09:26:24.331Z" },
    { url = "https://files.pythonhosted.org/packages/f8/e3/0fadc706008ac9d7b9b5be6dc767c05f9d3e5df51744ce4cc9605de7b9f4/charset_normalizer-3.4.7-cp312-cp312-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:6178f72c5508bfc5fd446a5905e698c6212932f25bcdd4b47a757a50605a90e2", size = 208061, upload-time = "2026-04-02T09:26:25.568Z" },
    { url = "https://files.pythonhosted.org/packages/42/f0/3dd1045c47f4a4604df85ec18ad093912ae1344ac706993aff91d38773a2/charset_normalizer-3.4.7-cp312-cp312-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:e1421b502d83040e6d7fb2fb18dff63957f720da3d77b2fbd3187ceb63755d7b", size = 229031, upload-time = "2026-04-02T09:26:26.865Z" },
    { url = "https://files.pythonhosted.org/packages/dc/67/675a46eb016118a2fbde5a277a5d15f4f69d5f3f5f338e5ee2f8948fcf43/charset_normalizer-3.4.7-cp312-cp312-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:edac0f1ab77644605be2cbba52e6b7f630731fc42b34cb0f634be1a6eface56a", size = 225239, upload-time = "2026-04-02T09:26:28.044Z" },
    { url = "https://files.pythonhosted.org/packages/4b/f8/d0118a2f5f23b02cd166fa385c60f9b0d4f9194f574e2b31cef350ad7223/charset_normalizer-3.4.7-cp312-cp312-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:5649fd1c7bade02f320a462fdefd0b4bd3ce036065836d4f42e0de958038e116", size = 216589, upload-time = "2026-04-02T09:26:29.239Z" },
    { url = "https://files.pythonhosted.org/packages/b1/f1/6d2b0b261b6c4ceef0fcb0d17a01cc5bc53586c2d4796fa04b5c540bc13d/charset_normalizer-3.4.7-cp312-cp312-manylinux_2_31_armv7l.whl", hash = "sha256:203104ed3e428044fd943bc4bf45fa73c0730391f9621e37fe39ecf477b128cb", size = 202733, upload-time = "2026-04-02T09:26:30.5Z" },
    { url = "https://files.pythonhosted.org/packages/6f/c0/7b1f943f7e87cc3db9626ba17807d042c38645f0a1d4415c7a14afb5591f/charset_normalizer-3.4.7-cp312-cp312-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:298930cec56029e05497a76988377cbd7457ba864beeea92ad7e844fe74cd1f1", size = 212652, upload-time = "2026-04-02T09:26:31.709Z" },
    { url = "https://files.pythonhosted.org/packages/38/dd/5a9ab159fe45c6e72079398f277b7d2b523e7f716acc489726115a910097/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_aarch64.whl", hash = "sha256:708838739abf24b2ceb208d0e22403dd018faeef86ddac04319a62ae884c4f15", size = 211229, upload-time = "2026-04-02T09:26:33.282Z" },
    { url = "https://files.pythonhosted.org/packages/d5/ff/531a1cad5ca855d1c1a8b69cb71abfd6d85c0291580146fda7c82857caa1/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_armv7l.whl", hash = "sha256:0f7eb884681e3938906ed0434f20c63046eacd0111c4ba96f27b76084cd679f5", size = 203552, upload-time = "2026-04-02T09:26:34.845Z" },
    { url = "https://files.pythonhosted.org/packages/c1/4c/a5fb52d528a8ca41f7598cb619409ece30a169fbdf9cdce592e53b46c3a6/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_ppc64le.whl", hash = "sha256:4dc1e73c36828f982bfe79fadf5919923f8a6f4df2860804db9a98c48824ce8d", size = 230806, upload-time = "2026-04-02T09:26:36.152Z" },
    { url = "https://files.pythonhosted.org/packages/59/7a/071feed8124111a32b316b33ae4de83d36923039ef8cf48120266844285b/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_riscv64.whl", hash = "sha256:aed52fea0513bac0ccde438c188c8a471c4e0f457c2dd20cdbf6ea7a450046c7", size = 212316, upload-time = "2026-04-02T09:26:37.672Z" },
    { url = "https://files.pythonhosted.org/packages/fd/35/f7dba3994312d7ba508e041eaac39a36b120f32d4c8662b8814dab876431/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_s390x.whl", hash = "sha256:fea24543955a6a729c45a73fe90e08c743f0b3334bbf3201e6c4bc1b0c7fa464", size = 227274, upload-time = "2026-04-02T09:26:38.93Z" },
    { url = "https://files.pythonhosted.org/packages/8a/2d/a572df5c9204ab7688ec1edc895a73ebded3b023bb07364710b05dd1c9be/charset_normalizer-3.4.7-cp312-cp312-musllinux_1_2_x86_64.whl", hash = "sha256:bb6d88045545b26da47aa879dd4a89a71d1dce0f0e549b1abcb31dfe4a8eac49", size = 218468, upload-time = "2026-04-02T09:26:40.17Z" },
    { url = "https://files.pythonhosted.org/packages/86/eb/890922a8b03a568ca2f336c36585a4713c55d4d67bf0f0c78924be6315ca/charset_normalizer-3.4.7-cp312-cp312-win32.whl", hash = "sha256:2257141f39fe65a3fdf38aeccae4b953e5f3b3324f4ff0daf9f15b8518666a2c", size = 148460, upload-time = "2026-04-02T09:26:41.416Z" },
    { url = "https://files.pythonhosted.org/packages/35/d9/0e7dffa06c5ab081f75b1b786f0aefc88365825dfcd0ac544bdb7b2b6853/charset_normalizer-3.4.7-cp312-cp312-win_amd64.whl", hash = "sha256:5ed6ab538499c8644b8a3e18debabcd7ce684f3fa91cf867521a7a0279cab2d6", size = 159330, upload-time = "2026-04-02T09:26:42.554Z" },
    { url = "https://files.pythonhosted.org/packages/9e/5d/481bcc2a7c88ea6b0878c299547843b2521ccbc40980cb406267088bc701/charset_normalizer-3.4.7-cp312-cp312-win_arm64.whl", hash = "sha256:56be790f86bfb2c98fb742ce566dfb4816e5a83384616ab59c49e0604d49c51d", size = 147828, upload-time = "2026-04-02T09:26:44.075Z" },
    { url = "https://files.pythonhosted.org/packages/c1/3b/66777e39d3ae1ddc77ee606be4ec6d8cbd4c801f65e5a1b6f2b11b8346dd/charset_normalizer-3.4.7-cp313-cp313-macosx_10_13_universal2.whl", hash = "sha256:f496c9c3cc02230093d8330875c4c3cdfc3b73612a5fd921c65d39cbcef08063", size = 309627, upload-time = "2026-04-02T09:26:45.198Z" },
    { url = "https://files.pythonhosted.org/packages/2e/4e/b7f84e617b4854ade48a1b7915c8ccfadeba444d2a18c291f696e37f0d3b/charset_normalizer-3.4.7-cp313-cp313-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:0ea948db76d31190bf08bd371623927ee1339d5f2a0b4b1b4a4439a65298703c", size = 207008, upload-time = "2026-04-02T09:26:46.824Z" },
    { url = "https://files.pythonhosted.org/packages/c4/bb/ec73c0257c9e11b268f018f068f5d00aa0ef8c8b09f7753ebd5f2880e248/charset_normalizer-3.4.7-cp313-cp313-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:a277ab8928b9f299723bc1a2dabb1265911b1a76341f90a510368ca44ad9ab66", size = 228303, upload-time = "2026-04-02T09:26:48.397Z" },
    { url = "https://files.pythonhosted.org/packages/85/fb/32d1f5033484494619f701e719429c69b766bfc4dbc61aa9e9c8c166528b/charset_normalizer-3.4.7-cp313-cp313-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:3bec022aec2c514d9cf199522a802bd007cd588ab17ab2525f20f9c34d067c18", size = 224282, upload-time = "2026-04-02T09:26:49.684Z" },
    { url = "https://files.pythonhosted.org/packages/fa/07/330e3a0dda4c404d6da83b327270906e9654a24f6c546dc886a0eb0ffb23/charset_normalizer-3.4.7-cp313-cp313-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:e044c39e41b92c845bc815e5ae4230804e8e7bc29e399b0437d64222d92809dd", size = 215595, upload-time = "2026-04-02T09:26:50.915Z" },
    { url = "https://files.pythonhosted.org/packages/e3/7c/fc890655786e423f02556e0216d4b8c6bcb6bdfa890160dc66bf52dee468/charset_normalizer-3.4.7-cp313-cp313-manylinux_2_31_armv7l.whl", hash = "sha256:f495a1652cf3fbab2eb0639776dad966c2fb874d79d87ca07f9d5f059b8bd215", size = 201986, upload-time = "2026-04-02T09:26:52.197Z" },
    { url = "https://files.pythonhosted.org/packages/d8/97/bfb18b3db2aed3b90cf54dc292ad79fdd5ad65c4eae454099475cbeadd0d/charset_normalizer-3.4.7-cp313-cp313-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:e712b419df8ba5e42b226c510472b37bd57b38e897d3eca5e8cfd410a29fa859", size = 211711, upload-time = "2026-04-02T09:26:53.49Z" },
    { url = "https://files.pythonhosted.org/packages/6f/a5/a581c13798546a7fd557c82614a5c65a13df2157e9ad6373166d2a3e645d/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_aarch64.whl", hash = "sha256:7804338df6fcc08105c7745f1502ba68d900f45fd770d5bdd5288ddccb8a42d8", size = 210036, upload-time = "2026-04-02T09:26:54.975Z" },
    { url = "https://files.pythonhosted.org/packages/8c/bf/b3ab5bcb478e4193d517644b0fb2bf5497fbceeaa7a1bc0f4d5b50953861/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_armv7l.whl", hash = "sha256:481551899c856c704d58119b5025793fa6730adda3571971af568f66d2424bb5", size = 202998, upload-time = "2026-04-02T09:26:56.303Z" },
    { url = "https://files.pythonhosted.org/packages/e7/4e/23efd79b65d314fa320ec6017b4b5834d5c12a58ba4610aa353af2e2f577/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_ppc64le.whl", hash = "sha256:f59099f9b66f0d7145115e6f80dd8b1d847176df89b234a5a6b3f00437aa0832", size = 230056, upload-time = "2026-04-02T09:26:57.554Z" },
    { url = "https://files.pythonhosted.org/packages/b9/9f/1e1941bc3f0e01df116e68dc37a55c4d249df5e6fa77f008841aef68264f/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_riscv64.whl", hash = "sha256:f59ad4c0e8f6bba240a9bb85504faa1ab438237199d4cce5f622761507b8f6a6", size = 211537, upload-time = "2026-04-02T09:26:58.843Z" },
    { url = "https://files.pythonhosted.org/packages/80/0f/088cbb3020d44428964a6c97fe1edfb1b9550396bf6d278330281e8b709c/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_s390x.whl", hash = "sha256:3dedcc22d73ec993f42055eff4fcfed9318d1eeb9a6606c55892a26964964e48", size = 226176, upload-time = "2026-04-02T09:27:00.437Z" },
    { url = "https://files.pythonhosted.org/packages/6a/9f/130394f9bbe06f4f63e22641d32fc9b202b7e251c9aef4db044324dac493/charset_normalizer-3.4.7-cp313-cp313-musllinux_1_2_x86_64.whl", hash = "sha256:64f02c6841d7d83f832cd97ccf8eb8a906d06eb95d5276069175c696b024b60a", size = 217723, upload-time = "2026-04-02T09:27:02.021Z" },
    { url = "https://files.pythonhosted.org/packages/73/55/c469897448a06e49f8fa03f6caae97074fde823f432a98f979cc42b90e69/charset_normalizer-3.4.7-cp313-cp313-win32.whl", hash = "sha256:4042d5c8f957e15221d423ba781e85d553722fc4113f523f2feb7b188cc34c5e", size = 148085, upload-time = "2026-04-02T09:27:03.192Z" },
    { url = "https://files.pythonhosted.org/packages/5d/78/1b74c5bbb3f99b77a1715c91b3e0b5bdb6fe302d95ace4f5b1bec37b0167/charset_normalizer-3.4.7-cp313-cp313-win_amd64.whl", hash = "sha256:3946fa46a0cf3e4c8cb1cc52f56bb536310d34f25f01ca9b6c16afa767dab110", size = 158819, upload-time = "2026-04-02T09:27:04.454Z" },
    { url = "https://files.pythonhosted.org/packages/68/86/46bd42279d323deb8687c4a5a811fd548cb7d1de10cf6535d099877a9a9f/charset_normalizer-3.4.7-cp313-cp313-win_arm64.whl", hash = "sha256:80d04837f55fc81da168b98de4f4b797ef007fc8a79ab71c6ec9bc4dd662b15b", size = 147915, upload-time = "2026-04-02T09:27:05.971Z" },
    { url = "https://files.pythonhosted.org/packages/97/c8/c67cb8c70e19ef1960b97b22ed2a1567711de46c4ddf19799923adc836c2/charset_normalizer-3.4.7-cp314-cp314-macosx_10_15_universal2.whl", hash = "sha256:c36c333c39be2dbca264d7803333c896ab8fa7d4d6f0ab7edb7dfd7aea6e98c0", size = 309234, upload-time = "2026-04-02T09:27:07.194Z" },
    { url = "https://files.pythonhosted.org/packages/99/85/c091fdee33f20de70d6c8b522743b6f831a2f1cd3ff86de4c6a827c48a76/charset_normalizer-3.4.7-cp314-cp314-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:1c2aed2e5e41f24ea8ef1590b8e848a79b56f3a5564a65ceec43c9d692dc7d8a", size = 208042, upload-time = "2026-04-02T09:27:08.749Z" },
    { url = "https://files.pythonhosted.org/packages/87/1c/ab2ce611b984d2fd5d86a5a8a19c1ae26acac6bad967da4967562c75114d/charset_normalizer-3.4.7-cp314-cp314-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:54523e136b8948060c0fa0bc7b1b50c32c186f2fceee897a495406bb6e311d2b", size = 228706, upload-time = "2026-04-02T09:27:09.951Z" },
    { url = "https://files.pythonhosted.org/packages/a8/29/2b1d2cb00bf085f59d29eb773ce58ec2d325430f8c216804a0a5cd83cbca/charset_normalizer-3.4.7-cp314-cp314-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:715479b9a2802ecac752a3b0efa2b0b60285cf962ee38414211abdfccc233b41", size = 224727, upload-time = "2026-04-02T09:27:11.175Z" },
    { url = "https://files.pythonhosted.org/packages/47/5c/032c2d5a07fe4d4855fea851209cca2b6f03ebeb6d4e3afdb3358386a684/charset_normalizer-3.4.7-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:bd6c2a1c7573c64738d716488d2cdd3c00e340e4835707d8fdb8dc1a66ef164e", size = 215882, upload-time = "2026-04-02T09:27:12.446Z" },
    { url = "https://files.pythonhosted.org/packages/2c/c2/356065d5a8b78ed04499cae5f339f091946a6a74f91e03476c33f0ab7100/charset_normalizer-3.4.7-cp314-cp314-manylinux_2_31_armv7l.whl", hash = "sha256:c45e9440fb78f8ddabcf714b68f936737a121355bf59f3907f4e17721b9d1aae", size = 200860, upload-time = "2026-04-02T09:27:13.721Z" },
    { url = "https://files.pythonhosted.org/packages/0c/cd/a32a84217ced5039f53b29f460962abb2d4420def55afabe45b1c3c7483d/charset_normalizer-3.4.7-cp314-cp314-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:3534e7dcbdcf757da6b85a0bbf5b6868786d5982dd959b065e65481644817a18", size = 211564, upload-time = "2026-04-02T09:27:15.272Z" },
    { url = "https://files.pythonhosted.org/packages/44/86/58e6f13ce26cc3b8f4a36b94a0f22ae2f00a72534520f4ae6857c4b81f89/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_aarch64.whl", hash = "sha256:e8ac484bf18ce6975760921bb6148041faa8fef0547200386ea0b52b5d27bf7b", size = 211276, upload-time = "2026-04-02T09:27:16.834Z" },
    { url = "https://files.pythonhosted.org/packages/8f/fe/d17c32dc72e17e155e06883efa84514ca375f8a528ba2546bee73fc4df81/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_armv7l.whl", hash = "sha256:a5fe03b42827c13cdccd08e6c0247b6a6d4b5e3cdc53fd1749f5896adcdc2356", size = 201238, upload-time = "2026-04-02T09:27:18.229Z" },
    { url = "https://files.pythonhosted.org/packages/6a/29/f33daa50b06525a237451cdb6c69da366c381a3dadcd833fa5676bc468b3/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_ppc64le.whl", hash = "sha256:2d6eb928e13016cea4f1f21d1e10c1cebd5a421bc57ddf5b1142ae3f86824fab", size = 230189, upload-time = "2026-04-02T09:27:19.445Z" },
    { url = "https://files.pythonhosted.org/packages/b6/6e/52c84015394a6a0bdcd435210a7e944c5f94ea1055f5cc5d56c5fe368e7b/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_riscv64.whl", hash = "sha256:e74327fb75de8986940def6e8dee4f127cc9752bee7355bb323cc5b2659b6d46", size = 211352, upload-time = "2026-04-02T09:27:20.79Z" },
    { url = "https://files.pythonhosted.org/packages/8c/d7/4353be581b373033fb9198bf1da3cf8f09c1082561e8e922aa7b39bf9fe8/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_s390x.whl", hash = "sha256:d6038d37043bced98a66e68d3aa2b6a35505dc01328cd65217cefe82f25def44", size = 227024, upload-time = "2026-04-02T09:27:22.063Z" },
    { url = "https://files.pythonhosted.org/packages/30/45/99d18aa925bd1740098ccd3060e238e21115fffbfdcb8f3ece837d0ace6c/charset_normalizer-3.4.7-cp314-cp314-musllinux_1_2_x86_64.whl", hash = "sha256:7579e913a5339fb8fa133f6bbcfd8e6749696206cf05acdbdca71a1b436d8e72", size = 217869, upload-time = "2026-04-02T09:27:23.486Z" },
    { url = "https://files.pythonhosted.org/packages/5c/05/5ee478aa53f4bb7996482153d4bfe1b89e0f087f0ab6b294fcf92d595873/charset_normalizer-3.4.7-cp314-cp314-win32.whl", hash = "sha256:5b77459df20e08151cd6f8b9ef8ef1f961ef73d85c21a555c7eed5b79410ec10", size = 148541, upload-time = "2026-04-02T09:27:25.146Z" },
    { url = "https://files.pythonhosted.org/packages/48/77/72dcb0921b2ce86420b2d79d454c7022bf5be40202a2a07906b9f2a35c97/charset_normalizer-3.4.7-cp314-cp314-win_amd64.whl", hash = "sha256:92a0a01ead5e668468e952e4238cccd7c537364eb7d851ab144ab6627dbbe12f", size = 159634, upload-time = "2026-04-02T09:27:26.642Z" },
    { url = "https://files.pythonhosted.org/packages/c6/a3/c2369911cd72f02386e4e340770f6e158c7980267da16af8f668217abaa0/charset_normalizer-3.4.7-cp314-cp314-win_arm64.whl", hash = "sha256:67f6279d125ca0046a7fd386d01b311c6363844deac3e5b069b514ba3e63c246", size = 148384, upload-time = "2026-04-02T09:27:28.271Z" },
    { url = "https://files.pythonhosted.org/packages/94/09/7e8a7f73d24dba1f0035fbbf014d2c36828fc1bf9c88f84093e57d315935/charset_normalizer-3.4.7-cp314-cp314t-macosx_10_15_universal2.whl", hash = "sha256:effc3f449787117233702311a1b7d8f59cba9ced946ba727bdc329ec69028e24", size = 330133, upload-time = "2026-04-02T09:27:29.474Z" },
    { url = "https://files.pythonhosted.org/packages/8d/da/96975ddb11f8e977f706f45cddd8540fd8242f71ecdb5d18a80723dcf62c/charset_normalizer-3.4.7-cp314-cp314t-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:fbccdc05410c9ee21bbf16a35f4c1d16123dcdeb8a1d38f33654fa21d0234f79", size = 216257, upload-time = "2026-04-02T09:27:30.793Z" },
    { url = "https://files.pythonhosted.org/packages/e5/e8/1d63bf8ef2d388e95c64b2098f45f84758f6d102a087552da1485912637b/charset_normalizer-3.4.7-cp314-cp314t-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:733784b6d6def852c814bce5f318d25da2ee65dd4839a0718641c696e09a2960", size = 234851, upload-time = "2026-04-02T09:27:32.44Z" },
    { url = "https://files.pythonhosted.org/packages/9b/40/e5ff04233e70da2681fa43969ad6f66ca5611d7e669be0246c4c7aaf6dc8/charset_normalizer-3.4.7-cp314-cp314t-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:a89c23ef8d2c6b27fd200a42aa4ac72786e7c60d40efdc76e6011260b6e949c4", size = 233393, upload-time = "2026-04-02T09:27:34.03Z" },
    { url = "https://files.pythonhosted.org/packages/be/c1/06c6c49d5a5450f76899992f1ee40b41d076aee9279b49cf9974d2f313d5/charset_normalizer-3.4.7-cp314-cp314t-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:6c114670c45346afedc0d947faf3c7f701051d2518b943679c8ff88befe14f8e", size = 223251, upload-time = "2026-04-02T09:27:35.369Z" },
    { url = "https://files.pythonhosted.org/packages/2b/9f/f2ff16fb050946169e3e1f82134d107e5d4ae72647ec8a1b1446c148480f/charset_normalizer-3.4.7-cp314-cp314t-manylinux_2_31_armv7l.whl", hash = "sha256:a180c5e59792af262bf263b21a3c49353f25945d8d9f70628e73de370d55e1e1", size = 206609, upload-time = "2026-04-02T09:27:36.661Z" },
    { url = "https://files.pythonhosted.org/packages/69/d5/a527c0cd8d64d2eab7459784fb4169a0ac76e5a6fc5237337982fd61347e/charset_normalizer-3.4.7-cp314-cp314t-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:3c9a494bc5ec77d43cea229c4f6db1e4d8fe7e1bbffa8b6f0f0032430ff8ab44", size = 220014, upload-time = "2026-04-02T09:27:38.019Z" },
    { url = "https://files.pythonhosted.org/packages/7e/80/8a7b8104a3e203074dc9aa2c613d4b726c0e136bad1cc734594b02867972/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_aarch64.whl", hash = "sha256:8d828b6667a32a728a1ad1d93957cdf37489c57b97ae6c4de2860fa749b8fc1e", size = 218979, upload-time = "2026-04-02T09:27:39.37Z" },
    { url = "https://files.pythonhosted.org/packages/02/9a/b759b503d507f375b2b5c153e4d2ee0a75aa215b7f2489cf314f4541f2c0/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_armv7l.whl", hash = "sha256:cf1493cd8607bec4d8a7b9b004e699fcf8f9103a9284cc94962cb73d20f9d4a3", size = 209238, upload-time = "2026-04-02T09:27:40.722Z" },
    { url = "https://files.pythonhosted.org/packages/c2/4e/0f3f5d47b86bdb79256e7290b26ac847a2832d9a4033f7eb2cd4bcf4bb5b/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_ppc64le.whl", hash = "sha256:0c96c3b819b5c3e9e165495db84d41914d6894d55181d2d108cc1a69bfc9cce0", size = 236110, upload-time = "2026-04-02T09:27:42.33Z" },
    { url = "https://files.pythonhosted.org/packages/96/23/bce28734eb3ed2c91dcf93abeb8a5cf393a7b2749725030bb630e554fdd8/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_riscv64.whl", hash = "sha256:752a45dc4a6934060b3b0dab47e04edc3326575f82be64bc4fc293914566503e", size = 219824, upload-time = "2026-04-02T09:27:43.924Z" },
    { url = "https://files.pythonhosted.org/packages/2c/6f/6e897c6984cc4d41af319b077f2f600fc8214eb2fe2d6bcb79141b882400/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_s390x.whl", hash = "sha256:8778f0c7a52e56f75d12dae53ae320fae900a8b9b4164b981b9c5ce059cd1fcb", size = 233103, upload-time = "2026-04-02T09:27:45.348Z" },
    { url = "https://files.pythonhosted.org/packages/76/22/ef7bd0fe480a0ae9b656189ec00744b60933f68b4f42a7bb06589f6f576a/charset_normalizer-3.4.7-cp314-cp314t-musllinux_1_2_x86_64.whl", hash = "sha256:ce3412fbe1e31eb81ea42f4169ed94861c56e643189e1e75f0041f3fe7020abe", size = 225194, upload-time = "2026-04-02T09:27:46.706Z" },
    { url = "https://files.pythonhosted.org/packages/c5/a7/0e0ab3e0b5bc1219bd80a6a0d4d72ca74d9250cb2382b7c699c147e06017/charset_normalizer-3.4.7-cp314-cp314t-win32.whl", hash = "sha256:c03a41a8784091e67a39648f70c5f97b5b6a37f216896d44d2cdcb82615339a0", size = 159827, upload-time = "2026-04-02T09:27:48.053Z" },
    { url = "https://files.pythonhosted.org/packages/7a/1d/29d32e0fb40864b1f878c7f5a0b343ae676c6e2b271a2d55cc3a152391da/charset_normalizer-3.4.7-cp314-cp314t-win_amd64.whl", hash = "sha256:03853ed82eeebbce3c2abfdbc98c96dc205f32a79627688ac9a27370ea61a49c", size = 174168, upload-time = "2026-04-02T09:27:49.795Z" },
    { url = "https://files.pythonhosted.org/packages/de/32/d92444ad05c7a6e41fb2036749777c163baf7a0301a040cb672d6b2b1ae9/charset_normalizer-3.4.7-cp314-cp314t-win_arm64.whl", hash = "sha256:c35abb8bfff0185efac5878da64c45dafd2b37fb0383add1be155a763c1f083d", size = 153018, upload-time = "2026-04-02T09:27:51.116Z" },
    { url = "https://files.pythonhosted.org/packages/db/8f/61959034484a4a7c527811f4721e75d02d653a35afb0b6054474d8185d4c/charset_normalizer-3.4.7-py3-none-any.whl", hash = "sha256:3dce51d0f5e7951f8bb4900c257dad282f49190fdbebecd4ba99bcc41fef404d", size = 61958, upload-time = "2026-04-02T09:28:37.794Z" },
]

[[package]]
name = "idna"
version = "3.13"
source = { registry = "https://pypi.org/simple" }
sdist = { url = "https://files.pythonhosted.org/packages/ce/cc/762dfb036166873f0059f3b7de4565e1b5bc3d6f28a414c13da27e442f99/idna-3.13.tar.gz", hash = "sha256:585ea8fe5d69b9181ec1afba340451fba6ba764af97026f92a91d4eef164a242", size = 194210, upload-time = "2026-04-22T16:42:42.314Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/5d/13/ad7d7ca3808a898b4612b6fe93cde56b53f3034dcde235acb1f0e1df24c6/idna-3.13-py3-none-any.whl", hash = "sha256:892ea0cde124a99ce773decba204c5552b69c3c67ffd5f232eb7696135bc8bb3", size = 68629, upload-time = "2026-04-22T16:42:40.909Z" },
]

[[package]]
name = "pycomputer"
version = "0.1.0"
source = { virtual = "." }
dependencies = [
    { name = "requests" },
    { name = "tuiro" },
]

[package.metadata]
requires-dist = [
    { name = "requests", specifier = ">=2.33.1" },
    { name = "tuiro", specifier = ">=0.1.1" },
]

[[package]]
name = "requests"
version = "2.33.1"
source = { registry = "https://pypi.org/simple" }
dependencies = [
    { name = "certifi" },
    { name = "charset-normalizer" },
    { name = "idna" },
    { name = "urllib3" },
]
sdist = { url = "https://files.pythonhosted.org/packages/5f/a4/98b9c7c6428a668bf7e42ebb7c79d576a1c3c1e3ae2d47e674b468388871/requests-2.33.1.tar.gz", hash = "sha256:18817f8c57c6263968bc123d237e3b8b08ac046f5456bd1e307ee8f4250d3517", size = 134120, upload-time = "2026-03-30T16:09:15.531Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/d7/8e/7540e8a2036f79a125c1d2ebadf69ed7901608859186c856fa0388ef4197/requests-2.33.1-py3-none-any.whl", hash = "sha256:4e6d1ef462f3626a1f0a0a9c42dd93c63bad33f9f1c1937509b8c5c8718ab56a", size = 64947, upload-time = "2026-03-30T16:09:13.83Z" },
]

[[package]]
name = "tuiro"
version = "0.1.1"
source = { registry = "https://pypi.org/simple" }
sdist = { url = "https://files.pythonhosted.org/packages/12/54/29c5e6ab7b9162d33aede17e44bbcc895be19fbbf1c82e50c129b8e94b67/tuiro-0.1.1.tar.gz", hash = "sha256:6dc598518a29343c91d9fb96e25b60c01c9f7c5f0a8756a48560d69234337c25", size = 6137, upload-time = "2026-02-14T20:50:41.981Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/10/a7/87ce670c3dfe303f8c947bd987113cfff4973f7cdb197002b1d2f7498581/tuiro-0.1.1-py3-none-any.whl", hash = "sha256:3aebf84edab48cd9cd55eb4435b7476ae6fc70d8e695d1de5ad1ac7fc8efac7f", size = 8549, upload-time = "2026-02-14T20:50:40.778Z" },
]

[[package]]
name = "urllib3"
version = "2.6.3"
source = { registry = "https://pypi.org/simple" }
sdist = { url = "https://files.pythonhosted.org/packages/c7/24/5f1b3bdffd70275f6661c76461e25f024d5a38a46f04aaca912426a2b1d3/urllib3-2.6.3.tar.gz", hash = "sha256:1b62b6884944a57dbe321509ab94fd4d3b307075e0c2eae991ac71ee15ad38ed", size = 435556, upload-time = "2026-01-07T16:24:43.925Z" }
wheels = [
    { url = "https://files.pythonhosted.org/packages/39/08/aaaad47bc4e9dc8c725e68f9d04865dbcb2052843ff09c97b08904852d84/urllib3-2.6.3-py3-none-any.whl", hash = "sha256:bf272323e553dfb2e87d9bfd225ca7b0f467b919d7bbd355436d3fd37cb0acd4", size = 131584, upload-time = "2026-01-07T16:24:42.685Z" },
]
`,"apps/calculator/data/history.txt":`2 + 2 = 4
4+4 = 8
`,"apps/notes/data/Test.txt":"Hello, world!","apps/settings/config.json":'{"theme": "default", "username": "user", "show_splash": true, "confirm_actions": true, "editor_width": 40, "password": ""}',"boot/logo.txt":`                                                                                                                
                            _/_/_/                                                  _/                          
     _/_/_/    _/    _/  _/          _/_/    _/_/_/  _/_/    _/_/_/    _/    _/  _/_/_/_/    _/_/    _/  _/_/   
    _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/_/_/_/  _/_/        
   _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/        _/           
  _/_/_/      _/_/_/    _/_/_/    _/_/    _/    _/    _/  _/_/_/      _/_/_/      _/_/    _/_/_/  _/            
 _/              _/                                      _/                                                     
_/          _/_/                                        _/                                                      
                              
pyComputer Kernel Booting...
`,"sys/apps.json":"[]","usr/apps/calculator/main.py":`"""
Calculator app entrypoint for pyComputer (full implementation)
"""

from src.fs.vfs import VFS
from src.stdlib.appstdlib import input, info, error, success, banner, pause

import math

HIST_PATH = "apps/calculator/data/history.txt"


def ensure_hist_dir(vfs):
    import os

    hist_dir = os.path.dirname(HIST_PATH)
    if not vfs.exists(hist_dir):
        vfs.mkdir(hist_dir)


def load_history(vfs):
    ensure_hist_dir(vfs)
    if vfs.exists(HIST_PATH):
        return vfs.read(HIST_PATH).splitlines()
    return []


def save_history(vfs, history):
    ensure_hist_dir(vfs)
    vfs.write(HIST_PATH, "\\n".join(history) + "\\n")


def main(*args):
    vfs = VFS()
    history = load_history(vfs)
    while True:
        banner("Calculator")
        info("Options: [C]alc  [H]istory  [Q]uit")
        choice = input("Choose: ").strip().lower()
        if choice == "c":
            expr = input("Enter expression (e.g. 2 + 2): ")
            try:
                # Safe eval: only math module and numbers
                allowed = {
                    k: getattr(math, k) for k in dir(math) if not k.startswith("_")
                }
                allowed["abs"] = abs
                allowed["round"] = round
                result = eval(expr, {"__builtins__": {}}, allowed)
                success(f"Result: {result}")
                history.append(f"{expr} = {result}")
                save_history(vfs, history)
            except Exception as e:
                error(f"Error: {e}")
        elif choice == "h":
            banner("History")
            if history:
                for line in history[-20:]:
                    info(line)
            else:
                info("No history yet.")
            pause()
        elif choice == "q":
            info("Exiting Calculator app.")
            break
        else:
            error("Unknown option.")
`,"usr/apps/calculator/manifest.json":`{
  "name": "calculator",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": ["fs"],
  "description": "A simple calculator app for pyComputer."
}
`,"usr/apps/ide/main.py":`"""
IDE - A proper TUI code editor for pyComputer
"""

import sys
import os
import time
import subprocess
import traceback
import io
import contextlib
from collections import deque
from src.ui.renderer import Renderer
from src.ui.input import get_key, setup_raw, restore, cleanup, Key, web_input_queue
from src.fs.vfs import VFS
from src.utils.platform import is_web

#  Layout constants
TOOLBAR_H   = 2   # top toolbar rows
STATUSBAR_H = 1   # bottom status bar
FILETREE_W  = 22  # left file-tree panel width
OUTPUT_H    = 10  # bottom output panel height (when visible)

# ANSI helpers
ESC = "\\033["
def goto(x, y):       return f"{ESC}{y};{x}H"
def clr_line():       return f"{ESC}2K"
def clr_screen():     return "\\033[2J\\033[H"
def bold(t):          return f"\\033[1m{t}\\033[0m"
def dim(t):           return f"\\033[2m{t}\\033[0m"
def rev(t):           return f"\\033[7m{t}\\033[0m"
def fg(c, t):         return f"\\033[38;5;{c}m{t}\\033[0m"
def bg(c, t):         return f"\\033[48;5;{c}m{t}\\033[0m"
def fgbg(f, b, t):    return f"\\033[38;5;{f}m\\033[48;5;{b}m{t}\\033[0m"

# Color palette (256-color)
C_BG        = 235   # editor background
C_FILETREE  = 237   # file tree bg
C_TOOLBAR   = 232   # toolbar bg
C_STATUS    = 234   # status bar bg
C_OUTPUT    = 233   # output panel bg
C_ACCENT    = 75    # blue accent
C_GREEN     = 114   # green
C_YELLOW    = 221   # yellow
C_RED       = 203   # red
C_MUTED     = 243   # muted text
C_WHITE     = 252   # normal text
C_SELECT    = 238   # selected line bg
C_LINENUM   = 241   # line number color
C_CURSOR    = 220   # cursor highlight
C_TABACTIVE = 75
C_TABINACT  = 239

HELP_KEYS = [
    ("^S", "Save"),
    ("^E", "Run"),
    ("^G", "New"),
    ("^K", "Close"),
    ("^X", "Quit"),
    ("F1", "Help"),
    ("Tab", "Indent"),
    ("↑↓←→", "Move"),
]

SYNTAX_KEYWORDS = {
    "def", "class", "return", "import", "from", "if", "else", "elif",
    "while", "for", "in", "not", "and", "or", "True", "False", "None",
    "try", "except", "finally", "with", "as", "pass", "break", "continue",
    "lambda", "yield", "raise", "global", "nonlocal", "del", "assert",
    "async", "await",
}

def syntax_highlight_line(line):
    """Very simple token-by-token syntax highlighting."""
    # We do a basic pass — strings, comments, keywords, numbers
    result = []
    i = 0
    in_string = None
    buf = ""

    def flush_buf(buf):
        if not buf:
            return ""
        if buf in SYNTAX_KEYWORDS:
            return fg(C_ACCENT, buf)
        try:
            float(buf)
            return fg(C_YELLOW, buf)
        except ValueError:
            pass
        if buf.startswith("#"):
            return fg(C_MUTED, buf)
        return fg(C_WHITE, buf)

    # Comment detection first
    stripped = line.lstrip()
    if stripped.startswith("#"):
        indent_part = line[:len(line) - len(stripped)]
        return indent_part + fg(C_MUTED, stripped)

    # Simple tokenizer
    out = ""
    j = 0
    n = len(line)
    while j < n:
        ch = line[j]
        # String detection
        if ch in ('"', "'") and not in_string:
            # flush buf
            out += flush_buf(buf)
            buf = ""
            q = ch
            # triple?
            if line[j:j+3] in ('"""', "'''"):
                q = line[j:j+3]
                end = line.find(q, j + 3)
                if end == -1:
                    out += fg(C_GREEN, line[j:])
                    return out
                else:
                    out += fg(C_GREEN, line[j:end+len(q)])
                    j = end + len(q)
                    continue
            else:
                end = j + 1
                while end < n and line[end] != q:
                    if line[end] == '\\\\':
                        end += 1
                    end += 1
                out += fg(C_GREEN, line[j:end+1])
                j = end + 1
                continue
        elif ch.isalpha() or ch == '_':
            buf += ch
        elif ch.isdigit() and not buf:
            buf += ch
        elif ch.isdigit() and buf:
            buf += ch
        else:
            out += flush_buf(buf)
            buf = ""
            out += fg(C_WHITE, ch)
        j += 1
    out += flush_buf(buf)
    return out


#  Buffer: holds lines for one open file
class Buffer:
    def __init__(self, path=None):
        self.path = path
        self.lines = [""]
        self.cx = 0   # cursor col (char index)
        self.cy = 0   # cursor row (line index)
        self.scroll_y = 0
        self.scroll_x = 0
        self.modified = False
        self.name = os.path.basename(path) if path else "untitled"
        if path and os.path.exists(path):
            self.load()

    def load(self):
        try:
            with open(self.path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
            self.lines = content.split("\\n")
            if not self.lines:
                self.lines = [""]
            self.modified = False
        except Exception as e:
            self.lines = [f"# Error loading file: {e}"]

    def save(self):
        if not self.path:
            return False
        try:
            os.makedirs(os.path.dirname(self.path), exist_ok=True) if os.path.dirname(self.path) else None
            with open(self.path, "w", encoding="utf-8") as f:
                f.write("\\n".join(self.lines))
            self.modified = False
            return True
        except Exception:
            return False

    def cur_line(self):
        return self.lines[self.cy] if self.cy < len(self.lines) else ""

    def clamp_cx(self):
        self.cx = max(0, min(self.cx, len(self.cur_line())))

    def insert_char(self, ch):
        line = self.lines[self.cy]
        self.lines[self.cy] = line[:self.cx] + ch + line[self.cx:]
        self.cx += 1
        self.modified = True

    def delete_char(self):
        if self.cx > 0:
            line = self.lines[self.cy]
            self.lines[self.cy] = line[:self.cx-1] + line[self.cx:]
            self.cx -= 1
            self.modified = True
        elif self.cy > 0:
            prev = self.lines[self.cy - 1]
            self.cx = len(prev)
            self.lines[self.cy - 1] = prev + self.lines[self.cy]
            self.lines.pop(self.cy)
            self.cy -= 1
            self.modified = True

    def delete_forward(self):
        line = self.lines[self.cy]
        if self.cx < len(line):
            self.lines[self.cy] = line[:self.cx] + line[self.cx+1:]
            self.modified = True
        elif self.cy < len(self.lines) - 1:
            self.lines[self.cy] = line + self.lines[self.cy+1]
            self.lines.pop(self.cy + 1)
            self.modified = True

    def insert_newline(self):
        line = self.lines[self.cy]
        # Auto-indent: count leading spaces
        indent = len(line) - len(line.lstrip())
        # Extra indent after colon
        stripped = line.rstrip()
        if stripped.endswith(":"):
            indent += 4
        rest = line[self.cx:]
        self.lines[self.cy] = line[:self.cx]
        self.lines.insert(self.cy + 1, " " * indent + rest)
        self.cy += 1
        self.cx = indent
        self.modified = True

    def insert_tab(self):
        spaces = 4 - (self.cx % 4)
        for _ in range(spaces):
            self.insert_char(" ")

    def move_up(self):
        if self.cy > 0:
            self.cy -= 1
            self.clamp_cx()

    def move_down(self):
        if self.cy < len(self.lines) - 1:
            self.cy += 1
            self.clamp_cx()

    def move_left(self):
        if self.cx > 0:
            self.cx -= 1
        elif self.cy > 0:
            self.cy -= 1
            self.cx = len(self.cur_line())

    def move_right(self):
        line = self.cur_line()
        if self.cx < len(line):
            self.cx += 1
        elif self.cy < len(self.lines) - 1:
            self.cy += 1
            self.cx = 0

    def move_home(self):
        # Toggle between column 0 and first non-whitespace
        line = self.cur_line()
        first_nonws = len(line) - len(line.lstrip())
        if self.cx == first_nonws:
            self.cx = 0
        else:
            self.cx = first_nonws

    def move_end(self):
        self.cx = len(self.cur_line())

    def page_up(self, page_size):
        self.cy = max(0, self.cy - page_size)
        self.clamp_cx()

    def page_down(self, page_size):
        self.cy = min(len(self.lines) - 1, self.cy + page_size)
        self.clamp_cx()

    def adjust_scroll(self, view_rows, view_cols):
        # Vertical scroll
        if self.cy < self.scroll_y:
            self.scroll_y = self.cy
        elif self.cy >= self.scroll_y + view_rows:
            self.scroll_y = self.cy - view_rows + 1
        # Horizontal scroll
        if self.cx < self.scroll_x:
            self.scroll_x = self.cx
        elif self.cx >= self.scroll_x + view_cols:
            self.scroll_x = self.cx - view_cols + 1


#  File tree node
class FileTree:
    def __init__(self, root_path):
        self.root = root_path
        self.selected = 0
        self.entries = []
        self.expanded = set()
        self.scroll = 0
        self.refresh()

    def refresh(self):
        self.entries = []
        self._walk(self.root, 0)

    def _walk(self, path, depth):
        try:
            items = sorted(os.listdir(path), key=lambda x: (not os.path.isdir(os.path.join(path, x)), x.lower()))
            for item in items:
                if item.startswith(".") or item == "__pycache__":
                    continue
                full = os.path.join(path, item)
                is_dir = os.path.isdir(full)
                self.entries.append({
                    "path": full,
                    "name": item,
                    "depth": depth,
                    "is_dir": is_dir,
                    "expanded": full in self.expanded,
                })
                if is_dir and full in self.expanded:
                    self._walk(full, depth + 1)
        except PermissionError:
            pass

    def get_selected_path(self):
        if 0 <= self.selected < len(self.entries):
            return self.entries[self.selected]
        return None

    def toggle_selected(self):
        e = self.get_selected_path()
        if e and e["is_dir"]:
            if e["path"] in self.expanded:
                self.expanded.discard(e["path"])
            else:
                self.expanded.add(e["path"])
            self.refresh()
            return None
        return e["path"] if e else None


#  Output Panel
class OutputPanel:
    def __init__(self):
        self.lines = ["IDE Output Panel ready. Press ^R to run the current file."]
        self.visible = True
        self.scroll = 0

    def append(self, text):
        for line in text.split("\\n"):
            self.lines.append(line)
        self.scroll = max(0, len(self.lines) - OUTPUT_H + 1)

    def clear(self):
        self.lines = []
        self.scroll = 0

    def run_file(self, path):
        self.clear()
        self.append(f"▶ Running: {os.path.basename(path)}\\n{'─' * 30}")
        
        if is_web:
            f = io.StringIO()
            with contextlib.redirect_stdout(f), contextlib.redirect_stderr(f):
                try:
                    # Setup environment
                    old_path = sys.path[:]
                    old_cwd = os.getcwd()
                    
                    # Ensure /pyComputer is in path for imports
                    if "/pyComputer" not in sys.path:
                        sys.path.insert(0, "/pyComputer")
                    
                    # Set CWD to the file's directory
                    os.chdir(os.path.dirname(path) or "/")
                    
                    with open(path, 'r', encoding='utf-8') as file:
                        code = file.read()
                        # Execute in a clean global dict but with standard builtins
                        exec(code, {"__name__": "__main__", "__file__": path})
                    
                    # Restore environment
                    sys.path = old_path
                    os.chdir(old_cwd)
                except Exception:
                    print(traceback.format_exc())
            
            output_text = f.getvalue().rstrip()
            if output_text:
                self.append(output_text)
            self.append(f"\\n✓ Execution finished")
            return

        try:
            result = subprocess.run(
                [sys.executable, path],
                capture_output=True, text=True, timeout=10
            )
            if result.stdout:
                self.append(result.stdout.rstrip())
            if result.stderr:
                self.append("── stderr ──\\n" + result.stderr.rstrip())
            self.append(f"\\n✓ Exited with code {result.returncode}")
        except subprocess.TimeoutExpired:
            self.append("✗ Timed out after 10 seconds")
        except FileNotFoundError:
            self.append("✗ Python interpreter not found")
        except Exception as e:
            self.append(f"✗ Error: {e}")


#  IDE Application
class IDE:
    def __init__(self, start_path=None):
        self.vfs = VFS()
        self.term_w = 120
        self.term_h = 35
        self._detect_term_size()

        # Root for file tree: prefer /root/usr/apps, fallback to cwd
        tree_root = self.vfs.abspath("/")
        if not os.path.isdir(tree_root):
            tree_root = os.getcwd()
        self.file_tree = FileTree(tree_root)
        self.output = OutputPanel()

        self.buffers = []
        self.active_tab = 0
        self.focus = "editor"  # "editor" | "filetree" | "output"
        self.show_help = False
        self.show_dialog = None  # None | {"type": "new_file", ...}
        self.dialog_input = ""
        self.status_msg = "Welcome to pyComputer IDE!"
        self.status_time = time.time()
        self.toolbar_buttons = [] # [(x1, x2, cmd_key)]

        # Open a start file if given, else open untitled
        if start_path:
            self.open_file(start_path)
        else:
            self.buffers.append(Buffer())

        self.dirty = True  # full redraw flag

    def _detect_term_size(self):
        try:
            import shutil
            size = shutil.get_terminal_size((120, 35))
            self.term_w = size.columns
            self.term_h = size.lines
        except Exception:
            pass
        self.term_w = max(80, self.term_w)
        self.term_h = max(24, self.term_h)

    # Geometry helpers
    def editor_rect(self):
        """Returns (x, y, w, h) 1-based for editor area."""
        x = FILETREE_W + 2
        y = TOOLBAR_H + 2  # 1-based, after toolbar + tab bar row
        w = self.term_w - FILETREE_W - 1
        output_rows = OUTPUT_H + 1 if self.output.visible else 0
        h = self.term_h - TOOLBAR_H - STATUSBAR_H - output_rows - 2  # -2 for tab bar
        return x, y, w, h

    def linenr_w(self):
        buf = self.active_buf()
        if buf is None:
            return 4
        return max(4, len(str(len(buf.lines))) + 1)

    def active_buf(self):
        if self.buffers and 0 <= self.active_tab < len(self.buffers):
            return self.buffers[self.active_tab]
        return None

    # File operations
    def open_file(self, path):
        for i, b in enumerate(self.buffers):
            if b.path == path:
                self.active_tab = i
                self.set_status(f"Switched to {os.path.basename(path)}")
                return
        buf = Buffer(path)
        self.buffers.append(buf)
        self.active_tab = len(self.buffers) - 1
        self.set_status(f"Opened {os.path.basename(path)}")
        self.dirty = True

    def close_tab(self, idx=None):
        if idx is None:
            idx = self.active_tab
        if not self.buffers:
            return
        self.buffers.pop(idx)
        if not self.buffers:
            self.buffers.append(Buffer())
        self.active_tab = min(self.active_tab, len(self.buffers) - 1)
        self.dirty = True

    def save_current(self):
        buf = self.active_buf()
        if buf is None:
            return
        if buf.path is None:
            self.show_dialog = {"type": "save_as"}
            self.dialog_input = ""
            return
        if buf.save():
            self.set_status(f"Saved {buf.name}")
        else:
            self.set_status("Save failed!")

    def run_current(self):
        buf = self.active_buf()
        if buf is None:
            return
        if buf.path is None or buf.modified:
            self.set_status("Save before running (^S)")
            return
        self.output.visible = True
        self.output.run_file(buf.path)
        self.set_status(f"Ran {buf.name}")
        self.dirty = True

    def set_status(self, msg):
        self.status_msg = msg
        self.status_time = time.time()

    # Rendering
    def render(self):
        out = []
        out.append("\\033[?25l")  # hide cursor
        if self.dirty:
            out.append(clr_screen())
            self.dirty = False

        self._render_toolbar(out)
        self._render_tab_bar(out)
        self._render_file_tree(out)
        self._render_editor(out)
        if self.output.visible:
            self._render_output(out)
        self._render_status_bar(out)
        if self.show_help:
            self._render_help_overlay(out)
        if self.show_dialog:
            self._render_dialog(out)

        # Position real cursor in editor
        buf = self.active_buf()
        if buf and self.focus == "editor" and not self.show_dialog:
            ex, ey, ew, eh = self.editor_rect()
            lnw = self.linenr_w()
            screen_x = ex + lnw + (buf.cx - buf.scroll_x)
            screen_y = ey + (buf.cy - buf.scroll_y)
            out.append(goto(screen_x, screen_y))
            out.append("\\033[?25h")  # show cursor

        sys.stdout.write("".join(out))
        sys.stdout.flush()

    def _fill_line(self, y, text, fg_c=C_WHITE, bg_c=C_BG, width=None):
        w = width or self.term_w
        plain = self._strip_ansi(text)
        pad = max(0, w - len(plain))
        return goto(1, y) + f"\\033[38;5;{fg_c}m\\033[48;5;{bg_c}m" + text + " " * pad + "\\033[0m"

    def _strip_ansi(self, s):
        import re
        return re.sub(r'\\033\\[[0-9;]*m', '', s)

    def _render_toolbar(self, out):
        out.append(goto(1, 1))
        out.append(f"\\033[48;5;{C_TOOLBAR}m")
        
        title_text = " ⌘ pyComputer IDE  "
        out.append(fgbg(C_WHITE, C_ACCENT, bold(title_text)))
        out.append("   ")
        
        x = len(title_text) + 4
        self.toolbar_buttons = []
        
        for k, v in HELP_KEYS[:6]:
            btn_text = f" {k} "
            desc_text = f" {v}"
            
            # Button (clickable)
            out.append(fgbg(C_TOOLBAR, C_ACCENT, btn_text))
            bw = len(btn_text)
            self.toolbar_buttons.append((x, x + bw - 1, k))
            x += bw
            
            # Description
            out.append(fg(C_MUTED, desc_text))
            dw = len(desc_text)
            x += dw
            
            out.append("  ")
            x += 2
            
        out.append(" " * max(0, self.term_w - x + 1))
        out.append("\\033[0m")

    def _render_tab_bar(self, out):
        tab_y = TOOLBAR_H + 1
        out.append(goto(1, tab_y))
        out.append(f"\\033[48;5;{C_TOOLBAR}m")
        x_offset = FILETREE_W + 2
        out.append(" " * x_offset)
        tabs_str = ""
        for i, buf in enumerate(self.buffers):
            label = buf.name + (" ●" if buf.modified else "")
            if i == self.active_tab:
                tab = fgbg(C_WHITE, C_TABACTIVE, f" {label} ")
            else:
                tab = fgbg(C_MUTED, C_TABINACT, f" {label} ")
            tabs_str += tab + " "
        plain_tabs = self._strip_ansi(tabs_str)
        total = x_offset + len(plain_tabs)
        out.append(tabs_str + " " * max(0, self.term_w - total))
        out.append("\\033[0m")

    def _render_file_tree(self, out):
        tree_x = 1
        # Header
        header = fgbg(C_WHITE, C_ACCENT, bold(f" FILES {'─' * (FILETREE_W - 9)}"))
        out.append(goto(tree_x, TOOLBAR_H + 1))
        out.append(header[:FILETREE_W] + "\\033[0m")

        # Entries
        _, ey, _, eh = self.editor_rect()
        output_rows = OUTPUT_H + 1 if self.output.visible else 0
        tree_h = self.term_h - TOOLBAR_H - STATUSBAR_H - output_rows - 1

        if self.file_tree.selected < self.file_tree.scroll:
            self.file_tree.scroll = self.file_tree.selected
        elif self.file_tree.selected >= self.file_tree.scroll + tree_h:
            self.file_tree.scroll = self.file_tree.selected - tree_h + 1

        for row in range(tree_h):
            y = TOOLBAR_H + 2 + row
            idx = self.file_tree.scroll + row
            if idx < len(self.file_tree.entries):
                e = self.file_tree.entries[idx]
                indent = "  " * e["depth"]
                if e["is_dir"]:
                    icon = "▼ " if e["expanded"] else "▶ "
                    name_text = icon + e["name"] + "/"
                    color = C_ACCENT
                else:
                    ext = os.path.splitext(e["name"])[1]
                    icons = {".py": "🐍", ".json": "{}", ".txt": "📄", ".md": "📝"}
                    icon = icons.get(ext, "  ")
                    name_text = icon + " " + e["name"]
                    color = C_WHITE
                line = indent + name_text
                line = line[:FILETREE_W - 1]
                pad = " " * max(0, FILETREE_W - 1 - len(line))
                if idx == self.file_tree.selected and self.focus == "filetree":
                    out.append(goto(tree_x, y) + fgbg(C_WHITE, C_SELECT, line + pad) + "\\033[0m")
                else:
                    out.append(goto(tree_x, y) + f"\\033[38;5;{color}m\\033[48;5;{C_FILETREE}m" + line + pad + "\\033[0m")
            else:
                out.append(goto(tree_x, y) + f"\\033[48;5;{C_FILETREE}m" + " " * (FILETREE_W - 1) + "\\033[0m")

        # Vertical divider
        for row in range(self.term_h - 2):
            out.append(goto(FILETREE_W + 1, 2 + row) + fg(C_MUTED, "│"))

    def _render_editor(self, out):
        buf = self.active_buf()
        ex, ey, ew, eh = self.editor_rect()
        lnw = self.linenr_w()
        code_w = ew - lnw - 1

        if buf is None:
            for row in range(eh):
                out.append(goto(ex, ey + row) + f"\\033[48;5;{C_BG}m" + " " * ew + "\\033[0m")
            msg = dim("No file open. Use ^N or click in the file tree.")
            out.append(goto(ex + 2, ey + eh // 2) + msg)
            return

        buf.adjust_scroll(eh, code_w)

        for row in range(eh):
            y = ey + row
            line_idx = buf.scroll_y + row
            out.append(goto(ex, y))

            if line_idx < len(buf.lines):
                # Line number
                lnum = str(line_idx + 1).rjust(lnw - 1) + " "
                if line_idx == buf.cy:
                    out.append(f"\\033[38;5;{C_CURSOR}m\\033[48;5;{C_SELECT}m{lnum}\\033[0m")
                else:
                    out.append(f"\\033[38;5;{C_LINENUM}m\\033[48;5;{C_BG}m{lnum}\\033[0m")

                # Code content
                raw_line = buf.lines[line_idx]
                visible = raw_line[buf.scroll_x:buf.scroll_x + code_w]

                # Highlight cursor line
                if line_idx == buf.cy:
                    out.append(f"\\033[48;5;{C_SELECT}m")
                    highlighted = syntax_highlight_line(visible)
                    plain_len = len(self._strip_ansi(highlighted))
                    pad = " " * max(0, code_w - plain_len)
                    out.append(highlighted + pad + "\\033[0m")
                else:
                    out.append(f"\\033[48;5;{C_BG}m")
                    highlighted = syntax_highlight_line(visible)
                    plain_len = len(self._strip_ansi(highlighted))
                    pad = " " * max(0, code_w - plain_len)
                    out.append(highlighted + pad + "\\033[0m")
            else:
                # Empty row
                out.append(f"\\033[38;5;{C_MUTED}m\\033[48;5;{C_BG}m" + " " * lnw + "~" + " " * (ew - lnw - 1) + "\\033[0m")

    def _render_output(self, out):
        oy = self.term_h - STATUSBAR_H - OUTPUT_H
        ew = self.term_w - FILETREE_W - 1
        ex = FILETREE_W + 2

        # Header bar
        header = fgbg(C_WHITE, C_ACCENT, bold(f" OUTPUT {'─' * (ew - 10)}"))
        out.append(goto(ex, oy))
        out.append(header[:ew] + "\\033[0m")

        for row in range(OUTPUT_H - 1):
            y = oy + 1 + row
            line_idx = self.output.scroll + row
            out.append(goto(ex, y) + f"\\033[48;5;{C_OUTPUT}m")
            if line_idx < len(self.output.lines):
                line = self.output.lines[line_idx]
                # Color based on content
                if line.startswith("✓") or line.startswith("▶"):
                    colored = fg(C_GREEN, line)
                elif line.startswith("✗") or "Error" in line or "Traceback" in line:
                    colored = fg(C_RED, line)
                elif line.startswith("──") or line.startswith("─"):
                    colored = fg(C_MUTED, line)
                else:
                    colored = fg(C_WHITE, line)
                plain_len = len(self._strip_ansi(colored))
                pad = " " * max(0, ew - 1 - plain_len)
                out.append(colored[:ew-1] + pad + "\\033[0m")
            else:
                out.append(" " * (ew - 1) + "\\033[0m")

    def _render_status_bar(self, out):
        buf = self.active_buf()
        sy = self.term_h

        if buf:
            pos = f"Ln {buf.cy+1}, Col {buf.cx+1}"
            encoding = "UTF-8"
            lang = "Python" if (buf.path or "").endswith(".py") else "Plain"
            modified_indicator = dim(" ●") if buf.modified else ""
            path_info = (buf.path or "untitled") + modified_indicator
            right = f" {lang}  {encoding}  {pos} "
        else:
            path_info = ""
            right = ""

        # Status message (fades after 3 seconds)
        msg_age = time.time() - self.status_time
        if msg_age < 3:
            msg = f"  {self.status_msg}"
        else:
            msg = f"  {path_info}"

        focus_ind = f" [{self.focus.upper()}] "
        right_str = focus_ind + right
        plain_msg = self._strip_ansi(msg)
        plain_right = self._strip_ansi(right_str)
        pad = max(0, self.term_w - len(plain_msg) - len(plain_right))

        out.append(goto(1, sy))
        out.append(f"\\033[48;5;{C_STATUS}m\\033[38;5;{C_ACCENT}m" + msg)
        out.append(f"\\033[38;5;{C_MUTED}m" + " " * pad)
        out.append(f"\\033[38;5;{C_WHITE}m" + right_str + "\\033[0m")

    def _render_help_overlay(self, out):
        hw, hh = 42, len(HELP_KEYS) + 6
        hx = (self.term_w - hw) // 2
        hy = (self.term_h - hh) // 2
        border_top = "╔" + "═" * (hw - 2) + "╗"
        border_bot = "╚" + "═" * (hw - 2) + "╝"
        
        # Fixed centering calculation by stripping ANSI or manual padding
        title_text = " ⌘  Keyboard Shortcuts "
        pad_l = (hw - 2 - len(title_text)) // 2
        pad_r = hw - 2 - len(title_text) - pad_l
        title = "║" + " " * pad_l + bold(title_text) + " " * pad_r + "║"

        out.append(goto(hx, hy) + fgbg(C_WHITE, C_TOOLBAR, border_top))
        out.append(goto(hx, hy+1) + fgbg(C_WHITE, C_TOOLBAR, title))
        out.append(goto(hx, hy+2) + fgbg(C_MUTED, C_TOOLBAR, "║" + "─" * (hw-2) + "║"))
        for i, (k, v) in enumerate(HELP_KEYS):
            row = hy + 3 + i
            content = f"  {fgbg(C_WHITE, C_ACCENT, f' {k} ')}  {fg(C_WHITE, v)}"
            plain = f"   {k}    {v}"
            pad = " " * max(0, hw - 2 - len(plain))
            out.append(goto(hx, row) + f"\\033[48;5;{C_TOOLBAR}m║" + content + pad + f"\\033[48;5;{C_TOOLBAR}m║\\033[0m")
        out.append(goto(hx, hy+3+len(HELP_KEYS)) + fgbg(C_MUTED, C_TOOLBAR, "║" + "─" * (hw-2) + "║"))
        out.append(goto(hx, hy+4+len(HELP_KEYS)) + fgbg(C_MUTED, C_TOOLBAR, "║" + dim("  Press any key to close").ljust(hw-2+9) + "║"))
        out.append(goto(hx, hy+5+len(HELP_KEYS)) + fgbg(C_WHITE, C_TOOLBAR, border_bot))

    def _render_dialog(self, out):
        d = self.show_dialog
        if d is None:
            return
        dtype = d.get("type")
        if dtype in ("save_as", "new_file"):
            prompt = "Save as (path):" if dtype == "save_as" else "New file path:"
            dw, dh = 50, 5
            dx = (self.term_w - dw) // 2
            dy = (self.term_h - dh) // 2
            out.append(goto(dx, dy) + fgbg(C_WHITE, C_ACCENT, "╔" + "═" * (dw-2) + "╗"))
            title_line = f"  {prompt}  "
            out.append(goto(dx, dy+1) + fgbg(C_WHITE, C_TOOLBAR, "║" + bold(title_line).center(dw-2+9) + "║"))
            inp_display = self.dialog_input + "█"
            inp_line = f"  {inp_display}"
            pad = " " * max(0, dw - 2 - len(inp_display) - 2)
            out.append(goto(dx, dy+2) + fgbg(C_WHITE, C_BG, "║" + inp_line + pad + f"\\033[48;5;{C_BG}m║\\033[0m"))
            out.append(goto(dx, dy+3) + fgbg(C_MUTED, C_TOOLBAR, "║" + dim("  Enter: confirm   Esc: cancel").ljust(dw-2+9) + "║"))
            out.append(goto(dx, dy+4) + fgbg(C_WHITE, C_ACCENT, "╚" + "═" * (dw-2) + "╝"))

    # Input handling
    def handle_key(self, key):
        if not key:
            return

        if key.startswith("\\x1b[<"):
            self._handle_mouse(key)
            return

        if self.show_help:
            self.show_help = False
            self.dirty = True
            return

        if self.show_dialog:
            self._handle_dialog_key(key)
            return

        # Safe Ctrl-key global shortcuts for Web
        if key == "\\x18":  # Ctrl-X (Quit)
            return "quit"
        if key == "\\x13":  # Ctrl-S (Save)
            self.save_current()
            self.dirty = True
            return
        if key == "\\x05":  # Ctrl-E (Run/Execute)
            self.run_current()
            return
        if key == "\\x07":  # Ctrl-G (New)
            self.show_dialog = {"type": "new_file"}
            self.dialog_input = ""
            self.dirty = True
            return
        if key == "\\x0b":  # Ctrl-K (Close Tab)
            self.close_tab()
            return
        if key == "\\x02":  # Ctrl-B (Toggle Output)
            self.output.visible = not self.output.visible
            self.dirty = True
            return
        
        if key == "\\x1bOP" or key == "\\x1b[11~":  # F1
            self.show_help = True
            self.dirty = True
            return
        if key == "\\x1b[Z":  # Shift-Tab: cycle focus
            self._cycle_focus(-1)
            return
        if key == "\\t" and self.focus != "editor":
            self._cycle_focus(1)
            return
        if key == "\\x1b\\t":  # Alt-Tab: cycle focus forward
            self._cycle_focus(1)
            return

        # Ctrl-Tab / Ctrl-Shift-Tab for tabs
        if key == "\\x1b[1;5I":  # Ctrl-Tab (some terms)
            self.active_tab = (self.active_tab + 1) % max(1, len(self.buffers))
            self.dirty = True
            return

        # Dispatch by focus
        if self.focus == "editor":
            self._handle_editor_key(key)
        elif self.focus == "filetree":
            self._handle_tree_key(key)
        elif self.focus == "output":
            self._handle_output_key(key)

    def _handle_mouse(self, seq):
        # SGR mouse: \\x1b[<btn;x;yM (press) or m (release)
        if not seq.endswith("M"):
            return
        try:
            parts = seq[3:-1].split(";")
            btn = int(parts[0])
            x = int(parts[1])
            y = int(parts[2])
            
            if btn == 0: # Left click
                if y == 1:
                    for x1, x2, k in self.toolbar_buttons:
                        if x1 <= x <= x2:
                            # Map to Ctrl keys
                            mapping = {
                                "^S": "\\x13", "^E": "\\x05", "^G": "\\x07",
                                "^K": "\\x0b", "^X": "\\x18", "F1": "\\x1bOP"
                            }
                            if k in mapping:
                                self.handle_key(mapping[k])
                            return
                
                # Simple focus switching by click
                if y == TOOLBAR_H + 1: # Tab bar / Tree header
                    if x <= FILETREE_W:
                        self.focus = "filetree"
                    else:
                        # Tab selection
                        self.focus = "editor"
                    self.dirty = True
                elif y > TOOLBAR_H + 1:
                    if x <= FILETREE_W:
                        self.focus = "filetree"
                    else:
                        # Check if it's in output or editor
                        output_oy = self.term_h - STATUSBAR_H - OUTPUT_H
                        if self.output.visible and y >= output_oy:
                            self.focus = "output"
                        else:
                            self.focus = "editor"
                    self.dirty = True
        except:
            pass

    def _cycle_focus(self, direction):
        zones = ["filetree", "editor"]
        if self.output.visible:
            zones.append("output")
        idx = zones.index(self.focus) if self.focus in zones else 0
        self.focus = zones[(idx + direction) % len(zones)]
        self.set_status(f"Focus: {self.focus}")
        self.dirty = True

    def _handle_editor_key(self, key):
        buf = self.active_buf()
        if buf is None:
            return

        if key == Key.UP:       buf.move_up()
        elif key == Key.DOWN:   buf.move_down()
        elif key == Key.LEFT:   buf.move_left()
        elif key == Key.RIGHT:  buf.move_right()
        elif key == Key.HOME or key == "\\x01":   buf.move_home()
        elif key == Key.END:                     buf.move_end() # Removed \\x05 conflict
        elif key == Key.PAGE_UP:   buf.page_up(10)
        elif key == Key.PAGE_DOWN: buf.page_down(10)
        elif key == Key.BACKSPACE: buf.delete_char()
        elif key == Key.DELETE:    buf.delete_forward()
        elif key in ("\\r", "\\n"): buf.insert_newline()
        elif key == "\\t":          buf.insert_tab()
        elif len(key) == 1 and ord(key) >= 32:
            buf.insert_char(key)
        # else ignore control chars

    def _handle_tree_key(self, key):
        if key == Key.UP:
            self.file_tree.selected = max(0, self.file_tree.selected - 1)
        elif key == Key.DOWN:
            self.file_tree.selected = min(len(self.file_tree.entries) - 1, self.file_tree.selected + 1)
        elif key in ("\\r", "\\n", " "):
            path = self.file_tree.toggle_selected()
            if path and os.path.isfile(path):
                self.open_file(path)
                self.focus = "editor"
        elif key == Key.RIGHT:
            e = self.file_tree.get_selected_path()
            if e and e["is_dir"]:
                self.file_tree.expanded.add(e["path"])
                self.file_tree.refresh()
        elif key == Key.LEFT:
            e = self.file_tree.get_selected_path()
            if e and e["is_dir"]:
                self.file_tree.expanded.discard(e["path"])
                self.file_tree.refresh()
        self.dirty = True

    def _handle_output_key(self, key):
        if key == Key.UP:
            self.output.scroll = max(0, self.output.scroll - 1)
        elif key == Key.DOWN:
            self.output.scroll = min(
                max(0, len(self.output.lines) - OUTPUT_H + 1),
                self.output.scroll + 1
            )
        elif key == "\\x02":  # Ctrl-B
            self.output.visible = False
            self.focus = "editor"
        self.dirty = True

    def _handle_dialog_key(self, key):
        d = self.show_dialog
        if key == "\\x1b":  # Escape
            self.show_dialog = None
            self.dialog_input = ""
            self.dirty = True
        elif key in ("\\r", "\\n") and self.dialog_input.strip():
            path = self.dialog_input.strip()
            if not os.path.isabs(path):
                path = os.path.join(self.vfs.root, path)
            if d["type"] == "new_file":
                buf = Buffer(path)
                self.buffers.append(buf)
                self.active_tab = len(self.buffers) - 1
                self.set_status(f"New file: {os.path.basename(path)}")
            elif d["type"] == "save_as":
                buf = self.active_buf()
                if buf:
                    buf.path = path
                    buf.name = os.path.basename(path)
                    buf.save()
                    self.set_status(f"Saved as {buf.name}")
            self.show_dialog = None
            self.dialog_input = ""
            self.file_tree.refresh()
            self.dirty = True
        elif key == Key.BACKSPACE:
            self.dialog_input = self.dialog_input[:-1]
            self.dirty = True
        elif len(key) == 1 and ord(key) >= 32:
            self.dialog_input += key
            self.dirty = True

    # Main loop
    def run(self):
        old = setup_raw()
        try:
            # Enable mouse tracking (SGR mode)
            sys.stdout.write("\\033[?1000h\\033[?1006h")
            sys.stdout.write(clr_screen())
            sys.stdout.flush()
            self.dirty = True
            self.render()
            last_render = time.time()
            while True:
                key = get_key()
                if key is not None:
                    result = self.handle_key(key)
                    if result == "quit":
                        break

                now = time.time()
                if now - last_render > 0.05:
                    self.render()
                    last_render = now

                time.sleep(0.01)
        finally:
            # Disable mouse tracking
            sys.stdout.write("\\033[?1006l\\033[?1000l")
            restore(old)
            sys.stdout.write("\\033[?25h")
            cleanup()


#  Entry point
def main(*args):
    start_path = args[0] if args else None
    if start_path:
        vfs = VFS()
        start_path = vfs.abspath(start_path)
    ide = IDE(start_path=start_path)
    ide.run()
`,"usr/apps/ide/manifest.json":`{
  "name": "ide",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": ["fs"],
  "description": "A proper TUI IDE with editor, file tree, toolbar, and run output."
}`,"usr/apps/matrix/main.py":`"""
Matrix app entrypoint for pyComputer
Renders a Matrix-style rain animation in the terminal.
"""

import random
import sys
import time
from src.ui.renderer import Renderer


CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
COLS = 40  # Fewer columns for less density
ROWS = 24  # Standard terminal height
SPEED = 0.04
TRAIL = 12  # Length of the fading trail

r = Renderer()


def main(*args):
    # Hide cursor and clear screen
    sys.stdout.write("\\033[2J\\033[1;1H")
    sys.stdout.flush()
    r.hide_cursor()
    try:
        # Each column has a y position for the head of the rain
        drops = [random.randint(0, ROWS) for _ in range(COLS)]
        chars = [random.choice(CHARS) for _ in range(COLS)]
        while True:
            # Clear the background area
            for row in range(ROWS + 2):
                r.move(2, 2 + row).write(" " * (COLS * 2))
            # Draw the rain
            for i in range(COLS):
                # Randomly reset drop to top
                if drops[i] > ROWS or random.random() > 0.995:
                    drops[i] = 0
                    chars[i] = random.choice(CHARS)
                # Draw the trail
                for t in range(TRAIL):
                    y = drops[i] - t
                    if 0 <= y < ROWS:
                        c = chars[i] if t == 0 else random.choice(CHARS)
                        if t == 0:
                            style = r.bright_green
                        elif t < TRAIL // 2:
                            style = r.green
                        else:
                            style = r.dim
                        r.move(2 + i * 2, 2 + y).write(style(c))
                drops[i] += 1
            r.flush()
            time.sleep(SPEED)
    except KeyboardInterrupt:
        pass
    finally:
        r.show_cursor()
        sys.stdout.write("\\033[0m\\033[2J\\033[1;1H")
        sys.stdout.flush()
`,"usr/apps/matrix/manifest.json":`{
  "name": "matrix",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": [],
  "description": "Matrix-style (this was weirdly hard) terminal rain animation."
}`,"usr/apps/notes/main.py":`"""
Notes app entrypoint for pyComputer (separate text files per note)
"""

from src.fs.vfs import VFS
from src.utils.text import truncate
from src.stdlib.appstdlib import input, info, error, success, banner, table

NOTES_DIR = "apps/notes/data"


def sanitize_filename(title):
    import re

    return re.sub(r"[^a-zA-Z0-9_\\- ]", "_", title).strip().replace(" ", "_")


def ensure_notes_dir(vfs):
    if not vfs.exists(NOTES_DIR):
        vfs.mkdir(NOTES_DIR)


def list_notes(vfs):
    ensure_notes_dir(vfs)
    files = vfs.listdir(NOTES_DIR)
    notes = []
    for f in files:
        if f.endswith(".txt"):
            notes.append(f[:-4])
    return sorted(notes)


def read_note(vfs, title):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    if vfs.exists(path):
        return vfs.read(path)
    return ""


def write_note(vfs, title, body):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    vfs.write(path, body)


def delete_note(vfs, title):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    if vfs.exists(path):
        vfs.remove(path)


def main(*args):

    vfs = VFS()
    while True:
        banner("Notes")
        note_titles = list_notes(vfs)
        info(f"You have {len(note_titles)} notes.")
        table([[str(i + 1), t[:40]] for i, t in enumerate(note_titles)])
        info("Options: [A]dd  [V]iew  [E]dit  [D]elete  [Q]uit")
        choice = input("Choose: ").strip().lower()
        if choice == "a":
            title = input("Note title (File name): ")
            if not title:
                error("Title cannot be empty.")
                continue
            body = input("Note body: ")
            write_note(vfs, title, body)
            success("Note added.")
        elif choice == "v":
            idx = input("View note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                body = read_note(vfs, title)
                banner(title)
                info(body)
            else:
                error("Invalid note number.")
        elif choice == "e":
            idx = input("Edit note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                body = read_note(vfs, title)
                new_title = input(f"New title (blank to keep '{title}'): ")
                if not new_title:
                    new_title = title
                new_body = input(f"New body (blank to keep current): ")
                if not new_body:
                    new_body = body
                if new_title != title:
                    delete_note(vfs, title)
                write_note(vfs, new_title, new_body)
                success("Note updated.")
            else:
                error("Invalid note number.")
        elif choice == "d":
            idx = input("Delete note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                delete_note(vfs, title)
                success("Note deleted.")
            else:
                error("Invalid note number.")
        elif choice == "q":
            info("Exiting Notes app.")
            break
        else:
            error("Unknown option.")
`,"usr/apps/notes/manifest.json":`{
  "name": "notes",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": ["fs"],
  "description": "A simple notes app for pyComputer."
}
`,"usr/apps/settings/main.py":`"""
Settings app for pyComputer.
Provides theme selection, user preferences, and system configuration.
"""

import json
import os
from src.fs.vfs import VFS
from src.stdlib.appstdlib import (
    banner, info, error, success, confirm, input, table, warning, set_theme
)
from src.ui.theme import Theme

SETTINGS_DIR = "apps/settings"
SETTINGS_FILE = "apps/settings/config.json"

DEFAULT_SETTINGS = {
    "theme": "default",
    "username": "user",
    "password": "",
    "show_splash": True,
    "confirm_actions": True,
    "editor_width": 40,
}


def ensure_settings_dir(vfs):
    if not vfs.exists(SETTINGS_DIR):
        vfs.mkdir(SETTINGS_DIR)


def load_settings(vfs):
    ensure_settings_dir(vfs)
    if vfs.exists(SETTINGS_FILE):
        try:
            data = vfs.read(SETTINGS_FILE)
            return json.loads(data)
        except Exception:
            pass
    return DEFAULT_SETTINGS.copy()


def save_settings(vfs, settings):
    ensure_settings_dir(vfs)
    vfs.write(SETTINGS_FILE, json.dumps(settings, indent=2))


def get_available_themes():
    from src.ui.renderer import _TUIRO_THEMES, _CUSTOM_THEMES
    return _TUIRO_THEMES + list(_CUSTOM_THEMES.keys())


def get_setting_display(key, value):
    if key == "theme":
        return value
    elif key == "password":
        return "Set" if value else "Not set"
    elif key == "show_splash":
        return "Yes" if value else "No"
    elif key == "confirm_actions":
        return "Yes" if value else "No"
    elif key == "editor_width":
        return f"{value} chars"
    else:
        return str(value)


def show_current_settings(vfs):
    settings = load_settings(vfs)
    info("Current Settings:")
    rows = []
    for key in settings:
        val = get_setting_display(key, settings[key])
        rows.append([key, val])
    table(rows)


def edit_theme(vfs):
    settings = load_settings(vfs)
    themes = get_available_themes()
    info(f"Available themes: {', '.join(themes)}")
    current = settings.get("theme", "default")
    info(f"Current theme: {current}")
    choice = input("Select theme: ").strip().lower()
    if choice in themes:
        settings["theme"] = choice
        save_settings(vfs, settings)
        set_theme(choice)
        success(f"Theme set to '{choice}'")
    elif choice == "":
        info("Theme unchanged.")
    else:
        error(f"Invalid theme: {choice}")


def edit_username(vfs):
    settings = load_settings(vfs)
    current = settings.get("username", "user")
    info(f"Current username: {current}")
    choice = input("New username: ").strip()
    if choice:
        settings["username"] = choice
        save_settings(vfs, settings)
        success(f"Username set to '{choice}'")
    else:
        info("Username unchanged.")


def edit_password(vfs):
    import hashlib
    settings = load_settings(vfs)
    has_password = bool(settings.get("password", ""))
    info(f"Current: {'Password set' if has_password else 'No password'}")
    choice = input("New password (blank to remove): ").strip()
    if choice == "" and has_password:
        settings["password"] = ""
        save_settings(vfs, settings)
        success("Password removed.")
    elif choice:
        hashpw = hashlib.sha256(choice.encode()).hexdigest()[:16]
        settings["password"] = hashpw
        save_settings(vfs, settings)
        success("Password set.")
    else:
        info("Password unchanged.")


def edit_boolean(vfs, key, prompt, true_msg, false_msg):
    settings = load_settings(vfs)
    current = settings.get(key, True)
    yes_no = "Yes" if current else "No"
    info(f"Current: {yes_no}")
    choice = input(f"{prompt} [y/N]: ").strip().lower()
    if choice in ("y", "yes"):
        settings[key] = True
        save_settings(vfs, settings)
        success(true_msg)
    elif choice in ("n", "no"):
        settings[key] = False
        save_settings(vfs, settings)
        success(false_msg)
    else:
        info("Setting unchanged.")


def edit_editor_width(vfs):
    settings = load_settings(vfs)
    current = settings.get("editor_width", 40)
    info(f"Current: {current} chars")
    choice = input("Editor width (chars): ").strip()
    if choice.isdigit():
        width = int(choice)
        if 20 <= width <= 120:
            settings["editor_width"] = width
            save_settings(vfs, settings)
            success(f"Editor width set to {width}")
        else:
            error("Width must be between 20 and 120.")
    elif choice == "":
        info("Setting unchanged.")
    else:
        error("Invalid number.")


def reset_settings(vfs):
    if confirm("Reset all settings to defaults? [y/N] "):
        save_settings(vfs, DEFAULT_SETTINGS.copy())
        success("Settings reset to defaults.")
    else:
        info("Reset cancelled.")


def main(*args):
    vfs = VFS()
    show_current_settings(vfs)
    info("")

    while True:
        banner("Settings Menu")
        info("1. Theme")
        info("2. Username")
        info("3. Password")
        info("4. Show splash on boot")
        info("5. Confirm dangerous actions")
        info("6. Editor width")
        info("7. Reset all settings")
        info("8. View current settings")
        info("Q. Quit")
        choice = input("Choose: ").strip().lower()

        if choice == "1":
            edit_theme(vfs)
        elif choice == "2":
            edit_username(vfs)
        elif choice == "3":
            edit_password(vfs)
        elif choice == "4":
            edit_boolean(vfs, "show_splash", "Show splash on boot", "Splash enabled.", "Splash disabled.")
        elif choice == "5":
            edit_boolean(vfs, "confirm_actions", "Confirm dangerous actions", "Confirmation enabled.", "Confirmation disabled.")
        elif choice == "6":
            edit_editor_width(vfs)
        elif choice == "7":
            reset_settings(vfs)
        elif choice == "8":
            show_current_settings(vfs)
        elif choice == "q":
            info("Exiting Settings.")
            break
        else:
            error("Invalid choice.")`,"usr/apps/settings/manifest.json":`{
  "name": "settings",
  "version": "0.2.0",
  "entry": "main.py",
  "permissions": ["fs"],
  "description": "Configure theme, username, and system preferences."
}
`,"usr/apps/snake/main.py":`"""
Snake app entrypoint for pyComputer
"""

import random
import sys
import time
from collections import deque
from src.ui.renderer import Renderer
from src.ui.input import get_key as _ui_get_key, Key as UI_Key, web_input_queue
from src.ui.widgets import Dialog
from src.utils.platform import is_web

COLS = 30
ROWS = 15
BASE_TICK = 0.15
MIN_TICK = 0.06

HEAD = "▓▓"
BODY = "░░"
FOOD = "██"
EMPTY = "  "

r = Renderer()


def render_x(col):
    return 2 + col * 2


def render_y(row):
    return 3 + row


def safe_style(style_fn, text):
    try:
        result = style_fn(text)
        if isinstance(result, str):
            return result
    except (TypeError, AttributeError):
        pass
    return text


class SnakeGame:
    def __init__(self):
        self.snake: deque = deque()
        self.reset()

    def reset(self):
        start = (COLS // 2, ROWS // 2)
        self.snake = deque([start])
        self.direction = (1, 0)
        self.next_dir = None
        self.food = self._spawn_food()
        self.score = 0
        self.game_over = False
        self.paused = False

    def _spawn_food(self):
        occupied = set(self.snake)
        while True:
            pos = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
            if pos not in occupied:
                return pos

    def level(self):
        return self.score // 50 + 1

    def tick_duration(self):
        speed = BASE_TICK - (self.level() - 1) * 0.01
        return max(speed, MIN_TICK)

    def set_direction(self, d):
        if d[0] == -self.direction[0] and d[1] == -self.direction[1]:
            return
        self.next_dir = d

    def update(self):
        if self.next_dir:
            self.direction = self.next_dir
            self.next_dir = None

        hx, hy = self.snake[0]
        dx, dy = self.direction
        new_head = (hx + dx, hy + dy)
        nx, ny = new_head

        if nx < 0 or nx >= COLS or ny < 0 or ny >= ROWS or new_head in self.snake:
            self.game_over = True
            return

        self.snake.appendleft(new_head)
        if new_head == self.food:
            self.score += 10
            self.food = self._spawn_food()
        else:
            self.snake.pop()


def draw_border():
    box_w = COLS * 2 + 2
    box_h = ROWS + 2
    r.box_at(1, 2, box_w, box_h).flush()


def draw_header(game):
    label = r.bold(f" SNAKE  Score: {game.score:<5}  Level: {game.level()} ")
    r.move(1, 1).write(label).flush()


def draw_footer():
    text = safe_style(r.dim, "  Arrow keys: move  P: pause  R: restart  Q: quit  ")
    r.move(1, 4 + ROWS).write(text).flush()


def draw_cell(col, row, char, style_fn=None):
    tx = render_x(col)
    ty = render_y(row)
    text = safe_style(style_fn, char) if style_fn else char
    r.move(tx, ty).write(text).flush()


def full_redraw(game):
    sys.stdout.write("\\033[2J\\033[1;1H")
    sys.stdout.flush()
    draw_border()
    draw_footer()
    draw_header(game)

    for row in range(ROWS):
        for col in range(COLS):
            draw_cell(col, row, EMPTY)

    fx, fy = game.food
    draw_cell(fx, fy, FOOD, r.bright_red)

    for i, (sx, sy) in enumerate(game.snake):
        if i == 0:
            draw_cell(sx, sy, HEAD, r.bright_green)
        else:
            draw_cell(sx, sy, BODY, r.green)

    r.flush()


def partial_update(game, prev_tail, prev_food):
    draw_header(game)

    if prev_tail and prev_tail not in game.snake:
        draw_cell(prev_tail[0], prev_tail[1], EMPTY)

    if len(game.snake) > 1:
        sx, sy = list(game.snake)[1]
        draw_cell(sx, sy, BODY, r.green)

    hx, hy = game.snake[0]
    draw_cell(hx, hy, HEAD, r.bright_green)

    if prev_food != game.food:
        draw_cell(game.food[0], game.food[1], FOOD, r.bright_red)

    r.flush()


def draw_overlay(game):
    def wrap_message(msg, width):
        import textwrap
        lines = []
        for part in msg.split("\\n"):
            lines.extend(textwrap.wrap(part, width=width))
        return lines

    if game.game_over:
        box_w = min(36, COLS * 2 - 4)
        box_h = 7
        msg_lines = wrap_message(f"Final score: {game.score}", box_w - 2)
        msg_lines += wrap_message("R: restart   Q: quit", box_w - 2)
        dialog = Dialog(
            title="GAME OVER",
            message="\\n".join(msg_lines),
            buttons=[],
            x=0, y=0, width=box_w, height=box_h,
        )
        lines = dialog.render().splitlines()
        pad_x = 2 + (COLS * 2 - box_w) // 2
        pad_y = 3 + (ROWS - box_h) // 2
        for i, line in enumerate(lines):
            r.move(pad_x, pad_y + i).write(line[:box_w].ljust(box_w))
        r.flush()
    elif game.paused:
        box_w = min(24, COLS * 2 - 4)
        box_h = 5
        msg_lines = wrap_message("P: resume   Q: quit", box_w - 2)
        dialog = Dialog(
            title="PAUSED",
            message="\\n".join(msg_lines),
            buttons=[],
            x=0, y=0, width=box_w, height=box_h,
        )
        lines = dialog.render().splitlines()
        pad_x = 2 + (COLS * 2 - box_w) // 2
        pad_y = 3 + (ROWS - box_h) // 2
        for i, line in enumerate(lines):
            r.move(pad_x, pad_y + i).write(line[:box_w].ljust(box_w))
        r.flush()


def get_key():
    if is_web():
        if web_input_queue:
            return web_input_queue.pop(0)
        return None
    return _ui_get_key()


def flush_input():
    if is_web():
        web_input_queue.clear()
    


def main(*args):
    from src.ui.input import setup_raw as setup_terminal, restore as restore_terminal, cleanup

    game = SnakeGame()
    old_settings = setup_terminal()
    r.hide_cursor()

    try:
        full_redraw(game)

        box_w = 28
        box_h = 3
        scr_mid_x = 2 + COLS
        scr_mid_y = 3 + ROWS // 2
        bx = scr_mid_x - box_w // 2
        by = scr_mid_y - box_h // 2
        r.box_at(bx, by, box_w, box_h)
        r.move(bx + 2, by + 1).write(r.bold(" Press any key to start ")).flush()

        flush_input()
        while get_key() is None:
            time.sleep(0.05)

        full_redraw(game)
        flush_input()
        last_tick = time.time()

        while True:
            key = get_key()

            if key is not None:
                if key.lower() == "q":
                    restore_terminal(old_settings)
                    cleanup()
                    return
                elif key == "r":
                    game.reset()
                    full_redraw(game)
                    flush_input()
                    last_tick = time.time()
                    continue
                elif key.lower() == "p" and not game.game_over:
                    game.paused = not game.paused
                    if game.paused:
                        draw_overlay(game)
                    else:
                        full_redraw(game)
                        flush_input()
                        last_tick = time.time()

            if key is not None and not game.paused and not game.game_over:
                if key == UI_Key.UP:
                    game.set_direction((0, -1))
                elif key == UI_Key.DOWN:
                    game.set_direction((0, 1))
                elif key == UI_Key.LEFT:
                    game.set_direction((-1, 0))
                elif key == UI_Key.RIGHT:
                    game.set_direction((1, 0))

            now = time.time()
            if not game.paused and not game.game_over:
                if now - last_tick >= game.tick_duration():
                    prev_tail = game.snake[-1]
                    prev_food = game.food
                    game.update()
                    if game.game_over:
                        draw_overlay(game)
                    else:
                        partial_update(game, prev_tail, prev_food)
                    last_tick = now

            time.sleep(0.01)

    finally:
        restore_terminal(old_settings)
        cleanup()
`,"usr/apps/snake/manifest.json":`{
  "name": "snake",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": [],
  "description": "A seemingly simple Snake game."
}
`};async function Me(){const{loadPyodide:K}=await Be(async()=>{const{loadPyodide:q}=await import("https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.mjs");return{loadPyodide:q}},[]);return K({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.29.3/full/"})}async function He(K,q){await K.loadPackage("micropip"),await K.runPythonAsync("import micropip");const Q=JSON.stringify(q);await K.runPythonAsync(`import micropip
await micropip.install(${Q})`)}const ye=document.getElementById("status"),Fe=document.getElementById("terminal"),Ce={default:{bg:"#0a0a0a",fg:"#ffffff",cursor:"#ffffff",selection:"rgba(255, 255, 255, 0.3)"},retro:{bg:"#0a0a0a",fg:"#00ff41",cursor:"#00ff41",selection:"rgba(0, 255, 65, 0.3)"},light:{bg:"#ffffff",fg:"#000000",cursor:"#000000",selection:"rgba(0, 0, 0, 0.2)"},dark:{bg:"#0a0a0a",fg:"#ffffff",cursor:"#ffffff",selection:"rgba(255, 255, 255, 0.3)"},mono:{bg:"#0a0a0a",fg:"#cccccc",cursor:"#cccccc",selection:"rgba(255, 255, 255, 0.2)"},pastel:{bg:"#1e1e2e",fg:"#cba6f7",cursor:"#cba6f7",selection:"rgba(203, 166, 247, 0.3)"}};function Ne(K){const q=Ce[K]||Ce.default;document.body.style.background=q.bg,document.body.style.color=q.fg,document.documentElement.style.setProperty("--term-bg",q.bg);const Q=document.getElementById("terminal-container");Q&&(Q.style.background=q.bg),window.term&&(window.term.options.theme={background:q.bg,foreground:q.fg,cursor:q.cursor,selection:q.selection}),document.querySelectorAll("#theme-buttons button").forEach($=>$.classList.remove("active"));const Z=document.querySelector(`#theme-buttons button[data-theme="${K}"]`);Z&&Z.classList.add("active")}window.setWebTheme=Ne;const ee=new Oe.Terminal({cursorBlink:!0,cursorStyle:"block",fontSize:14,fontFamily:"'Fira Code', 'Consolas', monospace",theme:{background:"#0a0a0a",foreground:"#ffffff",cursor:"#ffffff",selection:"rgba(255, 255, 255, 0.3)"}});window.term=ee;const Se=new Ie.FitAddon;ee.loadAddon(Se);ee.open(Fe);Se.fit();window.addEventListener("resize",()=>Se.fit());window.pythonLineBuffer=[];window.termWrite=K=>{const q=K.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`);ee.write(q)};let Le=!1;window.setRawInput=K=>{Le=K};let ae=null,_e=[],oe="",de=null;window.pyc_readline=()=>new Promise(K=>{_e.length>0?K(_e.shift()):de=K});function Ee(K){de?(de(K),de=null):_e.push(K)}function We(){return _e.length>0?Promise.resolve(_e.shift()):new Promise(K=>{de=K})}ee.onData(K=>{if(Le){try{ae.pyimport("src.ui.input").web_input_queue.append(K)}catch{}return}for(const q of K)q==="\r"?(ee.write(`\r
`),Ee(oe),oe=""):q===""?oe.length>0&&(oe=oe.slice(0,-1),ee.write("\b \b")):q===""?(ee.write(`^C\r
`),Ee("exit"),oe=""):(oe+=q,ee.write(q))});ee.write(`\x1B[2J\x1B[1;1HLoading pyComputer...
`);async function Ue(){ae=await Me(),ye.textContent="Ready",ye.className="ready",ee.write(`\r
`);try{await He(ae,["tuiro","requests"]),ee.write(`[web] Installed web dependencies: tuiro, requests\r
`)}catch(Z){ee.write(`[web] Warning: failed to install web deps: ${Z}\r
`)}let K=`import os
import json
import js
import sys

class TermIO:
    def write(self, data):
        js.termWrite(data)
    def flush(self):
        pass
    def isatty(self):
        return False
    def fileno(self):
        raise IOError("no fileno in web environment")
    @property
    def encoding(self):
        return "utf-8"
    @property
    def errors(self):
        return "replace"

sys.stdout = TermIO()
sys.stderr = TermIO()

# Files data from JS
FILES = ${JSON.stringify(Pe)}

# Ensure base directories exist
try:
    os.makedirs('/pyComputer', exist_ok=True)
    os.makedirs('/root', exist_ok=True)
except:
    pass

# Extract files
for filepath, content in FILES.items():
    if filepath.startswith('src/'):
        target_path = '/pyComputer/' + filepath
    else:
        target_path = '/root/' + filepath
    dir = os.path.dirname(target_path)
    if dir:
        try: os.makedirs(dir, exist_ok=True)
        except: pass
    with open(target_path, 'w') as f:
        f.write(content)

# Load settings and sync web theme (but don't override if already set)
import json
try:
    with open('/root/apps/settings/config.json') as f:
        web_settings = json.load(f)
        # Let browser handle theme initially - don't override
except:
    pass

print(f"Extracted {len(FILES)} files")

sys.path.insert(0, '/pyComputer')

from src.kernel.kernel import Kernel
kernel = Kernel()
kernel.initialize()
kernel.boot_sequence()
shell = kernel.shell
`;await ae.runPythonAsync(K);const q="[/] $ ";ee.write(q);async function Q(Z){if(!Z.trim()){ee.write(q);return}ae.globals.set("commandLine",Z);try{await ae.runPythonAsync("shell.execute(commandLine)")}catch(V){if(String(V).includes("SystemExit")){ee.write(`Shell exited.\r
`);return}ee.write(`Error: ${V}\r
`)}ee.write(q)}for(;;){const Z=await We();await Q(Z)}}Ue().catch(K=>{ye.textContent="Failed",ee.write(`Error: ${K}\r
`)});
