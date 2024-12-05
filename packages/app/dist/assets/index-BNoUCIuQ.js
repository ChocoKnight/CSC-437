(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var Y,je;class ut extends Error{}ut.prototype.name="InvalidTokenError";function si(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function ii(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return si(t)}catch{return atob(t)}}function ds(r,t){if(typeof r!="string")throw new ut("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new ut(`Invalid token specified: missing part #${e+1}`);let i;try{i=ii(s)}catch(n){throw new ut(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new ut(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const ri="mu:context",re=`${ri}:change`;class ni{constructor(t,e){this._proxy=oi(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class he extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new ni(t,this),this.style.display="contents"}attach(t){return this.addEventListener(re,t),t}detach(t){this.removeEventListener(re,t)}}function oi(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let u=new CustomEvent(re,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(u,{property:i,oldValue:l,value:n}),t.dispatchEvent(u)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function ai(r,t){const e=us(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function us(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return us(r,i.host)}class li extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function ps(r="mu:message"){return(t,...e)=>t.dispatchEvent(new li(e,r))}class de{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function ci(r){return t=>({...t,...r})}const ne="mu:auth:jwt",ms=class fs extends de{constructor(t,e){super((s,i)=>this.update(s,i),t,fs.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(di(s)),Qt(i);case"auth/signout":return e(ui()),Qt(this._redirectForLogin);case"auth/redirect":return Qt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};ms.EVENT_TYPE="auth:message";let gs=ms;const vs=ps(gs.EVENT_TYPE);function Qt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class hi extends he{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=X.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new gs(this.context,this.redirect).attach(this)}}class Q{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(ne),t}}class X extends Q{constructor(t){super();const e=ds(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new X(t);return localStorage.setItem(ne,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(ne);return t?X.authenticate(t):new Q}}function di(r){return ci({user:X.authenticate(r),token:r})}function ui(){return r=>{const t=r.user;return{user:t&&t.authenticated?Q.deauthenticate(t):t,token:""}}}function pi(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function mi(r){return r.authenticated?ds(r.token||""):{}}const T=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:X,Provider:hi,User:Q,dispatch:vs,headers:pi,payload:mi},Symbol.toStringTag,{value:"Module"}));function Ct(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function oe(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const ys=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:oe,relay:Ct},Symbol.toStringTag,{value:"Module"}));function _s(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const fi=new DOMParser;function F(r,...t){const e=t.map(l),s=r.map((a,u)=>{if(u===0)return[a];const m=e[u-1];return m instanceof Node?[`<ins id="mu-html-${u-1}"></ins>`,a]:[m,a]}).flat().join(""),i=fi.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,u)=>{if(a instanceof Node){const m=o.querySelector(`ins#mu-html-${u}`);if(m){const d=m.parentNode;d==null||d.replaceChild(a,m)}else console.log("Missing insertion point:",`ins#mu-html-${u}`)}}),o;function l(a,u){if(a===null)return"";switch(typeof a){case"string":return Me(a);case"bigint":case"boolean":case"number":case"symbol":return Me(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const m=new DocumentFragment,d=a.map(l);return m.replaceChildren(...d),m}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Me(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qt(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}Y=class extends HTMLElement{constructor(){super(),this._state={},qt(this).template(Y.template).styles(Y.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Ct(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},gi(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},Y.template=F`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,Y.styles=_s`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function gi(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const $s=class bs extends de{constructor(t){super((e,s)=>this.update(e,s),t,bs.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(yi(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(_i(s,i));break}}}};$s.EVENT_TYPE="history:message";let ue=$s;class ze extends he{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=vi(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),pe(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new ue(this.context).attach(this)}}function vi(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function yi(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function _i(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const pe=ps(ue.EVENT_TYPE),$i=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:ze,Provider:ze,Service:ue,dispatch:pe},Symbol.toStringTag,{value:"Module"}));class S{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new Le(this._provider,t);this._effects.push(i),e(i)}else ai(this._target,this._contextLabel).then(i=>{const n=new Le(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel}: ${i}`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class Le{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const ws=class As extends HTMLElement{constructor(){super(),this._state={},this._user=new Q,this._authObserver=new S(this,"blazing:auth"),qt(this).template(As.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;bi(i,this._state,e,this.authorization).then(n=>lt(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},lt(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&He(this.src,this.authorization).then(e=>{this._state=e,lt(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&He(this.src,this.authorization).then(i=>{this._state=i,lt(i,this)});break;case"new":s&&(this._state={},lt({},this));break}}};ws.observedAttributes=["src","new","action"];ws.template=F`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function He(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function lt(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function bi(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const Es=class xs extends de{constructor(t,e){super(e,t,xs.EVENT_TYPE,!1)}};Es.EVENT_TYPE="mu:message";let Ss=Es;class wi extends he{constructor(t,e,s){super(e),this._user=new Q,this._updateFn=t,this._authObserver=new S(this,s)}connectedCallback(){const t=new Ss(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const Ai=Object.freeze(Object.defineProperty({__proto__:null,Provider:wi,Service:Ss},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis,me=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),De=new WeakMap;let Ps=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(me&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=De.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&De.set(e,t))}return t}toString(){return this.cssText}};const Ei=r=>new Ps(typeof r=="string"?r:r+"",void 0,fe),xi=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Ps(e,r,fe)},Si=(r,t)=>{if(me)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=kt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Fe=me?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Ei(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pi,defineProperty:ki,getOwnPropertyDescriptor:Oi,getOwnPropertyNames:Ci,getOwnPropertySymbols:Ti,getPrototypeOf:Ui}=Object,tt=globalThis,qe=tt.trustedTypes,Ni=qe?qe.emptyScript:"",Be=tt.reactiveElementPolyfillSupport,pt=(r,t)=>r,Tt={toAttribute(r,t){switch(t){case Boolean:r=r?Ni:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ge=(r,t)=>!Pi(r,t),Ve={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:ge};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),tt.litPropertyMetadata??(tt.litPropertyMetadata=new WeakMap);let K=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ki(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Oi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ve}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;const t=Ui(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){const e=this.properties,s=[...Ci(e),...Ti(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Fe(i))}else t!==void 0&&e.push(Fe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Si(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Tt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Tt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ge)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[pt("elementProperties")]=new Map,K[pt("finalized")]=new Map,Be==null||Be({ReactiveElement:K}),(tt.reactiveElementVersions??(tt.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=globalThis,Nt=Ut.trustedTypes,We=Nt?Nt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ks="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,Os="?"+U,Ri=`<${Os}>`,q=document,gt=()=>q.createComment(""),vt=r=>r===null||typeof r!="object"&&typeof r!="function",ve=Array.isArray,Ii=r=>ve(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ye=/-->/g,Ge=/>/g,z=RegExp(`>|${Xt}(?:([^\\s"'>=/]+)(${Xt}*=${Xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ke=/'/g,Je=/"/g,Cs=/^(?:script|style|textarea|title)$/i,ji=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ht=ji(1),et=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Ze=new WeakMap,H=q.createTreeWalker(q,129);function Ts(r,t){if(!ve(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return We!==void 0?We.createHTML(t):t}const Mi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=ct;for(let l=0;l<e;l++){const a=r[l];let u,m,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,m=o.exec(a),m!==null);)c=o.lastIndex,o===ct?m[1]==="!--"?o=Ye:m[1]!==void 0?o=Ge:m[2]!==void 0?(Cs.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=z):m[3]!==void 0&&(o=z):o===z?m[0]===">"?(o=i??ct,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?z:m[3]==='"'?Je:Ke):o===Je||o===Ke?o=z:o===Ye||o===Ge?o=ct:(o=z,i=void 0);const h=o===z&&r[l+1].startsWith("/>")?" ":"";n+=o===ct?a+Ri:d>=0?(s.push(u),a.slice(0,d)+ks+a.slice(d)+U+h):a+U+(d===-2?l:h)}return[Ts(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let ae=class Us{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,m]=Mi(t,e);if(this.el=Us.createElement(u,s),H.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=H.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(ks)){const c=m[o++],h=i.getAttribute(d).split(U),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Li:p[1]==="?"?Hi:p[1]==="@"?Di:Bt}),i.removeAttribute(d)}else d.startsWith(U)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Cs.test(i.tagName)){const d=i.textContent.split(U),c=d.length-1;if(c>0){i.textContent=Nt?Nt.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],gt()),H.nextNode(),a.push({type:2,index:++n});i.append(d[c],gt())}}}else if(i.nodeType===8)if(i.data===Os)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(U,d+1))!==-1;)a.push({type:7,index:n}),d+=U.length-1}n++}}static createElement(t,e){const s=q.createElement("template");return s.innerHTML=t,s}};function st(r,t,e=r,s){var i,n;if(t===et)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=vt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=st(r,o._$AS(r,t.values),o,s)),t}class zi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??q).importNode(e,!0);H.currentNode=i;let n=H.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new wt(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Fi(n,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=H.nextNode(),o++)}return H.currentNode=q,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class wt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=st(this,t,e),vt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ii(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ae.createElement(Ts(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new zi(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=Ze.get(t.strings);return e===void 0&&Ze.set(t.strings,e=new ae(t)),e}k(t){ve(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new wt(this.O(gt()),this.O(gt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Bt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=st(this,t,e,0),o=!vt(t)||t!==this._$AH&&t!==et,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=st(this,l[s+a],e,a),u===et&&(u=this._$AH[a]),o||(o=!vt(u)||u!==this._$AH[a]),u===$?t=$:t!==$&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Li extends Bt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class Hi extends Bt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Di extends Bt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=st(this,t,e,0)??$)===et)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Fi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){st(this,t)}}const Qe=Ut.litHtmlPolyfillSupport;Qe==null||Qe(ae,wt),(Ut.litHtmlVersions??(Ut.litHtmlVersions=[])).push("3.2.0");const qi=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new wt(t.insertBefore(gt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Z=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=qi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return et}};Z._$litElement$=!0,Z.finalized=!0,(je=globalThis.litElementHydrateSupport)==null||je.call(globalThis,{LitElement:Z});const Xe=globalThis.litElementPolyfillSupport;Xe==null||Xe({LitElement:Z});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:ge},Vi=(r=Bi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Ns(r){return(t,e)=>typeof e=="object"?Vi(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rs(r){return Ns({...r,state:!0,attribute:!1})}function Wi(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Yi(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Is={};(function(r){var t=function(){var e=function(d,c,h,p){for(h=h||{},p=d.length;p--;h[d[p]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,f,v,E){var A=v.length-1;switch(f){case 1:return new g.Root({},[v[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[v[A-1],v[A]]);break;case 4:case 5:this.$=v[A];break;case 6:this.$=new g.Literal({value:v[A]});break;case 7:this.$=new g.Splat({name:v[A]});break;case 8:this.$=new g.Param({name:v[A]});break;case 9:this.$=new g.Optional({},[v[A-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,f){this.message=g,this.hash=f};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],f=[],v=this.table,E="",A=0,Ne=0,Qs=2,Re=1,Xs=f.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var Gt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Gt)&&(j.yy[Gt]=this.yy[Gt]);_.setInput(c,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Kt=_.yylloc;f.push(Kt);var ti=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var ei=function(){var W;return W=_.lex()||Re,typeof W!="number"&&(W=h.symbols_[W]||W),W},w,M,x,Jt,V={},St,C,Ie,Pt;;){if(M=p[p.length-1],this.defaultActions[M]?x=this.defaultActions[M]:((w===null||typeof w>"u")&&(w=ei()),x=v[M]&&v[M][w]),typeof x>"u"||!x.length||!x[0]){var Zt="";Pt=[];for(St in v[M])this.terminals_[St]&&St>Qs&&Pt.push("'"+this.terminals_[St]+"'");_.showPosition?Zt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+Pt.join(", ")+", got '"+(this.terminals_[w]||w)+"'":Zt="Parse error on line "+(A+1)+": Unexpected "+(w==Re?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(Zt,{text:_.match,token:this.terminals_[w]||w,line:_.yylineno,loc:Kt,expected:Pt})}if(x[0]instanceof Array&&x.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+w);switch(x[0]){case 1:p.push(w),g.push(_.yytext),f.push(_.yylloc),p.push(x[1]),w=null,Ne=_.yyleng,E=_.yytext,A=_.yylineno,Kt=_.yylloc;break;case 2:if(C=this.productions_[x[1]][1],V.$=g[g.length-C],V._$={first_line:f[f.length-(C||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(C||1)].first_column,last_column:f[f.length-1].last_column},ti&&(V._$.range=[f[f.length-(C||1)].range[0],f[f.length-1].range[1]]),Jt=this.performAction.apply(V,[E,Ne,A,j.yy,x[1],g,f].concat(Xs)),typeof Jt<"u")return Jt;C&&(p=p.slice(0,-1*C*2),g=g.slice(0,-1*C),f=f.slice(0,-1*C)),p.push(this.productions_[x[1]][0]),g.push(V.$),f.push(V._$),Ie=v[p[p.length-2]][p[p.length-1]],p.push(Ie);break;case 3:return!0}}return!0}},u=function(){var d={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var f=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[f[0],f[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,f;if(this.options.backtrack_lexer&&(f={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(f.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var v in f)this[v]=f[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),v=0;v<f.length;v++)if(p=this._input.match(this.rules[f[v]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=v,this.options.backtrack_lexer){if(c=this.test_match(p,f[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,f[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,f){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return d}();a.lexer=u;function m(){this.yy={}}return m.prototype=a,a.Parser=m,new m}();typeof Yi<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Is);function G(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var js={Root:G("Root"),Concat:G("Concat"),Literal:G("Literal"),Splat:G("Splat"),Param:G("Param"),Optional:G("Optional")},Ms=Is.parser;Ms.yy=js;var Gi=Ms,Ki=Object.keys(js);function Ji(r){return Ki.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var zs=Ji,Zi=zs,Qi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Ls(r){this.captures=r.captures,this.re=r.re}Ls.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Xi=Zi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(Qi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Ls({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),tr=Xi,er=zs,sr=er({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),ir=sr,rr=Gi,nr=tr,or=ir;At.prototype=Object.create(null);At.prototype.match=function(r){var t=nr.visit(this.ast),e=t.match(r);return e||!1};At.prototype.reverse=function(r){return or.visit(this.ast,r)};function At(r){var t;if(this?t=this:t=Object.create(At.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=rr.parse(r),t}var ar=At,lr=ar,cr=lr;const hr=Wi(cr);var dr=Object.defineProperty,Hs=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&dr(t,e,i),i};const Ds=class extends Z{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>ht` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new hr(i.path)})),this._historyObserver=new S(this,e),this._authObserver=new S(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),ht` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(vs(this,"auth/redirect"),ht` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):ht` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),ht` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){pe(this,"history/redirect",{href:t})}};Ds.styles=xi`
    :host,
    main {
      display: contents;
    }
  `;let Rt=Ds;Hs([Rs()],Rt.prototype,"_user");Hs([Rs()],Rt.prototype,"_match");const ur=Object.freeze(Object.defineProperty({__proto__:null,Element:Rt,Switch:Rt},Symbol.toStringTag,{value:"Module"})),Fs=class qs extends HTMLElement{constructor(){if(super(),qt(this).template(qs.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Fs.template=F`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let pr=Fs;const mr=Object.freeze(Object.defineProperty({__proto__:null,Element:pr},Symbol.toStringTag,{value:"Module"})),Bs=class le extends HTMLElement{constructor(){super(),this._array=[],qt(this).template(le.template).styles(le.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Vs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{oe(t,"button.add")?Ct(t,"input-array:add"):oe(t,"button.remove")&&Ct(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],fr(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};Bs.template=F`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;Bs.styles=_s`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function fr(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(Vs(e)))}function Vs(r,t){const e=r===void 0?F`<input />`:F`<input value="${r}" />`;return F`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Ws(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var gr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,yr=(r,t,e,s)=>{for(var i=vr(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&gr(t,e,i),i};class Vt extends Z{constructor(t){super(),this._pending=[],this._observer=new S(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}yr([Ns()],Vt.prototype,"model");const _r={},$r=["January","Febuary","March","April","May","June","July","August","September","October","November","December"],yt=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=$r[t.getUTCMonth()],s=t.getUTCDate(),i=t.getUTCFullYear();return`${s} ${e} ${i}`},br=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=t.getUTCMonth()+1,s=t.getUTCDate(),i=t.getUTCFullYear();return e<10&&s<10?`${i}-0${e}-0${s}`:e<10?`${i}-0${e}-${s}`:`${i}-${e}-${s}`};function wr(r,t,e){switch(r[0]){case"user/select":Cr(r[1],e).then(i=>t(n=>({...n,profile:i})));break;case"champion/select":Ar(r[1]).then(i=>t(n=>({...n,champion:i})));break;case"teams/select":Er(r[1]).then(i=>t(n=>({...n,team:i})));break;case"players/select":xr(r[1]).then(i=>t(n=>({...n,player:i})));break;case"tournament/select":Sr({tournamentId:r[1].tournamentId}).then(i=>{if(i){const{tournament:n,matches:o}=i;t(l=>({...l,tournament:n,matches:o}))}else console.error("Failed to fetch tournament or matches.")});break;case"tournaments/select":Pr().then(i=>t(n=>({...n,tournaments:i})));break;case"matches/select":kr().then(i=>t(n=>({...n,matches:i})));break;case"match/select":Or({matchId:r[1].matchId}).then(i=>{if(i){const{match:n,games:o}=i;t(l=>({...l,match:n,games:o}))}else console.error("Failed to fetch match or games.")});break;default:const s=r[0];throw new Error(`Unhandled Auth message "${s}"`)}}function Ar(r){return fetch(`/api/champions/${r.championName}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Champion:",t),t})}function Er(r){return fetch(`/api/teams/${r.teamId}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Team:",t),t})}function xr(r){return fetch(`/api/players/${r.playerName}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Player:",t),t})}function Sr(r){return fetch(`/api/tournaments/${r.tournamentId}`).then(t=>{if(t.status===200)return t.json();throw new Error("Failed to fetch tournament data")}).then(t=>{console.log("Tournament:",t);const{league:e,split:s,year:i}=t,n=s==="N/A"?`${e} ${i}`:`${e} ${i} ${s}`;return fetch(`/api/matches?tournamentName=${encodeURIComponent(n)}`).then(o=>{if(o.status===200)return o.json();throw new Error("Failed to fetch matches data")}).then(o=>(console.log("Matches:",o),{tournament:t,matches:o}))}).catch(t=>{console.error("Error:",t)})}function Pr(){return fetch("/api/tournaments").then(r=>{if(r.status!==200)throw"Failed to load index of tournaments";return r.json()}).then(r=>{if(r)return console.log("Tournament:",r),r})}function kr(){return fetch("/api/matches").then(r=>{if(r.status!==200)throw"Failed to load index of matches";return r.json()}).then(r=>{if(r)return console.log("matches:",r),r})}function Or(r){return fetch(`/api/matches/${r.matchId}`).then(t=>{if(t.status===200)return t.json();throw new Error("Failed to fetch tournament data")}).then(t=>{console.log("Match:",t);const{teamOne:e,teamTwo:s,date:i}=t,n=`${e} vs ${s} - ${br(i)}`;return console.log(n),fetch(`/api/games?matchId=${encodeURIComponent(n)}`).then(o=>{if(o.status===200)return o.json();throw new Error("Failed to fetch matches data")}).then(o=>(console.log("Games:",o),{match:t,games:o}))}).catch(t=>{console.error("Error:",t)})}function Cr(r,t){return fetch(`/api/users/${r.userId}`,{headers:T.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=globalThis,ye=Ot.ShadowRoot&&(Ot.ShadyCSS===void 0||Ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),ts=new WeakMap;let Ys=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ye&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ts.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ts.set(e,t))}return t}toString(){return this.cssText}};const Tr=r=>new Ys(typeof r=="string"?r:r+"",void 0,_e),P=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Ys(e,r,_e)},Ur=(r,t)=>{if(ye)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Ot.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},es=ye?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Tr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Nr,defineProperty:Rr,getOwnPropertyDescriptor:Ir,getOwnPropertyNames:jr,getOwnPropertySymbols:Mr,getPrototypeOf:zr}=Object,R=globalThis,ss=R.trustedTypes,Lr=ss?ss.emptyScript:"",te=R.reactiveElementPolyfillSupport,mt=(r,t)=>r,It={toAttribute(r,t){switch(t){case Boolean:r=r?Lr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},$e=(r,t)=>!Nr(r,t),is={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:$e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);class J extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=is){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Rr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Ir(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??is}static _$Ei(){if(this.hasOwnProperty(mt("elementProperties")))return;const t=zr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(mt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mt("properties"))){const e=this.properties,s=[...jr(e),...Mr(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(es(i))}else t!==void 0&&e.push(es(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ur(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:It).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:It;this._$Em=i,this[i]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??$e)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[mt("elementProperties")]=new Map,J[mt("finalized")]=new Map,te==null||te({ReactiveElement:J}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=globalThis,jt=ft.trustedTypes,rs=jt?jt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Gs="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Ks="?"+N,Hr=`<${Ks}>`,B=document,_t=()=>B.createComment(""),$t=r=>r===null||typeof r!="object"&&typeof r!="function",be=Array.isArray,Dr=r=>be(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ee=`[ 	
\f\r]`,dt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ns=/-->/g,os=/>/g,L=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),as=/'/g,ls=/"/g,Js=/^(?:script|style|textarea|title)$/i,Fr=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=Fr(1),it=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),cs=new WeakMap,D=B.createTreeWalker(B,129);function Zs(r,t){if(!be(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return rs!==void 0?rs.createHTML(t):t}const qr=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=dt;for(let l=0;l<e;l++){const a=r[l];let u,m,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,m=o.exec(a),m!==null);)c=o.lastIndex,o===dt?m[1]==="!--"?o=ns:m[1]!==void 0?o=os:m[2]!==void 0?(Js.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=L):m[3]!==void 0&&(o=L):o===L?m[0]===">"?(o=i??dt,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?L:m[3]==='"'?ls:as):o===ls||o===as?o=L:o===ns||o===os?o=dt:(o=L,i=void 0);const h=o===L&&r[l+1].startsWith("/>")?" ":"";n+=o===dt?a+Hr:d>=0?(s.push(u),a.slice(0,d)+Gs+a.slice(d)+N+h):a+N+(d===-2?l:h)}return[Zs(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class bt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,m]=qr(t,e);if(this.el=bt.createElement(u,s),D.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=D.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Gs)){const c=m[o++],h=i.getAttribute(d).split(N),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Vr:p[1]==="?"?Wr:p[1]==="@"?Yr:Wt}),i.removeAttribute(d)}else d.startsWith(N)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Js.test(i.tagName)){const d=i.textContent.split(N),c=d.length-1;if(c>0){i.textContent=jt?jt.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],_t()),D.nextNode(),a.push({type:2,index:++n});i.append(d[c],_t())}}}else if(i.nodeType===8)if(i.data===Ks)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(N,d+1))!==-1;)a.push({type:7,index:n}),d+=N.length-1}n++}}static createElement(t,e){const s=B.createElement("template");return s.innerHTML=t,s}}function rt(r,t,e=r,s){var o,l;if(t===it)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=$t(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=rt(r,i._$AS(r,t.values),i,s)),t}class Br{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??B).importNode(e,!0);D.currentNode=i;let n=D.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new Et(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Gr(n,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=D.nextNode(),o++)}return D.currentNode=B,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Et{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),$t(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==it&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=bt.createElement(Zs(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Br(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=cs.get(t.strings);return e===void 0&&cs.set(t.strings,e=new bt(t)),e}k(t){be(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Et(this.O(_t()),this.O(_t()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Wt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=rt(this,t,e,0),o=!$t(t)||t!==this._$AH&&t!==it,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=rt(this,l[s+a],e,a),u===it&&(u=this._$AH[a]),o||(o=!$t(u)||u!==this._$AH[a]),u===b?t=b:t!==b&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Vr extends Wt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Wr extends Wt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Yr extends Wt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??b)===it)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Gr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const se=ft.litHtmlPolyfillSupport;se==null||se(bt,Et),(ft.litHtmlVersions??(ft.litHtmlVersions=[])).push("3.2.1");const Kr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new Et(t.insertBefore(_t(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let k=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Kr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return it}};var hs;k._$litElement$=!0,k.finalized=!0,(hs=globalThis.litElementHydrateSupport)==null||hs.call(globalThis,{LitElement:k});const ie=globalThis.litElementPolyfillSupport;ie==null||ie({LitElement:k});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const Jr=P`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,I={styles:Jr},Zr=P`
    /* h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        // font-family: var(--font-family-display);
    } */

    h1 {
        font-size: var(--size-type-xxlarge);
        font-weight: var(--font-weight-bold);
    }

    h2 {
        font-size: var(--size-type-xlarge);
        font-weight: var(--font-weight-bold);
    }

    h3 {
        font-size: var(--size-type-large);
        font-weight: var(--font-weight-bold);
    }

    h4 {
        font-size: var(--size-type-mlarge);
        font-weight: var(--font-weight-bold);
    }

    h5 {
        font-size: var(--size-type-body);
        font-weight: var(--font-weight-bold);
    }

    h6 {
        font-size: var(--size-type-body);
        font-weight: var(--font-weight-normal);
        font-style: italic;
    }

    h1 > a {
        color: var(--color-link);
    }

    a {
        color: var(--color-link-header);
    }

    a:link {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
        color: var(--color-text-important);
    }

    a:active {
        text-decoration: none;
    }
    `,xt={styles:Zr};function Qr(r){const e=r.target.checked;ys.relay(r,"light-mode",{checked:e})}function Xr(r){ys.relay(r,"auth:message",["auth/signout"])}const Ft=class Ft extends k{constructor(){super(...arguments),this._authObserver=new S(this,"lol:auth"),this._user=new T.User}render(){return y`
        <header>
            <div class="top_bar">
                <h1>
                    <a href="/">Lens of Legends</a>
                </h1>

                <drop-down>
                    <a slot="actuator">
                        <h3 id="userid"></h3>
                    </a>

                    <menu>
                        <li class="when-signed-out">
                            <a href="/app/login">Sign In</a>
                        </li>

                        <li class="when-signed-in">
                            <a href="/app/users/">Profile</a>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout" @click=${Xr}>Sign Out</a>
                        </li>
                    </menu>
                </drop-down>
            </div>
            <div class="nav_bar">
                <ul>
                    <li>
                        <a href="/app/tournaments">Tournaments</a>
                    </li>
                    <li>
                        <a href="/app/teams">Teams</a>
                    </li>
                    <li>
                        <a href="/app/players">Players</a>
                    </li>
                    <li>
                        <a href="/app/champions">Champions</a>
                    </li>
                </ul>

                <label @change=${Qr}>
                    <input type="checkbox" autocomplete="off" />
                    Light Mode
                </label>
            </div>
        </header>`}static initializeOnce(){function t(e,s){e.classList.toggle("light-mode",s)}document.body.addEventListener("light-mode",e=>{var s;return t(e.currentTarget,(s=e.detail)==null?void 0:s.checked)})}};Ft.uses=Ws({"drop-down":mr.Element}),Ft.styles=[I.styles,xt.styles,P`
        :host {
            display: grid;
            position: sticky;
            top: 0;
            grid-column: 1 / -1;
        }

        header {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: bottom;
            justify-content: space-between;
            padding: var(--size-spacing-medium);
            background-color: var(--color-background-header);
            color: var(--color-text-inverted);
            width: auto;
            padding: 0;
        }

        header h1, .nav_bar, drop-down {
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
        }

        .top_bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        drop-down {
            justify-self: end;
            align-self: center;
        }

        a[slot="actuator"] {
            color: var(--color-link-inverted);
            cursor: pointer;
        }

        #userid:empty::before {
            content: "Summoner";
        }

        menu {
            background: var(--color-background-header);
        }

        menu a {
            color: var(--color-link);
            cursor: pointer;
            text-decoration: underline;
            text-align: right;
        }

        .nav_bar {
            background-color: var(--color-background-nav);
        }

        .nav_bar ul {
            flex-direction: row;
            padding: 0;
            margin: 0;
        }

        .nav_bar ul li {
            margin: var(--size-spacing-medium);
        }

        .search_container{
            display: flex;
            flex-direction: column;
            align-items: end;
        }

        .search_container {
            display: flex;
            align-items: right;
        }

        .search_container input[type="text"] {
            padding: 5px; 
        }

        .search_container button {
            padding: 5px 10px; /* Add padding to button */
            margin-left: var(--size-spacing-small);
        }
        `];let Mt=Ft;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:$e},en=(r=tn,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Yt(r){return(t,e)=>typeof e=="object"?en(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(r){return Yt({...r,state:!0,attribute:!1})}var sn=Object.defineProperty,rn=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&sn(t,e,i),i};const xe=class xe extends k{constructor(){super(...arguments),this.src="/api/matches",this.matchIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load match data:",e)).then(e=>{e&&(console.log("Matches:",e),this.matchIndex=e)}).catch(e=>console.log("Failed to convert match data:",e))}render(){this.matchIndex.sort((e,s)=>new Date(s.date).getTime()-new Date(e.date).getTime());const t=this.matchIndex.slice(0,15).map(this.renderItem);return y`
        <main class="page">
            <header>
                <h2>Recent Matches</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Tournament
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Match
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Date
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{tournamentName:e,date:s,teamOne:i,teamTwo:n,_id:o}=t;return y`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${o}">${e}</a>
                </dt>
                <dd>
                    ${i} 
                    vs
                    ${n}
                </dd>
                <dd>
                <time>
                    ${yt(s)}
                </time>
                </dd>
            </div>
          `}};xe.styles=[I.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let zt=xe;rn([O()],zt.prototype,"matchIndex");var nn=Object.defineProperty,on=Object.getOwnPropertyDescriptor,we=(r,t,e,s)=>{for(var i=s>1?void 0:s?on(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&nn(t,e,i),i};const Se=class Se extends Vt{constructor(){super("lol:model"),this.tournamentId="nothing",this._authObserver=new S(this,"lol:auth"),this._user=new T.User}get tournaments(){return this.model.tournaments}set tournaments(t){this.model.tournaments=t,this.requestUpdate()}get match(){return this.model.matches}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="tournament-id"&&e!==s&&s&&(this.dispatchMessage(["tournaments/select",{}]),this.dispatchMessage(["matches/select",{}]))}render(){var t=void 0;return this.match&&this.tournaments?t=this.tournaments.map(e=>this.renderItem(e,this.match)):t=y``,y`
        <main class="page">
            <header>
                <h2>Tournaments</h2>
            </header>
                <dl>
                    <div class="row">
                        <dt>
                            Year
                        </dt>
                        <dd>
                            <button @click="${()=>this.queryYear(2024,this.tournaments)}">2024</button>
                        </dd>
                        <dd>
                            <button @click="${()=>this.queryYear(2025,this.tournaments)}">2025</button>
                        </dd>
                    </div>
                    <div class="row">
                        <dt>
                            Split
                        </dt>
                        <dd>
                            <button @click="${()=>this.querySplit("First",this.tournaments)}">First</button> 
                        </dd>
                        <dd>
                            <button @click="${()=>this.querySplit("Second",this.tournaments)}">Second</button> 
                        </dd>
                        <dd>
                            <button @click="${()=>this.querySplit("Other",this.tournaments)}">Other</button> 
                        </dd>
                    </div>
                    <div class="row">
                        <dt>
                        <button @click="${()=>this.reset()}">Reset</button>
                        </dt>
                    </div>
                </dl>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Name
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Number of Games
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            First Game
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Last Game
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}queryYear(t,e){if(console.log("query year"),e){const s=e.filter(i=>i.year===t);this.tournaments=s}}querySplit(t,e){if(console.log("query year"),e){var s=e;t==="First"?s=e.filter(i=>i.split==="Spring"||i.split==="Split 1"||i.split==="Champ 1"||i.split==="Opening"):t==="Second"?s=e.filter(i=>i.split==="Summer"||i.split==="Split 2"||i.split==="Champ 2"||i.split==="Closing"):s=e.filter(i=>i.split==="N/A"||i.split==="BLX Masters"||i.split==="Finals"||i.split==="Split 3"),this.tournaments=s}}reset(){this.tournamentId===""?this.tournamentId="nothing":this.tournamentId=""}renderItem(t,e){const{_id:s,league:i,year:n,split:o}=t,l=o==="N/A"?`${i} ${n}`:`${i} ${n} ${o}`;var a=[];return e?(a=e.filter(u=>u.tournamentName.trim().toLowerCase()===l.trim().toLowerCase()),a.sort((u,m)=>new Date(u.date).getTime()-new Date(m.date).getTime()),y`
                <div class="row">
                    <dt>
                        <a href="/app/tournaments/${s}">${l}</a>
                    </dt>
                    <dd>
                        ${a.length}
                    </dd>
                    <dd>
                        ${yt(a[0].date)}
                    </dd>
                    <dd>
                        ${yt(a[a.length-1].date)}
                    </dd>
                </div>
            `):y`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${s}">${l}</a>
                </dt>
                <dd>
                    ${a.length}
                </dd>
                <dd>
                    "N/A"
                </dd>
                <dd>
                    "N/A"
                </dd>
            </div>
        `}};Se.styles=[I.styles,xt.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let nt=Se;we([Yt({attribute:"tournament-id",reflect:!0})],nt.prototype,"tournamentId",2);we([O()],nt.prototype,"tournaments",1);we([O()],nt.prototype,"match",1);var an=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,Ae=(r,t,e,s)=>{for(var i=s>1?void 0:s?ln(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&an(t,e,i),i};const Pe=class Pe extends Vt{constructor(){super("lol:model"),this.tournamentId="",this._authObserver=new S(this,"lol:auth"),this._user=new T.User}get tournament(){return this.model.tournament}get match(){return this.model.matches}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="tournament-id"&&e!==s&&s&&this.dispatchMessage(["tournament/select",{tournamentId:s}])}render(){const{league:t,split:e,year:s}=this.tournament||{};var i=void 0,n=0;this.match===void 0?i=[].map(this.renderItem):(this.match.sort((l,a)=>new Date(a.date).getTime()-new Date(l.date).getTime()),i=this.match.map(this.renderItem),n=this.match.length);var o="";return e==="N/A"?o=`${t} ${s}`:o=`${t} ${s} ${e}`,y`
        <main class="page">
            <header>
                <h2>${o}</h2>
            </header>
            <dl>
                <div class="row">
                    <dt>
                        <h3>Number of Matches</h3>
                    </dt>
                    <dd>
                        ${n}
                    </dd>
                </div>
            </dl>
            <header>
                <h2>Match List</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Match
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Games Played
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            Date
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            Patch
                        </h3>
                    </dd> 
                </div>
                ${i}
            </dl>
        </main>  
      `}renderItem(t){const{date:e,teamOne:s,teamTwo:i,games:n,patch:o,_id:l}=t;return y`
            <div class="row">
                <dt>
                    <a href="/app/matches/${l}">
                        ${s} 
                        vs
                        ${i}
                    </a> 
                </dt>
                <dd>
                    ${n.length}
                </dd>
                <dd>
                    <time>
                        ${yt(e)}
                    </time>
                </dd>
                <dd>
                    ${o}
                </dd>
            </div>
          `}};Pe.styles=[I.styles,xt.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let ot=Pe;Ae([Yt({attribute:"tournament-id",reflect:!0})],ot.prototype,"tournamentId",2);Ae([O()],ot.prototype,"tournament",1);Ae([O()],ot.prototype,"match",1);var cn=Object.defineProperty,hn=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&cn(t,e,i),i};const ke=class ke extends k{constructor(){super(...arguments),this.src="/api/champions",this.championIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load champion data:",e)).then(e=>{e&&(console.log("Champions:",e),this.championIndex=e)}).catch(e=>console.log("Failed to convert champion data:",e))}render(){const t=this.championIndex.map(this.renderItem);return y`
        <main class="page">
            <header>
                <h2>Champions</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Name
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Number of Games
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,championId:s,champ_id:i,title:n}=t;return y`
            <div class="row">
                <dt>
                    ${e}
                </dt>
                <dd>
                    ${s}
                </dd>
                <dd>
                    ${i}
                </dd>
                <dd>
                    ${n}
                </dd>
            </div>
          `}};ke.styles=[I.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let Lt=ke;hn([O()],Lt.prototype,"championIndex");var dn=Object.defineProperty,un=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&dn(t,e,i),i};const Oe=class Oe extends k{constructor(){super(...arguments),this.src="/api/teams",this.teamIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load team data:",e)).then(e=>{e&&(console.log("Teams:",e),this.teamIndex=e)}).catch(e=>console.log("Failed to convert team data:",e))}render(){const t=this.teamIndex.map(this.renderItem);return y`
        <main class="page">
            <header>
                <h2>Teams</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Name
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Year
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,year:s}=t;return y`
            <div class="row">
                <dt>
                    <a href="/app/teams/${e}">${e}</a>
                </dt>
                <dd>
                    ${s} 
                </dd>
            </div>
          `}};Oe.styles=[I.styles,xt.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let Ht=Oe;un([O()],Ht.prototype,"teamIndex");var pn=Object.defineProperty,mn=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&pn(t,e,i),i};const Ce=class Ce extends k{constructor(){super(...arguments),this.src="/api/players",this.playerIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load Player data:",e)).then(e=>{e&&(console.log("Players:",e),this.playerIndex=e)}).catch(e=>console.log("Failed to convert tournament data:",e))}render(){const t=this.playerIndex.map(this.renderItem);return y`
        <main class="page">
            <header>
                <h2>Players</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Name
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Number of Games
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Duration
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            First Game
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Last Game
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,year:s}=t;return y`
            <div class="row">
                <dt>
                    ${e}
                </dt>
                <dd>
                    ${s}
                </dd>
                <dd>
                    ${s}
                </dd>
                <dd>
                    ${s}
                </dd>
                <dd>
                    ${s}
                </dd>
            </div>
          `}};Ce.styles=[I.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }
        `];let Dt=Ce;mn([O()],Dt.prototype,"playerIndex");var fn=Object.defineProperty,gn=Object.getOwnPropertyDescriptor,Ee=(r,t,e,s)=>{for(var i=s>1?void 0:s?gn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&fn(t,e,i),i};const Te=class Te extends Vt{constructor(){super("lol:model"),this.matchId=""}get match(){return this.model.match}get game(){return this.model.games}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="match-id"&&e!==s&&s&&this.dispatchMessage(["match/select",{matchId:s}])}render(){const{teamOne:t,teamTwo:e,tournamentName:s,date:i,patch:n}=this.match||{};var o=void 0;return this.match&&this.game?o=this.game.map(l=>this.renderGame(l,this.match)):o=y``,y`
        <main class="page">
            <div class="match_overview">
                <h2>
                    <a href="">${t}</a>
                </h2>
                <h2>
                    ${this.findWinLoss(this.game,this.match)}
                </h2>
                <h2>
                    <a href="">${e}</a>
                </h2>
            </div>
            <div>
                <a href="">${s}</a>
            </div>
            <div>
                <span>Patch - ${n}</span>
            </div>
            <div>
                <span>${yt(i)}</span>
            </div>
            ${o}
        </main>  
    `}findObjectiveCounts(t){var e=t.infernalDragons+t.mountainDragons+t.oceanDragons+t.cloudDragons+t.hextechDragons+t.chemtechDragons+t.elderDragons;return[t.towers,t.plates,t.voidGrubs,t.riftHearlds,t.baronNashors,e]}findWinLoss(t,e){var s="";if(e)s=e.teamOne;else return y`0 - 0`;if(t){var i=t.length,n=0;return t.forEach(o=>{const{blueTeam:l,blueWin:a}=o;var u="";s===l?u="Blue Side":u="Red Side",a&&u==="Blue Side"&&(n+=1)}),y`
            <span>${n} - ${i-n}</span>
            `}else return y`0 - 0`}renderGame(t,e){var s="";if(e)s=e.teamOne;else return y``;const{gameName:i,blueTeam:n,bluePickBans:o,redPickBans:l,blueWin:a,blueObjectives:u,redObjectives:m,duration:d}=t;var c="",h="";s===n?(c="Blue Side",h="Red Side"):(c="Red Side",h="Blue Side");var p="";a&&c==="Blue Side"?p="W - L":p="L - W";var g=Math.floor(d/60),f="";d%60<10?f=`0${d%60}`:f=`${d%60}`;var v=[],E=[];return c==="Blue Side"?(v=this.findObjectiveCounts(u),E=this.findObjectiveCounts(m)):(v=this.findObjectiveCounts(m),E=this.findObjectiveCounts(u)),y`
        <div class = "game">
            <h2>
                Game ${i[i.length-1]}
            </h2>
            <div class="game_overview">
                <span>
                    ${c}
                </span>
                <h4>
                    ${p}
                </h4>
                <span>
                    ${h}
                </span>
            </div>
            <div>
                <slot class="middle" name="duration">
                    <span>${g}:${f}</span>
                </slot>
            </div>

            <div class = "objectives">
                <h2>
                    Picks and Bans
                </h2>
                <div class="pick_ban">
                    <div class="blue">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.banOne}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.banTwo}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.banThree}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.pickOne}_0.jpg" class="champ_icon">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.pickTwo}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.pickThree}_0.jpg" class="champ_icon">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.banFour}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.banFive}_0.jpg" class="grayscale">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.pickFour}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${o.pickFive}_0.jpg" class="champ_icon">
                        <span></span>
                    </div>
                    <div class="red">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.banOne}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.banTwo}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.banThree}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.pickOne}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.pickTwo}_0.jpg" class="champ_icon">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.pickThree}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.banFour}_0.jpg" class="grayscale">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.banFive}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.pickFour}_0.jpg" class="champ_icon">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${l.pickFive}_0.jpg" class="champ_icon">
                    </div>
                </div>
            </div>

            <div class = "objectives">
                <h2>Objectives</h2>
                <!-- <section class="objective">
                    <span>0</span>
                    <h4>Kills</h4>
                    <span>0</span>
                </section> -->

                <section class="objective">
                    <span>${v[0]}</span>
                    <h4>Towers</h4>
                    <span>${E[0]}</span>
                </section>

                <section class="objective">
                    <span>${v[1]}</span>
                    <h4>Plates</h4>
                    <span>${E[1]}</span>
                </section>

                <section class="objective">
                    <span>${v[2]}</span>
                    <h4>Void Grubs</h4>
                    <span>${E[2]}</span>
                </section>

                <section class="objective">
                    <span>${v[3]}</span>
                    <h4>Rift Heralds</h4>
                    <span>${E[3]}</span>
                </section>

                <section class="objective">
                    <span>${v[4]}</span>
                    <h4>Baron Nashtors</h4>
                    <span>${E[4]}</span>
                </section>

                <section class="objective">
                    <span>${v[5]}</span>
                    <h4>Drakes</h4>
                    <span>${E[5]}</span>
                </section>

                <!-- <section class="objective">
                    <span>0</span>
                    <h4>Total Gold</h4>
                    <span>0</span>
                </section> -->
            </div>
        </div>
          `}};Te.styles=[I.styles,xt.styles,P`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .game {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid; 
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }

        .match_overview {
            display: grid;
            grid-template-columns: 1fr 0.25fr 1fr;
            align-items: center; 
            justify-items: center; 
        }

        .game_overview {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center; 
            justify-items: center; 
        }
        
        .middle {
            display: grid;
            grid-column: 1 / -1;
            align-items: center; 
            justify-items: center; 
        }

        .objectives {
            display: grid;
            grid-column: 1 / -1;
        }

        .objective {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center; 
            text-align: center; 
            justify-items: center; 
        }

        .pick_ban {
            display: grid;
            grid-column: 1 / -1;
            // grid-template-columns: 1fr 1fr;
        }

        .blue, .red {
            display: grid;
            gap: var(--size-spacing-medium);
        }
        
        .blue {
            grid-template-columns: 1fr 0.25fr 1fr 1fr 0.25fr 1fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr;
            background: var(--color-blueside-background)
        }
            
        .red {
            grid-template-columns: 0.25fr 1fr 1fr 0.25fr 1fr 0.25fr 1fr 1fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr;
            background: var(--color-redside-background)
        }

        .ban, .pick {
            display: flex;
            flex-direction: row;
            gap: var(--size-spacing-large);
        }

        .grayscale {
            filter: grayscale(50%) !important;
            transition: filter 0.3s ease;
        }

        h2 {
            padding-bottom: var(--size-spacing-large);
        }

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            text-align: center;
            justify-content: center;
            padding: var(--size-spacing-medium); 
        }
        `];let at=Te;Ee([Yt({attribute:"match-id",reflect:!0})],at.prototype,"matchId",2);Ee([O()],at.prototype,"match",1);Ee([O()],at.prototype,"game",1);const vn=[{path:"/app/matches/:id",view:r=>y`
            <match-view match-id=${r.id}></match-view>
        `},{path:"/app/tournaments/:id",view:r=>y`
            <tournament-view tournament-id=${r.id}></tournament-view>
        `},{path:"/app/tournaments",view:()=>y`
        <tournament-search-view></tournament-search-view>
      `},{path:"/app/tournaments/",redirect:"/app/tournaments"},{path:"/app/champions",view:()=>y`
        <champion-search-view></champion-search-view>
        `},{path:"/app/champions/",redirect:"/app/champions"},{path:"/app/teams/:id",view:r=>y`
        <team-view team-id=${r.id}></team-view>
        `},{path:"/app/teams",view:()=>y`
        <team-search-view></team-search-view>
      `},{path:"/app/teams/",redirect:"/app/teams"},{path:"/app/players",view:()=>y`
        <player-search-view></player-search-view>
      `},{path:"/app/players/",redirect:"/app/teams"},{path:"/app/",view:()=>y`
        <home-view></home-view>
      `},{path:"/app",view:()=>y`<home-view></home-view>`},{path:"/",redirect:"/app"}],Ue=class Ue extends k{render(){return y`
        <mu-switch></mu-switch>
        `}connectedCallback(){super.connectedCallback(),Mt.initializeOnce()}};Ue.styles=[P`
          :host {
            display: grid;
            grid-column: 1 / -1;
          }
        `];let ce=Ue;Ws({"mu-auth":T.Provider,"mu-history":$i.Provider,"mu-store":class extends Ai.Provider{constructor(){super(wr,_r,"lol:auth")}},"mu-switch":class extends ur.Element{constructor(){super(vn,"lol:history","lol:auth")}},"lol-app":ce,"lol-header":Mt,"home-view":zt,"tournament-search-view":nt,"tournament-view":ot,"champion-search-view":Lt,"team-search-view":Ht,"player-search-view":Dt,"match-view":at});
