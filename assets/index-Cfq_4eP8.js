var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e(((e,t)=>{(function(n,r){if(typeof e==`object`&&typeof t==`object`)t.exports=r();else if(typeof define==`function`&&define.amd)define([],r);else{var i=r();for(var a in i)(typeof e==`object`?e:n)[a]=i[a]}})(globalThis,(()=>(()=>{var e={4567:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.AccessibilityManager=void 0;let a=n(9042),o=n(9924),s=n(844),c=n(4725),l=n(2585),u=n(3656),d=t.AccessibilityManager=class extends s.Disposable{constructor(e,t,n,r){super(),this._terminal=e,this._coreBrowserService=n,this._renderService=r,this._rowColumns=new WeakMap,this._liveRegionLineCount=0,this._charsToConsume=[],this._charsToAnnounce=``,this._accessibilityContainer=this._coreBrowserService.mainDocument.createElement(`div`),this._accessibilityContainer.classList.add(`xterm-accessibility`),this._rowContainer=this._coreBrowserService.mainDocument.createElement(`div`),this._rowContainer.setAttribute(`role`,`list`),this._rowContainer.classList.add(`xterm-accessibility-tree`),this._rowElements=[];for(let e=0;e<this._terminal.rows;e++)this._rowElements[e]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[e]);if(this._topBoundaryFocusListener=e=>this._handleBoundaryFocus(e,0),this._bottomBoundaryFocusListener=e=>this._handleBoundaryFocus(e,1),this._rowElements[0].addEventListener(`focus`,this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener(`focus`,this._bottomBoundaryFocusListener),this._refreshRowsDimensions(),this._accessibilityContainer.appendChild(this._rowContainer),this._liveRegion=this._coreBrowserService.mainDocument.createElement(`div`),this._liveRegion.classList.add(`live-region`),this._liveRegion.setAttribute(`aria-live`,`assertive`),this._accessibilityContainer.appendChild(this._liveRegion),this._liveRegionDebouncer=this.register(new o.TimeBasedDebouncer(this._renderRows.bind(this))),!this._terminal.element)throw Error(`Cannot enable accessibility before Terminal.open`);this._terminal.element.insertAdjacentElement(`afterbegin`,this._accessibilityContainer),this.register(this._terminal.onResize((e=>this._handleResize(e.rows)))),this.register(this._terminal.onRender((e=>this._refreshRows(e.start,e.end)))),this.register(this._terminal.onScroll((()=>this._refreshRows()))),this.register(this._terminal.onA11yChar((e=>this._handleChar(e)))),this.register(this._terminal.onLineFeed((()=>this._handleChar(`
`)))),this.register(this._terminal.onA11yTab((e=>this._handleTab(e)))),this.register(this._terminal.onKey((e=>this._handleKey(e.key)))),this.register(this._terminal.onBlur((()=>this._clearLiveRegion()))),this.register(this._renderService.onDimensionsChange((()=>this._refreshRowsDimensions()))),this.register((0,u.addDisposableDomListener)(document,`selectionchange`,(()=>this._handleSelectionChange()))),this.register(this._coreBrowserService.onDprChange((()=>this._refreshRowsDimensions()))),this._refreshRows(),this.register((0,s.toDisposable)((()=>{this._accessibilityContainer.remove(),this._rowElements.length=0})))}_handleTab(e){for(let t=0;t<e;t++)this._handleChar(` `)}_handleChar(e){this._liveRegionLineCount<21&&(this._charsToConsume.length>0?this._charsToConsume.shift()!==e&&(this._charsToAnnounce+=e):this._charsToAnnounce+=e,e===`
`&&(this._liveRegionLineCount++,this._liveRegionLineCount===21&&(this._liveRegion.textContent+=a.tooMuchOutput)))}_clearLiveRegion(){this._liveRegion.textContent=``,this._liveRegionLineCount=0}_handleKey(e){this._clearLiveRegion(),/\p{Control}/u.test(e)||this._charsToConsume.push(e)}_refreshRows(e,t){this._liveRegionDebouncer.refresh(e,t,this._terminal.rows)}_renderRows(e,t){let n=this._terminal.buffer,r=n.lines.length.toString();for(let i=e;i<=t;i++){let e=n.lines.get(n.ydisp+i),t=[],a=e?.translateToString(!0,void 0,void 0,t)||``,o=(n.ydisp+i+1).toString(),s=this._rowElements[i];s&&(a.length===0?(s.innerText=`\xA0`,this._rowColumns.set(s,[0,1])):(s.textContent=a,this._rowColumns.set(s,t)),s.setAttribute(`aria-posinset`,o),s.setAttribute(`aria-setsize`,r))}this._announceCharacters()}_announceCharacters(){this._charsToAnnounce.length!==0&&(this._liveRegion.textContent+=this._charsToAnnounce,this._charsToAnnounce=``)}_handleBoundaryFocus(e,t){let n=e.target,r=this._rowElements[t===0?1:this._rowElements.length-2];if(n.getAttribute(`aria-posinset`)===(t===0?`1`:`${this._terminal.buffer.lines.length}`)||e.relatedTarget!==r)return;let i,a;if(t===0?(i=n,a=this._rowElements.pop(),this._rowContainer.removeChild(a)):(i=this._rowElements.shift(),a=n,this._rowContainer.removeChild(i)),i.removeEventListener(`focus`,this._topBoundaryFocusListener),a.removeEventListener(`focus`,this._bottomBoundaryFocusListener),t===0){let e=this._createAccessibilityTreeNode();this._rowElements.unshift(e),this._rowContainer.insertAdjacentElement(`afterbegin`,e)}else{let e=this._createAccessibilityTreeNode();this._rowElements.push(e),this._rowContainer.appendChild(e)}this._rowElements[0].addEventListener(`focus`,this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener(`focus`,this._bottomBoundaryFocusListener),this._terminal.scrollLines(t===0?-1:1),this._rowElements[t===0?1:this._rowElements.length-2].focus(),e.preventDefault(),e.stopImmediatePropagation()}_handleSelectionChange(){if(this._rowElements.length===0)return;let e=document.getSelection();if(!e)return;if(e.isCollapsed)return void(this._rowContainer.contains(e.anchorNode)&&this._terminal.clearSelection());if(!e.anchorNode||!e.focusNode)return void console.error(`anchorNode and/or focusNode are null`);let t={node:e.anchorNode,offset:e.anchorOffset},n={node:e.focusNode,offset:e.focusOffset};if((t.node.compareDocumentPosition(n.node)&Node.DOCUMENT_POSITION_PRECEDING||t.node===n.node&&t.offset>n.offset)&&([t,n]=[n,t]),t.node.compareDocumentPosition(this._rowElements[0])&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_FOLLOWING)&&(t={node:this._rowElements[0].childNodes[0],offset:0}),!this._rowContainer.contains(t.node))return;let r=this._rowElements.slice(-1)[0];if(n.node.compareDocumentPosition(r)&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_PRECEDING)&&(n={node:r,offset:r.textContent?.length??0}),!this._rowContainer.contains(n.node))return;let i=({node:e,offset:t})=>{let n=e instanceof Text?e.parentNode:e,r=parseInt(n?.getAttribute(`aria-posinset`),10)-1;if(isNaN(r))return console.warn(`row is invalid. Race condition?`),null;let i=this._rowColumns.get(n);if(!i)return console.warn(`columns is null. Race condition?`),null;let a=t<i.length?i[t]:i.slice(-1)[0]+1;return a>=this._terminal.cols&&(++r,a=0),{row:r,column:a}},a=i(t),o=i(n);if(a&&o){if(a.row>o.row||a.row===o.row&&a.column>=o.column)throw Error(`invalid range`);this._terminal.select(a.column,a.row,(o.row-a.row)*this._terminal.cols-a.column+o.column)}}_handleResize(e){this._rowElements[this._rowElements.length-1].removeEventListener(`focus`,this._bottomBoundaryFocusListener);for(let e=this._rowContainer.children.length;e<this._terminal.rows;e++)this._rowElements[e]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[e]);for(;this._rowElements.length>e;)this._rowContainer.removeChild(this._rowElements.pop());this._rowElements[this._rowElements.length-1].addEventListener(`focus`,this._bottomBoundaryFocusListener),this._refreshRowsDimensions()}_createAccessibilityTreeNode(){let e=this._coreBrowserService.mainDocument.createElement(`div`);return e.setAttribute(`role`,`listitem`),e.tabIndex=-1,this._refreshRowDimensions(e),e}_refreshRowsDimensions(){if(this._renderService.dimensions.css.cell.height){this._accessibilityContainer.style.width=`${this._renderService.dimensions.css.canvas.width}px`,this._rowElements.length!==this._terminal.rows&&this._handleResize(this._terminal.rows);for(let e=0;e<this._terminal.rows;e++)this._refreshRowDimensions(this._rowElements[e])}}_refreshRowDimensions(e){e.style.height=`${this._renderService.dimensions.css.cell.height}px`}};t.AccessibilityManager=d=r([i(1,l.IInstantiationService),i(2,c.ICoreBrowserService),i(3,c.IRenderService)],d)},3614:(e,t)=>{function n(e){return e.replace(/\r?\n/g,`\r`)}function r(e,t){return t?`\x1B[200~`+e+`\x1B[201~`:e}function i(e,t,i,a){e=r(e=n(e),i.decPrivateModes.bracketedPasteMode&&!0!==a.rawOptions.ignoreBracketedPasteMode),i.triggerDataEvent(e,!0),t.value=``}function a(e,t,n){let r=n.getBoundingClientRect(),i=e.clientX-r.left-10,a=e.clientY-r.top-10;t.style.width=`20px`,t.style.height=`20px`,t.style.left=`${i}px`,t.style.top=`${a}px`,t.style.zIndex=`1000`,t.focus()}Object.defineProperty(t,"__esModule",{value:!0}),t.rightClickHandler=t.moveTextAreaUnderMouseCursor=t.paste=t.handlePasteEvent=t.copyHandler=t.bracketTextForPaste=t.prepareTextForTerminal=void 0,t.prepareTextForTerminal=n,t.bracketTextForPaste=r,t.copyHandler=function(e,t){e.clipboardData&&e.clipboardData.setData(`text/plain`,t.selectionText),e.preventDefault()},t.handlePasteEvent=function(e,t,n,r){e.stopPropagation(),e.clipboardData&&i(e.clipboardData.getData(`text/plain`),t,n,r)},t.paste=i,t.moveTextAreaUnderMouseCursor=a,t.rightClickHandler=function(e,t,n,r,i){a(e,t,n),i&&r.rightClickSelect(e),t.value=r.selectionText,t.select()}},7239:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ColorContrastCache=void 0;let r=n(1505);t.ColorContrastCache=class{constructor(){this._color=new r.TwoKeyMap,this._css=new r.TwoKeyMap}setCss(e,t,n){this._css.set(e,t,n)}getCss(e,t){return this._css.get(e,t)}setColor(e,t,n){this._color.set(e,t,n)}getColor(e,t){return this._color.get(e,t)}clear(){this._color.clear(),this._css.clear()}}},3656:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addDisposableDomListener=void 0,t.addDisposableDomListener=function(e,t,n,r){e.addEventListener(t,n,r);let i=!1;return{dispose:()=>{i||(i=!0,e.removeEventListener(t,n,r))}}}},3551:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.Linkifier=void 0;let a=n(3656),o=n(8460),s=n(844),c=n(2585),l=n(4725),u=t.Linkifier=class extends s.Disposable{get currentLink(){return this._currentLink}constructor(e,t,n,r,i){super(),this._element=e,this._mouseService=t,this._renderService=n,this._bufferService=r,this._linkProviderService=i,this._linkCacheDisposables=[],this._isMouseOut=!0,this._wasResized=!1,this._activeLine=-1,this._onShowLinkUnderline=this.register(new o.EventEmitter),this.onShowLinkUnderline=this._onShowLinkUnderline.event,this._onHideLinkUnderline=this.register(new o.EventEmitter),this.onHideLinkUnderline=this._onHideLinkUnderline.event,this.register((0,s.getDisposeArrayDisposable)(this._linkCacheDisposables)),this.register((0,s.toDisposable)((()=>{this._lastMouseEvent=void 0,this._activeProviderReplies?.clear()}))),this.register(this._bufferService.onResize((()=>{this._clearCurrentLink(),this._wasResized=!0}))),this.register((0,a.addDisposableDomListener)(this._element,`mouseleave`,(()=>{this._isMouseOut=!0,this._clearCurrentLink()}))),this.register((0,a.addDisposableDomListener)(this._element,`mousemove`,this._handleMouseMove.bind(this))),this.register((0,a.addDisposableDomListener)(this._element,`mousedown`,this._handleMouseDown.bind(this))),this.register((0,a.addDisposableDomListener)(this._element,`mouseup`,this._handleMouseUp.bind(this)))}_handleMouseMove(e){this._lastMouseEvent=e;let t=this._positionFromMouseEvent(e,this._element,this._mouseService);if(!t)return;this._isMouseOut=!1;let n=e.composedPath();for(let e=0;e<n.length;e++){let t=n[e];if(t.classList.contains(`xterm`))break;if(t.classList.contains(`xterm-hover`))return}this._lastBufferCell&&t.x===this._lastBufferCell.x&&t.y===this._lastBufferCell.y||(this._handleHover(t),this._lastBufferCell=t)}_handleHover(e){if(this._activeLine!==e.y||this._wasResized)return this._clearCurrentLink(),this._askForLink(e,!1),void(this._wasResized=!1);this._currentLink&&this._linkAtPosition(this._currentLink.link,e)||(this._clearCurrentLink(),this._askForLink(e,!0))}_askForLink(e,t){this._activeProviderReplies&&t||(this._activeProviderReplies?.forEach((e=>{e?.forEach((e=>{e.link.dispose&&e.link.dispose()}))})),this._activeProviderReplies=new Map,this._activeLine=e.y);let n=!1;for(let[r,i]of this._linkProviderService.linkProviders.entries())t?this._activeProviderReplies?.get(r)&&(n=this._checkLinkProviderResult(r,e,n)):i.provideLinks(e.y,(t=>{if(this._isMouseOut)return;let i=t?.map((e=>({link:e})));this._activeProviderReplies?.set(r,i),n=this._checkLinkProviderResult(r,e,n),this._activeProviderReplies?.size===this._linkProviderService.linkProviders.length&&this._removeIntersectingLinks(e.y,this._activeProviderReplies)}))}_removeIntersectingLinks(e,t){let n=new Set;for(let r=0;r<t.size;r++){let i=t.get(r);if(i)for(let t=0;t<i.length;t++){let r=i[t],a=r.link.range.start.y<e?0:r.link.range.start.x,o=r.link.range.end.y>e?this._bufferService.cols:r.link.range.end.x;for(let e=a;e<=o;e++){if(n.has(e)){i.splice(t--,1);break}n.add(e)}}}}_checkLinkProviderResult(e,t,n){if(!this._activeProviderReplies)return n;let r=this._activeProviderReplies.get(e),i=!1;for(let t=0;t<e;t++)this._activeProviderReplies.has(t)&&!this._activeProviderReplies.get(t)||(i=!0);if(!i&&r){let e=r.find((e=>this._linkAtPosition(e.link,t)));e&&(n=!0,this._handleNewLink(e))}if(this._activeProviderReplies.size===this._linkProviderService.linkProviders.length&&!n)for(let e=0;e<this._activeProviderReplies.size;e++){let r=this._activeProviderReplies.get(e)?.find((e=>this._linkAtPosition(e.link,t)));if(r){n=!0,this._handleNewLink(r);break}}return n}_handleMouseDown(){this._mouseDownLink=this._currentLink}_handleMouseUp(e){if(!this._currentLink)return;let t=this._positionFromMouseEvent(e,this._element,this._mouseService);t&&this._mouseDownLink===this._currentLink&&this._linkAtPosition(this._currentLink.link,t)&&this._currentLink.link.activate(e,this._currentLink.link.text)}_clearCurrentLink(e,t){this._currentLink&&this._lastMouseEvent&&(!e||!t||this._currentLink.link.range.start.y>=e&&this._currentLink.link.range.end.y<=t)&&(this._linkLeave(this._element,this._currentLink.link,this._lastMouseEvent),this._currentLink=void 0,(0,s.disposeArray)(this._linkCacheDisposables))}_handleNewLink(e){if(!this._lastMouseEvent)return;let t=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);t&&this._linkAtPosition(e.link,t)&&(this._currentLink=e,this._currentLink.state={decorations:{underline:e.link.decorations===void 0||e.link.decorations.underline,pointerCursor:e.link.decorations===void 0||e.link.decorations.pointerCursor},isHovered:!0},this._linkHover(this._element,e.link,this._lastMouseEvent),e.link.decorations={},Object.defineProperties(e.link.decorations,{pointerCursor:{get:()=>this._currentLink?.state?.decorations.pointerCursor,set:e=>{this._currentLink?.state&&this._currentLink.state.decorations.pointerCursor!==e&&(this._currentLink.state.decorations.pointerCursor=e,this._currentLink.state.isHovered&&this._element.classList.toggle(`xterm-cursor-pointer`,e))}},underline:{get:()=>this._currentLink?.state?.decorations.underline,set:t=>{this._currentLink?.state&&this._currentLink?.state?.decorations.underline!==t&&(this._currentLink.state.decorations.underline=t,this._currentLink.state.isHovered&&this._fireUnderlineEvent(e.link,t))}}}),this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e=>{if(!this._currentLink)return;let t=e.start===0?0:e.start+1+this._bufferService.buffer.ydisp,n=this._bufferService.buffer.ydisp+1+e.end;if(this._currentLink.link.range.start.y>=t&&this._currentLink.link.range.end.y<=n&&(this._clearCurrentLink(t,n),this._lastMouseEvent)){let e=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);e&&this._askForLink(e,!1)}}))))}_linkHover(e,t,n){this._currentLink?.state&&(this._currentLink.state.isHovered=!0,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(t,!0),this._currentLink.state.decorations.pointerCursor&&e.classList.add(`xterm-cursor-pointer`)),t.hover&&t.hover(n,t.text)}_fireUnderlineEvent(e,t){let n=e.range,r=this._bufferService.buffer.ydisp,i=this._createLinkUnderlineEvent(n.start.x-1,n.start.y-r-1,n.end.x,n.end.y-r-1,void 0);(t?this._onShowLinkUnderline:this._onHideLinkUnderline).fire(i)}_linkLeave(e,t,n){this._currentLink?.state&&(this._currentLink.state.isHovered=!1,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(t,!1),this._currentLink.state.decorations.pointerCursor&&e.classList.remove(`xterm-cursor-pointer`)),t.leave&&t.leave(n,t.text)}_linkAtPosition(e,t){let n=e.range.start.y*this._bufferService.cols+e.range.start.x,r=e.range.end.y*this._bufferService.cols+e.range.end.x,i=t.y*this._bufferService.cols+t.x;return n<=i&&i<=r}_positionFromMouseEvent(e,t,n){let r=n.getCoords(e,t,this._bufferService.cols,this._bufferService.rows);if(r)return{x:r[0],y:r[1]+this._bufferService.buffer.ydisp}}_createLinkUnderlineEvent(e,t,n,r,i){return{x1:e,y1:t,x2:n,y2:r,cols:this._bufferService.cols,fg:i}}};t.Linkifier=u=r([i(1,l.IMouseService),i(2,l.IRenderService),i(3,c.IBufferService),i(4,l.ILinkProviderService)],u)},9042:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.tooMuchOutput=t.promptLabel=void 0,t.promptLabel=`Terminal input`,t.tooMuchOutput=`Too much output to announce, navigate to rows manually to read`},3730:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.OscLinkProvider=void 0;let a=n(511),o=n(2585),s=t.OscLinkProvider=class{constructor(e,t,n){this._bufferService=e,this._optionsService=t,this._oscLinkService=n}provideLinks(e,t){let n=this._bufferService.buffer.lines.get(e-1);if(!n)return void t(void 0);let r=[],i=this._optionsService.rawOptions.linkHandler,o=new a.CellData,s=n.getTrimmedLength(),l=-1,u=-1,d=!1;for(let t=0;t<s;t++)if(u!==-1||n.hasContent(t)){if(n.loadCell(t,o),o.hasExtendedAttrs()&&o.extended.urlId){if(u===-1){u=t,l=o.extended.urlId;continue}d=o.extended.urlId!==l}else u!==-1&&(d=!0);if(d||u!==-1&&t===s-1){let n=this._oscLinkService.getLinkData(l)?.uri;if(n){let a={start:{x:u+1,y:e},end:{x:t+(d||t!==s-1?0:1),y:e}},o=!1;if(!i?.allowNonHttpProtocols)try{let e=new URL(n);[`http:`,`https:`].includes(e.protocol)||(o=!0)}catch{o=!0}o||r.push({text:n,range:a,activate:(e,t)=>i?i.activate(e,t,a):c(0,t),hover:(e,t)=>i?.hover?.(e,t,a),leave:(e,t)=>i?.leave?.(e,t,a)})}d=!1,o.hasExtendedAttrs()&&o.extended.urlId?(u=t,l=o.extended.urlId):(u=-1,l=-1)}}t(r)}};function c(e,t){if(confirm(`Do you want to navigate to ${t}?\n\nWARNING: This link could potentially be dangerous`)){let e=window.open();if(e){try{e.opener=null}catch{}e.location.href=t}else console.warn(`Opening link blocked as opener could not be cleared`)}}t.OscLinkProvider=s=r([i(0,o.IBufferService),i(1,o.IOptionsService),i(2,o.IOscLinkService)],s)},6193:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderDebouncer=void 0,t.RenderDebouncer=class{constructor(e,t){this._renderCallback=e,this._coreBrowserService=t,this._refreshCallbacks=[]}dispose(){this._animationFrame&&=(this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),void 0)}addRefreshCallback(e){return this._refreshCallbacks.push(e),this._animationFrame||=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh())),this._animationFrame}refresh(e,t,n){this._rowCount=n,e=e===void 0?0:e,t=t===void 0?this._rowCount-1:t,this._rowStart=this._rowStart===void 0?e:Math.min(this._rowStart,e),this._rowEnd=this._rowEnd===void 0?t:Math.max(this._rowEnd,t),this._animationFrame||=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh()))}_innerRefresh(){if(this._animationFrame=void 0,this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return void this._runRefreshCallbacks();let e=Math.max(this._rowStart,0),t=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(e,t),this._runRefreshCallbacks()}_runRefreshCallbacks(){for(let e of this._refreshCallbacks)e(0);this._refreshCallbacks=[]}}},3236:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Terminal=void 0;let r=n(3614),i=n(3656),a=n(3551),o=n(9042),s=n(3730),c=n(1680),l=n(3107),u=n(5744),d=n(2950),f=n(1296),p=n(428),m=n(4269),h=n(5114),g=n(8934),_=n(3230),v=n(9312),y=n(4725),b=n(6731),x=n(8055),S=n(8969),C=n(8460),w=n(844),T=n(6114),E=n(8437),D=n(2584),O=n(7399),k=n(5941),A=n(9074),j=n(2585),M=n(5435),N=n(4567),P=n(779);class F extends S.CoreTerminal{get onFocus(){return this._onFocus.event}get onBlur(){return this._onBlur.event}get onA11yChar(){return this._onA11yCharEmitter.event}get onA11yTab(){return this._onA11yTabEmitter.event}get onWillOpen(){return this._onWillOpen.event}constructor(e={}){super(e),this.browser=T,this._keyDownHandled=!1,this._keyDownSeen=!1,this._keyPressHandled=!1,this._unprocessedDeadKey=!1,this._accessibilityManager=this.register(new w.MutableDisposable),this._onCursorMove=this.register(new C.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onKey=this.register(new C.EventEmitter),this.onKey=this._onKey.event,this._onRender=this.register(new C.EventEmitter),this.onRender=this._onRender.event,this._onSelectionChange=this.register(new C.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onTitleChange=this.register(new C.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onBell=this.register(new C.EventEmitter),this.onBell=this._onBell.event,this._onFocus=this.register(new C.EventEmitter),this._onBlur=this.register(new C.EventEmitter),this._onA11yCharEmitter=this.register(new C.EventEmitter),this._onA11yTabEmitter=this.register(new C.EventEmitter),this._onWillOpen=this.register(new C.EventEmitter),this._setup(),this._decorationService=this._instantiationService.createInstance(A.DecorationService),this._instantiationService.setService(j.IDecorationService,this._decorationService),this._linkProviderService=this._instantiationService.createInstance(P.LinkProviderService),this._instantiationService.setService(y.ILinkProviderService,this._linkProviderService),this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(s.OscLinkProvider)),this.register(this._inputHandler.onRequestBell((()=>this._onBell.fire()))),this.register(this._inputHandler.onRequestRefreshRows(((e,t)=>this.refresh(e,t)))),this.register(this._inputHandler.onRequestSendFocus((()=>this._reportFocus()))),this.register(this._inputHandler.onRequestReset((()=>this.reset()))),this.register(this._inputHandler.onRequestWindowsOptionsReport((e=>this._reportWindowsOptions(e)))),this.register(this._inputHandler.onColor((e=>this._handleColorEvent(e)))),this.register((0,C.forwardEvent)(this._inputHandler.onCursorMove,this._onCursorMove)),this.register((0,C.forwardEvent)(this._inputHandler.onTitleChange,this._onTitleChange)),this.register((0,C.forwardEvent)(this._inputHandler.onA11yChar,this._onA11yCharEmitter)),this.register((0,C.forwardEvent)(this._inputHandler.onA11yTab,this._onA11yTabEmitter)),this.register(this._bufferService.onResize((e=>this._afterResize(e.cols,e.rows)))),this.register((0,w.toDisposable)((()=>{this._customKeyEventHandler=void 0,this.element?.parentNode?.removeChild(this.element)})))}_handleColorEvent(e){if(this._themeService)for(let t of e){let e,n=``;switch(t.index){case 256:e=`foreground`,n=`10`;break;case 257:e=`background`,n=`11`;break;case 258:e=`cursor`,n=`12`;break;default:e=`ansi`,n=`4;`+t.index}switch(t.type){case 0:let r=x.color.toColorRGB(e===`ansi`?this._themeService.colors.ansi[t.index]:this._themeService.colors[e]);this.coreService.triggerDataEvent(`${D.C0.ESC}]${n};${(0,k.toRgbString)(r)}${D.C1_ESCAPED.ST}`);break;case 1:if(e===`ansi`)this._themeService.modifyColors((e=>e.ansi[t.index]=x.channels.toColor(...t.color)));else{let n=e;this._themeService.modifyColors((e=>e[n]=x.channels.toColor(...t.color)))}break;case 2:this._themeService.restoreColor(t.index)}}}_setup(){super._setup(),this._customKeyEventHandler=void 0}get buffer(){return this.buffers.active}focus(){this.textarea&&this.textarea.focus({preventScroll:!0})}_handleScreenReaderModeOptionChange(e){e?!this._accessibilityManager.value&&this._renderService&&(this._accessibilityManager.value=this._instantiationService.createInstance(N.AccessibilityManager,this)):this._accessibilityManager.clear()}_handleTextAreaFocus(e){this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(D.C0.ESC+`[I`),this.element.classList.add(`focus`),this._showCursor(),this._onFocus.fire()}blur(){return this.textarea?.blur()}_handleTextAreaBlur(){this.textarea.value=``,this.refresh(this.buffer.y,this.buffer.y),this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(D.C0.ESC+`[O`),this.element.classList.remove(`focus`),this._onBlur.fire()}_syncTextArea(){if(!this.textarea||!this.buffer.isCursorInViewport||this._compositionHelper.isComposing||!this._renderService)return;let e=this.buffer.ybase+this.buffer.y,t=this.buffer.lines.get(e);if(!t)return;let n=Math.min(this.buffer.x,this.cols-1),r=this._renderService.dimensions.css.cell.height,i=t.getWidth(n),a=this._renderService.dimensions.css.cell.width*i,o=this.buffer.y*this._renderService.dimensions.css.cell.height,s=n*this._renderService.dimensions.css.cell.width;this.textarea.style.left=s+`px`,this.textarea.style.top=o+`px`,this.textarea.style.width=a+`px`,this.textarea.style.height=r+`px`,this.textarea.style.lineHeight=r+`px`,this.textarea.style.zIndex=`-5`}_initGlobal(){this._bindKeys(),this.register((0,i.addDisposableDomListener)(this.element,`copy`,(e=>{this.hasSelection()&&(0,r.copyHandler)(e,this._selectionService)})));let e=e=>(0,r.handlePasteEvent)(e,this.textarea,this.coreService,this.optionsService);this.register((0,i.addDisposableDomListener)(this.textarea,`paste`,e)),this.register((0,i.addDisposableDomListener)(this.element,`paste`,e)),T.isFirefox?this.register((0,i.addDisposableDomListener)(this.element,`mousedown`,(e=>{e.button===2&&(0,r.rightClickHandler)(e,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)}))):this.register((0,i.addDisposableDomListener)(this.element,`contextmenu`,(e=>{(0,r.rightClickHandler)(e,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)}))),T.isLinux&&this.register((0,i.addDisposableDomListener)(this.element,`auxclick`,(e=>{e.button===1&&(0,r.moveTextAreaUnderMouseCursor)(e,this.textarea,this.screenElement)})))}_bindKeys(){this.register((0,i.addDisposableDomListener)(this.textarea,`keyup`,(e=>this._keyUp(e)),!0)),this.register((0,i.addDisposableDomListener)(this.textarea,`keydown`,(e=>this._keyDown(e)),!0)),this.register((0,i.addDisposableDomListener)(this.textarea,`keypress`,(e=>this._keyPress(e)),!0)),this.register((0,i.addDisposableDomListener)(this.textarea,`compositionstart`,(()=>this._compositionHelper.compositionstart()))),this.register((0,i.addDisposableDomListener)(this.textarea,`compositionupdate`,(e=>this._compositionHelper.compositionupdate(e)))),this.register((0,i.addDisposableDomListener)(this.textarea,`compositionend`,(()=>this._compositionHelper.compositionend()))),this.register((0,i.addDisposableDomListener)(this.textarea,`input`,(e=>this._inputEvent(e)),!0)),this.register(this.onRender((()=>this._compositionHelper.updateCompositionElements())))}open(e){if(!e)throw Error(`Terminal requires a parent element.`);if(e.isConnected||this._logService.debug(`Terminal.open was called on an element that was not attached to the DOM`),this.element?.ownerDocument.defaultView&&this._coreBrowserService)return void(this.element.ownerDocument.defaultView!==this._coreBrowserService.window&&(this._coreBrowserService.window=this.element.ownerDocument.defaultView));this._document=e.ownerDocument,this.options.documentOverride&&this.options.documentOverride instanceof Document&&(this._document=this.optionsService.rawOptions.documentOverride),this.element=this._document.createElement(`div`),this.element.dir=`ltr`,this.element.classList.add(`terminal`),this.element.classList.add(`xterm`),e.appendChild(this.element);let t=this._document.createDocumentFragment();this._viewportElement=this._document.createElement(`div`),this._viewportElement.classList.add(`xterm-viewport`),t.appendChild(this._viewportElement),this._viewportScrollArea=this._document.createElement(`div`),this._viewportScrollArea.classList.add(`xterm-scroll-area`),this._viewportElement.appendChild(this._viewportScrollArea),this.screenElement=this._document.createElement(`div`),this.screenElement.classList.add(`xterm-screen`),this.register((0,i.addDisposableDomListener)(this.screenElement,`mousemove`,(e=>this.updateCursorStyle(e)))),this._helperContainer=this._document.createElement(`div`),this._helperContainer.classList.add(`xterm-helpers`),this.screenElement.appendChild(this._helperContainer),t.appendChild(this.screenElement),this.textarea=this._document.createElement(`textarea`),this.textarea.classList.add(`xterm-helper-textarea`),this.textarea.setAttribute(`aria-label`,o.promptLabel),T.isChromeOS||this.textarea.setAttribute(`aria-multiline`,`false`),this.textarea.setAttribute(`autocorrect`,`off`),this.textarea.setAttribute(`autocapitalize`,`off`),this.textarea.setAttribute(`spellcheck`,`false`),this.textarea.tabIndex=0,this._coreBrowserService=this.register(this._instantiationService.createInstance(h.CoreBrowserService,this.textarea,e.ownerDocument.defaultView??window,this._document??typeof window<`u`?window.document:null)),this._instantiationService.setService(y.ICoreBrowserService,this._coreBrowserService),this.register((0,i.addDisposableDomListener)(this.textarea,`focus`,(e=>this._handleTextAreaFocus(e)))),this.register((0,i.addDisposableDomListener)(this.textarea,`blur`,(()=>this._handleTextAreaBlur()))),this._helperContainer.appendChild(this.textarea),this._charSizeService=this._instantiationService.createInstance(p.CharSizeService,this._document,this._helperContainer),this._instantiationService.setService(y.ICharSizeService,this._charSizeService),this._themeService=this._instantiationService.createInstance(b.ThemeService),this._instantiationService.setService(y.IThemeService,this._themeService),this._characterJoinerService=this._instantiationService.createInstance(m.CharacterJoinerService),this._instantiationService.setService(y.ICharacterJoinerService,this._characterJoinerService),this._renderService=this.register(this._instantiationService.createInstance(_.RenderService,this.rows,this.screenElement)),this._instantiationService.setService(y.IRenderService,this._renderService),this.register(this._renderService.onRenderedViewportChange((e=>this._onRender.fire(e)))),this.onResize((e=>this._renderService.resize(e.cols,e.rows))),this._compositionView=this._document.createElement(`div`),this._compositionView.classList.add(`composition-view`),this._compositionHelper=this._instantiationService.createInstance(d.CompositionHelper,this.textarea,this._compositionView),this._helperContainer.appendChild(this._compositionView),this._mouseService=this._instantiationService.createInstance(g.MouseService),this._instantiationService.setService(y.IMouseService,this._mouseService),this.linkifier=this.register(this._instantiationService.createInstance(a.Linkifier,this.screenElement)),this.element.appendChild(t);try{this._onWillOpen.fire(this.element)}catch{}this._renderService.hasRenderer()||this._renderService.setRenderer(this._createRenderer()),this.viewport=this._instantiationService.createInstance(c.Viewport,this._viewportElement,this._viewportScrollArea),this.viewport.onRequestScrollLines((e=>this.scrollLines(e.amount,e.suppressScrollEvent,1))),this.register(this._inputHandler.onRequestSyncScrollBar((()=>this.viewport.syncScrollArea()))),this.register(this.viewport),this.register(this.onCursorMove((()=>{this._renderService.handleCursorMove(),this._syncTextArea()}))),this.register(this.onResize((()=>this._renderService.handleResize(this.cols,this.rows)))),this.register(this.onBlur((()=>this._renderService.handleBlur()))),this.register(this.onFocus((()=>this._renderService.handleFocus()))),this.register(this._renderService.onDimensionsChange((()=>this.viewport.syncScrollArea()))),this._selectionService=this.register(this._instantiationService.createInstance(v.SelectionService,this.element,this.screenElement,this.linkifier)),this._instantiationService.setService(y.ISelectionService,this._selectionService),this.register(this._selectionService.onRequestScrollLines((e=>this.scrollLines(e.amount,e.suppressScrollEvent)))),this.register(this._selectionService.onSelectionChange((()=>this._onSelectionChange.fire()))),this.register(this._selectionService.onRequestRedraw((e=>this._renderService.handleSelectionChanged(e.start,e.end,e.columnSelectMode)))),this.register(this._selectionService.onLinuxMouseSelection((e=>{this.textarea.value=e,this.textarea.focus(),this.textarea.select()}))),this.register(this._onScroll.event((e=>{this.viewport.syncScrollArea(),this._selectionService.refresh()}))),this.register((0,i.addDisposableDomListener)(this._viewportElement,`scroll`,(()=>this._selectionService.refresh()))),this.register(this._instantiationService.createInstance(l.BufferDecorationRenderer,this.screenElement)),this.register((0,i.addDisposableDomListener)(this.element,`mousedown`,(e=>this._selectionService.handleMouseDown(e)))),this.coreMouseService.areMouseEventsActive?(this._selectionService.disable(),this.element.classList.add(`enable-mouse-events`)):this._selectionService.enable(),this.options.screenReaderMode&&(this._accessibilityManager.value=this._instantiationService.createInstance(N.AccessibilityManager,this)),this.register(this.optionsService.onSpecificOptionChange(`screenReaderMode`,(e=>this._handleScreenReaderModeOptionChange(e)))),this.options.overviewRulerWidth&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(u.OverviewRulerRenderer,this._viewportElement,this.screenElement))),this.optionsService.onSpecificOptionChange(`overviewRulerWidth`,(e=>{!this._overviewRulerRenderer&&e&&this._viewportElement&&this.screenElement&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(u.OverviewRulerRenderer,this._viewportElement,this.screenElement)))})),this._charSizeService.measure(),this.refresh(0,this.rows-1),this._initGlobal(),this.bindMouse()}_createRenderer(){return this._instantiationService.createInstance(f.DomRenderer,this,this._document,this.element,this.screenElement,this._viewportElement,this._helperContainer,this.linkifier)}bindMouse(){let e=this,t=this.element;function n(t){let n=e._mouseService.getMouseReportCoords(t,e.screenElement);if(!n)return!1;let r,i;switch(t.overrideType||t.type){case`mousemove`:i=32,t.buttons===void 0?(r=3,t.button!==void 0&&(r=t.button<3?t.button:3)):r=1&t.buttons?0:4&t.buttons?1:2&t.buttons?2:3;break;case`mouseup`:i=0,r=t.button<3?t.button:3;break;case`mousedown`:i=1,r=t.button<3?t.button:3;break;case`wheel`:if(e._customWheelEventHandler&&!1===e._customWheelEventHandler(t)||e.viewport.getLinesScrolled(t)===0)return!1;i=t.deltaY<0?0:1,r=4;break;default:return!1}return!(i===void 0||r===void 0||r>4)&&e.coreMouseService.triggerMouseEvent({col:n.col,row:n.row,x:n.x,y:n.y,button:r,action:i,ctrl:t.ctrlKey,alt:t.altKey,shift:t.shiftKey})}let r={mouseup:null,wheel:null,mousedrag:null,mousemove:null},a={mouseup:e=>(n(e),e.buttons||(this._document.removeEventListener(`mouseup`,r.mouseup),r.mousedrag&&this._document.removeEventListener(`mousemove`,r.mousedrag)),this.cancel(e)),wheel:e=>(n(e),this.cancel(e,!0)),mousedrag:e=>{e.buttons&&n(e)},mousemove:e=>{e.buttons||n(e)}};this.register(this.coreMouseService.onProtocolChange((e=>{e?(this.optionsService.rawOptions.logLevel===`debug`&&this._logService.debug(`Binding to mouse events:`,this.coreMouseService.explainEvents(e)),this.element.classList.add(`enable-mouse-events`),this._selectionService.disable()):(this._logService.debug(`Unbinding from mouse events.`),this.element.classList.remove(`enable-mouse-events`),this._selectionService.enable()),8&e?r.mousemove||=(t.addEventListener(`mousemove`,a.mousemove),a.mousemove):(t.removeEventListener(`mousemove`,r.mousemove),r.mousemove=null),16&e?r.wheel||=(t.addEventListener(`wheel`,a.wheel,{passive:!1}),a.wheel):(t.removeEventListener(`wheel`,r.wheel),r.wheel=null),2&e?r.mouseup||=a.mouseup:(this._document.removeEventListener(`mouseup`,r.mouseup),r.mouseup=null),4&e?r.mousedrag||=a.mousedrag:(this._document.removeEventListener(`mousemove`,r.mousedrag),r.mousedrag=null)}))),this.coreMouseService.activeProtocol=this.coreMouseService.activeProtocol,this.register((0,i.addDisposableDomListener)(t,`mousedown`,(e=>{if(e.preventDefault(),this.focus(),this.coreMouseService.areMouseEventsActive&&!this._selectionService.shouldForceSelection(e))return n(e),r.mouseup&&this._document.addEventListener(`mouseup`,r.mouseup),r.mousedrag&&this._document.addEventListener(`mousemove`,r.mousedrag),this.cancel(e)}))),this.register((0,i.addDisposableDomListener)(t,`wheel`,(e=>{if(!r.wheel){if(this._customWheelEventHandler&&!1===this._customWheelEventHandler(e))return!1;if(!this.buffer.hasScrollback){let t=this.viewport.getLinesScrolled(e);if(t===0)return;let n=D.C0.ESC+(this.coreService.decPrivateModes.applicationCursorKeys?`O`:`[`)+(e.deltaY<0?`A`:`B`),r=``;for(let e=0;e<Math.abs(t);e++)r+=n;return this.coreService.triggerDataEvent(r,!0),this.cancel(e,!0)}return this.viewport.handleWheel(e)?this.cancel(e):void 0}}),{passive:!1})),this.register((0,i.addDisposableDomListener)(t,`touchstart`,(e=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchStart(e),this.cancel(e)}),{passive:!0})),this.register((0,i.addDisposableDomListener)(t,`touchmove`,(e=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchMove(e)?void 0:this.cancel(e)}),{passive:!1}))}refresh(e,t){this._renderService?.refreshRows(e,t)}updateCursorStyle(e){this._selectionService?.shouldColumnSelect(e)?this.element.classList.add(`column-select`):this.element.classList.remove(`column-select`)}_showCursor(){this.coreService.isCursorInitialized||(this.coreService.isCursorInitialized=!0,this.refresh(this.buffer.y,this.buffer.y))}scrollLines(e,t,n=0){n===1?(super.scrollLines(e,t,n),this.refresh(0,this.rows-1)):this.viewport?.scrollLines(e)}paste(e){(0,r.paste)(e,this.textarea,this.coreService,this.optionsService)}attachCustomKeyEventHandler(e){this._customKeyEventHandler=e}attachCustomWheelEventHandler(e){this._customWheelEventHandler=e}registerLinkProvider(e){return this._linkProviderService.registerLinkProvider(e)}registerCharacterJoiner(e){if(!this._characterJoinerService)throw Error(`Terminal must be opened first`);let t=this._characterJoinerService.register(e);return this.refresh(0,this.rows-1),t}deregisterCharacterJoiner(e){if(!this._characterJoinerService)throw Error(`Terminal must be opened first`);this._characterJoinerService.deregister(e)&&this.refresh(0,this.rows-1)}get markers(){return this.buffer.markers}registerMarker(e){return this.buffer.addMarker(this.buffer.ybase+this.buffer.y+e)}registerDecoration(e){return this._decorationService.registerDecoration(e)}hasSelection(){return!!this._selectionService&&this._selectionService.hasSelection}select(e,t,n){this._selectionService.setSelection(e,t,n)}getSelection(){return this._selectionService?this._selectionService.selectionText:``}getSelectionPosition(){if(this._selectionService&&this._selectionService.hasSelection)return{start:{x:this._selectionService.selectionStart[0],y:this._selectionService.selectionStart[1]},end:{x:this._selectionService.selectionEnd[0],y:this._selectionService.selectionEnd[1]}}}clearSelection(){this._selectionService?.clearSelection()}selectAll(){this._selectionService?.selectAll()}selectLines(e,t){this._selectionService?.selectLines(e,t)}_keyDown(e){if(this._keyDownHandled=!1,this._keyDownSeen=!0,this._customKeyEventHandler&&!1===this._customKeyEventHandler(e))return!1;let t=this.browser.isMac&&this.options.macOptionIsMeta&&e.altKey;if(!t&&!this._compositionHelper.keydown(e))return this.options.scrollOnUserInput&&this.buffer.ybase!==this.buffer.ydisp&&this.scrollToBottom(),!1;t||e.key!==`Dead`&&e.key!==`AltGraph`||(this._unprocessedDeadKey=!0);let n=(0,O.evaluateKeyboardEvent)(e,this.coreService.decPrivateModes.applicationCursorKeys,this.browser.isMac,this.options.macOptionIsMeta);if(this.updateCursorStyle(e),n.type===3||n.type===2){let t=this.rows-1;return this.scrollLines(n.type===2?-t:t),this.cancel(e,!0)}return n.type===1&&this.selectAll(),!!this._isThirdLevelShift(this.browser,e)||(n.cancel&&this.cancel(e,!0),!n.key||!!(e.key&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.key.length===1&&e.key.charCodeAt(0)>=65&&e.key.charCodeAt(0)<=90)||(this._unprocessedDeadKey?(this._unprocessedDeadKey=!1,!0):(n.key!==D.C0.ETX&&n.key!==D.C0.CR||(this.textarea.value=``),this._onKey.fire({key:n.key,domEvent:e}),this._showCursor(),this.coreService.triggerDataEvent(n.key,!0),!this.optionsService.rawOptions.screenReaderMode||e.altKey||e.ctrlKey?this.cancel(e,!0):void(this._keyDownHandled=!0))))}_isThirdLevelShift(e,t){let n=e.isMac&&!this.options.macOptionIsMeta&&t.altKey&&!t.ctrlKey&&!t.metaKey||e.isWindows&&t.altKey&&t.ctrlKey&&!t.metaKey||e.isWindows&&t.getModifierState(`AltGraph`);return t.type===`keypress`?n:n&&(!t.keyCode||t.keyCode>47)}_keyUp(e){this._keyDownSeen=!1,this._customKeyEventHandler&&!1===this._customKeyEventHandler(e)||(function(e){return e.keyCode===16||e.keyCode===17||e.keyCode===18}(e)||this.focus(),this.updateCursorStyle(e),this._keyPressHandled=!1)}_keyPress(e){let t;if(this._keyPressHandled=!1,this._keyDownHandled||this._customKeyEventHandler&&!1===this._customKeyEventHandler(e))return!1;if(this.cancel(e),e.charCode)t=e.charCode;else if(e.which===null||e.which===void 0)t=e.keyCode;else{if(e.which===0||e.charCode===0)return!1;t=e.which}return!(!t||(e.altKey||e.ctrlKey||e.metaKey)&&!this._isThirdLevelShift(this.browser,e)||(t=String.fromCharCode(t),this._onKey.fire({key:t,domEvent:e}),this._showCursor(),this.coreService.triggerDataEvent(t,!0),this._keyPressHandled=!0,this._unprocessedDeadKey=!1,0))}_inputEvent(e){if(e.data&&e.inputType===`insertText`&&(!e.composed||!this._keyDownSeen)&&!this.optionsService.rawOptions.screenReaderMode){if(this._keyPressHandled)return!1;this._unprocessedDeadKey=!1;let t=e.data;return this.coreService.triggerDataEvent(t,!0),this.cancel(e),!0}return!1}resize(e,t){e!==this.cols||t!==this.rows?super.resize(e,t):this._charSizeService&&!this._charSizeService.hasValidSize&&this._charSizeService.measure()}_afterResize(e,t){this._charSizeService?.measure(),this.viewport?.syncScrollArea(!0)}clear(){if(this.buffer.ybase!==0||this.buffer.y!==0){this.buffer.clearAllMarkers(),this.buffer.lines.set(0,this.buffer.lines.get(this.buffer.ybase+this.buffer.y)),this.buffer.lines.length=1,this.buffer.ydisp=0,this.buffer.ybase=0,this.buffer.y=0;for(let e=1;e<this.rows;e++)this.buffer.lines.push(this.buffer.getBlankLine(E.DEFAULT_ATTR_DATA));this._onScroll.fire({position:this.buffer.ydisp,source:0}),this.viewport?.reset(),this.refresh(0,this.rows-1)}}reset(){this.options.rows=this.rows,this.options.cols=this.cols;let e=this._customKeyEventHandler;this._setup(),super.reset(),this._selectionService?.reset(),this._decorationService.reset(),this.viewport?.reset(),this._customKeyEventHandler=e,this.refresh(0,this.rows-1)}clearTextureAtlas(){this._renderService?.clearTextureAtlas()}_reportFocus(){this.element?.classList.contains(`focus`)?this.coreService.triggerDataEvent(D.C0.ESC+`[I`):this.coreService.triggerDataEvent(D.C0.ESC+`[O`)}_reportWindowsOptions(e){if(this._renderService)switch(e){case M.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:let e=this._renderService.dimensions.css.canvas.width.toFixed(0),t=this._renderService.dimensions.css.canvas.height.toFixed(0);this.coreService.triggerDataEvent(`${D.C0.ESC}[4;${t};${e}t`);break;case M.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:let n=this._renderService.dimensions.css.cell.width.toFixed(0),r=this._renderService.dimensions.css.cell.height.toFixed(0);this.coreService.triggerDataEvent(`${D.C0.ESC}[6;${r};${n}t`)}}cancel(e,t){if(this.options.cancelEvents||t)return e.preventDefault(),e.stopPropagation(),!1}}t.Terminal=F},9924:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TimeBasedDebouncer=void 0,t.TimeBasedDebouncer=class{constructor(e,t=1e3){this._renderCallback=e,this._debounceThresholdMS=t,this._lastRefreshMs=0,this._additionalRefreshRequested=!1}dispose(){this._refreshTimeoutID&&clearTimeout(this._refreshTimeoutID)}refresh(e,t,n){this._rowCount=n,e=e===void 0?0:e,t=t===void 0?this._rowCount-1:t,this._rowStart=this._rowStart===void 0?e:Math.min(this._rowStart,e),this._rowEnd=this._rowEnd===void 0?t:Math.max(this._rowEnd,t);let r=Date.now();if(r-this._lastRefreshMs>=this._debounceThresholdMS)this._lastRefreshMs=r,this._innerRefresh();else if(!this._additionalRefreshRequested){let e=r-this._lastRefreshMs,t=this._debounceThresholdMS-e;this._additionalRefreshRequested=!0,this._refreshTimeoutID=window.setTimeout((()=>{this._lastRefreshMs=Date.now(),this._innerRefresh(),this._additionalRefreshRequested=!1,this._refreshTimeoutID=void 0}),t)}}_innerRefresh(){if(this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return;let e=Math.max(this._rowStart,0),t=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(e,t)}}},1680:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.Viewport=void 0;let a=n(3656),o=n(4725),s=n(8460),c=n(844),l=n(2585),u=t.Viewport=class extends c.Disposable{constructor(e,t,n,r,i,o,c,l){super(),this._viewportElement=e,this._scrollArea=t,this._bufferService=n,this._optionsService=r,this._charSizeService=i,this._renderService=o,this._coreBrowserService=c,this.scrollBarWidth=0,this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._wheelPartialScroll=0,this._refreshAnimationFrame=null,this._ignoreNextScrollEvent=!1,this._smoothScrollState={startTime:0,origin:-1,target:-1},this._onRequestScrollLines=this.register(new s.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this.scrollBarWidth=this._viewportElement.offsetWidth-this._scrollArea.offsetWidth||15,this.register((0,a.addDisposableDomListener)(this._viewportElement,`scroll`,this._handleScroll.bind(this))),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate((e=>this._activeBuffer=e.activeBuffer))),this._renderDimensions=this._renderService.dimensions,this.register(this._renderService.onDimensionsChange((e=>this._renderDimensions=e))),this._handleThemeChange(l.colors),this.register(l.onChangeColors((e=>this._handleThemeChange(e)))),this.register(this._optionsService.onSpecificOptionChange(`scrollback`,(()=>this.syncScrollArea()))),setTimeout((()=>this.syncScrollArea()))}_handleThemeChange(e){this._viewportElement.style.backgroundColor=e.background.css}reset(){this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._coreBrowserService.window.requestAnimationFrame((()=>this.syncScrollArea()))}_refresh(e){if(e)return this._innerRefresh(),void(this._refreshAnimationFrame!==null&&this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));this._refreshAnimationFrame===null&&(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh())))}_innerRefresh(){if(this._charSizeService.height>0){this._currentRowHeight=this._renderDimensions.device.cell.height/this._coreBrowserService.dpr,this._currentDeviceCellHeight=this._renderDimensions.device.cell.height,this._lastRecordedViewportHeight=this._viewportElement.offsetHeight;let e=Math.round(this._currentRowHeight*this._lastRecordedBufferLength)+(this._lastRecordedViewportHeight-this._renderDimensions.css.canvas.height);this._lastRecordedBufferHeight!==e&&(this._lastRecordedBufferHeight=e,this._scrollArea.style.height=this._lastRecordedBufferHeight+`px`)}let e=this._bufferService.buffer.ydisp*this._currentRowHeight;this._viewportElement.scrollTop!==e&&(this._ignoreNextScrollEvent=!0,this._viewportElement.scrollTop=e),this._refreshAnimationFrame=null}syncScrollArea(e=!1){if(this._lastRecordedBufferLength!==this._bufferService.buffer.lines.length)return this._lastRecordedBufferLength=this._bufferService.buffer.lines.length,void this._refresh(e);this._lastRecordedViewportHeight===this._renderService.dimensions.css.canvas.height&&this._lastScrollTop===this._activeBuffer.ydisp*this._currentRowHeight&&this._renderDimensions.device.cell.height===this._currentDeviceCellHeight||this._refresh(e)}_handleScroll(e){if(this._lastScrollTop=this._viewportElement.scrollTop,!this._viewportElement.offsetParent)return;if(this._ignoreNextScrollEvent)return this._ignoreNextScrollEvent=!1,void this._onRequestScrollLines.fire({amount:0,suppressScrollEvent:!0});let t=Math.round(this._lastScrollTop/this._currentRowHeight)-this._bufferService.buffer.ydisp;this._onRequestScrollLines.fire({amount:t,suppressScrollEvent:!0})}_smoothScroll(){if(this._isDisposed||this._smoothScrollState.origin===-1||this._smoothScrollState.target===-1)return;let e=this._smoothScrollPercent();this._viewportElement.scrollTop=this._smoothScrollState.origin+Math.round(e*(this._smoothScrollState.target-this._smoothScrollState.origin)),e<1?this._coreBrowserService.window.requestAnimationFrame((()=>this._smoothScroll())):this._clearSmoothScrollState()}_smoothScrollPercent(){return this._optionsService.rawOptions.smoothScrollDuration&&this._smoothScrollState.startTime?Math.max(Math.min((Date.now()-this._smoothScrollState.startTime)/this._optionsService.rawOptions.smoothScrollDuration,1),0):1}_clearSmoothScrollState(){this._smoothScrollState.startTime=0,this._smoothScrollState.origin=-1,this._smoothScrollState.target=-1}_bubbleScroll(e,t){let n=this._viewportElement.scrollTop+this._lastRecordedViewportHeight;return!(t<0&&this._viewportElement.scrollTop!==0||t>0&&n<this._lastRecordedBufferHeight)||(e.cancelable&&e.preventDefault(),!1)}handleWheel(e){let t=this._getPixelsScrolled(e);return t!==0&&(this._optionsService.rawOptions.smoothScrollDuration?(this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target===-1?this._smoothScrollState.target=this._viewportElement.scrollTop+t:this._smoothScrollState.target+=t,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()):this._viewportElement.scrollTop+=t,this._bubbleScroll(e,t))}scrollLines(e){if(e!==0)if(this._optionsService.rawOptions.smoothScrollDuration){let t=e*this._currentRowHeight;this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target=this._smoothScrollState.origin+t,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()}else this._onRequestScrollLines.fire({amount:e,suppressScrollEvent:!1})}_getPixelsScrolled(e){if(e.deltaY===0||e.shiftKey)return 0;let t=this._applyScrollModifier(e.deltaY,e);return e.deltaMode===WheelEvent.DOM_DELTA_LINE?t*=this._currentRowHeight:e.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(t*=this._currentRowHeight*this._bufferService.rows),t}getBufferElements(e,t){let n,r=``,i=[],a=t??this._bufferService.buffer.lines.length,o=this._bufferService.buffer.lines;for(let t=e;t<a;t++){let e=o.get(t);if(!e)continue;let a=o.get(t+1)?.isWrapped;if(r+=e.translateToString(!a),!a||t===o.length-1){let e=document.createElement(`div`);e.textContent=r,i.push(e),r.length>0&&(n=e),r=``}}return{bufferElements:i,cursorElement:n}}getLinesScrolled(e){if(e.deltaY===0||e.shiftKey)return 0;let t=this._applyScrollModifier(e.deltaY,e);return e.deltaMode===WheelEvent.DOM_DELTA_PIXEL?(t/=this._currentRowHeight+0,this._wheelPartialScroll+=t,t=Math.floor(Math.abs(this._wheelPartialScroll))*(this._wheelPartialScroll>0?1:-1),this._wheelPartialScroll%=1):e.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(t*=this._bufferService.rows),t}_applyScrollModifier(e,t){let n=this._optionsService.rawOptions.fastScrollModifier;return n===`alt`&&t.altKey||n===`ctrl`&&t.ctrlKey||n===`shift`&&t.shiftKey?e*this._optionsService.rawOptions.fastScrollSensitivity*this._optionsService.rawOptions.scrollSensitivity:e*this._optionsService.rawOptions.scrollSensitivity}handleTouchStart(e){this._lastTouchY=e.touches[0].pageY}handleTouchMove(e){let t=this._lastTouchY-e.touches[0].pageY;return this._lastTouchY=e.touches[0].pageY,t!==0&&(this._viewportElement.scrollTop+=t,this._bubbleScroll(e,t))}};t.Viewport=u=r([i(2,l.IBufferService),i(3,l.IOptionsService),i(4,o.ICharSizeService),i(5,o.IRenderService),i(6,o.ICoreBrowserService),i(7,o.IThemeService)],u)},3107:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.BufferDecorationRenderer=void 0;let a=n(4725),o=n(844),s=n(2585),c=t.BufferDecorationRenderer=class extends o.Disposable{constructor(e,t,n,r,i){super(),this._screenElement=e,this._bufferService=t,this._coreBrowserService=n,this._decorationService=r,this._renderService=i,this._decorationElements=new Map,this._altBufferIsActive=!1,this._dimensionsChanged=!1,this._container=document.createElement(`div`),this._container.classList.add(`xterm-decoration-container`),this._screenElement.appendChild(this._container),this.register(this._renderService.onRenderedViewportChange((()=>this._doRefreshDecorations()))),this.register(this._renderService.onDimensionsChange((()=>{this._dimensionsChanged=!0,this._queueRefresh()}))),this.register(this._coreBrowserService.onDprChange((()=>this._queueRefresh()))),this.register(this._bufferService.buffers.onBufferActivate((()=>{this._altBufferIsActive=this._bufferService.buffer===this._bufferService.buffers.alt}))),this.register(this._decorationService.onDecorationRegistered((()=>this._queueRefresh()))),this.register(this._decorationService.onDecorationRemoved((e=>this._removeDecoration(e)))),this.register((0,o.toDisposable)((()=>{this._container.remove(),this._decorationElements.clear()})))}_queueRefresh(){this._animationFrame===void 0&&(this._animationFrame=this._renderService.addRefreshCallback((()=>{this._doRefreshDecorations(),this._animationFrame=void 0})))}_doRefreshDecorations(){for(let e of this._decorationService.decorations)this._renderDecoration(e);this._dimensionsChanged=!1}_renderDecoration(e){this._refreshStyle(e),this._dimensionsChanged&&this._refreshXPosition(e)}_createElement(e){let t=this._coreBrowserService.mainDocument.createElement(`div`);t.classList.add(`xterm-decoration`),t.classList.toggle(`xterm-decoration-top-layer`,e?.options?.layer===`top`),t.style.width=`${Math.round((e.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,t.style.height=(e.options.height||1)*this._renderService.dimensions.css.cell.height+`px`,t.style.top=(e.marker.line-this._bufferService.buffers.active.ydisp)*this._renderService.dimensions.css.cell.height+`px`,t.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`;let n=e.options.x??0;return n&&n>this._bufferService.cols&&(t.style.display=`none`),this._refreshXPosition(e,t),t}_refreshStyle(e){let t=e.marker.line-this._bufferService.buffers.active.ydisp;if(t<0||t>=this._bufferService.rows)e.element&&(e.element.style.display=`none`,e.onRenderEmitter.fire(e.element));else{let n=this._decorationElements.get(e);n||(n=this._createElement(e),e.element=n,this._decorationElements.set(e,n),this._container.appendChild(n),e.onDispose((()=>{this._decorationElements.delete(e),n.remove()}))),n.style.top=t*this._renderService.dimensions.css.cell.height+`px`,n.style.display=this._altBufferIsActive?`none`:`block`,e.onRenderEmitter.fire(n)}}_refreshXPosition(e,t=e.element){if(!t)return;let n=e.options.x??0;(e.options.anchor||`left`)===`right`?t.style.right=n?n*this._renderService.dimensions.css.cell.width+`px`:``:t.style.left=n?n*this._renderService.dimensions.css.cell.width+`px`:``}_removeDecoration(e){this._decorationElements.get(e)?.remove(),this._decorationElements.delete(e),e.dispose()}};t.BufferDecorationRenderer=c=r([i(1,s.IBufferService),i(2,a.ICoreBrowserService),i(3,s.IDecorationService),i(4,a.IRenderService)],c)},5871:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ColorZoneStore=void 0,t.ColorZoneStore=class{constructor(){this._zones=[],this._zonePool=[],this._zonePoolIndex=0,this._linePadding={full:0,left:0,center:0,right:0}}get zones(){return this._zonePool.length=Math.min(this._zonePool.length,this._zones.length),this._zones}clear(){this._zones.length=0,this._zonePoolIndex=0}addDecoration(e){if(e.options.overviewRulerOptions){for(let t of this._zones)if(t.color===e.options.overviewRulerOptions.color&&t.position===e.options.overviewRulerOptions.position){if(this._lineIntersectsZone(t,e.marker.line))return;if(this._lineAdjacentToZone(t,e.marker.line,e.options.overviewRulerOptions.position))return void this._addLineToZone(t,e.marker.line)}if(this._zonePoolIndex<this._zonePool.length)return this._zonePool[this._zonePoolIndex].color=e.options.overviewRulerOptions.color,this._zonePool[this._zonePoolIndex].position=e.options.overviewRulerOptions.position,this._zonePool[this._zonePoolIndex].startBufferLine=e.marker.line,this._zonePool[this._zonePoolIndex].endBufferLine=e.marker.line,void this._zones.push(this._zonePool[this._zonePoolIndex++]);this._zones.push({color:e.options.overviewRulerOptions.color,position:e.options.overviewRulerOptions.position,startBufferLine:e.marker.line,endBufferLine:e.marker.line}),this._zonePool.push(this._zones[this._zones.length-1]),this._zonePoolIndex++}}setPadding(e){this._linePadding=e}_lineIntersectsZone(e,t){return t>=e.startBufferLine&&t<=e.endBufferLine}_lineAdjacentToZone(e,t,n){return t>=e.startBufferLine-this._linePadding[n||`full`]&&t<=e.endBufferLine+this._linePadding[n||`full`]}_addLineToZone(e,t){e.startBufferLine=Math.min(e.startBufferLine,t),e.endBufferLine=Math.max(e.endBufferLine,t)}}},5744:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.OverviewRulerRenderer=void 0;let a=n(5871),o=n(4725),s=n(844),c=n(2585),l={full:0,left:0,center:0,right:0},u={full:0,left:0,center:0,right:0},d={full:0,left:0,center:0,right:0},f=t.OverviewRulerRenderer=class extends s.Disposable{get _width(){return this._optionsService.options.overviewRulerWidth||0}constructor(e,t,n,r,i,o,c){super(),this._viewportElement=e,this._screenElement=t,this._bufferService=n,this._decorationService=r,this._renderService=i,this._optionsService=o,this._coreBrowserService=c,this._colorZoneStore=new a.ColorZoneStore,this._shouldUpdateDimensions=!0,this._shouldUpdateAnchor=!0,this._lastKnownBufferLength=0,this._canvas=this._coreBrowserService.mainDocument.createElement(`canvas`),this._canvas.classList.add(`xterm-decoration-overview-ruler`),this._refreshCanvasDimensions(),this._viewportElement.parentElement?.insertBefore(this._canvas,this._viewportElement);let l=this._canvas.getContext(`2d`);if(!l)throw Error(`Ctx cannot be null`);this._ctx=l,this._registerDecorationListeners(),this._registerBufferChangeListeners(),this._registerDimensionChangeListeners(),this.register((0,s.toDisposable)((()=>{this._canvas?.remove()})))}_registerDecorationListeners(){this.register(this._decorationService.onDecorationRegistered((()=>this._queueRefresh(void 0,!0)))),this.register(this._decorationService.onDecorationRemoved((()=>this._queueRefresh(void 0,!0))))}_registerBufferChangeListeners(){this.register(this._renderService.onRenderedViewportChange((()=>this._queueRefresh()))),this.register(this._bufferService.buffers.onBufferActivate((()=>{this._canvas.style.display=this._bufferService.buffer===this._bufferService.buffers.alt?`none`:`block`}))),this.register(this._bufferService.onScroll((()=>{this._lastKnownBufferLength!==this._bufferService.buffers.normal.lines.length&&(this._refreshDrawHeightConstants(),this._refreshColorZonePadding())})))}_registerDimensionChangeListeners(){this.register(this._renderService.onRender((()=>{this._containerHeight&&this._containerHeight===this._screenElement.clientHeight||(this._queueRefresh(!0),this._containerHeight=this._screenElement.clientHeight)}))),this.register(this._optionsService.onSpecificOptionChange(`overviewRulerWidth`,(()=>this._queueRefresh(!0)))),this.register(this._coreBrowserService.onDprChange((()=>this._queueRefresh(!0)))),this._queueRefresh(!0)}_refreshDrawConstants(){let e=Math.floor(this._canvas.width/3),t=Math.ceil(this._canvas.width/3);u.full=this._canvas.width,u.left=e,u.center=t,u.right=e,this._refreshDrawHeightConstants(),d.full=0,d.left=0,d.center=u.left,d.right=u.left+u.center}_refreshDrawHeightConstants(){l.full=Math.round(2*this._coreBrowserService.dpr);let e=this._canvas.height/this._bufferService.buffer.lines.length,t=Math.round(Math.max(Math.min(e,12),6)*this._coreBrowserService.dpr);l.left=t,l.center=t,l.right=t}_refreshColorZonePadding(){this._colorZoneStore.setPadding({full:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.full),left:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.left),center:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.center),right:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*l.right)}),this._lastKnownBufferLength=this._bufferService.buffers.normal.lines.length}_refreshCanvasDimensions(){this._canvas.style.width=`${this._width}px`,this._canvas.width=Math.round(this._width*this._coreBrowserService.dpr),this._canvas.style.height=`${this._screenElement.clientHeight}px`,this._canvas.height=Math.round(this._screenElement.clientHeight*this._coreBrowserService.dpr),this._refreshDrawConstants(),this._refreshColorZonePadding()}_refreshDecorations(){this._shouldUpdateDimensions&&this._refreshCanvasDimensions(),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._colorZoneStore.clear();for(let e of this._decorationService.decorations)this._colorZoneStore.addDecoration(e);this._ctx.lineWidth=1;let e=this._colorZoneStore.zones;for(let t of e)t.position!==`full`&&this._renderColorZone(t);for(let t of e)t.position===`full`&&this._renderColorZone(t);this._shouldUpdateDimensions=!1,this._shouldUpdateAnchor=!1}_renderColorZone(e){this._ctx.fillStyle=e.color,this._ctx.fillRect(d[e.position||`full`],Math.round((this._canvas.height-1)*(e.startBufferLine/this._bufferService.buffers.active.lines.length)-l[e.position||`full`]/2),u[e.position||`full`],Math.round((this._canvas.height-1)*((e.endBufferLine-e.startBufferLine)/this._bufferService.buffers.active.lines.length)+l[e.position||`full`]))}_queueRefresh(e,t){this._shouldUpdateDimensions=e||this._shouldUpdateDimensions,this._shouldUpdateAnchor=t||this._shouldUpdateAnchor,this._animationFrame===void 0&&(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>{this._refreshDecorations(),this._animationFrame=void 0})))}};t.OverviewRulerRenderer=f=r([i(2,c.IBufferService),i(3,c.IDecorationService),i(4,o.IRenderService),i(5,c.IOptionsService),i(6,o.ICoreBrowserService)],f)},2950:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.CompositionHelper=void 0;let a=n(4725),o=n(2585),s=n(2584),c=t.CompositionHelper=class{get isComposing(){return this._isComposing}constructor(e,t,n,r,i,a){this._textarea=e,this._compositionView=t,this._bufferService=n,this._optionsService=r,this._coreService=i,this._renderService=a,this._isComposing=!1,this._isSendingComposition=!1,this._compositionPosition={start:0,end:0},this._dataAlreadySent=``}compositionstart(){this._isComposing=!0,this._compositionPosition.start=this._textarea.value.length,this._compositionView.textContent=``,this._dataAlreadySent=``,this._compositionView.classList.add(`active`)}compositionupdate(e){this._compositionView.textContent=e.data,this.updateCompositionElements(),setTimeout((()=>{this._compositionPosition.end=this._textarea.value.length}),0)}compositionend(){this._finalizeComposition(!0)}keydown(e){if(this._isComposing||this._isSendingComposition){if(e.keyCode===229||e.keyCode===16||e.keyCode===17||e.keyCode===18)return!1;this._finalizeComposition(!1)}return e.keyCode!==229||(this._handleAnyTextareaChanges(),!1)}_finalizeComposition(e){if(this._compositionView.classList.remove(`active`),this._isComposing=!1,e){let e={start:this._compositionPosition.start,end:this._compositionPosition.end};this._isSendingComposition=!0,setTimeout((()=>{if(this._isSendingComposition){let t;this._isSendingComposition=!1,e.start+=this._dataAlreadySent.length,t=this._isComposing?this._textarea.value.substring(e.start,e.end):this._textarea.value.substring(e.start),t.length>0&&this._coreService.triggerDataEvent(t,!0)}}),0)}else{this._isSendingComposition=!1;let e=this._textarea.value.substring(this._compositionPosition.start,this._compositionPosition.end);this._coreService.triggerDataEvent(e,!0)}}_handleAnyTextareaChanges(){let e=this._textarea.value;setTimeout((()=>{if(!this._isComposing){let t=this._textarea.value,n=t.replace(e,``);this._dataAlreadySent=n,t.length>e.length?this._coreService.triggerDataEvent(n,!0):t.length<e.length?this._coreService.triggerDataEvent(`${s.C0.DEL}`,!0):t.length===e.length&&t!==e&&this._coreService.triggerDataEvent(t,!0)}}),0)}updateCompositionElements(e){if(this._isComposing){if(this._bufferService.buffer.isCursorInViewport){let e=Math.min(this._bufferService.buffer.x,this._bufferService.cols-1),t=this._renderService.dimensions.css.cell.height,n=this._bufferService.buffer.y*this._renderService.dimensions.css.cell.height,r=e*this._renderService.dimensions.css.cell.width;this._compositionView.style.left=r+`px`,this._compositionView.style.top=n+`px`,this._compositionView.style.height=t+`px`,this._compositionView.style.lineHeight=t+`px`,this._compositionView.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._compositionView.style.fontSize=this._optionsService.rawOptions.fontSize+`px`;let i=this._compositionView.getBoundingClientRect();this._textarea.style.left=r+`px`,this._textarea.style.top=n+`px`,this._textarea.style.width=Math.max(i.width,1)+`px`,this._textarea.style.height=Math.max(i.height,1)+`px`,this._textarea.style.lineHeight=i.height+`px`}e||setTimeout((()=>this.updateCompositionElements(!0)),0)}}};t.CompositionHelper=c=r([i(2,o.IBufferService),i(3,o.IOptionsService),i(4,o.ICoreService),i(5,a.IRenderService)],c)},9806:(e,t)=>{function n(e,t,n){let r=n.getBoundingClientRect(),i=e.getComputedStyle(n),a=parseInt(i.getPropertyValue(`padding-left`)),o=parseInt(i.getPropertyValue(`padding-top`));return[t.clientX-r.left-a,t.clientY-r.top-o]}Object.defineProperty(t,"__esModule",{value:!0}),t.getCoords=t.getCoordsRelativeToElement=void 0,t.getCoordsRelativeToElement=n,t.getCoords=function(e,t,r,i,a,o,s,c,l){if(!o)return;let u=n(e,t,r);return u?(u[0]=Math.ceil((u[0]+(l?s/2:0))/s),u[1]=Math.ceil(u[1]/c),u[0]=Math.min(Math.max(u[0],1),i+ +!!l),u[1]=Math.min(Math.max(u[1],1),a),u):void 0}},9504:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.moveToCellSequence=void 0;let r=n(2584);function i(e,t,n,r){let i=e-a(e,n),s=t-a(t,n);return l(Math.abs(i-s)-function(e,t,n){let r=0,i=e-a(e,n),s=t-a(t,n);for(let a=0;a<Math.abs(i-s);a++){let s=o(e,t)===`A`?-1:1;n.buffer.lines.get(i+s*a)?.isWrapped&&r++}return r}(e,t,n),c(o(e,t),r))}function a(e,t){let n=0,r=t.buffer.lines.get(e),i=r?.isWrapped;for(;i&&e>=0&&e<t.rows;)n++,r=t.buffer.lines.get(--e),i=r?.isWrapped;return n}function o(e,t){return e>t?`A`:`B`}function s(e,t,n,r,i,a){let o=e,s=t,c=``;for(;o!==n||s!==r;)o+=i?1:-1,i&&o>a.cols-1?(c+=a.buffer.translateBufferLineToString(s,!1,e,o),o=0,e=0,s++):!i&&o<0&&(c+=a.buffer.translateBufferLineToString(s,!1,0,e+1),o=a.cols-1,e=o,s--);return c+a.buffer.translateBufferLineToString(s,!1,e,o)}function c(e,t){let n=t?`O`:`[`;return r.C0.ESC+n+e}function l(e,t){e=Math.floor(e);let n=``;for(let r=0;r<e;r++)n+=t;return n}t.moveToCellSequence=function(e,t,n,r){let o=n.buffer.x,u=n.buffer.y;if(!n.buffer.hasScrollback)return function(e,t,n,r,o,u){return i(t,r,o,u).length===0?``:l(s(e,t,e,t-a(t,o),!1,o).length,c(`D`,u))}(o,u,0,t,n,r)+i(u,t,n,r)+function(e,t,n,r,o,u){let d;d=i(t,r,o,u).length>0?r-a(r,o):t;let f=r,p=function(e,t,n,r,o,s){let c;return c=i(n,r,o,s).length>0?r-a(r,o):t,e<n&&c<=r||e>=n&&c<r?`C`:`D`}(e,t,n,r,o,u);return l(s(e,d,n,f,p===`C`,o).length,c(p,u))}(o,u,e,t,n,r);let d;if(u===t)return d=o>e?`D`:`C`,l(Math.abs(o-e),c(d,r));d=u>t?`D`:`C`;let f=Math.abs(u-t);return l(function(e,t){return t.cols-e}(u>t?e:o,n)+(f-1)*n.cols+1+((u>t?o:e)-1),c(d,r))}},1296:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.DomRenderer=void 0;let a=n(3787),o=n(2550),s=n(2223),c=n(6171),l=n(6052),u=n(4725),d=n(8055),f=n(8460),p=n(844),m=n(2585),h=`xterm-dom-renderer-owner-`,g=`xterm-rows`,_=`xterm-fg-`,v=`xterm-bg-`,y=`xterm-focus`,b=`xterm-selection`,x=1,S=t.DomRenderer=class extends p.Disposable{constructor(e,t,n,r,i,s,u,d,m,_,v,y,S){super(),this._terminal=e,this._document=t,this._element=n,this._screenElement=r,this._viewportElement=i,this._helperContainer=s,this._linkifier2=u,this._charSizeService=m,this._optionsService=_,this._bufferService=v,this._coreBrowserService=y,this._themeService=S,this._terminalClass=x++,this._rowElements=[],this._selectionRenderModel=(0,l.createSelectionRenderModel)(),this.onRequestRedraw=this.register(new f.EventEmitter).event,this._rowContainer=this._document.createElement(`div`),this._rowContainer.classList.add(g),this._rowContainer.style.lineHeight=`normal`,this._rowContainer.setAttribute(`aria-hidden`,`true`),this._refreshRowElements(this._bufferService.cols,this._bufferService.rows),this._selectionContainer=this._document.createElement(`div`),this._selectionContainer.classList.add(b),this._selectionContainer.setAttribute(`aria-hidden`,`true`),this.dimensions=(0,c.createRenderDimensions)(),this._updateDimensions(),this.register(this._optionsService.onOptionChange((()=>this._handleOptionsChanged()))),this.register(this._themeService.onChangeColors((e=>this._injectCss(e)))),this._injectCss(this._themeService.colors),this._rowFactory=d.createInstance(a.DomRendererRowFactory,document),this._element.classList.add(h+this._terminalClass),this._screenElement.appendChild(this._rowContainer),this._screenElement.appendChild(this._selectionContainer),this.register(this._linkifier2.onShowLinkUnderline((e=>this._handleLinkHover(e)))),this.register(this._linkifier2.onHideLinkUnderline((e=>this._handleLinkLeave(e)))),this.register((0,p.toDisposable)((()=>{this._element.classList.remove(h+this._terminalClass),this._rowContainer.remove(),this._selectionContainer.remove(),this._widthCache.dispose(),this._themeStyleElement.remove(),this._dimensionsStyleElement.remove()}))),this._widthCache=new o.WidthCache(this._document,this._helperContainer),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}_updateDimensions(){let e=this._coreBrowserService.dpr;this.dimensions.device.char.width=this._charSizeService.width*e,this.dimensions.device.char.height=Math.ceil(this._charSizeService.height*e),this.dimensions.device.cell.width=this.dimensions.device.char.width+Math.round(this._optionsService.rawOptions.letterSpacing),this.dimensions.device.cell.height=Math.floor(this.dimensions.device.char.height*this._optionsService.rawOptions.lineHeight),this.dimensions.device.char.left=0,this.dimensions.device.char.top=0,this.dimensions.device.canvas.width=this.dimensions.device.cell.width*this._bufferService.cols,this.dimensions.device.canvas.height=this.dimensions.device.cell.height*this._bufferService.rows,this.dimensions.css.canvas.width=Math.round(this.dimensions.device.canvas.width/e),this.dimensions.css.canvas.height=Math.round(this.dimensions.device.canvas.height/e),this.dimensions.css.cell.width=this.dimensions.css.canvas.width/this._bufferService.cols,this.dimensions.css.cell.height=this.dimensions.css.canvas.height/this._bufferService.rows;for(let e of this._rowElements)e.style.width=`${this.dimensions.css.canvas.width}px`,e.style.height=`${this.dimensions.css.cell.height}px`,e.style.lineHeight=`${this.dimensions.css.cell.height}px`,e.style.overflow=`hidden`;this._dimensionsStyleElement||(this._dimensionsStyleElement=this._document.createElement(`style`),this._screenElement.appendChild(this._dimensionsStyleElement));let t=`${this._terminalSelector} .${g} span { display: inline-block; height: 100%; vertical-align: top;}`;this._dimensionsStyleElement.textContent=t,this._selectionContainer.style.height=this._viewportElement.style.height,this._screenElement.style.width=`${this.dimensions.css.canvas.width}px`,this._screenElement.style.height=`${this.dimensions.css.canvas.height}px`}_injectCss(e){this._themeStyleElement||(this._themeStyleElement=this._document.createElement(`style`),this._screenElement.appendChild(this._themeStyleElement));let t=`${this._terminalSelector} .${g} { color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;t+=`${this._terminalSelector} .${g} .xterm-dim { color: ${d.color.multiplyOpacity(e.foreground,.5).css};}`,t+=`${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;let n=`blink_underline_${this._terminalClass}`,r=`blink_bar_${this._terminalClass}`,i=`blink_block_${this._terminalClass}`;t+=`@keyframes ${n} { 50% {  border-bottom-style: hidden; }}`,t+=`@keyframes ${r} { 50% {  box-shadow: none; }}`,t+=`@keyframes ${i} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`,t+=`${this._terminalSelector} .${g}.${y} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${n} 1s step-end infinite;}${this._terminalSelector} .${g}.${y} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${g}.${y} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${i} 1s step-end infinite;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`,t+=`${this._terminalSelector} .${b} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${b} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${b} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;for(let[n,r]of e.ansi.entries())t+=`${this._terminalSelector} .${_}${n} { color: ${r.css}; }${this._terminalSelector} .${_}${n}.xterm-dim { color: ${d.color.multiplyOpacity(r,.5).css}; }${this._terminalSelector} .${v}${n} { background-color: ${r.css}; }`;t+=`${this._terminalSelector} .${_}${s.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(e.background).css}; }${this._terminalSelector} .${_}${s.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(e.background),.5).css}; }${this._terminalSelector} .${v}${s.INVERTED_DEFAULT_COLOR} { background-color: ${e.foreground.css}; }`,this._themeStyleElement.textContent=t}_setDefaultSpacing(){let e=this.dimensions.css.cell.width-this._widthCache.get(`W`,!1,!1);this._rowContainer.style.letterSpacing=`${e}px`,this._rowFactory.defaultSpacing=e}handleDevicePixelRatioChange(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}_refreshRowElements(e,t){for(let e=this._rowElements.length;e<=t;e++){let e=this._document.createElement(`div`);this._rowContainer.appendChild(e),this._rowElements.push(e)}for(;this._rowElements.length>t;)this._rowContainer.removeChild(this._rowElements.pop())}handleResize(e,t){this._refreshRowElements(e,t),this._updateDimensions(),this.handleSelectionChanged(this._selectionRenderModel.selectionStart,this._selectionRenderModel.selectionEnd,this._selectionRenderModel.columnSelectMode)}handleCharSizeChanged(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}handleBlur(){this._rowContainer.classList.remove(y),this.renderRows(0,this._bufferService.rows-1)}handleFocus(){this._rowContainer.classList.add(y),this.renderRows(this._bufferService.buffer.y,this._bufferService.buffer.y)}handleSelectionChanged(e,t,n){if(this._selectionContainer.replaceChildren(),this._rowFactory.handleSelectionChanged(e,t,n),this.renderRows(0,this._bufferService.rows-1),!e||!t)return;this._selectionRenderModel.update(this._terminal,e,t,n);let r=this._selectionRenderModel.viewportStartRow,i=this._selectionRenderModel.viewportEndRow,a=this._selectionRenderModel.viewportCappedStartRow,o=this._selectionRenderModel.viewportCappedEndRow;if(a>=this._bufferService.rows||o<0)return;let s=this._document.createDocumentFragment();if(n){let n=e[0]>t[0];s.appendChild(this._createSelectionElement(a,n?t[0]:e[0],n?e[0]:t[0],o-a+1))}else{let n=r===a?e[0]:0,c=a===i?t[0]:this._bufferService.cols;s.appendChild(this._createSelectionElement(a,n,c));let l=o-a-1;if(s.appendChild(this._createSelectionElement(a+1,0,this._bufferService.cols,l)),a!==o){let e=i===o?t[0]:this._bufferService.cols;s.appendChild(this._createSelectionElement(o,0,e))}}this._selectionContainer.appendChild(s)}_createSelectionElement(e,t,n,r=1){let i=this._document.createElement(`div`),a=t*this.dimensions.css.cell.width,o=this.dimensions.css.cell.width*(n-t);return a+o>this.dimensions.css.canvas.width&&(o=this.dimensions.css.canvas.width-a),i.style.height=r*this.dimensions.css.cell.height+`px`,i.style.top=e*this.dimensions.css.cell.height+`px`,i.style.left=`${a}px`,i.style.width=`${o}px`,i}handleCursorMove(){}_handleOptionsChanged(){this._updateDimensions(),this._injectCss(this._themeService.colors),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}clear(){for(let e of this._rowElements)e.replaceChildren()}renderRows(e,t){let n=this._bufferService.buffer,r=n.ybase+n.y,i=Math.min(n.x,this._bufferService.cols-1),a=this._optionsService.rawOptions.cursorBlink,o=this._optionsService.rawOptions.cursorStyle,s=this._optionsService.rawOptions.cursorInactiveStyle;for(let c=e;c<=t;c++){let e=c+n.ydisp,t=this._rowElements[c],l=n.lines.get(e);if(!t||!l)break;t.replaceChildren(...this._rowFactory.createRow(l,e,e===r,o,s,i,a,this.dimensions.css.cell.width,this._widthCache,-1,-1))}}get _terminalSelector(){return`.${h}${this._terminalClass}`}_handleLinkHover(e){this._setCellUnderline(e.x1,e.x2,e.y1,e.y2,e.cols,!0)}_handleLinkLeave(e){this._setCellUnderline(e.x1,e.x2,e.y1,e.y2,e.cols,!1)}_setCellUnderline(e,t,n,r,i,a){n<0&&(e=0),r<0&&(t=0);let o=this._bufferService.rows-1;n=Math.max(Math.min(n,o),0),r=Math.max(Math.min(r,o),0),i=Math.min(i,this._bufferService.cols);let s=this._bufferService.buffer,c=s.ybase+s.y,l=Math.min(s.x,i-1),u=this._optionsService.rawOptions.cursorBlink,d=this._optionsService.rawOptions.cursorStyle,f=this._optionsService.rawOptions.cursorInactiveStyle;for(let o=n;o<=r;++o){let p=o+s.ydisp,m=this._rowElements[o],h=s.lines.get(p);if(!m||!h)break;m.replaceChildren(...this._rowFactory.createRow(h,p,p===c,d,f,l,u,this.dimensions.css.cell.width,this._widthCache,a?o===n?e:0:-1,a?(o===r?t:i)-1:-1))}}};t.DomRenderer=S=r([i(7,m.IInstantiationService),i(8,u.ICharSizeService),i(9,m.IOptionsService),i(10,m.IBufferService),i(11,u.ICoreBrowserService),i(12,u.IThemeService)],S)},3787:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.DomRendererRowFactory=void 0;let a=n(2223),o=n(643),s=n(511),c=n(2585),l=n(8055),u=n(4725),d=n(4269),f=n(6171),p=n(3734),m=t.DomRendererRowFactory=class{constructor(e,t,n,r,i,a,o){this._document=e,this._characterJoinerService=t,this._optionsService=n,this._coreBrowserService=r,this._coreService=i,this._decorationService=a,this._themeService=o,this._workCell=new s.CellData,this._columnSelectMode=!1,this.defaultSpacing=0}handleSelectionChanged(e,t,n){this._selectionStart=e,this._selectionEnd=t,this._columnSelectMode=n}createRow(e,t,n,r,i,s,c,u,f,m,g){let _=[],v=this._characterJoinerService.getJoinedCharacters(t),y=this._themeService.colors,b,x=e.getNoBgTrimmedLength();n&&x<s+1&&(x=s+1);let S=0,C=``,w=0,T=0,E=0,D=!1,O=0,k=!1,A=0,j=[],M=m!==-1&&g!==-1;for(let N=0;N<x;N++){e.loadCell(N,this._workCell);let x=this._workCell.getWidth();if(x===0)continue;let P=!1,F=N,I=this._workCell;if(v.length>0&&N===v[0][0]){P=!0;let t=v.shift();I=new d.JoinedCellData(this._workCell,e.translateToString(!0,t[0],t[1]),t[1]-t[0]),F=t[1]-1,x=I.getWidth()}let L=this._isCellInSelection(N,t),R=n&&N===s,z=M&&N>=m&&N<=g,B=!1;this._decorationService.forEachDecorationAtCell(N,t,void 0,(e=>{B=!0}));let V=I.getChars()||o.WHITESPACE_CELL_CHAR;if(V===` `&&(I.isUnderline()||I.isOverline())&&(V=`\xA0`),A=x*u-f.get(V,I.isBold(),I.isItalic()),b){if(S&&(L&&k||!L&&!k&&I.bg===w)&&(L&&k&&y.selectionForeground||I.fg===T)&&I.extended.ext===E&&z===D&&A===O&&!R&&!P&&!B){I.isInvisible()?C+=o.WHITESPACE_CELL_CHAR:C+=V,S++;continue}S&&(b.textContent=C),b=this._document.createElement(`span`),S=0,C=``}else b=this._document.createElement(`span`);if(w=I.bg,T=I.fg,E=I.extended.ext,D=z,O=A,k=L,P&&s>=N&&s<=F&&(s=N),!this._coreService.isCursorHidden&&R&&this._coreService.isCursorInitialized){if(j.push(`xterm-cursor`),this._coreBrowserService.isFocused)c&&j.push(`xterm-cursor-blink`),j.push(r===`bar`?`xterm-cursor-bar`:r===`underline`?`xterm-cursor-underline`:`xterm-cursor-block`);else if(i)switch(i){case`outline`:j.push(`xterm-cursor-outline`);break;case`block`:j.push(`xterm-cursor-block`);break;case`bar`:j.push(`xterm-cursor-bar`);break;case`underline`:j.push(`xterm-cursor-underline`)}}if(I.isBold()&&j.push(`xterm-bold`),I.isItalic()&&j.push(`xterm-italic`),I.isDim()&&j.push(`xterm-dim`),C=I.isInvisible()?o.WHITESPACE_CELL_CHAR:I.getChars()||o.WHITESPACE_CELL_CHAR,I.isUnderline()&&(j.push(`xterm-underline-${I.extended.underlineStyle}`),C===` `&&(C=`\xA0`),!I.isUnderlineColorDefault()))if(I.isUnderlineColorRGB())b.style.textDecorationColor=`rgb(${p.AttributeData.toColorRGB(I.getUnderlineColor()).join(`,`)})`;else{let e=I.getUnderlineColor();this._optionsService.rawOptions.drawBoldTextInBrightColors&&I.isBold()&&e<8&&(e+=8),b.style.textDecorationColor=y.ansi[e].css}I.isOverline()&&(j.push(`xterm-overline`),C===` `&&(C=`\xA0`)),I.isStrikethrough()&&j.push(`xterm-strikethrough`),z&&(b.style.textDecoration=`underline`);let H=I.getFgColor(),U=I.getFgColorMode(),W=I.getBgColor(),G=I.getBgColorMode(),K=!!I.isInverse();if(K){let e=H;H=W,W=e;let t=U;U=G,G=t}let q,J,Y,X=!1;switch(this._decorationService.forEachDecorationAtCell(N,t,void 0,(e=>{e.options.layer!==`top`&&X||(e.backgroundColorRGB&&(G=50331648,W=e.backgroundColorRGB.rgba>>8&16777215,q=e.backgroundColorRGB),e.foregroundColorRGB&&(U=50331648,H=e.foregroundColorRGB.rgba>>8&16777215,J=e.foregroundColorRGB),X=e.options.layer===`top`)})),!X&&L&&(q=this._coreBrowserService.isFocused?y.selectionBackgroundOpaque:y.selectionInactiveBackgroundOpaque,W=q.rgba>>8&16777215,G=50331648,X=!0,y.selectionForeground&&(U=50331648,H=y.selectionForeground.rgba>>8&16777215,J=y.selectionForeground)),X&&j.push(`xterm-decoration-top`),G){case 16777216:case 33554432:Y=y.ansi[W],j.push(`xterm-bg-${W}`);break;case 50331648:Y=l.channels.toColor(W>>16,W>>8&255,255&W),this._addStyle(b,`background-color:#${h((W>>>0).toString(16),`0`,6)}`);break;default:K?(Y=y.foreground,j.push(`xterm-bg-${a.INVERTED_DEFAULT_COLOR}`)):Y=y.background}switch(q||I.isDim()&&(q=l.color.multiplyOpacity(Y,.5)),U){case 16777216:case 33554432:I.isBold()&&H<8&&this._optionsService.rawOptions.drawBoldTextInBrightColors&&(H+=8),this._applyMinimumContrast(b,Y,y.ansi[H],I,q,void 0)||j.push(`xterm-fg-${H}`);break;case 50331648:let e=l.channels.toColor(H>>16&255,H>>8&255,255&H);this._applyMinimumContrast(b,Y,e,I,q,J)||this._addStyle(b,`color:#${h(H.toString(16),`0`,6)}`);break;default:this._applyMinimumContrast(b,Y,y.foreground,I,q,J)||K&&j.push(`xterm-fg-${a.INVERTED_DEFAULT_COLOR}`)}j.length&&=(b.className=j.join(` `),0),R||P||B?b.textContent=C:S++,A!==this.defaultSpacing&&(b.style.letterSpacing=`${A}px`),_.push(b),N=F}return b&&S&&(b.textContent=C),_}_applyMinimumContrast(e,t,n,r,i,a){if(this._optionsService.rawOptions.minimumContrastRatio===1||(0,f.treatGlyphAsBackgroundColor)(r.getCode()))return!1;let o=this._getContrastCache(r),s;if(i||a||(s=o.getColor(t.rgba,n.rgba)),s===void 0){let e=this._optionsService.rawOptions.minimumContrastRatio/(r.isDim()?2:1);s=l.color.ensureContrastRatio(i||t,a||n,e),o.setColor((i||t).rgba,(a||n).rgba,s??null)}return!!s&&(this._addStyle(e,`color:${s.css}`),!0)}_getContrastCache(e){return e.isDim()?this._themeService.colors.halfContrastCache:this._themeService.colors.contrastCache}_addStyle(e,t){e.setAttribute(`style`,`${e.getAttribute(`style`)||``}${t};`)}_isCellInSelection(e,t){let n=this._selectionStart,r=this._selectionEnd;return!(!n||!r)&&(this._columnSelectMode?n[0]<=r[0]?e>=n[0]&&t>=n[1]&&e<r[0]&&t<=r[1]:e<n[0]&&t>=n[1]&&e>=r[0]&&t<=r[1]:t>n[1]&&t<r[1]||n[1]===r[1]&&t===n[1]&&e>=n[0]&&e<r[0]||n[1]<r[1]&&t===r[1]&&e<r[0]||n[1]<r[1]&&t===n[1]&&e>=n[0])}};function h(e,t,n){for(;e.length<n;)e=t+e;return e}t.DomRendererRowFactory=m=r([i(1,u.ICharacterJoinerService),i(2,c.IOptionsService),i(3,u.ICoreBrowserService),i(4,c.ICoreService),i(5,c.IDecorationService),i(6,u.IThemeService)],m)},2550:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WidthCache=void 0,t.WidthCache=class{constructor(e,t){this._flat=new Float32Array(256),this._font=``,this._fontSize=0,this._weight=`normal`,this._weightBold=`bold`,this._measureElements=[],this._container=e.createElement(`div`),this._container.classList.add(`xterm-width-cache-measure-container`),this._container.setAttribute(`aria-hidden`,`true`),this._container.style.whiteSpace=`pre`,this._container.style.fontKerning=`none`;let n=e.createElement(`span`);n.classList.add(`xterm-char-measure-element`);let r=e.createElement(`span`);r.classList.add(`xterm-char-measure-element`),r.style.fontWeight=`bold`;let i=e.createElement(`span`);i.classList.add(`xterm-char-measure-element`),i.style.fontStyle=`italic`;let a=e.createElement(`span`);a.classList.add(`xterm-char-measure-element`),a.style.fontWeight=`bold`,a.style.fontStyle=`italic`,this._measureElements=[n,r,i,a],this._container.appendChild(n),this._container.appendChild(r),this._container.appendChild(i),this._container.appendChild(a),t.appendChild(this._container),this.clear()}dispose(){this._container.remove(),this._measureElements.length=0,this._holey=void 0}clear(){this._flat.fill(-9999),this._holey=new Map}setFont(e,t,n,r){e===this._font&&t===this._fontSize&&n===this._weight&&r===this._weightBold||(this._font=e,this._fontSize=t,this._weight=n,this._weightBold=r,this._container.style.fontFamily=this._font,this._container.style.fontSize=`${this._fontSize}px`,this._measureElements[0].style.fontWeight=`${n}`,this._measureElements[1].style.fontWeight=`${r}`,this._measureElements[2].style.fontWeight=`${n}`,this._measureElements[3].style.fontWeight=`${r}`,this.clear())}get(e,t,n){let r=0;if(!t&&!n&&e.length===1&&(r=e.charCodeAt(0))<256){if(this._flat[r]!==-9999)return this._flat[r];let t=this._measure(e,0);return t>0&&(this._flat[r]=t),t}let i=e;t&&(i+=`B`),n&&(i+=`I`);let a=this._holey.get(i);if(a===void 0){let r=0;t&&(r|=1),n&&(r|=2),a=this._measure(e,r),a>0&&this._holey.set(i,a)}return a}_measure(e,t){let n=this._measureElements[t];return n.textContent=e.repeat(32),n.offsetWidth/32}}},2223:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TEXT_BASELINE=t.DIM_OPACITY=t.INVERTED_DEFAULT_COLOR=void 0;let r=n(6114);t.INVERTED_DEFAULT_COLOR=257,t.DIM_OPACITY=.5,t.TEXT_BASELINE=r.isFirefox||r.isLegacyEdge?`bottom`:`ideographic`},6171:(e,t)=>{function n(e){return 57508<=e&&e<=57558}function r(e){return e>=128512&&e<=128591||e>=127744&&e<=128511||e>=128640&&e<=128767||e>=9728&&e<=9983||e>=9984&&e<=10175||e>=65024&&e<=65039||e>=129280&&e<=129535||e>=127462&&e<=127487}Object.defineProperty(t,"__esModule",{value:!0}),t.computeNextVariantOffset=t.createRenderDimensions=t.treatGlyphAsBackgroundColor=t.allowRescaling=t.isEmoji=t.isRestrictedPowerlineGlyph=t.isPowerlineGlyph=t.throwIfFalsy=void 0,t.throwIfFalsy=function(e){if(!e)throw Error(`value must not be falsy`);return e},t.isPowerlineGlyph=n,t.isRestrictedPowerlineGlyph=function(e){return 57520<=e&&e<=57527},t.isEmoji=r,t.allowRescaling=function(e,t,i,a){return t===1&&i>Math.ceil(1.5*a)&&e!==void 0&&e>255&&!r(e)&&!n(e)&&!function(e){return 57344<=e&&e<=63743}(e)},t.treatGlyphAsBackgroundColor=function(e){return n(e)||function(e){return 9472<=e&&e<=9631}(e)},t.createRenderDimensions=function(){return{css:{canvas:{width:0,height:0},cell:{width:0,height:0}},device:{canvas:{width:0,height:0},cell:{width:0,height:0},char:{width:0,height:0,left:0,top:0}}}},t.computeNextVariantOffset=function(e,t,n=0){return(e-(2*Math.round(t)-n))%(2*Math.round(t))}},6052:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createSelectionRenderModel=void 0;class n{constructor(){this.clear()}clear(){this.hasSelection=!1,this.columnSelectMode=!1,this.viewportStartRow=0,this.viewportEndRow=0,this.viewportCappedStartRow=0,this.viewportCappedEndRow=0,this.startCol=0,this.endCol=0,this.selectionStart=void 0,this.selectionEnd=void 0}update(e,t,n,r=!1){if(this.selectionStart=t,this.selectionEnd=n,!t||!n||t[0]===n[0]&&t[1]===n[1])return void this.clear();let i=e.buffers.active.ydisp,a=t[1]-i,o=n[1]-i,s=Math.max(a,0),c=Math.min(o,e.rows-1);s>=e.rows||c<0?this.clear():(this.hasSelection=!0,this.columnSelectMode=r,this.viewportStartRow=a,this.viewportEndRow=o,this.viewportCappedStartRow=s,this.viewportCappedEndRow=c,this.startCol=t[0],this.endCol=n[0])}isCellSelected(e,t,n){return!!this.hasSelection&&(n-=e.buffer.active.viewportY,this.columnSelectMode?this.startCol<=this.endCol?t>=this.startCol&&n>=this.viewportCappedStartRow&&t<this.endCol&&n<=this.viewportCappedEndRow:t<this.startCol&&n>=this.viewportCappedStartRow&&t>=this.endCol&&n<=this.viewportCappedEndRow:n>this.viewportStartRow&&n<this.viewportEndRow||this.viewportStartRow===this.viewportEndRow&&n===this.viewportStartRow&&t>=this.startCol&&t<this.endCol||this.viewportStartRow<this.viewportEndRow&&n===this.viewportEndRow&&t<this.endCol||this.viewportStartRow<this.viewportEndRow&&n===this.viewportStartRow&&t>=this.startCol)}}t.createSelectionRenderModel=function(){return new n}},456:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SelectionModel=void 0,t.SelectionModel=class{constructor(e){this._bufferService=e,this.isSelectAllActive=!1,this.selectionStartLength=0}clearSelection(){this.selectionStart=void 0,this.selectionEnd=void 0,this.isSelectAllActive=!1,this.selectionStartLength=0}get finalSelectionStart(){return this.isSelectAllActive?[0,0]:this.selectionEnd&&this.selectionStart&&this.areSelectionValuesReversed()?this.selectionEnd:this.selectionStart}get finalSelectionEnd(){if(this.isSelectAllActive)return[this._bufferService.cols,this._bufferService.buffer.ybase+this._bufferService.rows-1];if(this.selectionStart){if(!this.selectionEnd||this.areSelectionValuesReversed()){let e=this.selectionStart[0]+this.selectionStartLength;return e>this._bufferService.cols?e%this._bufferService.cols==0?[this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)-1]:[e%this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)]:[e,this.selectionStart[1]]}if(this.selectionStartLength&&this.selectionEnd[1]===this.selectionStart[1]){let e=this.selectionStart[0]+this.selectionStartLength;return e>this._bufferService.cols?[e%this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)]:[Math.max(e,this.selectionEnd[0]),this.selectionEnd[1]]}return this.selectionEnd}}areSelectionValuesReversed(){let e=this.selectionStart,t=this.selectionEnd;return!(!e||!t)&&(e[1]>t[1]||e[1]===t[1]&&e[0]>t[0])}handleTrim(e){return this.selectionStart&&(this.selectionStart[1]-=e),this.selectionEnd&&(this.selectionEnd[1]-=e),this.selectionEnd&&this.selectionEnd[1]<0?(this.clearSelection(),!0):(this.selectionStart&&this.selectionStart[1]<0&&(this.selectionStart[1]=0),!1)}}},428:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.CharSizeService=void 0;let a=n(2585),o=n(8460),s=n(844),c=t.CharSizeService=class extends s.Disposable{get hasValidSize(){return this.width>0&&this.height>0}constructor(e,t,n){super(),this._optionsService=n,this.width=0,this.height=0,this._onCharSizeChange=this.register(new o.EventEmitter),this.onCharSizeChange=this._onCharSizeChange.event;try{this._measureStrategy=this.register(new d(this._optionsService))}catch{this._measureStrategy=this.register(new u(e,t,this._optionsService))}this.register(this._optionsService.onMultipleOptionChange([`fontFamily`,`fontSize`],(()=>this.measure())))}measure(){let e=this._measureStrategy.measure();e.width===this.width&&e.height===this.height||(this.width=e.width,this.height=e.height,this._onCharSizeChange.fire())}};t.CharSizeService=c=r([i(2,a.IOptionsService)],c);class l extends s.Disposable{constructor(){super(...arguments),this._result={width:0,height:0}}_validateAndSet(e,t){e!==void 0&&e>0&&t!==void 0&&t>0&&(this._result.width=e,this._result.height=t)}}class u extends l{constructor(e,t,n){super(),this._document=e,this._parentElement=t,this._optionsService=n,this._measureElement=this._document.createElement(`span`),this._measureElement.classList.add(`xterm-char-measure-element`),this._measureElement.textContent=`W`.repeat(32),this._measureElement.setAttribute(`aria-hidden`,`true`),this._measureElement.style.whiteSpace=`pre`,this._measureElement.style.fontKerning=`none`,this._parentElement.appendChild(this._measureElement)}measure(){return this._measureElement.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._measureElement.style.fontSize=`${this._optionsService.rawOptions.fontSize}px`,this._validateAndSet(Number(this._measureElement.offsetWidth)/32,Number(this._measureElement.offsetHeight)),this._result}}class d extends l{constructor(e){super(),this._optionsService=e,this._canvas=new OffscreenCanvas(100,100),this._ctx=this._canvas.getContext(`2d`);let t=this._ctx.measureText(`W`);if(!(`width`in t&&`fontBoundingBoxAscent`in t&&`fontBoundingBoxDescent`in t))throw Error(`Required font metrics not supported`)}measure(){this._ctx.font=`${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;let e=this._ctx.measureText(`W`);return this._validateAndSet(e.width,e.fontBoundingBoxAscent+e.fontBoundingBoxDescent),this._result}}},4269:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.CharacterJoinerService=t.JoinedCellData=void 0;let a=n(3734),o=n(643),s=n(511),c=n(2585);class l extends a.AttributeData{constructor(e,t,n){super(),this.content=0,this.combinedData=``,this.fg=e.fg,this.bg=e.bg,this.combinedData=t,this._width=n}isCombined(){return 2097152}getWidth(){return this._width}getChars(){return this.combinedData}getCode(){return 2097151}setFromCharData(e){throw Error(`not implemented`)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}t.JoinedCellData=l;let u=t.CharacterJoinerService=class e{constructor(e){this._bufferService=e,this._characterJoiners=[],this._nextCharacterJoinerId=0,this._workCell=new s.CellData}register(e){let t={id:this._nextCharacterJoinerId++,handler:e};return this._characterJoiners.push(t),t.id}deregister(e){for(let t=0;t<this._characterJoiners.length;t++)if(this._characterJoiners[t].id===e)return this._characterJoiners.splice(t,1),!0;return!1}getJoinedCharacters(e){if(this._characterJoiners.length===0)return[];let t=this._bufferService.buffer.lines.get(e);if(!t||t.length===0)return[];let n=[],r=t.translateToString(!0),i=0,a=0,s=0,c=t.getFg(0),l=t.getBg(0);for(let e=0;e<t.getTrimmedLength();e++)if(t.loadCell(e,this._workCell),this._workCell.getWidth()!==0){if(this._workCell.fg!==c||this._workCell.bg!==l){if(e-i>1){let e=this._getJoinedRanges(r,s,a,t,i);for(let t=0;t<e.length;t++)n.push(e[t])}i=e,s=a,c=this._workCell.fg,l=this._workCell.bg}a+=this._workCell.getChars().length||o.WHITESPACE_CELL_CHAR.length}if(this._bufferService.cols-i>1){let e=this._getJoinedRanges(r,s,a,t,i);for(let t=0;t<e.length;t++)n.push(e[t])}return n}_getJoinedRanges(t,n,r,i,a){let o=t.substring(n,r),s=[];try{s=this._characterJoiners[0].handler(o)}catch(e){console.error(e)}for(let t=1;t<this._characterJoiners.length;t++)try{let n=this._characterJoiners[t].handler(o);for(let t=0;t<n.length;t++)e._mergeRanges(s,n[t])}catch(e){console.error(e)}return this._stringRangesToCellRanges(s,i,a),s}_stringRangesToCellRanges(e,t,n){let r=0,i=!1,a=0,s=e[r];if(s){for(let c=n;c<this._bufferService.cols;c++){let n=t.getWidth(c),l=t.getString(c).length||o.WHITESPACE_CELL_CHAR.length;if(n!==0){if(!i&&s[0]<=a&&(s[0]=c,i=!0),s[1]<=a){if(s[1]=c,s=e[++r],!s)break;s[0]<=a?(s[0]=c,i=!0):i=!1}a+=l}}s&&(s[1]=this._bufferService.cols)}}static _mergeRanges(e,t){let n=!1;for(let r=0;r<e.length;r++){let i=e[r];if(n){if(t[1]<=i[0])return e[r-1][1]=t[1],e;if(t[1]<=i[1])return e[r-1][1]=Math.max(t[1],i[1]),e.splice(r,1),e;e.splice(r,1),r--}else{if(t[1]<=i[0])return e.splice(r,0,t),e;if(t[1]<=i[1])return i[0]=Math.min(t[0],i[0]),e;t[0]<i[1]&&(i[0]=Math.min(t[0],i[0]),n=!0)}}return n?e[e.length-1][1]=t[1]:e.push(t),e}};t.CharacterJoinerService=u=r([i(0,c.IBufferService)],u)},5114:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CoreBrowserService=void 0;let r=n(844),i=n(8460),a=n(3656);class o extends r.Disposable{constructor(e,t,n){super(),this._textarea=e,this._window=t,this.mainDocument=n,this._isFocused=!1,this._cachedIsFocused=void 0,this._screenDprMonitor=new s(this._window),this._onDprChange=this.register(new i.EventEmitter),this.onDprChange=this._onDprChange.event,this._onWindowChange=this.register(new i.EventEmitter),this.onWindowChange=this._onWindowChange.event,this.register(this.onWindowChange((e=>this._screenDprMonitor.setWindow(e)))),this.register((0,i.forwardEvent)(this._screenDprMonitor.onDprChange,this._onDprChange)),this._textarea.addEventListener(`focus`,(()=>this._isFocused=!0)),this._textarea.addEventListener(`blur`,(()=>this._isFocused=!1))}get window(){return this._window}set window(e){this._window!==e&&(this._window=e,this._onWindowChange.fire(this._window))}get dpr(){return this.window.devicePixelRatio}get isFocused(){return this._cachedIsFocused===void 0&&(this._cachedIsFocused=this._isFocused&&this._textarea.ownerDocument.hasFocus(),queueMicrotask((()=>this._cachedIsFocused=void 0))),this._cachedIsFocused}}t.CoreBrowserService=o;class s extends r.Disposable{constructor(e){super(),this._parentWindow=e,this._windowResizeListener=this.register(new r.MutableDisposable),this._onDprChange=this.register(new i.EventEmitter),this.onDprChange=this._onDprChange.event,this._outerListener=()=>this._setDprAndFireIfDiffers(),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._updateDpr(),this._setWindowResizeListener(),this.register((0,r.toDisposable)((()=>this.clearListener())))}setWindow(e){this._parentWindow=e,this._setWindowResizeListener(),this._setDprAndFireIfDiffers()}_setWindowResizeListener(){this._windowResizeListener.value=(0,a.addDisposableDomListener)(this._parentWindow,`resize`,(()=>this._setDprAndFireIfDiffers()))}_setDprAndFireIfDiffers(){this._parentWindow.devicePixelRatio!==this._currentDevicePixelRatio&&this._onDprChange.fire(this._parentWindow.devicePixelRatio),this._updateDpr()}_updateDpr(){this._outerListener&&(this._resolutionMediaMatchList?.removeListener(this._outerListener),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._resolutionMediaMatchList=this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`),this._resolutionMediaMatchList.addListener(this._outerListener))}clearListener(){this._resolutionMediaMatchList&&this._outerListener&&(this._resolutionMediaMatchList.removeListener(this._outerListener),this._resolutionMediaMatchList=void 0,this._outerListener=void 0)}}},779:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LinkProviderService=void 0;let r=n(844);class i extends r.Disposable{constructor(){super(),this.linkProviders=[],this.register((0,r.toDisposable)((()=>this.linkProviders.length=0)))}registerLinkProvider(e){return this.linkProviders.push(e),{dispose:()=>{let t=this.linkProviders.indexOf(e);t!==-1&&this.linkProviders.splice(t,1)}}}}t.LinkProviderService=i},8934:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.MouseService=void 0;let a=n(4725),o=n(9806),s=t.MouseService=class{constructor(e,t){this._renderService=e,this._charSizeService=t}getCoords(e,t,n,r,i){return(0,o.getCoords)(window,e,t,n,r,this._charSizeService.hasValidSize,this._renderService.dimensions.css.cell.width,this._renderService.dimensions.css.cell.height,i)}getMouseReportCoords(e,t){let n=(0,o.getCoordsRelativeToElement)(window,e,t);if(this._charSizeService.hasValidSize)return n[0]=Math.min(Math.max(n[0],0),this._renderService.dimensions.css.canvas.width-1),n[1]=Math.min(Math.max(n[1],0),this._renderService.dimensions.css.canvas.height-1),{col:Math.floor(n[0]/this._renderService.dimensions.css.cell.width),row:Math.floor(n[1]/this._renderService.dimensions.css.cell.height),x:Math.floor(n[0]),y:Math.floor(n[1])}}};t.MouseService=s=r([i(0,a.IRenderService),i(1,a.ICharSizeService)],s)},3230:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.RenderService=void 0;let a=n(6193),o=n(4725),s=n(8460),c=n(844),l=n(7226),u=n(2585),d=t.RenderService=class extends c.Disposable{get dimensions(){return this._renderer.value.dimensions}constructor(e,t,n,r,i,o,u,d){super(),this._rowCount=e,this._charSizeService=r,this._renderer=this.register(new c.MutableDisposable),this._pausedResizeTask=new l.DebouncedIdleTask,this._observerDisposable=this.register(new c.MutableDisposable),this._isPaused=!1,this._needsFullRefresh=!1,this._isNextRenderRedrawOnly=!0,this._needsSelectionRefresh=!1,this._canvasWidth=0,this._canvasHeight=0,this._selectionState={start:void 0,end:void 0,columnSelectMode:!1},this._onDimensionsChange=this.register(new s.EventEmitter),this.onDimensionsChange=this._onDimensionsChange.event,this._onRenderedViewportChange=this.register(new s.EventEmitter),this.onRenderedViewportChange=this._onRenderedViewportChange.event,this._onRender=this.register(new s.EventEmitter),this.onRender=this._onRender.event,this._onRefreshRequest=this.register(new s.EventEmitter),this.onRefreshRequest=this._onRefreshRequest.event,this._renderDebouncer=new a.RenderDebouncer(((e,t)=>this._renderRows(e,t)),u),this.register(this._renderDebouncer),this.register(u.onDprChange((()=>this.handleDevicePixelRatioChange()))),this.register(o.onResize((()=>this._fullRefresh()))),this.register(o.buffers.onBufferActivate((()=>this._renderer.value?.clear()))),this.register(n.onOptionChange((()=>this._handleOptionsChanged()))),this.register(this._charSizeService.onCharSizeChange((()=>this.handleCharSizeChanged()))),this.register(i.onDecorationRegistered((()=>this._fullRefresh()))),this.register(i.onDecorationRemoved((()=>this._fullRefresh()))),this.register(n.onMultipleOptionChange([`customGlyphs`,`drawBoldTextInBrightColors`,`letterSpacing`,`lineHeight`,`fontFamily`,`fontSize`,`fontWeight`,`fontWeightBold`,`minimumContrastRatio`,`rescaleOverlappingGlyphs`],(()=>{this.clear(),this.handleResize(o.cols,o.rows),this._fullRefresh()}))),this.register(n.onMultipleOptionChange([`cursorBlink`,`cursorStyle`],(()=>this.refreshRows(o.buffer.y,o.buffer.y,!0)))),this.register(d.onChangeColors((()=>this._fullRefresh()))),this._registerIntersectionObserver(u.window,t),this.register(u.onWindowChange((e=>this._registerIntersectionObserver(e,t))))}_registerIntersectionObserver(e,t){if(`IntersectionObserver`in e){let n=new e.IntersectionObserver((e=>this._handleIntersectionChange(e[e.length-1])),{threshold:0});n.observe(t),this._observerDisposable.value=(0,c.toDisposable)((()=>n.disconnect()))}}_handleIntersectionChange(e){this._isPaused=e.isIntersecting===void 0?e.intersectionRatio===0:!e.isIntersecting,this._isPaused||this._charSizeService.hasValidSize||this._charSizeService.measure(),!this._isPaused&&this._needsFullRefresh&&(this._pausedResizeTask.flush(),this.refreshRows(0,this._rowCount-1),this._needsFullRefresh=!1)}refreshRows(e,t,n=!1){this._isPaused?this._needsFullRefresh=!0:(n||(this._isNextRenderRedrawOnly=!1),this._renderDebouncer.refresh(e,t,this._rowCount))}_renderRows(e,t){this._renderer.value&&(e=Math.min(e,this._rowCount-1),t=Math.min(t,this._rowCount-1),this._renderer.value.renderRows(e,t),this._needsSelectionRefresh&&=(this._renderer.value.handleSelectionChanged(this._selectionState.start,this._selectionState.end,this._selectionState.columnSelectMode),!1),this._isNextRenderRedrawOnly||this._onRenderedViewportChange.fire({start:e,end:t}),this._onRender.fire({start:e,end:t}),this._isNextRenderRedrawOnly=!0)}resize(e,t){this._rowCount=t,this._fireOnCanvasResize()}_handleOptionsChanged(){this._renderer.value&&(this.refreshRows(0,this._rowCount-1),this._fireOnCanvasResize())}_fireOnCanvasResize(){this._renderer.value&&(this._renderer.value.dimensions.css.canvas.width===this._canvasWidth&&this._renderer.value.dimensions.css.canvas.height===this._canvasHeight||this._onDimensionsChange.fire(this._renderer.value.dimensions))}hasRenderer(){return!!this._renderer.value}setRenderer(e){this._renderer.value=e,this._renderer.value&&(this._renderer.value.onRequestRedraw((e=>this.refreshRows(e.start,e.end,!0))),this._needsSelectionRefresh=!0,this._fullRefresh())}addRefreshCallback(e){return this._renderDebouncer.addRefreshCallback(e)}_fullRefresh(){this._isPaused?this._needsFullRefresh=!0:this.refreshRows(0,this._rowCount-1)}clearTextureAtlas(){this._renderer.value&&(this._renderer.value.clearTextureAtlas?.(),this._fullRefresh())}handleDevicePixelRatioChange(){this._charSizeService.measure(),this._renderer.value&&(this._renderer.value.handleDevicePixelRatioChange(),this.refreshRows(0,this._rowCount-1))}handleResize(e,t){this._renderer.value&&(this._isPaused?this._pausedResizeTask.set((()=>this._renderer.value?.handleResize(e,t))):this._renderer.value.handleResize(e,t),this._fullRefresh())}handleCharSizeChanged(){this._renderer.value?.handleCharSizeChanged()}handleBlur(){this._renderer.value?.handleBlur()}handleFocus(){this._renderer.value?.handleFocus()}handleSelectionChanged(e,t,n){this._selectionState.start=e,this._selectionState.end=t,this._selectionState.columnSelectMode=n,this._renderer.value?.handleSelectionChanged(e,t,n)}handleCursorMove(){this._renderer.value?.handleCursorMove()}clear(){this._renderer.value?.clear()}};t.RenderService=d=r([i(2,u.IOptionsService),i(3,o.ICharSizeService),i(4,u.IDecorationService),i(5,u.IBufferService),i(6,o.ICoreBrowserService),i(7,o.IThemeService)],d)},9312:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.SelectionService=void 0;let a=n(9806),o=n(9504),s=n(456),c=n(4725),l=n(8460),u=n(844),d=n(6114),f=n(4841),p=n(511),m=n(2585),h=RegExp(`\xA0`,`g`),g=t.SelectionService=class extends u.Disposable{constructor(e,t,n,r,i,a,o,c,d){super(),this._element=e,this._screenElement=t,this._linkifier=n,this._bufferService=r,this._coreService=i,this._mouseService=a,this._optionsService=o,this._renderService=c,this._coreBrowserService=d,this._dragScrollAmount=0,this._enabled=!0,this._workCell=new p.CellData,this._mouseDownTimeStamp=0,this._oldHasSelection=!1,this._oldSelectionStart=void 0,this._oldSelectionEnd=void 0,this._onLinuxMouseSelection=this.register(new l.EventEmitter),this.onLinuxMouseSelection=this._onLinuxMouseSelection.event,this._onRedrawRequest=this.register(new l.EventEmitter),this.onRequestRedraw=this._onRedrawRequest.event,this._onSelectionChange=this.register(new l.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onRequestScrollLines=this.register(new l.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this._mouseMoveListener=e=>this._handleMouseMove(e),this._mouseUpListener=e=>this._handleMouseUp(e),this._coreService.onUserInput((()=>{this.hasSelection&&this.clearSelection()})),this._trimListener=this._bufferService.buffer.lines.onTrim((e=>this._handleTrim(e))),this.register(this._bufferService.buffers.onBufferActivate((e=>this._handleBufferActivate(e)))),this.enable(),this._model=new s.SelectionModel(this._bufferService),this._activeSelectionMode=0,this.register((0,u.toDisposable)((()=>{this._removeMouseDownListeners()})))}reset(){this.clearSelection()}disable(){this.clearSelection(),this._enabled=!1}enable(){this._enabled=!0}get selectionStart(){return this._model.finalSelectionStart}get selectionEnd(){return this._model.finalSelectionEnd}get hasSelection(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd;return!(!e||!t||e[0]===t[0]&&e[1]===t[1])}get selectionText(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd;if(!e||!t)return``;let n=this._bufferService.buffer,r=[];if(this._activeSelectionMode===3){if(e[0]===t[0])return``;let i=e[0]<t[0]?e[0]:t[0],a=e[0]<t[0]?t[0]:e[0];for(let o=e[1];o<=t[1];o++){let e=n.translateBufferLineToString(o,!0,i,a);r.push(e)}}else{let i=e[1]===t[1]?t[0]:void 0;r.push(n.translateBufferLineToString(e[1],!0,e[0],i));for(let i=e[1]+1;i<=t[1]-1;i++){let e=n.lines.get(i),t=n.translateBufferLineToString(i,!0);e?.isWrapped?r[r.length-1]+=t:r.push(t)}if(e[1]!==t[1]){let e=n.lines.get(t[1]),i=n.translateBufferLineToString(t[1],!0,0,t[0]);e&&e.isWrapped?r[r.length-1]+=i:r.push(i)}}return r.map((e=>e.replace(h,` `))).join(d.isWindows?`\r
`:`
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(e){this._refreshAnimationFrame||=this._coreBrowserService.window.requestAnimationFrame((()=>this._refresh())),d.isLinux&&e&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(e){let t=this._getMouseBufferCoords(e),n=this._model.finalSelectionStart,r=this._model.finalSelectionEnd;return!!(n&&r&&t)&&this._areCoordsInSelection(t,n,r)}isCellInSelection(e,t){let n=this._model.finalSelectionStart,r=this._model.finalSelectionEnd;return!(!n||!r)&&this._areCoordsInSelection([e,t],n,r)}_areCoordsInSelection(e,t,n){return e[1]>t[1]&&e[1]<n[1]||t[1]===n[1]&&e[1]===t[1]&&e[0]>=t[0]&&e[0]<n[0]||t[1]<n[1]&&e[1]===n[1]&&e[0]<n[0]||t[1]<n[1]&&e[1]===t[1]&&e[0]>=t[0]}_selectWordAtCursor(e,t){let n=this._linkifier.currentLink?.link?.range;if(n)return this._model.selectionStart=[n.start.x-1,n.start.y-1],this._model.selectionStartLength=(0,f.getRangeLength)(n,this._bufferService.cols),this._model.selectionEnd=void 0,!0;let r=this._getMouseBufferCoords(e);return!!r&&(this._selectWordAt(r,t),this._model.selectionEnd=void 0,!0)}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(e,t){this._model.clearSelection(),e=Math.max(e,0),t=Math.min(t,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,e],this._model.selectionEnd=[this._bufferService.cols,t],this.refresh(),this._onSelectionChange.fire()}_handleTrim(e){this._model.handleTrim(e)&&this.refresh()}_getMouseBufferCoords(e){let t=this._mouseService.getCoords(e,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(t)return t[0]--,t[1]--,t[1]+=this._bufferService.buffer.ydisp,t}_getMouseEventScrollAmount(e){let t=(0,a.getCoordsRelativeToElement)(this._coreBrowserService.window,e,this._screenElement)[1],n=this._renderService.dimensions.css.canvas.height;return t>=0&&t<=n?0:(t>n&&(t-=n),t=Math.min(Math.max(t,-50),50),t/=50,t/Math.abs(t)+Math.round(14*t))}shouldForceSelection(e){return d.isMac?e.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:e.shiftKey}handleMouseDown(e){if(this._mouseDownTimeStamp=e.timeStamp,(e.button!==2||!this.hasSelection)&&e.button===0){if(!this._enabled){if(!this.shouldForceSelection(e))return;e.stopPropagation()}e.preventDefault(),this._dragScrollAmount=0,this._enabled&&e.shiftKey?this._handleIncrementalClick(e):e.detail===1?this._handleSingleClick(e):e.detail===2?this._handleDoubleClick(e):e.detail===3&&this._handleTripleClick(e),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener(`mousemove`,this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener(`mouseup`,this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval((()=>this._dragScroll()),50)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener(`mousemove`,this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener(`mouseup`,this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(e){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(e))}_handleSingleClick(e){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(e)?3:0,this._model.selectionStart=this._getMouseBufferCoords(e),!this._model.selectionStart)return;this._model.selectionEnd=void 0;let t=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);t&&t.length!==this._model.selectionStart[0]&&t.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(e){this._selectWordAtCursor(e,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(e){let t=this._getMouseBufferCoords(e);t&&(this._activeSelectionMode=2,this._selectLineAt(t[1]))}shouldColumnSelect(e){return e.altKey&&!(d.isMac&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(e){if(e.stopImmediatePropagation(),!this._model.selectionStart)return;let t=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(e),!this._model.selectionEnd)return void this.refresh(!0);this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(e),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));let n=this._bufferService.buffer;if(this._model.selectionEnd[1]<n.lines.length){let e=n.lines.get(this._model.selectionEnd[1]);e&&e.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]<this._bufferService.cols&&this._model.selectionEnd[0]++}t&&t[0]===this._model.selectionEnd[0]&&t[1]===this._model.selectionEnd[1]||this.refresh(!0)}_dragScroll(){if(this._model.selectionEnd&&this._model.selectionStart&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});let e=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(e.ydisp+this._bufferService.rows,e.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=e.ydisp),this.refresh()}}_handleMouseUp(e){let t=e.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&t<500&&e.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){let t=this._mouseService.getCoords(e,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(t&&t[0]!==void 0&&t[1]!==void 0){let e=(0,o.moveToCellSequence)(t[0]-1,t[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent(e,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd,n=!(!e||!t||e[0]===t[0]&&e[1]===t[1]);n?e&&t&&(this._oldSelectionStart&&this._oldSelectionEnd&&e[0]===this._oldSelectionStart[0]&&e[1]===this._oldSelectionStart[1]&&t[0]===this._oldSelectionEnd[0]&&t[1]===this._oldSelectionEnd[1]||this._fireOnSelectionChange(e,t,n)):this._oldHasSelection&&this._fireOnSelectionChange(e,t,n)}_fireOnSelectionChange(e,t,n){this._oldSelectionStart=e,this._oldSelectionEnd=t,this._oldHasSelection=n,this._onSelectionChange.fire()}_handleBufferActivate(e){this.clearSelection(),this._trimListener.dispose(),this._trimListener=e.activeBuffer.lines.onTrim((e=>this._handleTrim(e)))}_convertViewportColToCharacterIndex(e,t){let n=t;for(let r=0;t>=r;r++){let i=e.loadCell(r,this._workCell).getChars().length;this._workCell.getWidth()===0?n--:i>1&&t!==r&&(n+=i-1)}return n}setSelection(e,t,n){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[e,t],this._model.selectionStartLength=n,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(e){this._isClickInSelection(e)||(this._selectWordAtCursor(e,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(e,t,n=!0,r=!0){if(e[0]>=this._bufferService.cols)return;let i=this._bufferService.buffer,a=i.lines.get(e[1]);if(!a)return;let o=i.translateBufferLineToString(e[1],!1),s=this._convertViewportColToCharacterIndex(a,e[0]),c=s,l=e[0]-s,u=0,d=0,f=0,p=0;if(o.charAt(s)===` `){for(;s>0&&o.charAt(s-1)===` `;)s--;for(;c<o.length&&o.charAt(c+1)===` `;)c++}else{let t=e[0],n=e[0];a.getWidth(t)===0&&(u++,t--),a.getWidth(n)===2&&(d++,n++);let r=a.getString(n).length;for(r>1&&(p+=r-1,c+=r-1);t>0&&s>0&&!this._isCharWordSeparator(a.loadCell(t-1,this._workCell));){a.loadCell(t-1,this._workCell);let e=this._workCell.getChars().length;this._workCell.getWidth()===0?(u++,t--):e>1&&(f+=e-1,s-=e-1),s--,t--}for(;n<a.length&&c+1<o.length&&!this._isCharWordSeparator(a.loadCell(n+1,this._workCell));){a.loadCell(n+1,this._workCell);let e=this._workCell.getChars().length;this._workCell.getWidth()===2?(d++,n++):e>1&&(p+=e-1,c+=e-1),c++,n++}}c++;let m=s+l-u+f,h=Math.min(this._bufferService.cols,c-s+u+d-f-p);if(t||o.slice(s,c).trim()!==``){if(n&&m===0&&a.getCodePoint(0)!==32){let t=i.lines.get(e[1]-1);if(t&&a.isWrapped&&t.getCodePoint(this._bufferService.cols-1)!==32){let t=this._getWordAt([this._bufferService.cols-1,e[1]-1],!1,!0,!1);if(t){let e=this._bufferService.cols-t.start;m-=e,h+=e}}}if(r&&m+h===this._bufferService.cols&&a.getCodePoint(this._bufferService.cols-1)!==32){let t=i.lines.get(e[1]+1);if(t?.isWrapped&&t.getCodePoint(0)!==32){let t=this._getWordAt([0,e[1]+1],!1,!1,!0);t&&(h+=t.length)}}return{start:m,length:h}}}_selectWordAt(e,t){let n=this._getWordAt(e,t);if(n){for(;n.start<0;)n.start+=this._bufferService.cols,e[1]--;this._model.selectionStart=[n.start,e[1]],this._model.selectionStartLength=n.length}}_selectToWordAt(e){let t=this._getWordAt(e,!0);if(t){let n=e[1];for(;t.start<0;)t.start+=this._bufferService.cols,n--;if(!this._model.areSelectionValuesReversed())for(;t.start+t.length>this._bufferService.cols;)t.length-=this._bufferService.cols,n++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?t.start:t.start+t.length,n]}}_isCharWordSeparator(e){return e.getWidth()!==0&&this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars())>=0}_selectLineAt(e){let t=this._bufferService.buffer.getWrappedRangeForLine(e),n={start:{x:0,y:t.first},end:{x:this._bufferService.cols-1,y:t.last}};this._model.selectionStart=[0,t.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=(0,f.getRangeLength)(n,this._bufferService.cols)}};t.SelectionService=g=r([i(3,m.IBufferService),i(4,m.ICoreService),i(5,c.IMouseService),i(6,m.IOptionsService),i(7,c.IRenderService),i(8,c.ICoreBrowserService)],g)},4725:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ILinkProviderService=t.IThemeService=t.ICharacterJoinerService=t.ISelectionService=t.IRenderService=t.IMouseService=t.ICoreBrowserService=t.ICharSizeService=void 0;let r=n(8343);t.ICharSizeService=(0,r.createDecorator)(`CharSizeService`),t.ICoreBrowserService=(0,r.createDecorator)(`CoreBrowserService`),t.IMouseService=(0,r.createDecorator)(`MouseService`),t.IRenderService=(0,r.createDecorator)(`RenderService`),t.ISelectionService=(0,r.createDecorator)(`SelectionService`),t.ICharacterJoinerService=(0,r.createDecorator)(`CharacterJoinerService`),t.IThemeService=(0,r.createDecorator)(`ThemeService`),t.ILinkProviderService=(0,r.createDecorator)(`LinkProviderService`)},6731:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.ThemeService=t.DEFAULT_ANSI_COLORS=void 0;let a=n(7239),o=n(8055),s=n(8460),c=n(844),l=n(2585),u=o.css.toColor(`#ffffff`),d=o.css.toColor(`#000000`),f=o.css.toColor(`#ffffff`),p=o.css.toColor(`#000000`),m={css:`rgba(255, 255, 255, 0.3)`,rgba:4294967117};t.DEFAULT_ANSI_COLORS=Object.freeze((()=>{let e=[o.css.toColor(`#2e3436`),o.css.toColor(`#cc0000`),o.css.toColor(`#4e9a06`),o.css.toColor(`#c4a000`),o.css.toColor(`#3465a4`),o.css.toColor(`#75507b`),o.css.toColor(`#06989a`),o.css.toColor(`#d3d7cf`),o.css.toColor(`#555753`),o.css.toColor(`#ef2929`),o.css.toColor(`#8ae234`),o.css.toColor(`#fce94f`),o.css.toColor(`#729fcf`),o.css.toColor(`#ad7fa8`),o.css.toColor(`#34e2e2`),o.css.toColor(`#eeeeec`)],t=[0,95,135,175,215,255];for(let n=0;n<216;n++){let r=t[n/36%6|0],i=t[n/6%6|0],a=t[n%6];e.push({css:o.channels.toCss(r,i,a),rgba:o.channels.toRgba(r,i,a)})}for(let t=0;t<24;t++){let n=8+10*t;e.push({css:o.channels.toCss(n,n,n),rgba:o.channels.toRgba(n,n,n)})}return e})());let h=t.ThemeService=class extends c.Disposable{get colors(){return this._colors}constructor(e){super(),this._optionsService=e,this._contrastCache=new a.ColorContrastCache,this._halfContrastCache=new a.ColorContrastCache,this._onChangeColors=this.register(new s.EventEmitter),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:u,background:d,cursor:f,cursorAccent:p,selectionForeground:void 0,selectionBackgroundTransparent:m,selectionBackgroundOpaque:o.color.blend(d,m),selectionInactiveBackgroundTransparent:m,selectionInactiveBackgroundOpaque:o.color.blend(d,m),ansi:t.DEFAULT_ANSI_COLORS.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this.register(this._optionsService.onSpecificOptionChange(`minimumContrastRatio`,(()=>this._contrastCache.clear()))),this.register(this._optionsService.onSpecificOptionChange(`theme`,(()=>this._setTheme(this._optionsService.rawOptions.theme))))}_setTheme(e={}){let n=this._colors;if(n.foreground=g(e.foreground,u),n.background=g(e.background,d),n.cursor=g(e.cursor,f),n.cursorAccent=g(e.cursorAccent,p),n.selectionBackgroundTransparent=g(e.selectionBackground,m),n.selectionBackgroundOpaque=o.color.blend(n.background,n.selectionBackgroundTransparent),n.selectionInactiveBackgroundTransparent=g(e.selectionInactiveBackground,n.selectionBackgroundTransparent),n.selectionInactiveBackgroundOpaque=o.color.blend(n.background,n.selectionInactiveBackgroundTransparent),n.selectionForeground=e.selectionForeground?g(e.selectionForeground,o.NULL_COLOR):void 0,n.selectionForeground===o.NULL_COLOR&&(n.selectionForeground=void 0),o.color.isOpaque(n.selectionBackgroundTransparent)&&(n.selectionBackgroundTransparent=o.color.opacity(n.selectionBackgroundTransparent,.3)),o.color.isOpaque(n.selectionInactiveBackgroundTransparent)&&(n.selectionInactiveBackgroundTransparent=o.color.opacity(n.selectionInactiveBackgroundTransparent,.3)),n.ansi=t.DEFAULT_ANSI_COLORS.slice(),n.ansi[0]=g(e.black,t.DEFAULT_ANSI_COLORS[0]),n.ansi[1]=g(e.red,t.DEFAULT_ANSI_COLORS[1]),n.ansi[2]=g(e.green,t.DEFAULT_ANSI_COLORS[2]),n.ansi[3]=g(e.yellow,t.DEFAULT_ANSI_COLORS[3]),n.ansi[4]=g(e.blue,t.DEFAULT_ANSI_COLORS[4]),n.ansi[5]=g(e.magenta,t.DEFAULT_ANSI_COLORS[5]),n.ansi[6]=g(e.cyan,t.DEFAULT_ANSI_COLORS[6]),n.ansi[7]=g(e.white,t.DEFAULT_ANSI_COLORS[7]),n.ansi[8]=g(e.brightBlack,t.DEFAULT_ANSI_COLORS[8]),n.ansi[9]=g(e.brightRed,t.DEFAULT_ANSI_COLORS[9]),n.ansi[10]=g(e.brightGreen,t.DEFAULT_ANSI_COLORS[10]),n.ansi[11]=g(e.brightYellow,t.DEFAULT_ANSI_COLORS[11]),n.ansi[12]=g(e.brightBlue,t.DEFAULT_ANSI_COLORS[12]),n.ansi[13]=g(e.brightMagenta,t.DEFAULT_ANSI_COLORS[13]),n.ansi[14]=g(e.brightCyan,t.DEFAULT_ANSI_COLORS[14]),n.ansi[15]=g(e.brightWhite,t.DEFAULT_ANSI_COLORS[15]),e.extendedAnsi){let r=Math.min(n.ansi.length-16,e.extendedAnsi.length);for(let i=0;i<r;i++)n.ansi[i+16]=g(e.extendedAnsi[i],t.DEFAULT_ANSI_COLORS[i+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(e){this._restoreColor(e),this._onChangeColors.fire(this.colors)}_restoreColor(e){if(e!==void 0)switch(e){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[e]=this._restoreColors.ansi[e]}else for(let e=0;e<this._restoreColors.ansi.length;++e)this._colors.ansi[e]=this._restoreColors.ansi[e]}modifyColors(e){e(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};function g(e,t){if(e!==void 0)try{return o.css.toColor(e)}catch{}return t}t.ThemeService=h=r([i(0,l.IOptionsService)],h)},6349:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CircularList=void 0;let r=n(8460),i=n(844);class a extends i.Disposable{constructor(e){super(),this._maxLength=e,this.onDeleteEmitter=this.register(new r.EventEmitter),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this.register(new r.EventEmitter),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this.register(new r.EventEmitter),this.onTrim=this.onTrimEmitter.event,this._array=Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(e){if(this._maxLength===e)return;let t=Array(e);for(let n=0;n<Math.min(e,this.length);n++)t[n]=this._array[this._getCyclicIndex(n)];this._array=t,this._maxLength=e,this._startIndex=0}get length(){return this._length}set length(e){if(e>this._length)for(let t=this._length;t<e;t++)this._array[t]=void 0;this._length=e}get(e){return this._array[this._getCyclicIndex(e)]}set(e,t){this._array[this._getCyclicIndex(e)]=t}push(e){this._array[this._getCyclicIndex(this._length)]=e,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw Error(`Can only recycle when the buffer is full`);return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(e,t,...n){if(t){for(let n=e;n<this._length-t;n++)this._array[this._getCyclicIndex(n)]=this._array[this._getCyclicIndex(n+t)];this._length-=t,this.onDeleteEmitter.fire({index:e,amount:t})}for(let t=this._length-1;t>=e;t--)this._array[this._getCyclicIndex(t+n.length)]=this._array[this._getCyclicIndex(t)];for(let t=0;t<n.length;t++)this._array[this._getCyclicIndex(e+t)]=n[t];if(n.length&&this.onInsertEmitter.fire({index:e,amount:n.length}),this._length+n.length>this._maxLength){let e=this._length+n.length-this._maxLength;this._startIndex+=e,this._length=this._maxLength,this.onTrimEmitter.fire(e)}else this._length+=n.length}trimStart(e){e>this._length&&(e=this._length),this._startIndex+=e,this._length-=e,this.onTrimEmitter.fire(e)}shiftElements(e,t,n){if(!(t<=0)){if(e<0||e>=this._length)throw Error(`start argument out of range`);if(e+n<0)throw Error(`Cannot shift elements in list beyond index 0`);if(n>0){for(let r=t-1;r>=0;r--)this.set(e+r+n,this.get(e+r));let r=e+t+n-this._length;if(r>0)for(this._length+=r;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let r=0;r<t;r++)this.set(e+r+n,this.get(e+r))}}_getCyclicIndex(e){return(this._startIndex+e)%this._maxLength}}t.CircularList=a},1439:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clone=void 0,t.clone=function e(t,n=5){if(typeof t!=`object`)return t;let r=Array.isArray(t)?[]:{};for(let i in t)r[i]=n<=1?t[i]:t[i]&&e(t[i],n-1);return r}},8055:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.contrastRatio=t.toPaddedHex=t.rgba=t.rgb=t.css=t.color=t.channels=t.NULL_COLOR=void 0;let n=0,r=0,i=0,a=0;var o,s,c,l,u;function d(e){let t=e.toString(16);return t.length<2?`0`+t:t}function f(e,t){return e<t?(t+.05)/(e+.05):(e+.05)/(t+.05)}t.NULL_COLOR={css:`#00000000`,rgba:0},function(e){e.toCss=function(e,t,n,r){return r===void 0?`#${d(e)}${d(t)}${d(n)}`:`#${d(e)}${d(t)}${d(n)}${d(r)}`},e.toRgba=function(e,t,n,r=255){return(e<<24|t<<16|n<<8|r)>>>0},e.toColor=function(t,n,r,i){return{css:e.toCss(t,n,r,i),rgba:e.toRgba(t,n,r,i)}}}(o||(t.channels=o={})),function(e){function t(e,t){return a=Math.round(255*t),[n,r,i]=u.toChannels(e.rgba),{css:o.toCss(n,r,i,a),rgba:o.toRgba(n,r,i,a)}}e.blend=function(e,t){if(a=(255&t.rgba)/255,a===1)return{css:t.css,rgba:t.rgba};let s=t.rgba>>24&255,c=t.rgba>>16&255,l=t.rgba>>8&255,u=e.rgba>>24&255,d=e.rgba>>16&255,f=e.rgba>>8&255;return n=u+Math.round((s-u)*a),r=d+Math.round((c-d)*a),i=f+Math.round((l-f)*a),{css:o.toCss(n,r,i),rgba:o.toRgba(n,r,i)}},e.isOpaque=function(e){return(255&e.rgba)==255},e.ensureContrastRatio=function(e,t,n){let r=u.ensureContrastRatio(e.rgba,t.rgba,n);if(r)return o.toColor(r>>24&255,r>>16&255,r>>8&255)},e.opaque=function(e){let t=(255|e.rgba)>>>0;return[n,r,i]=u.toChannels(t),{css:o.toCss(n,r,i),rgba:t}},e.opacity=t,e.multiplyOpacity=function(e,n){return a=255&e.rgba,t(e,a*n/255)},e.toColorRGB=function(e){return[e.rgba>>24&255,e.rgba>>16&255,e.rgba>>8&255]}}(s||(t.color=s={})),function(e){let t,s;try{let e=document.createElement(`canvas`);e.width=1,e.height=1;let n=e.getContext(`2d`,{willReadFrequently:!0});n&&(t=n,t.globalCompositeOperation=`copy`,s=t.createLinearGradient(0,0,1,1))}catch{}e.toColor=function(e){if(e.match(/#[\da-f]{3,8}/i))switch(e.length){case 4:return n=parseInt(e.slice(1,2).repeat(2),16),r=parseInt(e.slice(2,3).repeat(2),16),i=parseInt(e.slice(3,4).repeat(2),16),o.toColor(n,r,i);case 5:return n=parseInt(e.slice(1,2).repeat(2),16),r=parseInt(e.slice(2,3).repeat(2),16),i=parseInt(e.slice(3,4).repeat(2),16),a=parseInt(e.slice(4,5).repeat(2),16),o.toColor(n,r,i,a);case 7:return{css:e,rgba:(parseInt(e.slice(1),16)<<8|255)>>>0};case 9:return{css:e,rgba:parseInt(e.slice(1),16)>>>0}}let c=e.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(c)return n=parseInt(c[1]),r=parseInt(c[2]),i=parseInt(c[3]),a=Math.round(255*(c[5]===void 0?1:parseFloat(c[5]))),o.toColor(n,r,i,a);if(!t||!s||(t.fillStyle=s,t.fillStyle=e,typeof t.fillStyle!=`string`)||(t.fillRect(0,0,1,1),[n,r,i,a]=t.getImageData(0,0,1,1).data,a!==255))throw Error(`css.toColor: Unsupported css format`);return{rgba:o.toRgba(n,r,i,a),css:e}}}(c||(t.css=c={})),function(e){function t(e,t,n){let r=e/255,i=t/255,a=n/255;return .2126*(r<=.03928?r/12.92:((r+.055)/1.055)**2.4)+.7152*(i<=.03928?i/12.92:((i+.055)/1.055)**2.4)+.0722*(a<=.03928?a/12.92:((a+.055)/1.055)**2.4)}e.relativeLuminance=function(e){return t(e>>16&255,e>>8&255,255&e)},e.relativeLuminance2=t}(l||(t.rgb=l={})),function(e){function t(e,t,n){let r=e>>24&255,i=e>>16&255,a=e>>8&255,o=t>>24&255,s=t>>16&255,c=t>>8&255,u=f(l.relativeLuminance2(o,s,c),l.relativeLuminance2(r,i,a));for(;u<n&&(o>0||s>0||c>0);)o-=Math.max(0,Math.ceil(.1*o)),s-=Math.max(0,Math.ceil(.1*s)),c-=Math.max(0,Math.ceil(.1*c)),u=f(l.relativeLuminance2(o,s,c),l.relativeLuminance2(r,i,a));return(o<<24|s<<16|c<<8|255)>>>0}function s(e,t,n){let r=e>>24&255,i=e>>16&255,a=e>>8&255,o=t>>24&255,s=t>>16&255,c=t>>8&255,u=f(l.relativeLuminance2(o,s,c),l.relativeLuminance2(r,i,a));for(;u<n&&(o<255||s<255||c<255);)o=Math.min(255,o+Math.ceil(.1*(255-o))),s=Math.min(255,s+Math.ceil(.1*(255-s))),c=Math.min(255,c+Math.ceil(.1*(255-c))),u=f(l.relativeLuminance2(o,s,c),l.relativeLuminance2(r,i,a));return(o<<24|s<<16|c<<8|255)>>>0}e.blend=function(e,t){if(a=(255&t)/255,a===1)return t;let s=t>>24&255,c=t>>16&255,l=t>>8&255,u=e>>24&255,d=e>>16&255,f=e>>8&255;return n=u+Math.round((s-u)*a),r=d+Math.round((c-d)*a),i=f+Math.round((l-f)*a),o.toRgba(n,r,i)},e.ensureContrastRatio=function(e,n,r){let i=l.relativeLuminance(e>>8),a=l.relativeLuminance(n>>8);if(f(i,a)<r){if(a<i){let a=t(e,n,r),o=f(i,l.relativeLuminance(a>>8));if(o<r){let t=s(e,n,r);return o>f(i,l.relativeLuminance(t>>8))?a:t}return a}let o=s(e,n,r),c=f(i,l.relativeLuminance(o>>8));if(c<r){let a=t(e,n,r);return c>f(i,l.relativeLuminance(a>>8))?o:a}return o}},e.reduceLuminance=t,e.increaseLuminance=s,e.toChannels=function(e){return[e>>24&255,e>>16&255,e>>8&255,255&e]}}(u||(t.rgba=u={})),t.toPaddedHex=d,t.contrastRatio=f},8969:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CoreTerminal=void 0;let r=n(844),i=n(2585),a=n(4348),o=n(7866),s=n(744),c=n(7302),l=n(6975),u=n(8460),d=n(1753),f=n(1480),p=n(7994),m=n(9282),h=n(5435),g=n(5981),_=n(2660),v=!1;class y extends r.Disposable{get onScroll(){return this._onScrollApi||(this._onScrollApi=this.register(new u.EventEmitter),this._onScroll.event((e=>{this._onScrollApi?.fire(e.position)}))),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options(e){for(let t in e)this.optionsService.options[t]=e[t]}constructor(e){super(),this._windowsWrappingHeuristics=this.register(new r.MutableDisposable),this._onBinary=this.register(new u.EventEmitter),this.onBinary=this._onBinary.event,this._onData=this.register(new u.EventEmitter),this.onData=this._onData.event,this._onLineFeed=this.register(new u.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onResize=this.register(new u.EventEmitter),this.onResize=this._onResize.event,this._onWriteParsed=this.register(new u.EventEmitter),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this.register(new u.EventEmitter),this._instantiationService=new a.InstantiationService,this.optionsService=this.register(new c.OptionsService(e)),this._instantiationService.setService(i.IOptionsService,this.optionsService),this._bufferService=this.register(this._instantiationService.createInstance(s.BufferService)),this._instantiationService.setService(i.IBufferService,this._bufferService),this._logService=this.register(this._instantiationService.createInstance(o.LogService)),this._instantiationService.setService(i.ILogService,this._logService),this.coreService=this.register(this._instantiationService.createInstance(l.CoreService)),this._instantiationService.setService(i.ICoreService,this.coreService),this.coreMouseService=this.register(this._instantiationService.createInstance(d.CoreMouseService)),this._instantiationService.setService(i.ICoreMouseService,this.coreMouseService),this.unicodeService=this.register(this._instantiationService.createInstance(f.UnicodeService)),this._instantiationService.setService(i.IUnicodeService,this.unicodeService),this._charsetService=this._instantiationService.createInstance(p.CharsetService),this._instantiationService.setService(i.ICharsetService,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(_.OscLinkService),this._instantiationService.setService(i.IOscLinkService,this._oscLinkService),this._inputHandler=this.register(new h.InputHandler(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this.register((0,u.forwardEvent)(this._inputHandler.onLineFeed,this._onLineFeed)),this.register(this._inputHandler),this.register((0,u.forwardEvent)(this._bufferService.onResize,this._onResize)),this.register((0,u.forwardEvent)(this.coreService.onData,this._onData)),this.register((0,u.forwardEvent)(this.coreService.onBinary,this._onBinary)),this.register(this.coreService.onRequestScrollToBottom((()=>this.scrollToBottom()))),this.register(this.coreService.onUserInput((()=>this._writeBuffer.handleUserInput()))),this.register(this.optionsService.onMultipleOptionChange([`windowsMode`,`windowsPty`],(()=>this._handleWindowsPtyOptionChange()))),this.register(this._bufferService.onScroll((e=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)}))),this.register(this._inputHandler.onScroll((e=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)}))),this._writeBuffer=this.register(new g.WriteBuffer(((e,t)=>this._inputHandler.parse(e,t)))),this.register((0,u.forwardEvent)(this._writeBuffer.onWriteParsed,this._onWriteParsed))}write(e,t){this._writeBuffer.write(e,t)}writeSync(e,t){this._logService.logLevel<=i.LogLevelEnum.WARN&&!v&&(this._logService.warn(`writeSync is unreliable and will be removed soon.`),v=!0),this._writeBuffer.writeSync(e,t)}input(e,t=!0){this.coreService.triggerDataEvent(e,t)}resize(e,t){isNaN(e)||isNaN(t)||(e=Math.max(e,s.MINIMUM_COLS),t=Math.max(t,s.MINIMUM_ROWS),this._bufferService.resize(e,t))}scroll(e,t=!1){this._bufferService.scroll(e,t)}scrollLines(e,t,n){this._bufferService.scrollLines(e,t,n)}scrollPages(e){this.scrollLines(e*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(e){let t=e-this._bufferService.buffer.ydisp;t!==0&&this.scrollLines(t)}registerEscHandler(e,t){return this._inputHandler.registerEscHandler(e,t)}registerDcsHandler(e,t){return this._inputHandler.registerDcsHandler(e,t)}registerCsiHandler(e,t){return this._inputHandler.registerCsiHandler(e,t)}registerOscHandler(e,t){return this._inputHandler.registerOscHandler(e,t)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let e=!1,t=this.optionsService.rawOptions.windowsPty;t&&t.buildNumber!==void 0&&t.buildNumber!==void 0?e=t.backend===`conpty`&&t.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&(e=!0),e?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){let e=[];e.push(this.onLineFeed(m.updateWindowsModeWrappedState.bind(null,this._bufferService))),e.push(this.registerCsiHandler({final:`H`},(()=>((0,m.updateWindowsModeWrappedState)(this._bufferService),!1)))),this._windowsWrappingHeuristics.value=(0,r.toDisposable)((()=>{for(let t of e)t.dispose()}))}}}t.CoreTerminal=y},8460:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.runAndSubscribe=t.forwardEvent=t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this._listeners=[],this._disposed=!1}get event(){return this._event||=e=>(this._listeners.push(e),{dispose:()=>{if(!this._disposed){for(let t=0;t<this._listeners.length;t++)if(this._listeners[t]===e)return void this._listeners.splice(t,1)}}}),this._event}fire(e,t){let n=[];for(let e=0;e<this._listeners.length;e++)n.push(this._listeners[e]);for(let r=0;r<n.length;r++)n[r].call(void 0,e,t)}dispose(){this.clearListeners(),this._disposed=!0}clearListeners(){this._listeners&&(this._listeners.length=0)}},t.forwardEvent=function(e,t){return e((e=>t.fire(e)))},t.runAndSubscribe=function(e,t){return t(void 0),e((e=>t(e)))}},5435:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.InputHandler=t.WindowsOptionsReportType=void 0;let a=n(2584),o=n(7116),s=n(2015),c=n(844),l=n(482),u=n(8437),d=n(8460),f=n(643),p=n(511),m=n(3734),h=n(2585),g=n(1480),_=n(6242),v=n(6351),y=n(5941),b={"(":0,")":1,"*":2,"+":3,"-":1,".":2},x=131072;function S(e,t){if(e>24)return t.setWinLines||!1;switch(e){case 1:return!!t.restoreWin;case 2:return!!t.minimizeWin;case 3:return!!t.setWinPosition;case 4:return!!t.setWinSizePixels;case 5:return!!t.raiseWin;case 6:return!!t.lowerWin;case 7:return!!t.refreshWin;case 8:return!!t.setWinSizeChars;case 9:return!!t.maximizeWin;case 10:return!!t.fullscreenWin;case 11:return!!t.getWinState;case 13:return!!t.getWinPosition;case 14:return!!t.getWinSizePixels;case 15:return!!t.getScreenSizePixels;case 16:return!!t.getCellSizePixels;case 18:return!!t.getWinSizeChars;case 19:return!!t.getScreenSizeChars;case 20:return!!t.getIconTitle;case 21:return!!t.getWinTitle;case 22:return!!t.pushTitle;case 23:return!!t.popTitle;case 24:return!!t.setWinLines}return!1}var C;(function(e){e[e.GET_WIN_SIZE_PIXELS=0]=`GET_WIN_SIZE_PIXELS`,e[e.GET_CELL_SIZE_PIXELS=1]=`GET_CELL_SIZE_PIXELS`})(C||(t.WindowsOptionsReportType=C={}));let w=0;class T extends c.Disposable{getAttrData(){return this._curAttrData}constructor(e,t,n,r,i,c,f,m,h=new s.EscapeSequenceParser){super(),this._bufferService=e,this._charsetService=t,this._coreService=n,this._logService=r,this._optionsService=i,this._oscLinkService=c,this._coreMouseService=f,this._unicodeService=m,this._parser=h,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new l.StringToUtf32,this._utf8Decoder=new l.Utf8ToUtf32,this._workCell=new p.CellData,this._windowTitle=``,this._iconName=``,this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=u.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=u.DEFAULT_ATTR_DATA.clone(),this._onRequestBell=this.register(new d.EventEmitter),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this.register(new d.EventEmitter),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this.register(new d.EventEmitter),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this.register(new d.EventEmitter),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this.register(new d.EventEmitter),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this.register(new d.EventEmitter),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this.register(new d.EventEmitter),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this.register(new d.EventEmitter),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this.register(new d.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this.register(new d.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onScroll=this.register(new d.EventEmitter),this.onScroll=this._onScroll.event,this._onTitleChange=this.register(new d.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onColor=this.register(new d.EventEmitter),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this.register(this._parser),this._dirtyRowTracker=new E(this._bufferService),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate((e=>this._activeBuffer=e.activeBuffer))),this._parser.setCsiHandlerFallback(((e,t)=>{this._logService.debug(`Unknown CSI code: `,{identifier:this._parser.identToString(e),params:t.toArray()})})),this._parser.setEscHandlerFallback((e=>{this._logService.debug(`Unknown ESC code: `,{identifier:this._parser.identToString(e)})})),this._parser.setExecuteHandlerFallback((e=>{this._logService.debug(`Unknown EXECUTE code: `,{code:e})})),this._parser.setOscHandlerFallback(((e,t,n)=>{this._logService.debug(`Unknown OSC code: `,{identifier:e,action:t,data:n})})),this._parser.setDcsHandlerFallback(((e,t,n)=>{t===`HOOK`&&(n=n.toArray()),this._logService.debug(`Unknown DCS code: `,{identifier:this._parser.identToString(e),action:t,payload:n})})),this._parser.setPrintHandler(((e,t,n)=>this.print(e,t,n))),this._parser.registerCsiHandler({final:`@`},(e=>this.insertChars(e))),this._parser.registerCsiHandler({intermediates:` `,final:`@`},(e=>this.scrollLeft(e))),this._parser.registerCsiHandler({final:`A`},(e=>this.cursorUp(e))),this._parser.registerCsiHandler({intermediates:` `,final:`A`},(e=>this.scrollRight(e))),this._parser.registerCsiHandler({final:`B`},(e=>this.cursorDown(e))),this._parser.registerCsiHandler({final:`C`},(e=>this.cursorForward(e))),this._parser.registerCsiHandler({final:`D`},(e=>this.cursorBackward(e))),this._parser.registerCsiHandler({final:`E`},(e=>this.cursorNextLine(e))),this._parser.registerCsiHandler({final:`F`},(e=>this.cursorPrecedingLine(e))),this._parser.registerCsiHandler({final:`G`},(e=>this.cursorCharAbsolute(e))),this._parser.registerCsiHandler({final:`H`},(e=>this.cursorPosition(e))),this._parser.registerCsiHandler({final:`I`},(e=>this.cursorForwardTab(e))),this._parser.registerCsiHandler({final:`J`},(e=>this.eraseInDisplay(e,!1))),this._parser.registerCsiHandler({prefix:`?`,final:`J`},(e=>this.eraseInDisplay(e,!0))),this._parser.registerCsiHandler({final:`K`},(e=>this.eraseInLine(e,!1))),this._parser.registerCsiHandler({prefix:`?`,final:`K`},(e=>this.eraseInLine(e,!0))),this._parser.registerCsiHandler({final:`L`},(e=>this.insertLines(e))),this._parser.registerCsiHandler({final:`M`},(e=>this.deleteLines(e))),this._parser.registerCsiHandler({final:`P`},(e=>this.deleteChars(e))),this._parser.registerCsiHandler({final:`S`},(e=>this.scrollUp(e))),this._parser.registerCsiHandler({final:`T`},(e=>this.scrollDown(e))),this._parser.registerCsiHandler({final:`X`},(e=>this.eraseChars(e))),this._parser.registerCsiHandler({final:`Z`},(e=>this.cursorBackwardTab(e))),this._parser.registerCsiHandler({final:"`"},(e=>this.charPosAbsolute(e))),this._parser.registerCsiHandler({final:`a`},(e=>this.hPositionRelative(e))),this._parser.registerCsiHandler({final:`b`},(e=>this.repeatPrecedingCharacter(e))),this._parser.registerCsiHandler({final:`c`},(e=>this.sendDeviceAttributesPrimary(e))),this._parser.registerCsiHandler({prefix:`>`,final:`c`},(e=>this.sendDeviceAttributesSecondary(e))),this._parser.registerCsiHandler({final:`d`},(e=>this.linePosAbsolute(e))),this._parser.registerCsiHandler({final:`e`},(e=>this.vPositionRelative(e))),this._parser.registerCsiHandler({final:`f`},(e=>this.hVPosition(e))),this._parser.registerCsiHandler({final:`g`},(e=>this.tabClear(e))),this._parser.registerCsiHandler({final:`h`},(e=>this.setMode(e))),this._parser.registerCsiHandler({prefix:`?`,final:`h`},(e=>this.setModePrivate(e))),this._parser.registerCsiHandler({final:`l`},(e=>this.resetMode(e))),this._parser.registerCsiHandler({prefix:`?`,final:`l`},(e=>this.resetModePrivate(e))),this._parser.registerCsiHandler({final:`m`},(e=>this.charAttributes(e))),this._parser.registerCsiHandler({final:`n`},(e=>this.deviceStatus(e))),this._parser.registerCsiHandler({prefix:`?`,final:`n`},(e=>this.deviceStatusPrivate(e))),this._parser.registerCsiHandler({intermediates:`!`,final:`p`},(e=>this.softReset(e))),this._parser.registerCsiHandler({intermediates:` `,final:`q`},(e=>this.setCursorStyle(e))),this._parser.registerCsiHandler({final:`r`},(e=>this.setScrollRegion(e))),this._parser.registerCsiHandler({final:`s`},(e=>this.saveCursor(e))),this._parser.registerCsiHandler({final:`t`},(e=>this.windowOptions(e))),this._parser.registerCsiHandler({final:`u`},(e=>this.restoreCursor(e))),this._parser.registerCsiHandler({intermediates:`'`,final:`}`},(e=>this.insertColumns(e))),this._parser.registerCsiHandler({intermediates:`'`,final:`~`},(e=>this.deleteColumns(e))),this._parser.registerCsiHandler({intermediates:`"`,final:`q`},(e=>this.selectProtected(e))),this._parser.registerCsiHandler({intermediates:`$`,final:`p`},(e=>this.requestMode(e,!0))),this._parser.registerCsiHandler({prefix:`?`,intermediates:`$`,final:`p`},(e=>this.requestMode(e,!1))),this._parser.setExecuteHandler(a.C0.BEL,(()=>this.bell())),this._parser.setExecuteHandler(a.C0.LF,(()=>this.lineFeed())),this._parser.setExecuteHandler(a.C0.VT,(()=>this.lineFeed())),this._parser.setExecuteHandler(a.C0.FF,(()=>this.lineFeed())),this._parser.setExecuteHandler(a.C0.CR,(()=>this.carriageReturn())),this._parser.setExecuteHandler(a.C0.BS,(()=>this.backspace())),this._parser.setExecuteHandler(a.C0.HT,(()=>this.tab())),this._parser.setExecuteHandler(a.C0.SO,(()=>this.shiftOut())),this._parser.setExecuteHandler(a.C0.SI,(()=>this.shiftIn())),this._parser.setExecuteHandler(a.C1.IND,(()=>this.index())),this._parser.setExecuteHandler(a.C1.NEL,(()=>this.nextLine())),this._parser.setExecuteHandler(a.C1.HTS,(()=>this.tabSet())),this._parser.registerOscHandler(0,new _.OscHandler((e=>(this.setTitle(e),this.setIconName(e),!0)))),this._parser.registerOscHandler(1,new _.OscHandler((e=>this.setIconName(e)))),this._parser.registerOscHandler(2,new _.OscHandler((e=>this.setTitle(e)))),this._parser.registerOscHandler(4,new _.OscHandler((e=>this.setOrReportIndexedColor(e)))),this._parser.registerOscHandler(8,new _.OscHandler((e=>this.setHyperlink(e)))),this._parser.registerOscHandler(10,new _.OscHandler((e=>this.setOrReportFgColor(e)))),this._parser.registerOscHandler(11,new _.OscHandler((e=>this.setOrReportBgColor(e)))),this._parser.registerOscHandler(12,new _.OscHandler((e=>this.setOrReportCursorColor(e)))),this._parser.registerOscHandler(104,new _.OscHandler((e=>this.restoreIndexedColor(e)))),this._parser.registerOscHandler(110,new _.OscHandler((e=>this.restoreFgColor(e)))),this._parser.registerOscHandler(111,new _.OscHandler((e=>this.restoreBgColor(e)))),this._parser.registerOscHandler(112,new _.OscHandler((e=>this.restoreCursorColor(e)))),this._parser.registerEscHandler({final:`7`},(()=>this.saveCursor())),this._parser.registerEscHandler({final:`8`},(()=>this.restoreCursor())),this._parser.registerEscHandler({final:`D`},(()=>this.index())),this._parser.registerEscHandler({final:`E`},(()=>this.nextLine())),this._parser.registerEscHandler({final:`H`},(()=>this.tabSet())),this._parser.registerEscHandler({final:`M`},(()=>this.reverseIndex())),this._parser.registerEscHandler({final:`=`},(()=>this.keypadApplicationMode())),this._parser.registerEscHandler({final:`>`},(()=>this.keypadNumericMode())),this._parser.registerEscHandler({final:`c`},(()=>this.fullReset())),this._parser.registerEscHandler({final:`n`},(()=>this.setgLevel(2))),this._parser.registerEscHandler({final:`o`},(()=>this.setgLevel(3))),this._parser.registerEscHandler({final:`|`},(()=>this.setgLevel(3))),this._parser.registerEscHandler({final:`}`},(()=>this.setgLevel(2))),this._parser.registerEscHandler({final:`~`},(()=>this.setgLevel(1))),this._parser.registerEscHandler({intermediates:`%`,final:`@`},(()=>this.selectDefaultCharset())),this._parser.registerEscHandler({intermediates:`%`,final:`G`},(()=>this.selectDefaultCharset()));for(let e in o.CHARSETS)this._parser.registerEscHandler({intermediates:`(`,final:e},(()=>this.selectCharset(`(`+e))),this._parser.registerEscHandler({intermediates:`)`,final:e},(()=>this.selectCharset(`)`+e))),this._parser.registerEscHandler({intermediates:`*`,final:e},(()=>this.selectCharset(`*`+e))),this._parser.registerEscHandler({intermediates:`+`,final:e},(()=>this.selectCharset(`+`+e))),this._parser.registerEscHandler({intermediates:`-`,final:e},(()=>this.selectCharset(`-`+e))),this._parser.registerEscHandler({intermediates:`.`,final:e},(()=>this.selectCharset(`.`+e))),this._parser.registerEscHandler({intermediates:`/`,final:e},(()=>this.selectCharset(`/`+e)));this._parser.registerEscHandler({intermediates:`#`,final:`8`},(()=>this.screenAlignmentPattern())),this._parser.setErrorHandler((e=>(this._logService.error(`Parsing error: `,e),e))),this._parser.registerDcsHandler({intermediates:`$`,final:`q`},new v.DcsHandler(((e,t)=>this.requestStatusString(e,t))))}_preserveStack(e,t,n,r){this._parseStack.paused=!0,this._parseStack.cursorStartX=e,this._parseStack.cursorStartY=t,this._parseStack.decodedLength=n,this._parseStack.position=r}_logSlowResolvingAsync(e){this._logService.logLevel<=h.LogLevelEnum.WARN&&Promise.race([e,new Promise(((e,t)=>setTimeout((()=>t(`#SLOW_TIMEOUT`)),5e3)))]).catch((e=>{if(e!==`#SLOW_TIMEOUT`)throw e;console.warn(`async parser handler taking longer than 5000 ms`)}))}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(e,t){let n,r=this._activeBuffer.x,i=this._activeBuffer.y,a=0,o=this._parseStack.paused;if(o){if(n=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,t))return this._logSlowResolvingAsync(n),n;r=this._parseStack.cursorStartX,i=this._parseStack.cursorStartY,this._parseStack.paused=!1,e.length>x&&(a=this._parseStack.position+x)}if(this._logService.logLevel<=h.LogLevelEnum.DEBUG&&this._logService.debug(`parsing data`+(typeof e==`string`?` "${e}"`:` "${Array.prototype.map.call(e,(e=>String.fromCharCode(e))).join(``)}"`),typeof e==`string`?e.split(``).map((e=>e.charCodeAt(0))):e),this._parseBuffer.length<e.length&&this._parseBuffer.length<x&&(this._parseBuffer=new Uint32Array(Math.min(e.length,x))),o||this._dirtyRowTracker.clearRange(),e.length>x)for(let t=a;t<e.length;t+=x){let a=t+x<e.length?t+x:e.length,o=typeof e==`string`?this._stringDecoder.decode(e.substring(t,a),this._parseBuffer):this._utf8Decoder.decode(e.subarray(t,a),this._parseBuffer);if(n=this._parser.parse(this._parseBuffer,o))return this._preserveStack(r,i,o,t),this._logSlowResolvingAsync(n),n}else if(!o){let t=typeof e==`string`?this._stringDecoder.decode(e,this._parseBuffer):this._utf8Decoder.decode(e,this._parseBuffer);if(n=this._parser.parse(this._parseBuffer,t))return this._preserveStack(r,i,t,0),this._logSlowResolvingAsync(n),n}this._activeBuffer.x===r&&this._activeBuffer.y===i||this._onCursorMove.fire();let s=this._dirtyRowTracker.end+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp),c=this._dirtyRowTracker.start+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp);c<this._bufferService.rows&&this._onRequestRefreshRows.fire(Math.min(c,this._bufferService.rows-1),Math.min(s,this._bufferService.rows-1))}print(e,t,n){let r,i,a=this._charsetService.charset,o=this._optionsService.rawOptions.screenReaderMode,s=this._bufferService.cols,c=this._coreService.decPrivateModes.wraparound,d=this._coreService.modes.insertMode,p=this._curAttrData,m=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&n-t>0&&m.getWidth(this._activeBuffer.x-1)===2&&m.setCellFromCodepoint(this._activeBuffer.x-1,0,1,p);let h=this._parser.precedingJoinState;for(let _=t;_<n;++_){if(r=e[_],r<127&&a){let e=a[String.fromCharCode(r)];e&&(r=e.charCodeAt(0))}let t=this._unicodeService.charProperties(r,h);i=g.UnicodeService.extractWidth(t);let n=g.UnicodeService.extractShouldJoin(t),v=n?g.UnicodeService.extractWidth(h):0;if(h=t,o&&this._onA11yChar.fire((0,l.stringFromCodePoint)(r)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),this._activeBuffer.x+i-v>s){if(c){let e=m,t=this._activeBuffer.x-v;for(this._activeBuffer.x=v,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),m=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y),v>0&&m instanceof u.BufferLine&&m.copyCellsFrom(e,t,0,v,!1);t<s;)e.setCellFromCodepoint(t++,0,1,p)}else if(this._activeBuffer.x=s-1,i===2)continue}if(n&&this._activeBuffer.x){let e=m.getWidth(this._activeBuffer.x-1)?1:2;m.addCodepointToCell(this._activeBuffer.x-e,r,i);for(let e=i-v;--e>=0;)m.setCellFromCodepoint(this._activeBuffer.x++,0,0,p)}else if(d&&(m.insertCells(this._activeBuffer.x,i-v,this._activeBuffer.getNullCell(p)),m.getWidth(s-1)===2&&m.setCellFromCodepoint(s-1,f.NULL_CELL_CODE,f.NULL_CELL_WIDTH,p)),m.setCellFromCodepoint(this._activeBuffer.x++,r,i,p),i>0)for(;--i;)m.setCellFromCodepoint(this._activeBuffer.x++,0,0,p)}this._parser.precedingJoinState=h,this._activeBuffer.x<s&&n-t>0&&m.getWidth(this._activeBuffer.x)===0&&!m.hasContent(this._activeBuffer.x)&&m.setCellFromCodepoint(this._activeBuffer.x,0,1,p),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(e,t){return e.final!==`t`||e.prefix||e.intermediates?this._parser.registerCsiHandler(e,t):this._parser.registerCsiHandler(e,(e=>!S(e.params[0],this._optionsService.rawOptions.windowOptions)||t(e)))}registerDcsHandler(e,t){return this._parser.registerDcsHandler(e,new v.DcsHandler(t))}registerEscHandler(e,t){return this._parser.registerEscHandler(e,t)}registerOscHandler(e,t){return this._parser.registerOscHandler(e,new _.OscHandler(t))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y)?.isWrapped){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;let e=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);e.hasWidth(this._activeBuffer.x)&&!e.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let e=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-e),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(e=this._bufferService.cols-1){this._activeBuffer.x=Math.min(e,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(e,t){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=e,this._activeBuffer.y=this._activeBuffer.scrollTop+t):(this._activeBuffer.x=e,this._activeBuffer.y=t),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(e,t){this._restrictCursor(),this._setCursor(this._activeBuffer.x+e,this._activeBuffer.y+t)}cursorUp(e){let t=this._activeBuffer.y-this._activeBuffer.scrollTop;return t>=0?this._moveCursor(0,-Math.min(t,e.params[0]||1)):this._moveCursor(0,-(e.params[0]||1)),!0}cursorDown(e){let t=this._activeBuffer.scrollBottom-this._activeBuffer.y;return t>=0?this._moveCursor(0,Math.min(t,e.params[0]||1)):this._moveCursor(0,e.params[0]||1),!0}cursorForward(e){return this._moveCursor(e.params[0]||1,0),!0}cursorBackward(e){return this._moveCursor(-(e.params[0]||1),0),!0}cursorNextLine(e){return this.cursorDown(e),this._activeBuffer.x=0,!0}cursorPrecedingLine(e){return this.cursorUp(e),this._activeBuffer.x=0,!0}cursorCharAbsolute(e){return this._setCursor((e.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(e){return this._setCursor(e.length>=2?(e.params[1]||1)-1:0,(e.params[0]||1)-1),!0}charPosAbsolute(e){return this._setCursor((e.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(e){return this._moveCursor(e.params[0]||1,0),!0}linePosAbsolute(e){return this._setCursor(this._activeBuffer.x,(e.params[0]||1)-1),!0}vPositionRelative(e){return this._moveCursor(0,e.params[0]||1),!0}hVPosition(e){return this.cursorPosition(e),!0}tabClear(e){let t=e.params[0];return t===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:t===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(e){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let t=e.params[0]||1;for(;t--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(e){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let t=e.params[0]||1;for(;t--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(e){let t=e.params[0];return t===1&&(this._curAttrData.bg|=536870912),t!==2&&t!==0||(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(e,t,n,r=!1,i=!1){let a=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);a.replaceCells(t,n,this._activeBuffer.getNullCell(this._eraseAttrData()),i),r&&(a.isWrapped=!1)}_resetBufferLine(e,t=!1){let n=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);n&&(n.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),t),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+e),n.isWrapped=!1)}eraseInDisplay(e,t=!1){let n;switch(this._restrictCursor(this._bufferService.cols),e.params[0]){case 0:for(n=this._activeBuffer.y,this._dirtyRowTracker.markDirty(n),this._eraseInBufferLine(n++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,t);n<this._bufferService.rows;n++)this._resetBufferLine(n,t);this._dirtyRowTracker.markDirty(n);break;case 1:for(n=this._activeBuffer.y,this._dirtyRowTracker.markDirty(n),this._eraseInBufferLine(n,0,this._activeBuffer.x+1,!0,t),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(n+1).isWrapped=!1);n--;)this._resetBufferLine(n,t);this._dirtyRowTracker.markDirty(0);break;case 2:for(n=this._bufferService.rows,this._dirtyRowTracker.markDirty(n-1);n--;)this._resetBufferLine(n,t);this._dirtyRowTracker.markDirty(0);break;case 3:let e=this._activeBuffer.lines.length-this._bufferService.rows;e>0&&(this._activeBuffer.lines.trimStart(e),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-e,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-e,0),this._onScroll.fire(0))}return!0}eraseInLine(e,t=!1){switch(this._restrictCursor(this._bufferService.cols),e.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,t);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,t);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,t)}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(e){this._restrictCursor();let t=e.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let n=this._activeBuffer.ybase+this._activeBuffer.y,r=this._bufferService.rows-1-this._activeBuffer.scrollBottom,i=this._bufferService.rows-1+this._activeBuffer.ybase-r+1;for(;t--;)this._activeBuffer.lines.splice(i-1,1),this._activeBuffer.lines.splice(n,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(e){this._restrictCursor();let t=e.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let n=this._activeBuffer.ybase+this._activeBuffer.y,r;for(r=this._bufferService.rows-1-this._activeBuffer.scrollBottom,r=this._bufferService.rows-1+this._activeBuffer.ybase-r;t--;)this._activeBuffer.lines.splice(n,1),this._activeBuffer.lines.splice(r,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.insertCells(this._activeBuffer.x,e.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.deleteCells(this._activeBuffer.x,e.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(e){let t=e.params[0]||1;for(;t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(e){let t=e.params[0]||1;for(;t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(u.DEFAULT_ATTR_DATA));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let e=this._activeBuffer.scrollTop;e<=this._activeBuffer.scrollBottom;++e){let n=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);n.deleteCells(0,t,this._activeBuffer.getNullCell(this._eraseAttrData())),n.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let e=this._activeBuffer.scrollTop;e<=this._activeBuffer.scrollBottom;++e){let n=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);n.insertCells(0,t,this._activeBuffer.getNullCell(this._eraseAttrData())),n.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let e=this._activeBuffer.scrollTop;e<=this._activeBuffer.scrollBottom;++e){let n=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);n.insertCells(this._activeBuffer.x,t,this._activeBuffer.getNullCell(this._eraseAttrData())),n.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let e=this._activeBuffer.scrollTop;e<=this._activeBuffer.scrollBottom;++e){let n=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);n.deleteCells(this._activeBuffer.x,t,this._activeBuffer.getNullCell(this._eraseAttrData())),n.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(e.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(e){let t=this._parser.precedingJoinState;if(!t)return!0;let n=e.params[0]||1,r=g.UnicodeService.extractWidth(t),i=this._activeBuffer.x-r,a=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).getString(i),o=new Uint32Array(a.length*n),s=0;for(let e=0;e<a.length;){let t=a.codePointAt(e)||0;o[s++]=t,e+=t>65535?2:1}let c=s;for(let e=1;e<n;++e)o.copyWithin(c,0,s),c+=s;return this.print(o,0,c),!0}sendDeviceAttributesPrimary(e){return e.params[0]>0||(this._is(`xterm`)||this._is(`rxvt-unicode`)||this._is(`screen`)?this._coreService.triggerDataEvent(a.C0.ESC+`[?1;2c`):this._is(`linux`)&&this._coreService.triggerDataEvent(a.C0.ESC+`[?6c`)),!0}sendDeviceAttributesSecondary(e){return e.params[0]>0||(this._is(`xterm`)?this._coreService.triggerDataEvent(a.C0.ESC+`[>0;276;0c`):this._is(`rxvt-unicode`)?this._coreService.triggerDataEvent(a.C0.ESC+`[>85;95;0c`):this._is(`linux`)?this._coreService.triggerDataEvent(e.params[0]+`c`):this._is(`screen`)&&this._coreService.triggerDataEvent(a.C0.ESC+`[>83;40003;0c`)),!0}_is(e){return(this._optionsService.rawOptions.termName+``).indexOf(e)===0}setMode(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0}return!0}setModePrivate(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,o.DEFAULT_CHARSET),this._charsetService.setgCharset(1,o.DEFAULT_CHARSET),this._charsetService.setgCharset(2,o.DEFAULT_CHARSET),this._charsetService.setgCharset(3,o.DEFAULT_CHARSET);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug(`Serial port requested application keypad.`),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol=`X10`;break;case 1e3:this._coreMouseService.activeProtocol=`VT200`;break;case 1002:this._coreMouseService.activeProtocol=`DRAG`;break;case 1003:this._coreMouseService.activeProtocol=`ANY`;break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug(`DECSET 1005 not supported (see #2507)`);break;case 1006:this._coreMouseService.activeEncoding=`SGR`;break;case 1015:this._logService.debug(`DECSET 1015 not supported (see #2507)`);break;case 1016:this._coreMouseService.activeEncoding=`SGR_PIXELS`;break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0}return!0}resetMode(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1}return!0}resetModePrivate(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug(`Switching back to normal keypad.`),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol=`NONE`;break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug(`DECRST 1005 not supported (see #2507)`);break;case 1006:case 1016:this._coreMouseService.activeEncoding=`DEFAULT`;break;case 1015:this._logService.debug(`DECRST 1015 not supported (see #2507)`);break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),e.params[t]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1}return!0}requestMode(e,t){let n=this._coreService.decPrivateModes,{activeProtocol:r,activeEncoding:i}=this._coreMouseService,o=this._coreService,{buffers:s,cols:c}=this._bufferService,{active:l,alt:u}=s,d=this._optionsService.rawOptions,f=e=>e?1:2,p=e.params[0];return m=p,h=t?p===2?4:p===4?f(o.modes.insertMode):p===12?3:p===20?f(d.convertEol):0:p===1?f(n.applicationCursorKeys):p===3?d.windowOptions.setWinLines?c===80?2:+(c===132):0:p===6?f(n.origin):p===7?f(n.wraparound):p===8?3:p===9?f(r===`X10`):p===12?f(d.cursorBlink):p===25?f(!o.isCursorHidden):p===45?f(n.reverseWraparound):p===66?f(n.applicationKeypad):p===67?4:p===1e3?f(r===`VT200`):p===1002?f(r===`DRAG`):p===1003?f(r===`ANY`):p===1004?f(n.sendFocus):p===1005?4:p===1006?f(i===`SGR`):p===1015?4:p===1016?f(i===`SGR_PIXELS`):p===1048?1:p===47||p===1047||p===1049?f(l===u):p===2004?f(n.bracketedPasteMode):0,o.triggerDataEvent(`${a.C0.ESC}[${t?``:`?`}${m};${h}$y`),!0;var m,h}_updateAttrColor(e,t,n,r,i){return t===2?(e|=50331648,e&=-16777216,e|=m.AttributeData.fromColorRGB([n,r,i])):t===5&&(e&=-50331904,e|=33554432|255&n),e}_extractColor(e,t,n){let r=[0,0,-1,0,0,0],i=0,a=0;do{if(r[a+i]=e.params[t+a],e.hasSubParams(t+a)){let n=e.getSubParams(t+a),o=0;do r[1]===5&&(i=1),r[a+o+1+i]=n[o];while(++o<n.length&&o+a+1+i<r.length);break}if(r[1]===5&&a+i>=2||r[1]===2&&a+i>=5)break;r[1]&&(i=1)}while(++a+t<e.length&&a+i<r.length);for(let e=2;e<r.length;++e)r[e]===-1&&(r[e]=0);switch(r[0]){case 38:n.fg=this._updateAttrColor(n.fg,r[1],r[3],r[4],r[5]);break;case 48:n.bg=this._updateAttrColor(n.bg,r[1],r[3],r[4],r[5]);break;case 58:n.extended=n.extended.clone(),n.extended.underlineColor=this._updateAttrColor(n.extended.underlineColor,r[1],r[3],r[4],r[5])}return a}_processUnderline(e,t){t.extended=t.extended.clone(),(!~e||e>5)&&(e=1),t.extended.underlineStyle=e,t.fg|=268435456,e===0&&(t.fg&=-268435457),t.updateExtended()}_processSGR0(e){e.fg=u.DEFAULT_ATTR_DATA.fg,e.bg=u.DEFAULT_ATTR_DATA.bg,e.extended=e.extended.clone(),e.extended.underlineStyle=0,e.extended.underlineColor&=-67108864,e.updateExtended()}charAttributes(e){if(e.length===1&&e.params[0]===0)return this._processSGR0(this._curAttrData),!0;let t=e.length,n,r=this._curAttrData;for(let i=0;i<t;i++)n=e.params[i],n>=30&&n<=37?(r.fg&=-50331904,r.fg|=16777216|n-30):n>=40&&n<=47?(r.bg&=-50331904,r.bg|=16777216|n-40):n>=90&&n<=97?(r.fg&=-50331904,r.fg|=16777224|n-90):n>=100&&n<=107?(r.bg&=-50331904,r.bg|=16777224|n-100):n===0?this._processSGR0(r):n===1?r.fg|=134217728:n===3?r.bg|=67108864:n===4?(r.fg|=268435456,this._processUnderline(e.hasSubParams(i)?e.getSubParams(i)[0]:1,r)):n===5?r.fg|=536870912:n===7?r.fg|=67108864:n===8?r.fg|=1073741824:n===9?r.fg|=2147483648:n===2?r.bg|=134217728:n===21?this._processUnderline(2,r):n===22?(r.fg&=-134217729,r.bg&=-134217729):n===23?r.bg&=-67108865:n===24?(r.fg&=-268435457,this._processUnderline(0,r)):n===25?r.fg&=-536870913:n===27?r.fg&=-67108865:n===28?r.fg&=-1073741825:n===29?r.fg&=2147483647:n===39?(r.fg&=-67108864,r.fg|=16777215&u.DEFAULT_ATTR_DATA.fg):n===49?(r.bg&=-67108864,r.bg|=16777215&u.DEFAULT_ATTR_DATA.bg):n===38||n===48||n===58?i+=this._extractColor(e,i,r):n===53?r.bg|=1073741824:n===55?r.bg&=-1073741825:n===59?(r.extended=r.extended.clone(),r.extended.underlineColor=-1,r.updateExtended()):n===100?(r.fg&=-67108864,r.fg|=16777215&u.DEFAULT_ATTR_DATA.fg,r.bg&=-67108864,r.bg|=16777215&u.DEFAULT_ATTR_DATA.bg):this._logService.debug(`Unknown SGR attribute: %d.`,n);return!0}deviceStatus(e){switch(e.params[0]){case 5:this._coreService.triggerDataEvent(`${a.C0.ESC}[0n`);break;case 6:let e=this._activeBuffer.y+1,t=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${a.C0.ESC}[${e};${t}R`)}return!0}deviceStatusPrivate(e){if(e.params[0]===6){let e=this._activeBuffer.y+1,t=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${a.C0.ESC}[?${e};${t}R`)}return!0}softReset(e){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=u.DEFAULT_ATTR_DATA.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(e){let t=e.params[0]||1;switch(t){case 1:case 2:this._optionsService.options.cursorStyle=`block`;break;case 3:case 4:this._optionsService.options.cursorStyle=`underline`;break;case 5:case 6:this._optionsService.options.cursorStyle=`bar`}let n=t%2==1;return this._optionsService.options.cursorBlink=n,!0}setScrollRegion(e){let t=e.params[0]||1,n;return(e.length<2||(n=e.params[1])>this._bufferService.rows||n===0)&&(n=this._bufferService.rows),n>t&&(this._activeBuffer.scrollTop=t-1,this._activeBuffer.scrollBottom=n-1,this._setCursor(0,0)),!0}windowOptions(e){if(!S(e.params[0],this._optionsService.rawOptions.windowOptions))return!0;let t=e.length>1?e.params[1]:0;switch(e.params[0]){case 14:t!==2&&this._onRequestWindowsOptionsReport.fire(C.GET_WIN_SIZE_PIXELS);break;case 16:this._onRequestWindowsOptionsReport.fire(C.GET_CELL_SIZE_PIXELS);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${a.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:t!==0&&t!==2||(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>10&&this._windowTitleStack.shift()),t!==0&&t!==1||(this._iconNameStack.push(this._iconName),this._iconNameStack.length>10&&this._iconNameStack.shift());break;case 23:t!==0&&t!==2||this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),t!==0&&t!==1||this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop())}return!0}saveCursor(e){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(e){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(e){return this._windowTitle=e,this._onTitleChange.fire(e),!0}setIconName(e){return this._iconName=e,!0}setOrReportIndexedColor(e){let t=[],n=e.split(`;`);for(;n.length>1;){let e=n.shift(),r=n.shift();if(/^\d+$/.exec(e)){let n=parseInt(e);if(D(n))if(r===`?`)t.push({type:0,index:n});else{let e=(0,y.parseColor)(r);e&&t.push({type:1,index:n,color:e})}}}return t.length&&this._onColor.fire(t),!0}setHyperlink(e){let t=e.split(`;`);return!(t.length<2)&&(t[1]?this._createHyperlink(t[0],t[1]):!t[0]&&this._finishHyperlink())}_createHyperlink(e,t){this._getCurrentLinkId()&&this._finishHyperlink();let n=e.split(`:`),r,i=n.findIndex((e=>e.startsWith(`id=`)));return i!==-1&&(r=n[i].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:r,uri:t}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(e,t){let n=e.split(`;`);for(let e=0;e<n.length&&!(t>=this._specialColors.length);++e,++t)if(n[e]===`?`)this._onColor.fire([{type:0,index:this._specialColors[t]}]);else{let r=(0,y.parseColor)(n[e]);r&&this._onColor.fire([{type:1,index:this._specialColors[t],color:r}])}return!0}setOrReportFgColor(e){return this._setOrReportSpecialColor(e,0)}setOrReportBgColor(e){return this._setOrReportSpecialColor(e,1)}setOrReportCursorColor(e){return this._setOrReportSpecialColor(e,2)}restoreIndexedColor(e){if(!e)return this._onColor.fire([{type:2}]),!0;let t=[],n=e.split(`;`);for(let e=0;e<n.length;++e)if(/^\d+$/.exec(n[e])){let r=parseInt(n[e]);D(r)&&t.push({type:2,index:r})}return t.length&&this._onColor.fire(t),!0}restoreFgColor(e){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(e){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(e){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug(`Serial port requested application keypad.`),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug(`Switching back to normal keypad.`),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,o.DEFAULT_CHARSET),!0}selectCharset(e){return e.length===2?(e[0]===`/`||this._charsetService.setgCharset(b[e[0]],o.CHARSETS[e[1]]||o.DEFAULT_CHARSET),!0):(this.selectDefaultCharset(),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){let e=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,e,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=u.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=u.DEFAULT_ATTR_DATA.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=67108863&this._curAttrData.bg,this._eraseAttrDataInternal}setgLevel(e){return this._charsetService.setgLevel(e),!0}screenAlignmentPattern(){let e=new p.CellData;e.content=4194373,e.fg=this._curAttrData.fg,e.bg=this._curAttrData.bg,this._setCursor(0,0);for(let t=0;t<this._bufferService.rows;++t){let n=this._activeBuffer.ybase+this._activeBuffer.y+t,r=this._activeBuffer.lines.get(n);r&&(r.fill(e),r.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(e,t){let n=this._bufferService.buffer,r=this._optionsService.rawOptions;return(e=>(this._coreService.triggerDataEvent(`${a.C0.ESC}${e}${a.C0.ESC}\\`),!0))(e===`"q`?`P1$r${+!!this._curAttrData.isProtected()}"q`:e===`"p`?`P1$r61;1"p`:e===`r`?`P1$r${n.scrollTop+1};${n.scrollBottom+1}r`:e===`m`?`P1$r0m`:e===` q`?`P1$r${{block:2,underline:4,bar:6}[r.cursorStyle]-+!!r.cursorBlink} q`:`P0$r`)}markRangeDirty(e,t){this._dirtyRowTracker.markRangeDirty(e,t)}}t.InputHandler=T;let E=class{constructor(e){this._bufferService=e,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(e){e<this.start?this.start=e:e>this.end&&(this.end=e)}markRangeDirty(e,t){e>t&&(w=e,e=t,t=w),e<this.start&&(this.start=e),t>this.end&&(this.end=t)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};function D(e){return 0<=e&&e<256}E=r([i(0,h.IBufferService)],E)},844:(e,t)=>{function n(e){for(let t of e)t.dispose();e.length=0}Object.defineProperty(t,"__esModule",{value:!0}),t.getDisposeArrayDisposable=t.disposeArray=t.toDisposable=t.MutableDisposable=t.Disposable=void 0,t.Disposable=class{constructor(){this._disposables=[],this._isDisposed=!1}dispose(){this._isDisposed=!0;for(let e of this._disposables)e.dispose();this._disposables.length=0}register(e){return this._disposables.push(e),e}unregister(e){let t=this._disposables.indexOf(e);t!==-1&&this._disposables.splice(t,1)}},t.MutableDisposable=class{constructor(){this._isDisposed=!1}get value(){return this._isDisposed?void 0:this._value}set value(e){this._isDisposed||e===this._value||(this._value?.dispose(),this._value=e)}clear(){this.value=void 0}dispose(){this._isDisposed=!0,this._value?.dispose(),this._value=void 0}},t.toDisposable=function(e){return{dispose:e}},t.disposeArray=n,t.getDisposeArrayDisposable=function(e){return{dispose:()=>n(e)}}},1505:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FourKeyMap=t.TwoKeyMap=void 0;class n{constructor(){this._data={}}set(e,t,n){this._data[e]||(this._data[e]={}),this._data[e][t]=n}get(e,t){return this._data[e]?this._data[e][t]:void 0}clear(){this._data={}}}t.TwoKeyMap=n,t.FourKeyMap=class{constructor(){this._data=new n}set(e,t,r,i,a){this._data.get(e,t)||this._data.set(e,t,new n),this._data.get(e,t).set(r,i,a)}get(e,t,n,r){return this._data.get(e,t)?.get(n,r)}clear(){this._data.clear()}}},6114:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isChromeOS=t.isLinux=t.isWindows=t.isIphone=t.isIpad=t.isMac=t.getSafariVersion=t.isSafari=t.isLegacyEdge=t.isFirefox=t.isNode=void 0,t.isNode=typeof process<`u`&&`title`in process;let n=t.isNode?`node`:navigator.userAgent,r=t.isNode?`node`:navigator.platform;t.isFirefox=n.includes(`Firefox`),t.isLegacyEdge=n.includes(`Edge`),t.isSafari=/^((?!chrome|android).)*safari/i.test(n),t.getSafariVersion=function(){if(!t.isSafari)return 0;let e=n.match(/Version\/(\d+)/);return e===null||e.length<2?0:parseInt(e[1])},t.isMac=[`Macintosh`,`MacIntel`,`MacPPC`,`Mac68K`].includes(r),t.isIpad=r===`iPad`,t.isIphone=r===`iPhone`,t.isWindows=[`Windows`,`Win16`,`Win32`,`WinCE`].includes(r),t.isLinux=r.indexOf(`Linux`)>=0,t.isChromeOS=/\bCrOS\b/.test(n)},6106:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SortedList=void 0;let n=0;t.SortedList=class{constructor(e){this._getKey=e,this._array=[]}clear(){this._array.length=0}insert(e){this._array.length===0?this._array.push(e):(n=this._search(this._getKey(e)),this._array.splice(n,0,e))}delete(e){if(this._array.length===0)return!1;let t=this._getKey(e);if(t===void 0||(n=this._search(t),n===-1)||this._getKey(this._array[n])!==t)return!1;do if(this._array[n]===e)return this._array.splice(n,1),!0;while(++n<this._array.length&&this._getKey(this._array[n])===t);return!1}*getKeyIterator(e){if(this._array.length!==0&&(n=this._search(e),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===e))do yield this._array[n];while(++n<this._array.length&&this._getKey(this._array[n])===e)}forEachByKey(e,t){if(this._array.length!==0&&(n=this._search(e),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===e))do t(this._array[n]);while(++n<this._array.length&&this._getKey(this._array[n])===e)}values(){return[...this._array].values()}_search(e){let t=0,n=this._array.length-1;for(;n>=t;){let r=t+n>>1,i=this._getKey(this._array[r]);if(i>e)n=r-1;else{if(!(i<e)){for(;r>0&&this._getKey(this._array[r-1])===e;)r--;return r}t=r+1}}return t}}},7226:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebouncedIdleTask=t.IdleTaskQueue=t.PriorityTaskQueue=void 0;let r=n(6114);class i{constructor(){this._tasks=[],this._i=0}enqueue(e){this._tasks.push(e),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&=(this._cancelCallback(this._idleCallback),void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||=this._requestCallback(this._process.bind(this))}_process(e){this._idleCallback=void 0;let t=0,n=0,r=e.timeRemaining(),i=0;for(;this._i<this._tasks.length;){if(t=Date.now(),this._tasks[this._i]()||this._i++,t=Math.max(1,Date.now()-t),n=Math.max(t,n),i=e.timeRemaining(),1.5*n>i)return r-t<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r-t))}ms`),void this._start();r=i}this.clear()}}class a extends i{_requestCallback(e){return setTimeout((()=>e(this._createDeadline(16))))}_cancelCallback(e){clearTimeout(e)}_createDeadline(e){let t=Date.now()+e;return{timeRemaining:()=>Math.max(0,t-Date.now())}}}t.PriorityTaskQueue=a,t.IdleTaskQueue=!r.isNode&&`requestIdleCallback`in window?class extends i{_requestCallback(e){return requestIdleCallback(e)}_cancelCallback(e){cancelIdleCallback(e)}}:a,t.DebouncedIdleTask=class{constructor(){this._queue=new t.IdleTaskQueue}set(e){this._queue.clear(),this._queue.enqueue(e)}flush(){this._queue.flush()}}},9282:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateWindowsModeWrappedState=void 0;let r=n(643);t.updateWindowsModeWrappedState=function(e){let t=e.buffer.lines.get(e.buffer.ybase+e.buffer.y-1)?.get(e.cols-1),n=e.buffer.lines.get(e.buffer.ybase+e.buffer.y);n&&t&&(n.isWrapped=t[r.CHAR_DATA_CODE_INDEX]!==r.NULL_CELL_CODE&&t[r.CHAR_DATA_CODE_INDEX]!==r.WHITESPACE_CELL_CODE)}},3734:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ExtendedAttrs=t.AttributeData=void 0;class n{constructor(){this.fg=0,this.bg=0,this.extended=new r}static toColorRGB(e){return[e>>>16&255,e>>>8&255,255&e]}static fromColorRGB(e){return(255&e[0])<<16|(255&e[1])<<8|255&e[2]}clone(){let e=new n;return e.fg=this.fg,e.bg=this.bg,e.extended=this.extended.clone(),e}isInverse(){return 67108864&this.fg}isBold(){return 134217728&this.fg}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:268435456&this.fg}isBlink(){return 536870912&this.fg}isInvisible(){return 1073741824&this.fg}isItalic(){return 67108864&this.bg}isDim(){return 134217728&this.bg}isStrikethrough(){return 2147483648&this.fg}isProtected(){return 536870912&this.bg}isOverline(){return 1073741824&this.bg}getFgColorMode(){return 50331648&this.fg}getBgColorMode(){return 50331648&this.bg}isFgRGB(){return(50331648&this.fg)==50331648}isBgRGB(){return(50331648&this.bg)==50331648}isFgPalette(){return(50331648&this.fg)==16777216||(50331648&this.fg)==33554432}isBgPalette(){return(50331648&this.bg)==16777216||(50331648&this.bg)==33554432}isFgDefault(){return(50331648&this.fg)==0}isBgDefault(){return(50331648&this.bg)==0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(50331648&this.fg){case 16777216:case 33554432:return 255&this.fg;case 50331648:return 16777215&this.fg;default:return-1}}getBgColor(){switch(50331648&this.bg){case 16777216:case 33554432:return 255&this.bg;case 50331648:return 16777215&this.bg;default:return-1}}hasExtendedAttrs(){return 268435456&this.bg}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(268435456&this.bg&&~this.extended.underlineColor)switch(50331648&this.extended.underlineColor){case 16777216:case 33554432:return 255&this.extended.underlineColor;case 50331648:return 16777215&this.extended.underlineColor;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return 268435456&this.bg&&~this.extended.underlineColor?50331648&this.extended.underlineColor:this.getFgColorMode()}isUnderlineColorRGB(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==50331648:this.isFgRGB()}isUnderlineColorPalette(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==16777216||(50331648&this.extended.underlineColor)==33554432:this.isFgPalette()}isUnderlineColorDefault(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==0:this.isFgDefault()}getUnderlineStyle(){return 268435456&this.fg?268435456&this.bg?this.extended.underlineStyle:1:0}getUnderlineVariantOffset(){return this.extended.underlineVariantOffset}}t.AttributeData=n;class r{get ext(){return this._urlId?-469762049&this._ext|this.underlineStyle<<26:this._ext}set ext(e){this._ext=e}get underlineStyle(){return this._urlId?5:(469762048&this._ext)>>26}set underlineStyle(e){this._ext&=-469762049,this._ext|=e<<26&469762048}get underlineColor(){return 67108863&this._ext}set underlineColor(e){this._ext&=-67108864,this._ext|=67108863&e}get urlId(){return this._urlId}set urlId(e){this._urlId=e}get underlineVariantOffset(){let e=(3758096384&this._ext)>>29;return e<0?4294967288^e:e}set underlineVariantOffset(e){this._ext&=536870911,this._ext|=e<<29&3758096384}constructor(e=0,t=0){this._ext=0,this._urlId=0,this._ext=e,this._urlId=t}clone(){return new r(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}}t.ExtendedAttrs=r},9092:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Buffer=t.MAX_BUFFER_SIZE=void 0;let r=n(6349),i=n(7226),a=n(3734),o=n(8437),s=n(4634),c=n(511),l=n(643),u=n(4863),d=n(7116);t.MAX_BUFFER_SIZE=4294967295,t.Buffer=class{constructor(e,t,n){this._hasScrollback=e,this._optionsService=t,this._bufferService=n,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=o.DEFAULT_ATTR_DATA.clone(),this.savedCharset=d.DEFAULT_CHARSET,this.markers=[],this._nullCell=c.CellData.fromCharData([0,l.NULL_CELL_CHAR,l.NULL_CELL_WIDTH,l.NULL_CELL_CODE]),this._whitespaceCell=c.CellData.fromCharData([0,l.WHITESPACE_CELL_CHAR,l.WHITESPACE_CELL_WIDTH,l.WHITESPACE_CELL_CODE]),this._isClearing=!1,this._memoryCleanupQueue=new i.IdleTaskQueue,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new r.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(e){return e?(this._nullCell.fg=e.fg,this._nullCell.bg=e.bg,this._nullCell.extended=e.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new a.ExtendedAttrs),this._nullCell}getWhitespaceCell(e){return e?(this._whitespaceCell.fg=e.fg,this._whitespaceCell.bg=e.bg,this._whitespaceCell.extended=e.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new a.ExtendedAttrs),this._whitespaceCell}getBlankLine(e,t){return new o.BufferLine(this._bufferService.cols,this.getNullCell(e),t)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){let e=this.ybase+this.y-this.ydisp;return e>=0&&e<this._rows}_getCorrectBufferLength(e){if(!this._hasScrollback)return e;let n=e+this._optionsService.rawOptions.scrollback;return n>t.MAX_BUFFER_SIZE?t.MAX_BUFFER_SIZE:n}fillViewportRows(e){if(this.lines.length===0){e===void 0&&(e=o.DEFAULT_ATTR_DATA);let t=this._rows;for(;t--;)this.lines.push(this.getBlankLine(e))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new r.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(e,t){let n=this.getNullCell(o.DEFAULT_ATTR_DATA),r=0,i=this._getCorrectBufferLength(t);if(i>this.lines.maxLength&&(this.lines.maxLength=i),this.lines.length>0){if(this._cols<e)for(let t=0;t<this.lines.length;t++)r+=+this.lines.get(t).resize(e,n);let a=0;if(this._rows<t)for(let r=this._rows;r<t;r++)this.lines.length<t+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new o.BufferLine(e,n)):this.ybase>0&&this.lines.length<=this.ybase+this.y+a+1?(this.ybase--,a++,this.ydisp>0&&this.ydisp--):this.lines.push(new o.BufferLine(e,n)));else for(let e=this._rows;e>t;e--)this.lines.length>t+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(i<this.lines.maxLength){let e=this.lines.length-i;e>0&&(this.lines.trimStart(e),this.ybase=Math.max(this.ybase-e,0),this.ydisp=Math.max(this.ydisp-e,0),this.savedY=Math.max(this.savedY-e,0)),this.lines.maxLength=i}this.x=Math.min(this.x,e-1),this.y=Math.min(this.y,t-1),a&&(this.y+=a),this.savedX=Math.min(this.savedX,e-1),this.scrollTop=0}if(this.scrollBottom=t-1,this._isReflowEnabled&&(this._reflow(e,t),this._cols>e))for(let t=0;t<this.lines.length;t++)r+=+this.lines.get(t).resize(e,n);this._cols=e,this._rows=t,this._memoryCleanupQueue.clear(),r>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue((()=>this._batchedMemoryCleanup())))}_batchedMemoryCleanup(){let e=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,e=!1);let t=0;for(;this._memoryCleanupPosition<this.lines.length;)if(t+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),t>100)return!0;return e}get _isReflowEnabled(){let e=this._optionsService.rawOptions.windowsPty;return e&&e.buildNumber?this._hasScrollback&&e.backend===`conpty`&&e.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(e,t){this._cols!==e&&(e>this._cols?this._reflowLarger(e,t):this._reflowSmaller(e,t))}_reflowLarger(e,t){let n=(0,s.reflowLargerGetLinesToRemove)(this.lines,this._cols,e,this.ybase+this.y,this.getNullCell(o.DEFAULT_ATTR_DATA));if(n.length>0){let r=(0,s.reflowLargerCreateNewLayout)(this.lines,n);(0,s.reflowLargerApplyNewLayout)(this.lines,r.layout),this._reflowLargerAdjustViewport(e,t,r.countRemoved)}}_reflowLargerAdjustViewport(e,t,n){let r=this.getNullCell(o.DEFAULT_ATTR_DATA),i=n;for(;i-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<t&&this.lines.push(new o.BufferLine(e,r))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-n,0)}_reflowSmaller(e,t){let n=this.getNullCell(o.DEFAULT_ATTR_DATA),r=[],i=0;for(let a=this.lines.length-1;a>=0;a--){let c=this.lines.get(a);if(!c||!c.isWrapped&&c.getTrimmedLength()<=e)continue;let l=[c];for(;c.isWrapped&&a>0;)c=this.lines.get(--a),l.unshift(c);let u=this.ybase+this.y;if(u>=a&&u<a+l.length)continue;let d=l[l.length-1].getTrimmedLength(),f=(0,s.reflowSmallerGetNewLineLengths)(l,this._cols,e),p=f.length-l.length,m;m=this.ybase===0&&this.y!==this.lines.length-1?Math.max(0,this.y-this.lines.maxLength+p):Math.max(0,this.lines.length-this.lines.maxLength+p);let h=[];for(let e=0;e<p;e++){let e=this.getBlankLine(o.DEFAULT_ATTR_DATA,!0);h.push(e)}h.length>0&&(r.push({start:a+l.length+i,newLines:h}),i+=h.length),l.push(...h);let g=f.length-1,_=f[g];_===0&&(g--,_=f[g]);let v=l.length-p-1,y=d;for(;v>=0;){let e=Math.min(y,_);if(l[g]===void 0)break;if(l[g].copyCellsFrom(l[v],y-e,_-e,e,!0),_-=e,_===0&&(g--,_=f[g]),y-=e,y===0){v--;let e=Math.max(v,0);y=(0,s.getWrappedLineTrimmedLength)(l,e,this._cols)}}for(let t=0;t<l.length;t++)f[t]<e&&l[t].setCell(f[t],n);let b=p-m;for(;b-- >0;)this.ybase===0?this.y<t-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+i)-t&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+p,this.ybase+t-1)}if(r.length>0){let e=[],t=[];for(let e=0;e<this.lines.length;e++)t.push(this.lines.get(e));let n=this.lines.length,a=n-1,o=0,s=r[o];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+i);let c=0;for(let l=Math.min(this.lines.maxLength-1,n+i-1);l>=0;l--)if(s&&s.start>a+c){for(let e=s.newLines.length-1;e>=0;e--)this.lines.set(l--,s.newLines[e]);l++,e.push({index:a+1,amount:s.newLines.length}),c+=s.newLines.length,s=r[++o]}else this.lines.set(l,t[a--]);let l=0;for(let t=e.length-1;t>=0;t--)e[t].index+=l,this.lines.onInsertEmitter.fire(e[t]),l+=e[t].amount;let u=Math.max(0,n+i-this.lines.maxLength);u>0&&this.lines.onTrimEmitter.fire(u)}}translateBufferLineToString(e,t,n=0,r){let i=this.lines.get(e);return i?i.translateToString(t,n,r):``}getWrappedRangeForLine(e){let t=e,n=e;for(;t>0&&this.lines.get(t).isWrapped;)t--;for(;n+1<this.lines.length&&this.lines.get(n+1).isWrapped;)n++;return{first:t,last:n}}setupTabStops(e){for(e==null?(this.tabs={},e=0):this.tabs[e]||(e=this.prevStop(e));e<this._cols;e+=this._optionsService.rawOptions.tabStopWidth)this.tabs[e]=!0}prevStop(e){for(e??=this.x;!this.tabs[--e]&&e>0;);return e>=this._cols?this._cols-1:e<0?0:e}nextStop(e){for(e??=this.x;!this.tabs[++e]&&e<this._cols;);return e>=this._cols?this._cols-1:e<0?0:e}clearMarkers(e){this._isClearing=!0;for(let t=0;t<this.markers.length;t++)this.markers[t].line===e&&(this.markers[t].dispose(),this.markers.splice(t--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let e=0;e<this.markers.length;e++)this.markers[e].dispose(),this.markers.splice(e--,1);this._isClearing=!1}addMarker(e){let t=new u.Marker(e);return this.markers.push(t),t.register(this.lines.onTrim((e=>{t.line-=e,t.line<0&&t.dispose()}))),t.register(this.lines.onInsert((e=>{t.line>=e.index&&(t.line+=e.amount)}))),t.register(this.lines.onDelete((e=>{t.line>=e.index&&t.line<e.index+e.amount&&t.dispose(),t.line>e.index&&(t.line-=e.amount)}))),t.register(t.onDispose((()=>this._removeMarker(t)))),t}_removeMarker(e){this._isClearing||this.markers.splice(this.markers.indexOf(e),1)}}},8437:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BufferLine=t.DEFAULT_ATTR_DATA=void 0;let r=n(3734),i=n(511),a=n(643),o=n(482);t.DEFAULT_ATTR_DATA=Object.freeze(new r.AttributeData);let s=0;class c{constructor(e,t,n=!1){this.isWrapped=n,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(3*e);let r=t||i.CellData.fromCharData([0,a.NULL_CELL_CHAR,a.NULL_CELL_WIDTH,a.NULL_CELL_CODE]);for(let t=0;t<e;++t)this.setCell(t,r);this.length=e}get(e){let t=this._data[3*e+0],n=2097151&t;return[this._data[3*e+1],2097152&t?this._combined[e]:n?(0,o.stringFromCodePoint)(n):``,t>>22,2097152&t?this._combined[e].charCodeAt(this._combined[e].length-1):n]}set(e,t){this._data[3*e+1]=t[a.CHAR_DATA_ATTR_INDEX],t[a.CHAR_DATA_CHAR_INDEX].length>1?(this._combined[e]=t[1],this._data[3*e+0]=2097152|e|t[a.CHAR_DATA_WIDTH_INDEX]<<22):this._data[3*e+0]=t[a.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|t[a.CHAR_DATA_WIDTH_INDEX]<<22}getWidth(e){return this._data[3*e+0]>>22}hasWidth(e){return 12582912&this._data[3*e+0]}getFg(e){return this._data[3*e+1]}getBg(e){return this._data[3*e+2]}hasContent(e){return 4194303&this._data[3*e+0]}getCodePoint(e){let t=this._data[3*e+0];return 2097152&t?this._combined[e].charCodeAt(this._combined[e].length-1):2097151&t}isCombined(e){return 2097152&this._data[3*e+0]}getString(e){let t=this._data[3*e+0];return 2097152&t?this._combined[e]:2097151&t?(0,o.stringFromCodePoint)(2097151&t):``}isProtected(e){return 536870912&this._data[3*e+2]}loadCell(e,t){return s=3*e,t.content=this._data[s+0],t.fg=this._data[s+1],t.bg=this._data[s+2],2097152&t.content&&(t.combinedData=this._combined[e]),268435456&t.bg&&(t.extended=this._extendedAttrs[e]),t}setCell(e,t){2097152&t.content&&(this._combined[e]=t.combinedData),268435456&t.bg&&(this._extendedAttrs[e]=t.extended),this._data[3*e+0]=t.content,this._data[3*e+1]=t.fg,this._data[3*e+2]=t.bg}setCellFromCodepoint(e,t,n,r){268435456&r.bg&&(this._extendedAttrs[e]=r.extended),this._data[3*e+0]=t|n<<22,this._data[3*e+1]=r.fg,this._data[3*e+2]=r.bg}addCodepointToCell(e,t,n){let r=this._data[3*e+0];2097152&r?this._combined[e]+=(0,o.stringFromCodePoint)(t):2097151&r?(this._combined[e]=(0,o.stringFromCodePoint)(2097151&r)+(0,o.stringFromCodePoint)(t),r&=-2097152,r|=2097152):r=t|1<<22,n&&(r&=-12582913,r|=n<<22),this._data[3*e+0]=r}insertCells(e,t,n){if((e%=this.length)&&this.getWidth(e-1)===2&&this.setCellFromCodepoint(e-1,0,1,n),t<this.length-e){let r=new i.CellData;for(let n=this.length-e-t-1;n>=0;--n)this.setCell(e+t+n,this.loadCell(e+n,r));for(let r=0;r<t;++r)this.setCell(e+r,n)}else for(let t=e;t<this.length;++t)this.setCell(t,n);this.getWidth(this.length-1)===2&&this.setCellFromCodepoint(this.length-1,0,1,n)}deleteCells(e,t,n){if(e%=this.length,t<this.length-e){let r=new i.CellData;for(let n=0;n<this.length-e-t;++n)this.setCell(e+n,this.loadCell(e+t+n,r));for(let e=this.length-t;e<this.length;++e)this.setCell(e,n)}else for(let t=e;t<this.length;++t)this.setCell(t,n);e&&this.getWidth(e-1)===2&&this.setCellFromCodepoint(e-1,0,1,n),this.getWidth(e)!==0||this.hasContent(e)||this.setCellFromCodepoint(e,0,1,n)}replaceCells(e,t,n,r=!1){if(r)for(e&&this.getWidth(e-1)===2&&!this.isProtected(e-1)&&this.setCellFromCodepoint(e-1,0,1,n),t<this.length&&this.getWidth(t-1)===2&&!this.isProtected(t)&&this.setCellFromCodepoint(t,0,1,n);e<t&&e<this.length;)this.isProtected(e)||this.setCell(e,n),e++;else for(e&&this.getWidth(e-1)===2&&this.setCellFromCodepoint(e-1,0,1,n),t<this.length&&this.getWidth(t-1)===2&&this.setCellFromCodepoint(t,0,1,n);e<t&&e<this.length;)this.setCell(e++,n)}resize(e,t){if(e===this.length)return 4*this._data.length*2<this._data.buffer.byteLength;let n=3*e;if(e>this.length){if(this._data.buffer.byteLength>=4*n)this._data=new Uint32Array(this._data.buffer,0,n);else{let e=new Uint32Array(n);e.set(this._data),this._data=e}for(let n=this.length;n<e;++n)this.setCell(n,t)}else{this._data=this._data.subarray(0,n);let t=Object.keys(this._combined);for(let n=0;n<t.length;n++){let r=parseInt(t[n],10);r>=e&&delete this._combined[r]}let r=Object.keys(this._extendedAttrs);for(let t=0;t<r.length;t++){let n=parseInt(r[t],10);n>=e&&delete this._extendedAttrs[n]}}return this.length=e,4*n*2<this._data.buffer.byteLength}cleanupMemory(){if(4*this._data.length*2<this._data.buffer.byteLength){let e=new Uint32Array(this._data.length);return e.set(this._data),this._data=e,1}return 0}fill(e,t=!1){if(t)for(let t=0;t<this.length;++t)this.isProtected(t)||this.setCell(t,e);else{this._combined={},this._extendedAttrs={};for(let t=0;t<this.length;++t)this.setCell(t,e)}}copyFrom(e){this.length===e.length?this._data.set(e._data):this._data=new Uint32Array(e._data),this.length=e.length,this._combined={};for(let t in e._combined)this._combined[t]=e._combined[t];this._extendedAttrs={};for(let t in e._extendedAttrs)this._extendedAttrs[t]=e._extendedAttrs[t];this.isWrapped=e.isWrapped}clone(){let e=new c(0);e._data=new Uint32Array(this._data),e.length=this.length;for(let t in this._combined)e._combined[t]=this._combined[t];for(let t in this._extendedAttrs)e._extendedAttrs[t]=this._extendedAttrs[t];return e.isWrapped=this.isWrapped,e}getTrimmedLength(){for(let e=this.length-1;e>=0;--e)if(4194303&this._data[3*e+0])return e+(this._data[3*e+0]>>22);return 0}getNoBgTrimmedLength(){for(let e=this.length-1;e>=0;--e)if(4194303&this._data[3*e+0]||50331648&this._data[3*e+2])return e+(this._data[3*e+0]>>22);return 0}copyCellsFrom(e,t,n,r,i){let a=e._data;if(i)for(let i=r-1;i>=0;i--){for(let e=0;e<3;e++)this._data[3*(n+i)+e]=a[3*(t+i)+e];268435456&a[3*(t+i)+2]&&(this._extendedAttrs[n+i]=e._extendedAttrs[t+i])}else for(let i=0;i<r;i++){for(let e=0;e<3;e++)this._data[3*(n+i)+e]=a[3*(t+i)+e];268435456&a[3*(t+i)+2]&&(this._extendedAttrs[n+i]=e._extendedAttrs[t+i])}let o=Object.keys(e._combined);for(let r=0;r<o.length;r++){let i=parseInt(o[r],10);i>=t&&(this._combined[i-t+n]=e._combined[i])}}translateToString(e,t,n,r){t??=0,n??=this.length,e&&(n=Math.min(n,this.getTrimmedLength())),r&&(r.length=0);let i=``;for(;t<n;){let e=this._data[3*t+0],n=2097151&e,s=2097152&e?this._combined[t]:n?(0,o.stringFromCodePoint)(n):a.WHITESPACE_CELL_CHAR;if(i+=s,r)for(let e=0;e<s.length;++e)r.push(t);t+=e>>22||1}return r&&r.push(t),i}}t.BufferLine=c},4841:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getRangeLength=void 0,t.getRangeLength=function(e,t){if(e.start.y>e.end.y)throw Error(`Buffer range end (${e.end.x}, ${e.end.y}) cannot be before start (${e.start.x}, ${e.start.y})`);return t*(e.end.y-e.start.y)+(e.end.x-e.start.x+1)}},4634:(e,t)=>{function n(e,t,n){if(t===e.length-1)return e[t].getTrimmedLength();let r=!e[t].hasContent(n-1)&&e[t].getWidth(n-1)===1,i=e[t+1].getWidth(0)===2;return r&&i?n-1:n}Object.defineProperty(t,"__esModule",{value:!0}),t.getWrappedLineTrimmedLength=t.reflowSmallerGetNewLineLengths=t.reflowLargerApplyNewLayout=t.reflowLargerCreateNewLayout=t.reflowLargerGetLinesToRemove=void 0,t.reflowLargerGetLinesToRemove=function(e,t,r,i,a){let o=[];for(let s=0;s<e.length-1;s++){let c=s,l=e.get(++c);if(!l.isWrapped)continue;let u=[e.get(s)];for(;c<e.length&&l.isWrapped;)u.push(l),l=e.get(++c);if(i>=s&&i<c){s+=u.length-1;continue}let d=0,f=n(u,d,t),p=1,m=0;for(;p<u.length;){let e=n(u,p,t),i=e-m,o=r-f,s=Math.min(i,o);u[d].copyCellsFrom(u[p],m,f,s,!1),f+=s,f===r&&(d++,f=0),m+=s,m===e&&(p++,m=0),f===0&&d!==0&&u[d-1].getWidth(r-1)===2&&(u[d].copyCellsFrom(u[d-1],r-1,f++,1,!1),u[d-1].setCell(r-1,a))}u[d].replaceCells(f,r,a);let h=0;for(let e=u.length-1;e>0&&(e>d||u[e].getTrimmedLength()===0);e--)h++;h>0&&(o.push(s+u.length-h),o.push(h)),s+=u.length-1}return o},t.reflowLargerCreateNewLayout=function(e,t){let n=[],r=0,i=t[r],a=0;for(let o=0;o<e.length;o++)if(i===o){let n=t[++r];e.onDeleteEmitter.fire({index:o-a,amount:n}),o+=n-1,a+=n,i=t[++r]}else n.push(o);return{layout:n,countRemoved:a}},t.reflowLargerApplyNewLayout=function(e,t){let n=[];for(let r=0;r<t.length;r++)n.push(e.get(t[r]));for(let t=0;t<n.length;t++)e.set(t,n[t]);e.length=t.length},t.reflowSmallerGetNewLineLengths=function(e,t,r){let i=[],a=e.map(((r,i)=>n(e,i,t))).reduce(((e,t)=>e+t)),o=0,s=0,c=0;for(;c<a;){if(a-c<r){i.push(a-c);break}o+=r;let l=n(e,s,t);o>l&&(o-=l,s++);let u=e[s].getWidth(o-1)===2;u&&o--;let d=u?r-1:r;i.push(d),c+=d}return i},t.getWrappedLineTrimmedLength=n},5295:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BufferSet=void 0;let r=n(8460),i=n(844),a=n(9092);class o extends i.Disposable{constructor(e,t){super(),this._optionsService=e,this._bufferService=t,this._onBufferActivate=this.register(new r.EventEmitter),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this.register(this._optionsService.onSpecificOptionChange(`scrollback`,(()=>this.resize(this._bufferService.cols,this._bufferService.rows)))),this.register(this._optionsService.onSpecificOptionChange(`tabStopWidth`,(()=>this.setupTabStops())))}reset(){this._normal=new a.Buffer(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new a.Buffer(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(e){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(e),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(e,t){this._normal.resize(e,t),this._alt.resize(e,t),this.setupTabStops(e)}setupTabStops(e){this._normal.setupTabStops(e),this._alt.setupTabStops(e)}}t.BufferSet=o},511:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellData=void 0;let r=n(482),i=n(643),a=n(3734);class o extends a.AttributeData{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new a.ExtendedAttrs,this.combinedData=``}static fromCharData(e){let t=new o;return t.setFromCharData(e),t}isCombined(){return 2097152&this.content}getWidth(){return this.content>>22}getChars(){return 2097152&this.content?this.combinedData:2097151&this.content?(0,r.stringFromCodePoint)(2097151&this.content):``}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):2097151&this.content}setFromCharData(e){this.fg=e[i.CHAR_DATA_ATTR_INDEX],this.bg=0;let t=!1;if(e[i.CHAR_DATA_CHAR_INDEX].length>2)t=!0;else if(e[i.CHAR_DATA_CHAR_INDEX].length===2){let n=e[i.CHAR_DATA_CHAR_INDEX].charCodeAt(0);if(55296<=n&&n<=56319){let r=e[i.CHAR_DATA_CHAR_INDEX].charCodeAt(1);56320<=r&&r<=57343?this.content=1024*(n-55296)+r-56320+65536|e[i.CHAR_DATA_WIDTH_INDEX]<<22:t=!0}else t=!0}else this.content=e[i.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|e[i.CHAR_DATA_WIDTH_INDEX]<<22;t&&(this.combinedData=e[i.CHAR_DATA_CHAR_INDEX],this.content=2097152|e[i.CHAR_DATA_WIDTH_INDEX]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}t.CellData=o},643:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WHITESPACE_CELL_CODE=t.WHITESPACE_CELL_WIDTH=t.WHITESPACE_CELL_CHAR=t.NULL_CELL_CODE=t.NULL_CELL_WIDTH=t.NULL_CELL_CHAR=t.CHAR_DATA_CODE_INDEX=t.CHAR_DATA_WIDTH_INDEX=t.CHAR_DATA_CHAR_INDEX=t.CHAR_DATA_ATTR_INDEX=t.DEFAULT_EXT=t.DEFAULT_ATTR=t.DEFAULT_COLOR=void 0,t.DEFAULT_COLOR=0,t.DEFAULT_ATTR=256|t.DEFAULT_COLOR<<9,t.DEFAULT_EXT=0,t.CHAR_DATA_ATTR_INDEX=0,t.CHAR_DATA_CHAR_INDEX=1,t.CHAR_DATA_WIDTH_INDEX=2,t.CHAR_DATA_CODE_INDEX=3,t.NULL_CELL_CHAR=``,t.NULL_CELL_WIDTH=1,t.NULL_CELL_CODE=0,t.WHITESPACE_CELL_CHAR=` `,t.WHITESPACE_CELL_WIDTH=1,t.WHITESPACE_CELL_CODE=32},4863:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Marker=void 0;let r=n(8460),i=n(844);class a{get id(){return this._id}constructor(e){this.line=e,this.isDisposed=!1,this._disposables=[],this._id=a._nextId++,this._onDispose=this.register(new r.EventEmitter),this.onDispose=this._onDispose.event}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),(0,i.disposeArray)(this._disposables),this._disposables.length=0)}register(e){return this._disposables.push(e),e}}t.Marker=a,a._nextId=1},7116:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_CHARSET=t.CHARSETS=void 0,t.CHARSETS={},t.DEFAULT_CHARSET=t.CHARSETS.B,t.CHARSETS[0]={"`":`◆`,a:`▒`,b:`␉`,c:`␌`,d:`␍`,e:`␊`,f:`°`,g:`±`,h:`␤`,i:`␋`,j:`┘`,k:`┐`,l:`┌`,m:`└`,n:`┼`,o:`⎺`,p:`⎻`,q:`─`,r:`⎼`,s:`⎽`,t:`├`,u:`┤`,v:`┴`,w:`┬`,x:`│`,y:`≤`,z:`≥`,"{":`π`,"|":`≠`,"}":`£`,"~":`·`},t.CHARSETS.A={"#":`£`},t.CHARSETS.B=void 0,t.CHARSETS[4]={"#":`£`,"@":`¾`,"[":`ij`,"\\":`½`,"]":`|`,"{":`¨`,"|":`f`,"}":`¼`,"~":`´`},t.CHARSETS.C=t.CHARSETS[5]={"[":`Ä`,"\\":`Ö`,"]":`Å`,"^":`Ü`,"`":`é`,"{":`ä`,"|":`ö`,"}":`å`,"~":`ü`},t.CHARSETS.R={"#":`£`,"@":`à`,"[":`°`,"\\":`ç`,"]":`§`,"{":`é`,"|":`ù`,"}":`è`,"~":`¨`},t.CHARSETS.Q={"@":`à`,"[":`â`,"\\":`ç`,"]":`ê`,"^":`î`,"`":`ô`,"{":`é`,"|":`ù`,"}":`è`,"~":`û`},t.CHARSETS.K={"@":`§`,"[":`Ä`,"\\":`Ö`,"]":`Ü`,"{":`ä`,"|":`ö`,"}":`ü`,"~":`ß`},t.CHARSETS.Y={"#":`£`,"@":`§`,"[":`°`,"\\":`ç`,"]":`é`,"`":`ù`,"{":`à`,"|":`ò`,"}":`è`,"~":`ì`},t.CHARSETS.E=t.CHARSETS[6]={"@":`Ä`,"[":`Æ`,"\\":`Ø`,"]":`Å`,"^":`Ü`,"`":`ä`,"{":`æ`,"|":`ø`,"}":`å`,"~":`ü`},t.CHARSETS.Z={"#":`£`,"@":`§`,"[":`¡`,"\\":`Ñ`,"]":`¿`,"{":`°`,"|":`ñ`,"}":`ç`},t.CHARSETS.H=t.CHARSETS[7]={"@":`É`,"[":`Ä`,"\\":`Ö`,"]":`Å`,"^":`Ü`,"`":`é`,"{":`ä`,"|":`ö`,"}":`å`,"~":`ü`},t.CHARSETS[`=`]={"#":`ù`,"@":`à`,"[":`é`,"\\":`ç`,"]":`ê`,"^":`î`,_:`è`,"`":`ô`,"{":`ä`,"|":`ö`,"}":`ü`,"~":`û`}},2584:(e,t)=>{var n,r,i;Object.defineProperty(t,"__esModule",{value:!0}),t.C1_ESCAPED=t.C1=t.C0=void 0,function(e){e.NUL=`\0`,e.SOH=``,e.STX=``,e.ETX=``,e.EOT=``,e.ENQ=``,e.ACK=``,e.BEL=`\x07`,e.BS=`\b`,e.HT=`	`,e.LF=`
`,e.VT=`\v`,e.FF=`\f`,e.CR=`\r`,e.SO=``,e.SI=``,e.DLE=``,e.DC1=``,e.DC2=``,e.DC3=``,e.DC4=``,e.NAK=``,e.SYN=``,e.ETB=``,e.CAN=``,e.EM=``,e.SUB=``,e.ESC=`\x1B`,e.FS=``,e.GS=``,e.RS=``,e.US=``,e.SP=` `,e.DEL=``}(n||(t.C0=n={})),function(e){e.PAD=``,e.HOP=``,e.BPH=``,e.NBH=``,e.IND=``,e.NEL=``,e.SSA=``,e.ESA=``,e.HTS=``,e.HTJ=``,e.VTS=``,e.PLD=``,e.PLU=``,e.RI=``,e.SS2=``,e.SS3=``,e.DCS=``,e.PU1=``,e.PU2=``,e.STS=``,e.CCH=``,e.MW=``,e.SPA=``,e.EPA=``,e.SOS=``,e.SGCI=``,e.SCI=``,e.CSI=``,e.ST=``,e.OSC=``,e.PM=``,e.APC=``}(r||(t.C1=r={})),function(e){e.ST=`${n.ESC}\\`}(i||(t.C1_ESCAPED=i={}))},7399:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.evaluateKeyboardEvent=void 0;let r=n(2584),i={48:[`0`,`)`],49:[`1`,`!`],50:[`2`,`@`],51:[`3`,`#`],52:[`4`,`$`],53:[`5`,`%`],54:[`6`,`^`],55:[`7`,`&`],56:[`8`,`*`],57:[`9`,`(`],186:[`;`,`:`],187:[`=`,`+`],188:[`,`,`<`],189:[`-`,`_`],190:[`.`,`>`],191:[`/`,`?`],192:["`",`~`],219:[`[`,`{`],220:[`\\`,`|`],221:[`]`,`}`],222:[`'`,`"`]};t.evaluateKeyboardEvent=function(e,t,n,a){let o={type:0,cancel:!1,key:void 0},s=!!e.shiftKey|(e.altKey?2:0)|(e.ctrlKey?4:0)|(e.metaKey?8:0);switch(e.keyCode){case 0:e.key===`UIKeyInputUpArrow`?o.key=t?r.C0.ESC+`OA`:r.C0.ESC+`[A`:e.key===`UIKeyInputLeftArrow`?o.key=t?r.C0.ESC+`OD`:r.C0.ESC+`[D`:e.key===`UIKeyInputRightArrow`?o.key=t?r.C0.ESC+`OC`:r.C0.ESC+`[C`:e.key===`UIKeyInputDownArrow`&&(o.key=t?r.C0.ESC+`OB`:r.C0.ESC+`[B`);break;case 8:o.key=e.ctrlKey?`\b`:r.C0.DEL,e.altKey&&(o.key=r.C0.ESC+o.key);break;case 9:if(e.shiftKey){o.key=r.C0.ESC+`[Z`;break}o.key=r.C0.HT,o.cancel=!0;break;case 13:o.key=e.altKey?r.C0.ESC+r.C0.CR:r.C0.CR,o.cancel=!0;break;case 27:o.key=r.C0.ESC,e.altKey&&(o.key=r.C0.ESC+r.C0.ESC),o.cancel=!0;break;case 37:if(e.metaKey)break;s?(o.key=r.C0.ESC+`[1;`+(s+1)+`D`,o.key===r.C0.ESC+`[1;3D`&&(o.key=r.C0.ESC+(n?`b`:`[1;5D`))):o.key=t?r.C0.ESC+`OD`:r.C0.ESC+`[D`;break;case 39:if(e.metaKey)break;s?(o.key=r.C0.ESC+`[1;`+(s+1)+`C`,o.key===r.C0.ESC+`[1;3C`&&(o.key=r.C0.ESC+(n?`f`:`[1;5C`))):o.key=t?r.C0.ESC+`OC`:r.C0.ESC+`[C`;break;case 38:if(e.metaKey)break;s?(o.key=r.C0.ESC+`[1;`+(s+1)+`A`,n||o.key!==r.C0.ESC+`[1;3A`||(o.key=r.C0.ESC+`[1;5A`)):o.key=t?r.C0.ESC+`OA`:r.C0.ESC+`[A`;break;case 40:if(e.metaKey)break;s?(o.key=r.C0.ESC+`[1;`+(s+1)+`B`,n||o.key!==r.C0.ESC+`[1;3B`||(o.key=r.C0.ESC+`[1;5B`)):o.key=t?r.C0.ESC+`OB`:r.C0.ESC+`[B`;break;case 45:e.shiftKey||e.ctrlKey||(o.key=r.C0.ESC+`[2~`);break;case 46:o.key=s?r.C0.ESC+`[3;`+(s+1)+`~`:r.C0.ESC+`[3~`;break;case 36:o.key=s?r.C0.ESC+`[1;`+(s+1)+`H`:t?r.C0.ESC+`OH`:r.C0.ESC+`[H`;break;case 35:o.key=s?r.C0.ESC+`[1;`+(s+1)+`F`:t?r.C0.ESC+`OF`:r.C0.ESC+`[F`;break;case 33:e.shiftKey?o.type=2:e.ctrlKey?o.key=r.C0.ESC+`[5;`+(s+1)+`~`:o.key=r.C0.ESC+`[5~`;break;case 34:e.shiftKey?o.type=3:e.ctrlKey?o.key=r.C0.ESC+`[6;`+(s+1)+`~`:o.key=r.C0.ESC+`[6~`;break;case 112:o.key=s?r.C0.ESC+`[1;`+(s+1)+`P`:r.C0.ESC+`OP`;break;case 113:o.key=s?r.C0.ESC+`[1;`+(s+1)+`Q`:r.C0.ESC+`OQ`;break;case 114:o.key=s?r.C0.ESC+`[1;`+(s+1)+`R`:r.C0.ESC+`OR`;break;case 115:o.key=s?r.C0.ESC+`[1;`+(s+1)+`S`:r.C0.ESC+`OS`;break;case 116:o.key=s?r.C0.ESC+`[15;`+(s+1)+`~`:r.C0.ESC+`[15~`;break;case 117:o.key=s?r.C0.ESC+`[17;`+(s+1)+`~`:r.C0.ESC+`[17~`;break;case 118:o.key=s?r.C0.ESC+`[18;`+(s+1)+`~`:r.C0.ESC+`[18~`;break;case 119:o.key=s?r.C0.ESC+`[19;`+(s+1)+`~`:r.C0.ESC+`[19~`;break;case 120:o.key=s?r.C0.ESC+`[20;`+(s+1)+`~`:r.C0.ESC+`[20~`;break;case 121:o.key=s?r.C0.ESC+`[21;`+(s+1)+`~`:r.C0.ESC+`[21~`;break;case 122:o.key=s?r.C0.ESC+`[23;`+(s+1)+`~`:r.C0.ESC+`[23~`;break;case 123:o.key=s?r.C0.ESC+`[24;`+(s+1)+`~`:r.C0.ESC+`[24~`;break;default:if(!e.ctrlKey||e.shiftKey||e.altKey||e.metaKey)if(n&&!a||!e.altKey||e.metaKey)!n||e.altKey||e.ctrlKey||e.shiftKey||!e.metaKey?e.key&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.keyCode>=48&&e.key.length===1?o.key=e.key:e.key&&e.ctrlKey&&(e.key===`_`&&(o.key=r.C0.US),e.key===`@`&&(o.key=r.C0.NUL)):e.keyCode===65&&(o.type=1);else{let t=i[e.keyCode]?.[+!!e.shiftKey];if(t)o.key=r.C0.ESC+t;else if(e.keyCode>=65&&e.keyCode<=90){let t=e.ctrlKey?e.keyCode-64:e.keyCode+32,n=String.fromCharCode(t);e.shiftKey&&(n=n.toUpperCase()),o.key=r.C0.ESC+n}else if(e.keyCode===32)o.key=r.C0.ESC+(e.ctrlKey?r.C0.NUL:` `);else if(e.key===`Dead`&&e.code.startsWith(`Key`)){let t=e.code.slice(3,4);e.shiftKey||(t=t.toLowerCase()),o.key=r.C0.ESC+t,o.cancel=!0}}else e.keyCode>=65&&e.keyCode<=90?o.key=String.fromCharCode(e.keyCode-64):e.keyCode===32?o.key=r.C0.NUL:e.keyCode>=51&&e.keyCode<=55?o.key=String.fromCharCode(e.keyCode-51+27):e.keyCode===56?o.key=r.C0.DEL:e.keyCode===219?o.key=r.C0.ESC:e.keyCode===220?o.key=r.C0.FS:e.keyCode===221&&(o.key=r.C0.GS)}return o}},482:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Utf8ToUtf32=t.StringToUtf32=t.utf32ToString=t.stringFromCodePoint=void 0,t.stringFromCodePoint=function(e){return e>65535?(e-=65536,String.fromCharCode(55296+(e>>10))+String.fromCharCode(e%1024+56320)):String.fromCharCode(e)},t.utf32ToString=function(e,t=0,n=e.length){let r=``;for(let i=t;i<n;++i){let t=e[i];t>65535?(t-=65536,r+=String.fromCharCode(55296+(t>>10))+String.fromCharCode(t%1024+56320)):r+=String.fromCharCode(t)}return r},t.StringToUtf32=class{constructor(){this._interim=0}clear(){this._interim=0}decode(e,t){let n=e.length;if(!n)return 0;let r=0,i=0;if(this._interim){let n=e.charCodeAt(i++);56320<=n&&n<=57343?t[r++]=1024*(this._interim-55296)+n-56320+65536:(t[r++]=this._interim,t[r++]=n),this._interim=0}for(let a=i;a<n;++a){let i=e.charCodeAt(a);if(55296<=i&&i<=56319){if(++a>=n)return this._interim=i,r;let o=e.charCodeAt(a);56320<=o&&o<=57343?t[r++]=1024*(i-55296)+o-56320+65536:(t[r++]=i,t[r++]=o)}else i!==65279&&(t[r++]=i)}return r}},t.Utf8ToUtf32=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(e,t){let n=e.length;if(!n)return 0;let r,i,a,o,s=0,c=0,l=0;if(this.interim[0]){let r=!1,i=this.interim[0];i&=(224&i)==192?31:(240&i)==224?15:7;let a,o=0;for(;(a=63&this.interim[++o])&&o<4;)i<<=6,i|=a;let c=(224&this.interim[0])==192?2:(240&this.interim[0])==224?3:4,u=c-o;for(;l<u;){if(l>=n)return 0;if(a=e[l++],(192&a)!=128){l--,r=!0;break}this.interim[o++]=a,i<<=6,i|=63&a}r||(c===2?i<128?l--:t[s++]=i:c===3?i<2048||i>=55296&&i<=57343||i===65279||(t[s++]=i):i<65536||i>1114111||(t[s++]=i)),this.interim.fill(0)}let u=n-4,d=l;for(;d<n;){for(;!(!(d<u)||128&(r=e[d])||128&(i=e[d+1])||128&(a=e[d+2])||128&(o=e[d+3]));)t[s++]=r,t[s++]=i,t[s++]=a,t[s++]=o,d+=4;if(r=e[d++],r<128)t[s++]=r;else if((224&r)==192){if(d>=n)return this.interim[0]=r,s;if(i=e[d++],(192&i)!=128){d--;continue}if(c=(31&r)<<6|63&i,c<128){d--;continue}t[s++]=c}else if((240&r)==224){if(d>=n)return this.interim[0]=r,s;if(i=e[d++],(192&i)!=128){d--;continue}if(d>=n)return this.interim[0]=r,this.interim[1]=i,s;if(a=e[d++],(192&a)!=128){d--;continue}if(c=(15&r)<<12|(63&i)<<6|63&a,c<2048||c>=55296&&c<=57343||c===65279)continue;t[s++]=c}else if((248&r)==240){if(d>=n)return this.interim[0]=r,s;if(i=e[d++],(192&i)!=128){d--;continue}if(d>=n)return this.interim[0]=r,this.interim[1]=i,s;if(a=e[d++],(192&a)!=128){d--;continue}if(d>=n)return this.interim[0]=r,this.interim[1]=i,this.interim[2]=a,s;if(o=e[d++],(192&o)!=128){d--;continue}if(c=(7&r)<<18|(63&i)<<12|(63&a)<<6|63&o,c<65536||c>1114111)continue;t[s++]=c}}return s}}},225:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnicodeV6=void 0;let r=n(1480),i=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],a=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]],o;t.UnicodeV6=class{constructor(){if(this.version=`6`,!o){o=new Uint8Array(65536),o.fill(1),o[0]=0,o.fill(0,1,32),o.fill(0,127,160),o.fill(2,4352,4448),o[9001]=2,o[9002]=2,o.fill(2,11904,42192),o[12351]=1,o.fill(2,44032,55204),o.fill(2,63744,64256),o.fill(2,65040,65050),o.fill(2,65072,65136),o.fill(2,65280,65377),o.fill(2,65504,65511);for(let e=0;e<i.length;++e)o.fill(0,i[e][0],i[e][1]+1)}}wcwidth(e){return e<32?0:e<127?1:e<65536?o[e]:function(e,t){let n,r=0,i=t.length-1;if(e<t[0][0]||e>t[i][1])return!1;for(;i>=r;)if(n=r+i>>1,e>t[n][1])r=n+1;else{if(!(e<t[n][0]))return!0;i=n-1}return!1}(e,a)?0:e>=131072&&e<=196605||e>=196608&&e<=262141?2:1}charProperties(e,t){let n=this.wcwidth(e),i=n===0&&t!==0;if(i){let e=r.UnicodeService.extractWidth(t);e===0?i=!1:e>n&&(n=e)}return r.UnicodeService.createPropertyValue(0,n,i)}}},5981:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WriteBuffer=void 0;let r=n(8460),i=n(844);class a extends i.Disposable{constructor(e){super(),this._action=e,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this.register(new r.EventEmitter),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(e,t){if(t!==void 0&&this._syncCalls>t)return void(this._syncCalls=0);if(this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;let n;for(this._isSyncWriting=!0;n=this._writeBuffer.shift();){this._action(n);let e=this._callbacks.shift();e&&e()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(e,t){if(this._pendingData>5e7)throw Error(`write data discarded, use flow control to avoid losing data`);if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput)return this._didUserInput=!1,this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(t),void this._innerWrite();setTimeout((()=>this._innerWrite()))}this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(t)}_innerWrite(e=0,t=!0){let n=e||Date.now();for(;this._writeBuffer.length>this._bufferOffset;){let e=this._writeBuffer[this._bufferOffset],r=this._action(e,t);if(r){r.catch((e=>(queueMicrotask((()=>{throw e})),Promise.resolve(!1)))).then(e=>Date.now()-n>=12?setTimeout((()=>this._innerWrite(0,e))):this._innerWrite(n,e));return}let i=this._callbacks[this._bufferOffset];if(i&&i(),this._bufferOffset++,this._pendingData-=e.length,Date.now()-n>=12)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>50&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout((()=>this._innerWrite()))):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}}t.WriteBuffer=a},5941:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toRgbString=t.parseColor=void 0;let n=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,r=/^[\da-f]+$/;function i(e,t){let n=e.toString(16),r=n.length<2?`0`+n:n;switch(t){case 4:return n[0];case 8:return r;case 12:return(r+r).slice(0,3);default:return r+r}}t.parseColor=function(e){if(!e)return;let t=e.toLowerCase();if(t.indexOf(`rgb:`)===0){t=t.slice(4);let e=n.exec(t);if(e){let t=e[1]?15:e[4]?255:e[7]?4095:65535;return[Math.round(parseInt(e[1]||e[4]||e[7]||e[10],16)/t*255),Math.round(parseInt(e[2]||e[5]||e[8]||e[11],16)/t*255),Math.round(parseInt(e[3]||e[6]||e[9]||e[12],16)/t*255)]}}else if(t.indexOf(`#`)===0&&(t=t.slice(1),r.exec(t)&&[3,6,9,12].includes(t.length))){let e=t.length/3,n=[0,0,0];for(let r=0;r<3;++r){let i=parseInt(t.slice(e*r,e*r+e),16);n[r]=e===1?i<<4:e===2?i:e===3?i>>4:i>>8}return n}},t.toRgbString=function(e,t=16){let[n,r,a]=e;return`rgb:${i(n,t)}/${i(r,t)}/${i(a,t)}`}},5770:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PAYLOAD_LIMIT=void 0,t.PAYLOAD_LIMIT=1e7},6351:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DcsHandler=t.DcsParser=void 0;let r=n(482),i=n(8742),a=n(5770),o=[];t.DcsParser=class{constructor(){this._handlers=Object.create(null),this._active=o,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=o}registerHandler(e,t){this._handlers[e]===void 0&&(this._handlers[e]=[]);let n=this._handlers[e];return n.push(t),{dispose:()=>{let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}}clearHandler(e){this._handlers[e]&&delete this._handlers[e]}setHandlerFallback(e){this._handlerFb=e}reset(){if(this._active.length)for(let e=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;e>=0;--e)this._active[e].unhook(!1);this._stack.paused=!1,this._active=o,this._ident=0}hook(e,t){if(this.reset(),this._ident=e,this._active=this._handlers[e]||o,this._active.length)for(let e=this._active.length-1;e>=0;e--)this._active[e].hook(t);else this._handlerFb(this._ident,`HOOK`,t)}put(e,t,n){if(this._active.length)for(let r=this._active.length-1;r>=0;r--)this._active[r].put(e,t,n);else this._handlerFb(this._ident,`PUT`,(0,r.utf32ToString)(e,t,n))}unhook(e,t=!0){if(this._active.length){let n=!1,r=this._active.length-1,i=!1;if(this._stack.paused&&(r=this._stack.loopPosition-1,n=t,i=this._stack.fallThrough,this._stack.paused=!1),!i&&!1===n){for(;r>=0&&(n=this._active[r].unhook(e),!0!==n);r--)if(n instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!1,n;r--}for(;r>=0;r--)if(n=this._active[r].unhook(!1),n instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!0,n}else this._handlerFb(this._ident,`UNHOOK`,e);this._active=o,this._ident=0}};let s=new i.Params;s.addParam(0),t.DcsHandler=class{constructor(e){this._handler=e,this._data=``,this._params=s,this._hitLimit=!1}hook(e){this._params=e.length>1||e.params[0]?e.clone():s,this._data=``,this._hitLimit=!1}put(e,t,n){this._hitLimit||(this._data+=(0,r.utf32ToString)(e,t,n),this._data.length>a.PAYLOAD_LIMIT&&(this._data=``,this._hitLimit=!0))}unhook(e){let t=!1;if(this._hitLimit)t=!1;else if(e&&(t=this._handler(this._data,this._params),t instanceof Promise))return t.then((e=>(this._params=s,this._data=``,this._hitLimit=!1,e)));return this._params=s,this._data=``,this._hitLimit=!1,t}}},2015:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EscapeSequenceParser=t.VT500_TRANSITION_TABLE=t.TransitionTable=void 0;let r=n(844),i=n(8742),a=n(6242),o=n(6351);class s{constructor(e){this.table=new Uint8Array(e)}setDefault(e,t){this.table.fill(e<<4|t)}add(e,t,n,r){this.table[t<<8|e]=n<<4|r}addMany(e,t,n,r){for(let i=0;i<e.length;i++)this.table[t<<8|e[i]]=n<<4|r}}t.TransitionTable=s,t.VT500_TRANSITION_TABLE=function(){let e=new s(4095),t=Array.apply(null,Array(256)).map(((e,t)=>t)),n=(e,n)=>t.slice(e,n),r=n(32,127),i=n(0,24);i.push(25),i.push.apply(i,n(28,32));let a=n(0,14),o;for(o in e.setDefault(1,0),e.addMany(r,0,2,0),a)e.addMany([24,26,153,154],o,3,0),e.addMany(n(128,144),o,3,0),e.addMany(n(144,152),o,3,0),e.add(156,o,0,0),e.add(27,o,11,1),e.add(157,o,4,8),e.addMany([152,158,159],o,0,7),e.add(155,o,11,3),e.add(144,o,11,9);return e.addMany(i,0,3,0),e.addMany(i,1,3,1),e.add(127,1,0,1),e.addMany(i,8,0,8),e.addMany(i,3,3,3),e.add(127,3,0,3),e.addMany(i,4,3,4),e.add(127,4,0,4),e.addMany(i,6,3,6),e.addMany(i,5,3,5),e.add(127,5,0,5),e.addMany(i,2,3,2),e.add(127,2,0,2),e.add(93,1,4,8),e.addMany(r,8,5,8),e.add(127,8,5,8),e.addMany([156,27,24,26,7],8,6,0),e.addMany(n(28,32),8,0,8),e.addMany([88,94,95],1,0,7),e.addMany(r,7,0,7),e.addMany(i,7,0,7),e.add(156,7,0,0),e.add(127,7,0,7),e.add(91,1,11,3),e.addMany(n(64,127),3,7,0),e.addMany(n(48,60),3,8,4),e.addMany([60,61,62,63],3,9,4),e.addMany(n(48,60),4,8,4),e.addMany(n(64,127),4,7,0),e.addMany([60,61,62,63],4,0,6),e.addMany(n(32,64),6,0,6),e.add(127,6,0,6),e.addMany(n(64,127),6,0,0),e.addMany(n(32,48),3,9,5),e.addMany(n(32,48),5,9,5),e.addMany(n(48,64),5,0,6),e.addMany(n(64,127),5,7,0),e.addMany(n(32,48),4,9,5),e.addMany(n(32,48),1,9,2),e.addMany(n(32,48),2,9,2),e.addMany(n(48,127),2,10,0),e.addMany(n(48,80),1,10,0),e.addMany(n(81,88),1,10,0),e.addMany([89,90,92],1,10,0),e.addMany(n(96,127),1,10,0),e.add(80,1,11,9),e.addMany(i,9,0,9),e.add(127,9,0,9),e.addMany(n(28,32),9,0,9),e.addMany(n(32,48),9,9,12),e.addMany(n(48,60),9,8,10),e.addMany([60,61,62,63],9,9,10),e.addMany(i,11,0,11),e.addMany(n(32,128),11,0,11),e.addMany(n(28,32),11,0,11),e.addMany(i,10,0,10),e.add(127,10,0,10),e.addMany(n(28,32),10,0,10),e.addMany(n(48,60),10,8,10),e.addMany([60,61,62,63],10,0,11),e.addMany(n(32,48),10,9,12),e.addMany(i,12,0,12),e.add(127,12,0,12),e.addMany(n(28,32),12,0,12),e.addMany(n(32,48),12,9,12),e.addMany(n(48,64),12,0,11),e.addMany(n(64,127),12,12,13),e.addMany(n(64,127),10,12,13),e.addMany(n(64,127),9,12,13),e.addMany(i,13,13,13),e.addMany(r,13,13,13),e.add(127,13,0,13),e.addMany([27,156,24,26],13,14,0),e.add(160,0,2,0),e.add(160,8,5,8),e.add(160,6,0,6),e.add(160,11,0,11),e.add(160,13,13,13),e}();class c extends r.Disposable{constructor(e=t.VT500_TRANSITION_TABLE){super(),this._transitions=e,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new i.Params,this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._printHandlerFb=(e,t,n)=>{},this._executeHandlerFb=e=>{},this._csiHandlerFb=(e,t)=>{},this._escHandlerFb=e=>{},this._errorHandlerFb=e=>e,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this.register((0,r.toDisposable)((()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)}))),this._oscParser=this.register(new a.OscParser),this._dcsParser=this.register(new o.DcsParser),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:`\\`},(()=>!0))}_identifier(e,t=[64,126]){let n=0;if(e.prefix){if(e.prefix.length>1)throw Error(`only one byte as prefix supported`);if(n=e.prefix.charCodeAt(0),n&&60>n||n>63)throw Error(`prefix must be in range 0x3c .. 0x3f`)}if(e.intermediates){if(e.intermediates.length>2)throw Error(`only two bytes as intermediates are supported`);for(let t=0;t<e.intermediates.length;++t){let r=e.intermediates.charCodeAt(t);if(32>r||r>47)throw Error(`intermediate must be in range 0x20 .. 0x2f`);n<<=8,n|=r}}if(e.final.length!==1)throw Error(`final must be a single byte`);let r=e.final.charCodeAt(0);if(t[0]>r||r>t[1])throw Error(`final must be in range ${t[0]} .. ${t[1]}`);return n<<=8,n|=r,n}identToString(e){let t=[];for(;e;)t.push(String.fromCharCode(255&e)),e>>=8;return t.reverse().join(``)}setPrintHandler(e){this._printHandler=e}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(e,t){let n=this._identifier(e,[48,126]);this._escHandlers[n]===void 0&&(this._escHandlers[n]=[]);let r=this._escHandlers[n];return r.push(t),{dispose:()=>{let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}}clearEscHandler(e){this._escHandlers[this._identifier(e,[48,126])]&&delete this._escHandlers[this._identifier(e,[48,126])]}setEscHandlerFallback(e){this._escHandlerFb=e}setExecuteHandler(e,t){this._executeHandlers[e.charCodeAt(0)]=t}clearExecuteHandler(e){this._executeHandlers[e.charCodeAt(0)]&&delete this._executeHandlers[e.charCodeAt(0)]}setExecuteHandlerFallback(e){this._executeHandlerFb=e}registerCsiHandler(e,t){let n=this._identifier(e);this._csiHandlers[n]===void 0&&(this._csiHandlers[n]=[]);let r=this._csiHandlers[n];return r.push(t),{dispose:()=>{let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}}clearCsiHandler(e){this._csiHandlers[this._identifier(e)]&&delete this._csiHandlers[this._identifier(e)]}setCsiHandlerFallback(e){this._csiHandlerFb=e}registerDcsHandler(e,t){return this._dcsParser.registerHandler(this._identifier(e),t)}clearDcsHandler(e){this._dcsParser.clearHandler(this._identifier(e))}setDcsHandlerFallback(e){this._dcsParser.setHandlerFallback(e)}registerOscHandler(e,t){return this._oscParser.registerHandler(e,t)}clearOscHandler(e){this._oscParser.clearHandler(e)}setOscHandlerFallback(e){this._oscParser.setHandlerFallback(e)}setErrorHandler(e){this._errorHandler=e}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(e,t,n,r,i){this._parseStack.state=e,this._parseStack.handlers=t,this._parseStack.handlerPos=n,this._parseStack.transition=r,this._parseStack.chunkPos=i}parse(e,t,n){let r,i=0,a=0,o=0;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,o=this._parseStack.chunkPos+1;else{if(n===void 0||this._parseStack.state===1)throw this._parseStack.state=1,Error(`improper continuation due to previous async handler, giving up parsing`);let t=this._parseStack.handlers,a=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(!1===n&&a>-1){for(;a>=0&&(r=t[a](this._params),!0!==r);a--)if(r instanceof Promise)return this._parseStack.handlerPos=a,r}this._parseStack.handlers=[];break;case 4:if(!1===n&&a>-1){for(;a>=0&&(r=t[a](),!0!==r);a--)if(r instanceof Promise)return this._parseStack.handlerPos=a,r}this._parseStack.handlers=[];break;case 6:if(i=e[this._parseStack.chunkPos],r=this._dcsParser.unhook(i!==24&&i!==26,n),r)return r;i===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(i=e[this._parseStack.chunkPos],r=this._oscParser.end(i!==24&&i!==26,n),r)return r;i===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0}this._parseStack.state=0,o=this._parseStack.chunkPos+1,this.precedingJoinState=0,this.currentState=15&this._parseStack.transition}for(let n=o;n<t;++n){switch(i=e[n],a=this._transitions.table[this.currentState<<8|(i<160?i:160)],a>>4){case 2:for(let r=n+1;;++r){if(r>=t||(i=e[r])<32||i>126&&i<160){this._printHandler(e,n,r),n=r-1;break}if(++r>=t||(i=e[r])<32||i>126&&i<160){this._printHandler(e,n,r),n=r-1;break}if(++r>=t||(i=e[r])<32||i>126&&i<160){this._printHandler(e,n,r),n=r-1;break}if(++r>=t||(i=e[r])<32||i>126&&i<160){this._printHandler(e,n,r),n=r-1;break}}break;case 3:this._executeHandlers[i]?this._executeHandlers[i]():this._executeHandlerFb(i),this.precedingJoinState=0;break;case 0:break;case 1:if(this._errorHandler({position:n,code:i,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:let o=this._csiHandlers[this._collect<<8|i],s=o?o.length-1:-1;for(;s>=0&&(r=o[s](this._params),!0!==r);s--)if(r instanceof Promise)return this._preserveStack(3,o,s,a,n),r;s<0&&this._csiHandlerFb(this._collect<<8|i,this._params),this.precedingJoinState=0;break;case 8:do switch(i){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(i-48)}while(++n<t&&(i=e[n])>47&&i<60);n--;break;case 9:this._collect<<=8,this._collect|=i;break;case 10:let c=this._escHandlers[this._collect<<8|i],l=c?c.length-1:-1;for(;l>=0&&(r=c[l](),!0!==r);l--)if(r instanceof Promise)return this._preserveStack(4,c,l,a,n),r;l<0&&this._escHandlerFb(this._collect<<8|i),this.precedingJoinState=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|i,this._params);break;case 13:for(let r=n+1;;++r)if(r>=t||(i=e[r])===24||i===26||i===27||i>127&&i<160){this._dcsParser.put(e,n,r),n=r-1;break}break;case 14:if(r=this._dcsParser.unhook(i!==24&&i!==26),r)return this._preserveStack(6,[],0,a,n),r;i===27&&(a|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0;break;case 4:this._oscParser.start();break;case 5:for(let r=n+1;;r++)if(r>=t||(i=e[r])<32||i>127&&i<160){this._oscParser.put(e,n,r),n=r-1;break}break;case 6:if(r=this._oscParser.end(i!==24&&i!==26),r)return this._preserveStack(5,[],0,a,n),r;i===27&&(a|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0}this.currentState=15&a}}}t.EscapeSequenceParser=c},6242:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OscHandler=t.OscParser=void 0;let r=n(5770),i=n(482),a=[];t.OscParser=class{constructor(){this._state=0,this._active=a,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(e,t){this._handlers[e]===void 0&&(this._handlers[e]=[]);let n=this._handlers[e];return n.push(t),{dispose:()=>{let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}}clearHandler(e){this._handlers[e]&&delete this._handlers[e]}setHandlerFallback(e){this._handlerFb=e}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=a}reset(){if(this._state===2)for(let e=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;e>=0;--e)this._active[e].end(!1);this._stack.paused=!1,this._active=a,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||a,this._active.length)for(let e=this._active.length-1;e>=0;e--)this._active[e].start();else this._handlerFb(this._id,`START`)}_put(e,t,n){if(this._active.length)for(let r=this._active.length-1;r>=0;r--)this._active[r].put(e,t,n);else this._handlerFb(this._id,`PUT`,(0,i.utf32ToString)(e,t,n))}start(){this.reset(),this._state=1}put(e,t,n){if(this._state!==3){if(this._state===1)for(;t<n;){let n=e[t++];if(n===59){this._state=2,this._start();break}if(n<48||57<n)return void(this._state=3);this._id===-1&&(this._id=0),this._id=10*this._id+n-48}this._state===2&&n-t>0&&this._put(e,t,n)}}end(e,t=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),this._active.length){let n=!1,r=this._active.length-1,i=!1;if(this._stack.paused&&(r=this._stack.loopPosition-1,n=t,i=this._stack.fallThrough,this._stack.paused=!1),!i&&!1===n){for(;r>=0&&(n=this._active[r].end(e),!0!==n);r--)if(n instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!1,n;r--}for(;r>=0;r--)if(n=this._active[r].end(!1),n instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!0,n}else this._handlerFb(this._id,`END`,e);this._active=a,this._id=-1,this._state=0}}},t.OscHandler=class{constructor(e){this._handler=e,this._data=``,this._hitLimit=!1}start(){this._data=``,this._hitLimit=!1}put(e,t,n){this._hitLimit||(this._data+=(0,i.utf32ToString)(e,t,n),this._data.length>r.PAYLOAD_LIMIT&&(this._data=``,this._hitLimit=!0))}end(e){let t=!1;if(this._hitLimit)t=!1;else if(e&&(t=this._handler(this._data),t instanceof Promise))return t.then((e=>(this._data=``,this._hitLimit=!1,e)));return this._data=``,this._hitLimit=!1,t}}},8742:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Params=void 0;let n=2147483647;class r{static fromArray(e){let t=new r;if(!e.length)return t;for(let n=+!!Array.isArray(e[0]);n<e.length;++n){let r=e[n];if(Array.isArray(r))for(let e=0;e<r.length;++e)t.addSubParam(r[e]);else t.addParam(r)}return t}constructor(e=32,t=32){if(this.maxLength=e,this.maxSubParamsLength=t,t>256)throw Error(`maxSubParamsLength must not be greater than 256`);this.params=new Int32Array(e),this.length=0,this._subParams=new Int32Array(t),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(e),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}clone(){let e=new r(this.maxLength,this.maxSubParamsLength);return e.params.set(this.params),e.length=this.length,e._subParams.set(this._subParams),e._subParamsLength=this._subParamsLength,e._subParamsIdx.set(this._subParamsIdx),e._rejectDigits=this._rejectDigits,e._rejectSubDigits=this._rejectSubDigits,e._digitIsSub=this._digitIsSub,e}toArray(){let e=[];for(let t=0;t<this.length;++t){e.push(this.params[t]);let n=this._subParamsIdx[t]>>8,r=255&this._subParamsIdx[t];r-n>0&&e.push(Array.prototype.slice.call(this._subParams,n,r))}return e}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(e){if(this._digitIsSub=!1,this.length>=this.maxLength)this._rejectDigits=!0;else{if(e<-1)throw Error(`values lesser than -1 are not allowed`);this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=e>n?n:e}}addSubParam(e){if(this._digitIsSub=!0,this.length)if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength)this._rejectSubDigits=!0;else{if(e<-1)throw Error(`values lesser than -1 are not allowed`);this._subParams[this._subParamsLength++]=e>n?n:e,this._subParamsIdx[this.length-1]++}}hasSubParams(e){return(255&this._subParamsIdx[e])-(this._subParamsIdx[e]>>8)>0}getSubParams(e){let t=this._subParamsIdx[e]>>8,n=255&this._subParamsIdx[e];return n-t>0?this._subParams.subarray(t,n):null}getSubParamsAll(){let e={};for(let t=0;t<this.length;++t){let n=this._subParamsIdx[t]>>8,r=255&this._subParamsIdx[t];r-n>0&&(e[t]=this._subParams.slice(n,r))}return e}addDigit(e){let t;if(this._rejectDigits||!(t=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;let r=this._digitIsSub?this._subParams:this.params,i=r[t-1];r[t-1]=~i?Math.min(10*i+e,n):e}}t.Params=r},5741:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AddonManager=void 0,t.AddonManager=class{constructor(){this._addons=[]}dispose(){for(let e=this._addons.length-1;e>=0;e--)this._addons[e].instance.dispose()}loadAddon(e,t){let n={instance:t,dispose:t.dispose,isDisposed:!1};this._addons.push(n),t.dispose=()=>this._wrappedAddonDispose(n),t.activate(e)}_wrappedAddonDispose(e){if(e.isDisposed)return;let t=-1;for(let n=0;n<this._addons.length;n++)if(this._addons[n]===e){t=n;break}if(t===-1)throw Error(`Could not dispose an addon that has not been loaded`);e.isDisposed=!0,e.dispose.apply(e.instance),this._addons.splice(t,1)}}},8771:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BufferApiView=void 0;let r=n(3785),i=n(511);t.BufferApiView=class{constructor(e,t){this._buffer=e,this.type=t}init(e){return this._buffer=e,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(e){let t=this._buffer.lines.get(e);if(t)return new r.BufferLineApiView(t)}getNullCell(){return new i.CellData}}},3785:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BufferLineApiView=void 0;let r=n(511);t.BufferLineApiView=class{constructor(e){this._line=e}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(e,t){if(!(e<0||e>=this._line.length))return t?(this._line.loadCell(e,t),t):this._line.loadCell(e,new r.CellData)}translateToString(e,t,n){return this._line.translateToString(e,t,n)}}},8285:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BufferNamespaceApi=void 0;let r=n(8771),i=n(8460),a=n(844);class o extends a.Disposable{constructor(e){super(),this._core=e,this._onBufferChange=this.register(new i.EventEmitter),this.onBufferChange=this._onBufferChange.event,this._normal=new r.BufferApiView(this._core.buffers.normal,`normal`),this._alternate=new r.BufferApiView(this._core.buffers.alt,`alternate`),this._core.buffers.onBufferActivate((()=>this._onBufferChange.fire(this.active)))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw Error(`Active buffer is neither normal nor alternate`)}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}}t.BufferNamespaceApi=o},7975:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ParserApi=void 0,t.ParserApi=class{constructor(e){this._core=e}registerCsiHandler(e,t){return this._core.registerCsiHandler(e,(e=>t(e.toArray())))}addCsiHandler(e,t){return this.registerCsiHandler(e,t)}registerDcsHandler(e,t){return this._core.registerDcsHandler(e,((e,n)=>t(e,n.toArray())))}addDcsHandler(e,t){return this.registerDcsHandler(e,t)}registerEscHandler(e,t){return this._core.registerEscHandler(e,t)}addEscHandler(e,t){return this.registerEscHandler(e,t)}registerOscHandler(e,t){return this._core.registerOscHandler(e,t)}addOscHandler(e,t){return this.registerOscHandler(e,t)}}},7090:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnicodeApi=void 0,t.UnicodeApi=class{constructor(e){this._core=e}register(e){this._core.unicodeService.register(e)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(e){this._core.unicodeService.activeVersion=e}}},744:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.BufferService=t.MINIMUM_ROWS=t.MINIMUM_COLS=void 0;let a=n(8460),o=n(844),s=n(5295),c=n(2585);t.MINIMUM_COLS=2,t.MINIMUM_ROWS=1;let l=t.BufferService=class extends o.Disposable{get buffer(){return this.buffers.active}constructor(e){super(),this.isUserScrolling=!1,this._onResize=this.register(new a.EventEmitter),this.onResize=this._onResize.event,this._onScroll=this.register(new a.EventEmitter),this.onScroll=this._onScroll.event,this.cols=Math.max(e.rawOptions.cols||0,t.MINIMUM_COLS),this.rows=Math.max(e.rawOptions.rows||0,t.MINIMUM_ROWS),this.buffers=this.register(new s.BufferSet(e,this))}resize(e,t){this.cols=e,this.rows=t,this.buffers.resize(e,t),this._onResize.fire({cols:e,rows:t})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(e,t=!1){let n=this.buffer,r;r=this._cachedBlankLine,r&&r.length===this.cols&&r.getFg(0)===e.fg&&r.getBg(0)===e.bg||(r=n.getBlankLine(e,t),this._cachedBlankLine=r),r.isWrapped=t;let i=n.ybase+n.scrollTop,a=n.ybase+n.scrollBottom;if(n.scrollTop===0){let e=n.lines.isFull;a===n.lines.length-1?e?n.lines.recycle().copyFrom(r):n.lines.push(r.clone()):n.lines.splice(a+1,0,r.clone()),e?this.isUserScrolling&&(n.ydisp=Math.max(n.ydisp-1,0)):(n.ybase++,this.isUserScrolling||n.ydisp++)}else{let e=a-i+1;n.lines.shiftElements(i+1,e-1,-1),n.lines.set(a,r.clone())}this.isUserScrolling||(n.ydisp=n.ybase),this._onScroll.fire(n.ydisp)}scrollLines(e,t,n){let r=this.buffer;if(e<0){if(r.ydisp===0)return;this.isUserScrolling=!0}else e+r.ydisp>=r.ybase&&(this.isUserScrolling=!1);let i=r.ydisp;r.ydisp=Math.max(Math.min(r.ydisp+e,r.ybase),0),i!==r.ydisp&&(t||this._onScroll.fire(r.ydisp))}};t.BufferService=l=r([i(0,c.IOptionsService)],l)},7994:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CharsetService=void 0,t.CharsetService=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(e){this.glevel=e,this.charset=this._charsets[e]}setgCharset(e,t){this._charsets[e]=t,this.glevel===e&&(this.charset=t)}}},1753:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.CoreMouseService=void 0;let a=n(2585),o=n(8460),s=n(844),c={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:e=>e.button!==4&&e.action===1&&(e.ctrl=!1,e.alt=!1,e.shift=!1,!0)},VT200:{events:19,restrict:e=>e.action!==32},DRAG:{events:23,restrict:e=>e.action!==32||e.button!==3},ANY:{events:31,restrict:e=>!0}};function l(e,t){let n=(e.ctrl?16:0)|(e.shift?4:0)|(e.alt?8:0);return e.button===4?(n|=64,n|=e.action):(n|=3&e.button,4&e.button&&(n|=64),8&e.button&&(n|=128),e.action===32?n|=32:e.action!==0||t||(n|=3)),n}let u=String.fromCharCode,d={DEFAULT:e=>{let t=[l(e,!1)+32,e.col+32,e.row+32];return t[0]>255||t[1]>255||t[2]>255?``:`[M${u(t[0])}${u(t[1])}${u(t[2])}`},SGR:e=>{let t=e.action===0&&e.button!==4?`m`:`M`;return`[<${l(e,!0)};${e.col};${e.row}${t}`},SGR_PIXELS:e=>{let t=e.action===0&&e.button!==4?`m`:`M`;return`[<${l(e,!0)};${e.x};${e.y}${t}`}},f=t.CoreMouseService=class extends s.Disposable{constructor(e,t){super(),this._bufferService=e,this._coreService=t,this._protocols={},this._encodings={},this._activeProtocol=``,this._activeEncoding=``,this._lastEvent=null,this._onProtocolChange=this.register(new o.EventEmitter),this.onProtocolChange=this._onProtocolChange.event;for(let e of Object.keys(c))this.addProtocol(e,c[e]);for(let e of Object.keys(d))this.addEncoding(e,d[e]);this.reset()}addProtocol(e,t){this._protocols[e]=t}addEncoding(e,t){this._encodings[e]=t}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(e){if(!this._protocols[e])throw Error(`unknown protocol "${e}"`);this._activeProtocol=e,this._onProtocolChange.fire(this._protocols[e].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(e){if(!this._encodings[e])throw Error(`unknown encoding "${e}"`);this._activeEncoding=e}reset(){this.activeProtocol=`NONE`,this.activeEncoding=`DEFAULT`,this._lastEvent=null}triggerMouseEvent(e){if(e.col<0||e.col>=this._bufferService.cols||e.row<0||e.row>=this._bufferService.rows||e.button===4&&e.action===32||e.button===3&&e.action!==32||e.button!==4&&(e.action===2||e.action===3)||(e.col++,e.row++,e.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,e,this._activeEncoding===`SGR_PIXELS`))||!this._protocols[this._activeProtocol].restrict(e))return!1;let t=this._encodings[this._activeEncoding](e);return t&&(this._activeEncoding===`DEFAULT`?this._coreService.triggerBinaryEvent(t):this._coreService.triggerDataEvent(t,!0)),this._lastEvent=e,!0}explainEvents(e){return{down:!!(1&e),up:!!(2&e),drag:!!(4&e),move:!!(8&e),wheel:!!(16&e)}}_equalEvents(e,t,n){if(n){if(e.x!==t.x||e.y!==t.y)return!1}else if(e.col!==t.col||e.row!==t.row)return!1;return e.button===t.button&&e.action===t.action&&e.ctrl===t.ctrl&&e.alt===t.alt&&e.shift===t.shift}};t.CoreMouseService=f=r([i(0,a.IBufferService),i(1,a.ICoreService)],f)},6975:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.CoreService=void 0;let a=n(1439),o=n(8460),s=n(844),c=n(2585),l=Object.freeze({insertMode:!1}),u=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,origin:!1,reverseWraparound:!1,sendFocus:!1,wraparound:!0}),d=t.CoreService=class extends s.Disposable{constructor(e,t,n){super(),this._bufferService=e,this._logService=t,this._optionsService=n,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this.register(new o.EventEmitter),this.onData=this._onData.event,this._onUserInput=this.register(new o.EventEmitter),this.onUserInput=this._onUserInput.event,this._onBinary=this.register(new o.EventEmitter),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this.register(new o.EventEmitter),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=(0,a.clone)(l),this.decPrivateModes=(0,a.clone)(u)}reset(){this.modes=(0,a.clone)(l),this.decPrivateModes=(0,a.clone)(u)}triggerDataEvent(e,t=!1){if(this._optionsService.rawOptions.disableStdin)return;let n=this._bufferService.buffer;t&&this._optionsService.rawOptions.scrollOnUserInput&&n.ybase!==n.ydisp&&this._onRequestScrollToBottom.fire(),t&&this._onUserInput.fire(),this._logService.debug(`sending data "${e}"`,(()=>e.split(``).map((e=>e.charCodeAt(0))))),this._onData.fire(e)}triggerBinaryEvent(e){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${e}"`,(()=>e.split(``).map((e=>e.charCodeAt(0))))),this._onBinary.fire(e))}};t.CoreService=d=r([i(0,c.IBufferService),i(1,c.ILogService),i(2,c.IOptionsService)],d)},9074:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DecorationService=void 0;let r=n(8055),i=n(8460),a=n(844),o=n(6106),s=0,c=0;class l extends a.Disposable{get decorations(){return this._decorations.values()}constructor(){super(),this._decorations=new o.SortedList((e=>e?.marker.line)),this._onDecorationRegistered=this.register(new i.EventEmitter),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this.register(new i.EventEmitter),this.onDecorationRemoved=this._onDecorationRemoved.event,this.register((0,a.toDisposable)((()=>this.reset())))}registerDecoration(e){if(e.marker.isDisposed)return;let t=new u(e);if(t){let e=t.marker.onDispose((()=>t.dispose()));t.onDispose((()=>{t&&(this._decorations.delete(t)&&this._onDecorationRemoved.fire(t),e.dispose())})),this._decorations.insert(t),this._onDecorationRegistered.fire(t)}return t}reset(){for(let e of this._decorations.values())e.dispose();this._decorations.clear()}*getDecorationsAtCell(e,t,n){let r=0,i=0;for(let a of this._decorations.getKeyIterator(t))r=a.options.x??0,i=r+(a.options.width??1),e>=r&&e<i&&(!n||(a.options.layer??`bottom`)===n)&&(yield a)}forEachDecorationAtCell(e,t,n,r){this._decorations.forEachByKey(t,(t=>{s=t.options.x??0,c=s+(t.options.width??1),e>=s&&e<c&&(!n||(t.options.layer??`bottom`)===n)&&r(t)}))}}t.DecorationService=l;class u extends a.Disposable{get isDisposed(){return this._isDisposed}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=r.css.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=r.css.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}constructor(e){super(),this.options=e,this.onRenderEmitter=this.register(new i.EventEmitter),this.onRender=this.onRenderEmitter.event,this._onDispose=this.register(new i.EventEmitter),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=e.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position=`full`)}dispose(){this._onDispose.fire(),super.dispose()}}},4348:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InstantiationService=t.ServiceCollection=void 0;let r=n(2585),i=n(8343);class a{constructor(...e){this._entries=new Map;for(let[t,n]of e)this.set(t,n)}set(e,t){let n=this._entries.get(e);return this._entries.set(e,t),n}forEach(e){for(let[t,n]of this._entries.entries())e(t,n)}has(e){return this._entries.has(e)}get(e){return this._entries.get(e)}}t.ServiceCollection=a,t.InstantiationService=class{constructor(){this._services=new a,this._services.set(r.IInstantiationService,this)}setService(e,t){this._services.set(e,t)}getService(e){return this._services.get(e)}createInstance(e,...t){let n=(0,i.getServiceDependencies)(e).sort(((e,t)=>e.index-t.index)),r=[];for(let t of n){let n=this._services.get(t.id);if(!n)throw Error(`[createInstance] ${e.name} depends on UNKNOWN service ${t.id}.`);r.push(n)}let a=n.length>0?n[0].index:t.length;if(t.length!==a)throw Error(`[createInstance] First service dependency of ${e.name} at position ${a+1} conflicts with ${t.length} static arguments`);return new e(...t,...r)}}},7866:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.traceCall=t.setTraceLogger=t.LogService=void 0;let a=n(844),o=n(2585),s={trace:o.LogLevelEnum.TRACE,debug:o.LogLevelEnum.DEBUG,info:o.LogLevelEnum.INFO,warn:o.LogLevelEnum.WARN,error:o.LogLevelEnum.ERROR,off:o.LogLevelEnum.OFF},c,l=t.LogService=class extends a.Disposable{get logLevel(){return this._logLevel}constructor(e){super(),this._optionsService=e,this._logLevel=o.LogLevelEnum.OFF,this._updateLogLevel(),this.register(this._optionsService.onSpecificOptionChange(`logLevel`,(()=>this._updateLogLevel()))),c=this}_updateLogLevel(){this._logLevel=s[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(e){for(let t=0;t<e.length;t++)typeof e[t]==`function`&&(e[t]=e[t]())}_log(e,t,n){this._evalLazyOptionalParams(n),e.call(console,(this._optionsService.options.logger?``:`xterm.js: `)+t,...n)}trace(e,...t){this._logLevel<=o.LogLevelEnum.TRACE&&this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger)??console.log,e,t)}debug(e,...t){this._logLevel<=o.LogLevelEnum.DEBUG&&this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger)??console.log,e,t)}info(e,...t){this._logLevel<=o.LogLevelEnum.INFO&&this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger)??console.info,e,t)}warn(e,...t){this._logLevel<=o.LogLevelEnum.WARN&&this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger)??console.warn,e,t)}error(e,...t){this._logLevel<=o.LogLevelEnum.ERROR&&this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger)??console.error,e,t)}};t.LogService=l=r([i(0,o.IOptionsService)],l),t.setTraceLogger=function(e){c=e},t.traceCall=function(e,t,n){if(typeof n.value!=`function`)throw Error(`not supported`);let r=n.value;n.value=function(...e){if(c.logLevel!==o.LogLevelEnum.TRACE)return r.apply(this,e);c.trace(`GlyphRenderer#${r.name}(${e.map((e=>JSON.stringify(e))).join(`, `)})`);let t=r.apply(this,e);return c.trace(`GlyphRenderer#${r.name} return`,t),t}}},7302:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OptionsService=t.DEFAULT_OPTIONS=void 0;let r=n(8460),i=n(844);t.DEFAULT_OPTIONS={cols:80,rows:24,cursorBlink:!1,cursorStyle:`block`,cursorWidth:1,cursorInactiveStyle:`outline`,customGlyphs:!0,drawBoldTextInBrightColors:!0,documentOverride:null,fastScrollModifier:`alt`,fastScrollSensitivity:5,fontFamily:`courier-new, courier, monospace`,fontSize:15,fontWeight:`normal`,fontWeightBold:`bold`,ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:`info`,logger:null,scrollback:1e3,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},rescaleOverlappingGlyphs:!1,rightClickSelectsWord:n(6114).isMac,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:` ()[]{}',"\``,altClickMovesCursor:!0,convertEol:!1,termName:`xterm`,cancelEvents:!1,overviewRulerWidth:0};let a=[`normal`,`bold`,`100`,`200`,`300`,`400`,`500`,`600`,`700`,`800`,`900`];class o extends i.Disposable{constructor(e){super(),this._onOptionChange=this.register(new r.EventEmitter),this.onOptionChange=this._onOptionChange.event;let n={...t.DEFAULT_OPTIONS};for(let t in e)if(t in n)try{let r=e[t];n[t]=this._sanitizeAndValidateOption(t,r)}catch(e){console.error(e)}this.rawOptions=n,this.options={...n},this._setupOptions(),this.register((0,i.toDisposable)((()=>{this.rawOptions.linkHandler=null,this.rawOptions.documentOverride=null})))}onSpecificOptionChange(e,t){return this.onOptionChange((n=>{n===e&&t(this.rawOptions[e])}))}onMultipleOptionChange(e,t){return this.onOptionChange((n=>{e.indexOf(n)!==-1&&t()}))}_setupOptions(){let e=e=>{if(!(e in t.DEFAULT_OPTIONS))throw Error(`No option with key "${e}"`);return this.rawOptions[e]},n=(e,n)=>{if(!(e in t.DEFAULT_OPTIONS))throw Error(`No option with key "${e}"`);n=this._sanitizeAndValidateOption(e,n),this.rawOptions[e]!==n&&(this.rawOptions[e]=n,this._onOptionChange.fire(e))};for(let t in this.rawOptions){let r={get:e.bind(this,t),set:n.bind(this,t)};Object.defineProperty(this.options,t,r)}}_sanitizeAndValidateOption(e,n){switch(e){case`cursorStyle`:if(n||=t.DEFAULT_OPTIONS[e],!function(e){return e===`block`||e===`underline`||e===`bar`}(n))throw Error(`"${n}" is not a valid value for ${e}`);break;case`wordSeparator`:n||=t.DEFAULT_OPTIONS[e];break;case`fontWeight`:case`fontWeightBold`:if(typeof n==`number`&&1<=n&&n<=1e3)break;n=a.includes(n)?n:t.DEFAULT_OPTIONS[e];break;case`cursorWidth`:n=Math.floor(n);case`lineHeight`:case`tabStopWidth`:if(n<1)throw Error(`${e} cannot be less than 1, value: ${n}`);break;case`minimumContrastRatio`:n=Math.max(1,Math.min(21,Math.round(10*n)/10));break;case`scrollback`:if((n=Math.min(n,4294967295))<0)throw Error(`${e} cannot be less than 0, value: ${n}`);break;case`fastScrollSensitivity`:case`scrollSensitivity`:if(n<=0)throw Error(`${e} cannot be less than or equal to 0, value: ${n}`);break;case`rows`:case`cols`:if(!n&&n!==0)throw Error(`${e} must be numeric, value: ${n}`);break;case`windowsPty`:n??={}}return n}}t.OptionsService=o},2660:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var i,a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};Object.defineProperty(t,"__esModule",{value:!0}),t.OscLinkService=void 0;let a=n(2585),o=t.OscLinkService=class{constructor(e){this._bufferService=e,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(e){let t=this._bufferService.buffer;if(e.id===void 0){let n=t.addMarker(t.ybase+t.y),r={data:e,id:this._nextId++,lines:[n]};return n.onDispose((()=>this._removeMarkerFromLink(r,n))),this._dataByLinkId.set(r.id,r),r.id}let n=e,r=this._getEntryIdKey(n),i=this._entriesWithId.get(r);if(i)return this.addLineToLink(i.id,t.ybase+t.y),i.id;let a=t.addMarker(t.ybase+t.y),o={id:this._nextId++,key:this._getEntryIdKey(n),data:n,lines:[a]};return a.onDispose((()=>this._removeMarkerFromLink(o,a))),this._entriesWithId.set(o.key,o),this._dataByLinkId.set(o.id,o),o.id}addLineToLink(e,t){let n=this._dataByLinkId.get(e);if(n&&n.lines.every((e=>e.line!==t))){let e=this._bufferService.buffer.addMarker(t);n.lines.push(e),e.onDispose((()=>this._removeMarkerFromLink(n,e)))}}getLinkData(e){return this._dataByLinkId.get(e)?.data}_getEntryIdKey(e){return`${e.id};;${e.uri}`}_removeMarkerFromLink(e,t){let n=e.lines.indexOf(t);n!==-1&&(e.lines.splice(n,1),e.lines.length===0&&(e.data.id!==void 0&&this._entriesWithId.delete(e.key),this._dataByLinkId.delete(e.id)))}};t.OscLinkService=o=r([i(0,a.IBufferService)],o)},8343:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createDecorator=t.getServiceDependencies=t.serviceRegistry=void 0;let n=`di$target`,r=`di$dependencies`;t.serviceRegistry=new Map,t.getServiceDependencies=function(e){return e[r]||[]},t.createDecorator=function(e){if(t.serviceRegistry.has(e))return t.serviceRegistry.get(e);let i=function(e,t,a){if(arguments.length!==3)throw Error(`@IServiceName-decorator can only be used to decorate a parameter`);(function(e,t,i){t[n]===t?t[r].push({id:e,index:i}):(t[r]=[{id:e,index:i}],t[n]=t)})(i,e,a)};return i.toString=()=>e,t.serviceRegistry.set(e,i),i}},2585:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IDecorationService=t.IUnicodeService=t.IOscLinkService=t.IOptionsService=t.ILogService=t.LogLevelEnum=t.IInstantiationService=t.ICharsetService=t.ICoreService=t.ICoreMouseService=t.IBufferService=void 0;let r=n(8343);var i;t.IBufferService=(0,r.createDecorator)(`BufferService`),t.ICoreMouseService=(0,r.createDecorator)(`CoreMouseService`),t.ICoreService=(0,r.createDecorator)(`CoreService`),t.ICharsetService=(0,r.createDecorator)(`CharsetService`),t.IInstantiationService=(0,r.createDecorator)(`InstantiationService`),function(e){e[e.TRACE=0]=`TRACE`,e[e.DEBUG=1]=`DEBUG`,e[e.INFO=2]=`INFO`,e[e.WARN=3]=`WARN`,e[e.ERROR=4]=`ERROR`,e[e.OFF=5]=`OFF`}(i||(t.LogLevelEnum=i={})),t.ILogService=(0,r.createDecorator)(`LogService`),t.IOptionsService=(0,r.createDecorator)(`OptionsService`),t.IOscLinkService=(0,r.createDecorator)(`OscLinkService`),t.IUnicodeService=(0,r.createDecorator)(`UnicodeService`),t.IDecorationService=(0,r.createDecorator)(`DecorationService`)},1480:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnicodeService=void 0;let r=n(8460),i=n(225);class a{static extractShouldJoin(e){return(1&e)!=0}static extractWidth(e){return e>>1&3}static extractCharKind(e){return e>>3}static createPropertyValue(e,t,n=!1){return(16777215&e)<<3|(3&t)<<1|!!n}constructor(){this._providers=Object.create(null),this._active=``,this._onChange=new r.EventEmitter,this.onChange=this._onChange.event;let e=new i.UnicodeV6;this.register(e),this._active=e.version,this._activeProvider=e}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(e){if(!this._providers[e])throw Error(`unknown Unicode version "${e}"`);this._active=e,this._activeProvider=this._providers[e],this._onChange.fire(e)}register(e){this._providers[e.version]=e}wcwidth(e){return this._activeProvider.wcwidth(e)}getStringCellWidth(e){let t=0,n=0,r=e.length;for(let i=0;i<r;++i){let o=e.charCodeAt(i);if(55296<=o&&o<=56319){if(++i>=r)return t+this.wcwidth(o);let n=e.charCodeAt(i);56320<=n&&n<=57343?o=1024*(o-55296)+n-56320+65536:t+=this.wcwidth(n)}let s=this.charProperties(o,n),c=a.extractWidth(s);a.extractShouldJoin(s)&&(c-=a.extractWidth(n)),t+=c,n=s}return t}charProperties(e,t){return this._activeProvider.charProperties(e,t)}}t.UnicodeService=a}},t={};function n(r){var i=t[r];if(i!==void 0)return i.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}var r={};return(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.Terminal=void 0;let t=n(9042),i=n(3236),a=n(844),o=n(5741),s=n(8285),c=n(7975),l=n(7090),u=[`cols`,`rows`];class d extends a.Disposable{constructor(e){super(),this._core=this.register(new i.Terminal(e)),this._addonManager=this.register(new o.AddonManager),this._publicOptions={...this._core.options};let t=e=>this._core.options[e],n=(e,t)=>{this._checkReadonlyOptions(e),this._core.options[e]=t};for(let e in this._core.options){let r={get:t.bind(this,e),set:n.bind(this,e)};Object.defineProperty(this._publicOptions,e,r)}}_checkReadonlyOptions(e){if(u.includes(e))throw Error(`Option "${e}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw Error(`You must set the allowProposedApi option to true to use proposed API`)}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||=new c.ParserApi(this._core),this._parser}get unicode(){return this._checkProposedApi(),new l.UnicodeApi(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||=this.register(new s.BufferNamespaceApi(this._core)),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){let e=this._core.coreService.decPrivateModes,t=`none`;switch(this._core.coreMouseService.activeProtocol){case`X10`:t=`x10`;break;case`VT200`:t=`vt200`;break;case`DRAG`:t=`drag`;break;case`ANY`:t=`any`}return{applicationCursorKeysMode:e.applicationCursorKeys,applicationKeypadMode:e.applicationKeypad,bracketedPasteMode:e.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:t,originMode:e.origin,reverseWraparoundMode:e.reverseWraparound,sendFocusMode:e.sendFocus,wraparoundMode:e.wraparound}}get options(){return this._publicOptions}set options(e){for(let t in e)this._publicOptions[t]=e[t]}blur(){this._core.blur()}focus(){this._core.focus()}input(e,t=!0){this._core.input(e,t)}resize(e,t){this._verifyIntegers(e,t),this._core.resize(e,t)}open(e){this._core.open(e)}attachCustomKeyEventHandler(e){this._core.attachCustomKeyEventHandler(e)}attachCustomWheelEventHandler(e){this._core.attachCustomWheelEventHandler(e)}registerLinkProvider(e){return this._core.registerLinkProvider(e)}registerCharacterJoiner(e){return this._checkProposedApi(),this._core.registerCharacterJoiner(e)}deregisterCharacterJoiner(e){this._checkProposedApi(),this._core.deregisterCharacterJoiner(e)}registerMarker(e=0){return this._verifyIntegers(e),this._core.registerMarker(e)}registerDecoration(e){return this._checkProposedApi(),this._verifyPositiveIntegers(e.x??0,e.width??0,e.height??0),this._core.registerDecoration(e)}hasSelection(){return this._core.hasSelection()}select(e,t,n){this._verifyIntegers(e,t,n),this._core.select(e,t,n)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(e,t){this._verifyIntegers(e,t),this._core.selectLines(e,t)}dispose(){super.dispose()}scrollLines(e){this._verifyIntegers(e),this._core.scrollLines(e)}scrollPages(e){this._verifyIntegers(e),this._core.scrollPages(e)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(e){this._verifyIntegers(e),this._core.scrollToLine(e)}clear(){this._core.clear()}write(e,t){this._core.write(e,t)}writeln(e,t){this._core.write(e),this._core.write(`\r
`,t)}paste(e){this._core.paste(e)}refresh(e,t){this._verifyIntegers(e,t),this._core.refresh(e,t)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(e){this._addonManager.loadAddon(this,e)}static get strings(){return t}_verifyIntegers(...e){for(let t of e)if(t===1/0||isNaN(t)||t%1!=0)throw Error(`This API only accepts integers`)}_verifyPositiveIntegers(...e){for(let t of e)if(t&&(t===1/0||isNaN(t)||t%1!=0||t<0))throw Error(`This API only accepts positive integers`)}}e.Terminal=d})(),r})()))})),n=e(((e,t)=>{(function(n,r){typeof e==`object`&&typeof t==`object`?t.exports=r():typeof define==`function`&&define.amd?define([],r):typeof e==`object`?e.FitAddon=r():n.FitAddon=r()})(self,(()=>(()=>{var e={};return(()=>{var t=e;Object.defineProperty(t,"__esModule",{value:!0}),t.FitAddon=void 0,t.FitAddon=class{activate(e){this._terminal=e}dispose(){}fit(){let e=this.proposeDimensions();if(!e||!this._terminal||isNaN(e.cols)||isNaN(e.rows))return;let t=this._terminal._core;this._terminal.rows===e.rows&&this._terminal.cols===e.cols||(t._renderService.clear(),this._terminal.resize(e.cols,e.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;let e=this._terminal._core,t=e._renderService.dimensions;if(t.css.cell.width===0||t.css.cell.height===0)return;let n=this._terminal.options.scrollback===0?0:e.viewport.scrollBarWidth,r=window.getComputedStyle(this._terminal.element.parentElement),i=parseInt(r.getPropertyValue(`height`)),a=Math.max(0,parseInt(r.getPropertyValue(`width`))),o=window.getComputedStyle(this._terminal.element),s=i-(parseInt(o.getPropertyValue(`padding-top`))+parseInt(o.getPropertyValue(`padding-bottom`))),c=a-(parseInt(o.getPropertyValue(`padding-right`))+parseInt(o.getPropertyValue(`padding-left`)))-n;return{cols:Math.max(2,Math.floor(c/t.css.cell.width)),rows:Math.max(1,Math.floor(s/t.css.cell.height))}}}})(),e})()))})),r=t(),i=n(),a={".python-version":`3.12
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
`,"apps/notes/data/Test.txt":`Hello, world!`,"apps/settings/config.json":`{"theme": "default", "username": "user", "show_splash": true, "confirm_actions": true, "editor_width": 40, "password": ""}`,"boot/logo.txt":`                                                                                                                
                            _/_/_/                                                  _/                          
     _/_/_/    _/    _/  _/          _/_/    _/_/_/  _/_/    _/_/_/    _/    _/  _/_/_/_/    _/_/    _/  _/_/   
    _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/_/_/_/  _/_/        
   _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/        _/           
  _/_/_/      _/_/_/    _/_/_/    _/_/    _/    _/    _/  _/_/_/      _/_/_/      _/_/    _/_/_/  _/            
 _/              _/                                      _/                                                     
_/          _/_/                                        _/                                                      
                              
pyComputer Kernel Booting...
`,"sys/apps.json":`[]`,"usr/apps/calculator/main.py":`"""
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
`},o=`modulepreload`,s=function(e,t){return new URL(e,t).href},c={},l=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=l(t.map(t=>{if(t=s(t,n),t in c)return;c[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let l=document.createElement(`link`);if(l.rel=r?`stylesheet`:o,r||(l.as=`script`),l.crossOrigin=``,l.href=t,a&&l.setAttribute(`nonce`,a),document.head.appendChild(l),r)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function u(){let{loadPyodide:e}=await l(async()=>{let{loadPyodide:e}=await import(`https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.mjs`);return{loadPyodide:e}},[],import.meta.url);return e({indexURL:`https://cdn.jsdelivr.net/pyodide/v0.29.3/full/`})}async function d(e,t){await e.loadPackage(`micropip`),await e.runPythonAsync(`import micropip`);let n=JSON.stringify(t);await e.runPythonAsync(`import micropip\nawait micropip.install(${n})`)}var f=document.getElementById(`status`),p=document.getElementById(`terminal`),m={default:{bg:`#0a0a0a`,fg:`#ffffff`,cursor:`#ffffff`,selection:`rgba(255, 255, 255, 0.3)`},retro:{bg:`#0a0a0a`,fg:`#00ff41`,cursor:`#00ff41`,selection:`rgba(0, 255, 65, 0.3)`},light:{bg:`#ffffff`,fg:`#000000`,cursor:`#000000`,selection:`rgba(0, 0, 0, 0.2)`},dark:{bg:`#0a0a0a`,fg:`#ffffff`,cursor:`#ffffff`,selection:`rgba(255, 255, 255, 0.3)`},mono:{bg:`#0a0a0a`,fg:`#cccccc`,cursor:`#cccccc`,selection:`rgba(255, 255, 255, 0.2)`},pastel:{bg:`#1e1e2e`,fg:`#cba6f7`,cursor:`#cba6f7`,selection:`rgba(203, 166, 247, 0.3)`}};function h(e){let t=m[e]||m.default;document.body.style.background=t.bg,document.body.style.color=t.fg,document.documentElement.style.setProperty(`--term-bg`,t.bg);let n=document.getElementById(`terminal-container`);n&&(n.style.background=t.bg),window.term&&(window.term.options.theme={background:t.bg,foreground:t.fg,cursor:t.cursor,selection:t.selection}),document.querySelectorAll(`#theme-buttons button`).forEach(e=>e.classList.remove(`active`));let r=document.querySelector(`#theme-buttons button[data-theme="${e}"]`);r&&r.classList.add(`active`)}window.setWebTheme=h;var g=new r.Terminal({cursorBlink:!0,cursorStyle:`block`,fontSize:14,fontFamily:`'Fira Code', 'Consolas', monospace`,theme:{background:`#0a0a0a`,foreground:`#ffffff`,cursor:`#ffffff`,selection:`rgba(255, 255, 255, 0.3)`}});window.term=g;var _=new i.FitAddon;g.loadAddon(_),g.open(p),_.fit(),window.addEventListener(`resize`,()=>_.fit()),window.pythonLineBuffer=[],window.termWrite=e=>{let t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`);g.write(t)};var v=!1;window.setRawInput=e=>{v=e};var y=null,b=[],x=``,S=null;window.pyc_readline=()=>new Promise(e=>{b.length>0?e(b.shift()):S=e});function C(e){S?(S(e),S=null):b.push(e)}function w(){return b.length>0?Promise.resolve(b.shift()):new Promise(e=>{S=e})}g.onData(e=>{if(v){try{y.pyimport(`src.ui.input`).web_input_queue.append(e)}catch{}return}for(let t of e)t===`\r`?(g.write(`\r
`),C(x),x=``):t===``?x.length>0&&(x=x.slice(0,-1),g.write(`\b \b`)):t===``?(g.write(`^C\r
`),C(`exit`),x=``):(x+=t,g.write(t))}),g.write(`\x1B[2J\x1B[1;1HLoading pyComputer...
`);async function T(){y=await u(),f.textContent=`Ready`,f.className=`ready`,g.write(`\r
`);try{await d(y,[`tuiro`,`requests`]),g.write(`[web] Installed web dependencies: tuiro, requests\r
`)}catch(e){g.write(`[web] Warning: failed to install web deps: ${e}\r\n`)}let e=`import os
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
FILES = ${JSON.stringify(a)}

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
`;await y.runPythonAsync(e);let t=`[/] $ `;g.write(t);async function n(e){if(!e.trim()){g.write(t);return}y.globals.set(`commandLine`,e);try{await y.runPythonAsync(`shell.execute(commandLine)`)}catch(e){if(String(e).includes(`SystemExit`)){g.write(`Shell exited.\r
`);return}g.write(`Error: ${e}\r\n`)}g.write(t)}for(;;)await n(await w())}T().catch(e=>{f.textContent=`Failed`,g.write(`Error: ${e}\r\n`)});