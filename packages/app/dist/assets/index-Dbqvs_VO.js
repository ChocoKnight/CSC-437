(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();var G,Le;class pt extends Error{}pt.prototype.name="InvalidTokenError";function ni(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let i=e.charCodeAt(0).toString(16).toUpperCase();return i.length<2&&(i="0"+i),"%"+i}))}function oi(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return ni(t)}catch{return atob(t)}}function ms(r,t){if(typeof r!="string")throw new pt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,i=r.split(".")[e];if(typeof i!="string")throw new pt(`Invalid token specified: missing part #${e+1}`);let s;try{s=oi(i)}catch(n){throw new pt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(s)}catch(n){throw new pt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const ai="mu:context",oe=`${ai}:change`;class li{constructor(t,e){this._proxy=ci(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class ue extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new li(t,this),this.style.display="contents"}attach(t){return this.addEventListener(oe,t),t}detach(t){this.removeEventListener(oe,t)}}function ci(r,t){return new Proxy(r,{get:(i,s,n)=>{if(s==="then")return;const o=Reflect.get(i,s,n);return console.log(`Context['${s}'] => `,o),o},set:(i,s,n,o)=>{const l=r[s];console.log(`Context['${s.toString()}'] <= `,n);const a=Reflect.set(i,s,n,o);if(a){let u=new CustomEvent(oe,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(u,{property:s,oldValue:l,value:n}),t.dispatchEvent(u)}else console.log(`Context['${s}] was not set to ${n}`);return a}})}function hi(r,t){const e=fs(t,r);return new Promise((i,s)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>i(e))}else s({context:t,reason:`No provider for this context "${t}:`})})}function fs(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const i=t.closest(e);if(i)return i;const s=t.getRootNode();if(s instanceof ShadowRoot)return fs(r,s.host)}class di extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function gs(r="mu:message"){return(t,...e)=>t.dispatchEvent(new di(e,r))}class pe{constructor(t,e,i="service:message",s=!0){this._pending=[],this._context=e,this._update=t,this._eventType=i,this._running=s}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const i=e.detail;this.consume(i)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function ui(r){return t=>({...t,...r})}const ae="mu:auth:jwt",vs=class ys extends pe{constructor(t,e){super((i,s)=>this.update(i,s),t,ys.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:i,redirect:s}=t[1];return e(mi(i)),te(s);case"auth/signout":return e(fi()),te(this._redirectForLogin);case"auth/redirect":return te(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};vs.EVENT_TYPE="auth:message";let _s=vs;const $s=gs(_s.EVENT_TYPE);function te(r,t={}){if(!r)return;const e=window.location.href,i=new URL(r,e);return Object.entries(t).forEach(([s,n])=>i.searchParams.set(s,n)),()=>{console.log("Redirecting to ",r),window.location.assign(i)}}class pi extends ue{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=X.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new _s(this.context,this.redirect).attach(this)}}class Q{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(ae),t}}class X extends Q{constructor(t){super();const e=ms(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new X(t);return localStorage.setItem(ae,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(ae);return t?X.authenticate(t):new Q}}function mi(r){return ui({user:X.authenticate(r),token:r})}function fi(){return r=>{const t=r.user;return{user:t&&t.authenticated?Q.deauthenticate(t):t,token:""}}}function gi(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function vi(r){return r.authenticated?ms(r.token||""):{}}const T=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:X,Provider:pi,User:Q,dispatch:$s,headers:gi,payload:vi},Symbol.toStringTag,{value:"Module"}));function Rt(r,t,e){const i=r.target,s=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,s),i.dispatchEvent(s),r.stopPropagation()}function le(r,t="*"){return r.composedPath().find(i=>{const s=i;return s.tagName&&s.matches(t)})}const bs=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:le,relay:Rt},Symbol.toStringTag,{value:"Module"}));function ws(r,...t){const e=r.map((s,n)=>n?[t[n-1],s]:[s]).flat().join("");let i=new CSSStyleSheet;return i.replaceSync(e),i}const yi=new DOMParser;function F(r,...t){const e=t.map(l),i=r.map((a,u)=>{if(u===0)return[a];const m=e[u-1];return m instanceof Node?[`<ins id="mu-html-${u-1}"></ins>`,a]:[m,a]}).flat().join(""),s=yi.parseFromString(i,"text/html"),n=s.head.childElementCount?s.head.children:s.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,u)=>{if(a instanceof Node){const m=o.querySelector(`ins#mu-html-${u}`);if(m){const d=m.parentNode;d==null||d.replaceChild(a,m)}else console.log("Missing insertion point:",`ins#mu-html-${u}`)}}),o;function l(a,u){if(a===null)return"";switch(typeof a){case"string":return De(a);case"bigint":case"boolean":case"number":case"symbol":return De(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const m=new DocumentFragment,d=a.map(l);return m.replaceChildren(...d),m}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function De(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gt(r,t={mode:"open"}){const e=r.attachShadow(t),i={template:s,styles:n};return i;function s(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),i}function n(...o){e.adoptedStyleSheets=o}}let _i=(G=class extends HTMLElement{constructor(){super(),this._state={},Gt(this).template(G.template).styles(G.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,i=t.value;e&&(this._state[e]=i)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Rt(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},$i(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},G.template=F`
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
  `,G.styles=ws`
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
  `,G);function $i(r,t){const e=Object.entries(r);for(const[i,s]of e){const n=t.querySelector(`[name="${i}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!s;break;case"date":o.value=s.toISOString().substr(0,10);break;default:o.value=s;break}}}return r}const bi=Object.freeze(Object.defineProperty({__proto__:null,Element:_i},Symbol.toStringTag,{value:"Module"})),As=class Es extends pe{constructor(t){super((e,i)=>this.update(e,i),t,Es.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:i,state:s}=t[1];e(Ai(i,s));break}case"history/redirect":{const{href:i,state:s}=t[1];e(Ei(i,s));break}}}};As.EVENT_TYPE="history:message";let me=As;class He extends ue{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=wi(t);if(e){const i=new URL(e.href);i.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),fe(e,"history/navigate",{href:i.pathname+i.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new me(this.context).attach(this)}}function wi(r){const t=r.currentTarget,e=i=>i.tagName=="A"&&i.href;if(r.button===0)if(r.composed){const s=r.composedPath().find(e);return s||void 0}else{for(let i=r.target;i;i===t?null:i.parentElement)if(e(i))return i;return}}function Ai(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function Ei(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const fe=gs(me.EVENT_TYPE),xs=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:He,Provider:He,Service:me,dispatch:fe},Symbol.toStringTag,{value:"Module"}));class S{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,i)=>{if(this._provider){const s=new Fe(this._provider,t);this._effects.push(s),e(s)}else hi(this._target,this._contextLabel).then(s=>{const n=new Fe(s,t);this._provider=s,this._effects.push(n),s.attach(o=>this._handleChange(o)),e(n)}).catch(s=>console.log(`Observer ${this._contextLabel}: ${s}`,s))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class Fe{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const Ss=class Ps extends HTMLElement{constructor(){super(),this._state={},this._user=new Q,this._authObserver=new S(this,"blazing:auth"),Gt(this).template(Ps.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",i=this.isNew?"created":"updated",s=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;xi(s,this._state,e,this.authorization).then(n=>ct(n,this)).then(n=>{const o=`mu-rest-form:${i}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[i]:n,url:s}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:s,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const i=e.name,s=e.value;i&&(this._state[i]=s)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},ct(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&Be(this.src,this.authorization).then(e=>{this._state=e,ct(e,this)}))})}attributeChangedCallback(t,e,i){switch(t){case"src":this.src&&i&&i!==e&&!this.isNew&&Be(this.src,this.authorization).then(s=>{this._state=s,ct(s,this)});break;case"new":i&&(this._state={},ct({},this));break}}};Ss.observedAttributes=["src","new","action"];Ss.template=F`
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
  `;function Be(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function ct(r,t){const e=Object.entries(r);for(const[i,s]of e){const n=t.querySelector(`[name="${i}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!s;break;default:o.value=s;break}}}return r}function xi(r,t,e="PUT",i={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...i},body:JSON.stringify(t)}).then(s=>{if(s.status!=200&&s.status!=201)throw`Form submission failed: Status ${s.status}`;return s.json()})}const ks=class Os extends pe{constructor(t,e){super(e,t,Os.EVENT_TYPE,!1)}};ks.EVENT_TYPE="mu:message";let Cs=ks;class Si extends ue{constructor(t,e,i){super(e),this._user=new Q,this._updateFn=t,this._authObserver=new S(this,i)}connectedCallback(){const t=new Cs(this.context,(e,i)=>this._updateFn(e,i,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const Pi=Object.freeze(Object.defineProperty({__proto__:null,Provider:Si,Service:Cs},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=globalThis,ge=Ut.ShadowRoot&&(Ut.ShadyCSS===void 0||Ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ve=Symbol(),qe=new WeakMap;let Ts=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ge&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=qe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&qe.set(e,t))}return t}toString(){return this.cssText}};const ki=r=>new Ts(typeof r=="string"?r:r+"",void 0,ve),Oi=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new Ts(e,r,ve)},Ci=(r,t)=>{if(ge)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=Ut.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},Ve=ge?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ki(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ti,defineProperty:Ui,getOwnPropertyDescriptor:Ni,getOwnPropertyNames:Ri,getOwnPropertySymbols:Ii,getPrototypeOf:ji}=Object,tt=globalThis,We=tt.trustedTypes,Mi=We?We.emptyScript:"",Ge=tt.reactiveElementPolyfillSupport,mt=(r,t)=>r,It={toAttribute(r,t){switch(t){case Boolean:r=r?Mi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ye=(r,t)=>!Ti(r,t),Ye={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),tt.litPropertyMetadata??(tt.litPropertyMetadata=new WeakMap);let K=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ye){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ui(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Ni(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ye}static _$Ei(){if(this.hasOwnProperty(mt("elementProperties")))return;const t=ji(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(mt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mt("properties"))){const e=this.properties,i=[...Ri(e),...Ii(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(Ve(s))}else t!==void 0&&e.push(Ve(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ci(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var i;const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const o=(((i=s.converter)==null?void 0:i.toAttribute)!==void 0?s.converter:It).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=s.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)==null?void 0:i.fromAttribute)!==void 0?o.converter:It;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??ye)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$EO)==null||t.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(i)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[mt("elementProperties")]=new Map,K[mt("finalized")]=new Map,Ge==null||Ge({ReactiveElement:K}),(tt.reactiveElementVersions??(tt.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=globalThis,Mt=jt.trustedTypes,Ke=Mt?Mt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Us="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,Ns="?"+U,zi=`<${Ns}>`,B=document,vt=()=>B.createComment(""),yt=r=>r===null||typeof r!="object"&&typeof r!="function",_e=Array.isArray,Li=r=>_e(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ee=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Je=/-->/g,Ze=/>/g,z=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qe=/'/g,Xe=/"/g,Rs=/^(?:script|style|textarea|title)$/i,Di=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),dt=Di(1),et=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ts=new WeakMap,D=B.createTreeWalker(B,129);function Is(r,t){if(!_e(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ke!==void 0?Ke.createHTML(t):t}const Hi=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=ht;for(let l=0;l<e;l++){const a=r[l];let u,m,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,m=o.exec(a),m!==null);)c=o.lastIndex,o===ht?m[1]==="!--"?o=Je:m[1]!==void 0?o=Ze:m[2]!==void 0?(Rs.test(m[2])&&(s=RegExp("</"+m[2],"g")),o=z):m[3]!==void 0&&(o=z):o===z?m[0]===">"?(o=s??ht,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?z:m[3]==='"'?Xe:Qe):o===Xe||o===Qe?o=z:o===Je||o===Ze?o=ht:(o=z,s=void 0);const h=o===z&&r[l+1].startsWith("/>")?" ":"";n+=o===ht?a+zi:d>=0?(i.push(u),a.slice(0,d)+Us+a.slice(d)+U+h):a+U+(d===-2?l:h)}return[Is(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let ce=class js{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,m]=Hi(t,e);if(this.el=js.createElement(u,i),D.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=D.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(Us)){const c=m[o++],h=s.getAttribute(d).split(U),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Bi:p[1]==="?"?qi:p[1]==="@"?Vi:Yt}),s.removeAttribute(d)}else d.startsWith(U)&&(a.push({type:6,index:n}),s.removeAttribute(d));if(Rs.test(s.tagName)){const d=s.textContent.split(U),c=d.length-1;if(c>0){s.textContent=Mt?Mt.emptyScript:"";for(let h=0;h<c;h++)s.append(d[h],vt()),D.nextNode(),a.push({type:2,index:++n});s.append(d[c],vt())}}}else if(s.nodeType===8)if(s.data===Ns)a.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(U,d+1))!==-1;)a.push({type:7,index:n}),d+=U.length-1}n++}}static createElement(t,e){const i=B.createElement("template");return i.innerHTML=t,i}};function st(r,t,e=r,i){var s,n;if(t===et)return t;let o=i!==void 0?(s=e.o)==null?void 0:s[i]:e.l;const l=yt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,i)),i!==void 0?(e.o??(e.o=[]))[i]=o:e.l=o),o!==void 0&&(t=st(r,o._$AS(r,t.values),o,i)),t}class Fi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??B).importNode(e,!0);D.currentNode=s;let n=D.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new Et(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Wi(n,this,t)),this._$AV.push(u),a=i[++l]}o!==(a==null?void 0:a.index)&&(n=D.nextNode(),o++)}return D.currentNode=B,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Et{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this.v=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=st(this,t,e),yt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Li(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ce.createElement(Is(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(i);else{const o=new Fi(n,this),l=o.u(this.options);o.p(i),this.T(l),this._$AH=o}}_$AC(t){let e=ts.get(t.strings);return e===void 0&&ts.set(t.strings,e=new ce(t)),e}k(t){_e(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Et(this.O(vt()),this.O(vt()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Yt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=st(this,t,e,0),o=!yt(t)||t!==this._$AH&&t!==et,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=st(this,l[i+a],e,a),u===et&&(u=this._$AH[a]),o||(o=!yt(u)||u!==this._$AH[a]),u===$?t=$:t!==$&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bi extends Yt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class qi extends Yt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Vi extends Yt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=st(this,t,e,0)??$)===et)return;const i=this._$AH,s=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Wi{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){st(this,t)}}const es=jt.litHtmlPolyfillSupport;es==null||es(ce,Et),(jt.litHtmlVersions??(jt.litHtmlVersions=[])).push("3.2.0");const Gi=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new Et(t.insertBefore(vt(),n),n,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Z=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Gi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return et}};Z._$litElement$=!0,Z.finalized=!0,(Le=globalThis.litElementHydrateSupport)==null||Le.call(globalThis,{LitElement:Z});const ss=globalThis.litElementPolyfillSupport;ss==null||ss({LitElement:Z});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yi={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:ye},Ki=(r=Yi,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,r),i==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(i==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function Ms(r){return(t,e)=>typeof e=="object"?Ki(r,t,e):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zs(r){return Ms({...r,state:!0,attribute:!1})}function Ji(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Zi(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ls={};(function(r){var t=function(){var e=function(d,c,h,p){for(h=h||{},p=d.length;p--;h[d[p]]=c);return h},i=[1,9],s=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,f,y,E){var A=y.length-1;switch(f){case 1:return new g.Root({},[y[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[A-1],y[A]]);break;case 4:case 5:this.$=y[A];break;case 6:this.$=new g.Literal({value:y[A]});break;case 7:this.$=new g.Splat({name:y[A]});break;case 8:this.$=new g.Param({name:y[A]});break;case 9:this.$=new g.Optional({},[y[A-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:i,13:s,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:i,13:s,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:i,13:s,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:i,12:[1,16],13:s,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,f){this.message=g,this.hash=f};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],f=[],y=this.table,E="",A=0,je=0,ei=2,Me=1,si=f.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var Jt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Jt)&&(j.yy[Jt]=this.yy[Jt]);_.setInput(c,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Zt=_.yylloc;f.push(Zt);var ii=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var ri=function(){var W;return W=_.lex()||Me,typeof W!="number"&&(W=h.symbols_[W]||W),W},w,M,x,Qt,V={},Ct,C,ze,Tt;;){if(M=p[p.length-1],this.defaultActions[M]?x=this.defaultActions[M]:((w===null||typeof w>"u")&&(w=ri()),x=y[M]&&y[M][w]),typeof x>"u"||!x.length||!x[0]){var Xt="";Tt=[];for(Ct in y[M])this.terminals_[Ct]&&Ct>ei&&Tt.push("'"+this.terminals_[Ct]+"'");_.showPosition?Xt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+Tt.join(", ")+", got '"+(this.terminals_[w]||w)+"'":Xt="Parse error on line "+(A+1)+": Unexpected "+(w==Me?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(Xt,{text:_.match,token:this.terminals_[w]||w,line:_.yylineno,loc:Zt,expected:Tt})}if(x[0]instanceof Array&&x.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+w);switch(x[0]){case 1:p.push(w),g.push(_.yytext),f.push(_.yylloc),p.push(x[1]),w=null,je=_.yyleng,E=_.yytext,A=_.yylineno,Zt=_.yylloc;break;case 2:if(C=this.productions_[x[1]][1],V.$=g[g.length-C],V._$={first_line:f[f.length-(C||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(C||1)].first_column,last_column:f[f.length-1].last_column},ii&&(V._$.range=[f[f.length-(C||1)].range[0],f[f.length-1].range[1]]),Qt=this.performAction.apply(V,[E,je,A,j.yy,x[1],g,f].concat(si)),typeof Qt<"u")return Qt;C&&(p=p.slice(0,-1*C*2),g=g.slice(0,-1*C),f=f.slice(0,-1*C)),p.push(this.productions_[x[1]][0]),g.push(V.$),f.push(V._$),ze=y[p[p.length-2]][p[p.length-1]],p.push(ze);break;case 3:return!0}}return!0}},u=function(){var d={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var f=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[f[0],f[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,f;if(this.options.backtrack_lexer&&(f={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(f.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var y in f)this[y]=f[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),y=0;y<f.length;y++)if(p=this._input.match(this.rules[f[y]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=y,this.options.backtrack_lexer){if(c=this.test_match(p,f[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,f[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,f){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return d}();a.lexer=u;function m(){this.yy={}}return m.prototype=a,a.Parser=m,new m}();typeof Zi<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Ls);function Y(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Ds={Root:Y("Root"),Concat:Y("Concat"),Literal:Y("Literal"),Splat:Y("Splat"),Param:Y("Param"),Optional:Y("Optional")},Hs=Ls.parser;Hs.yy=Ds;var Qi=Hs,Xi=Object.keys(Ds);function tr(r){return Xi.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Fs=tr,er=Fs,sr=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Bs(r){this.captures=r.captures,this.re=r.re}Bs.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(i,s){typeof t[s+1]>"u"?e[i]=void 0:e[i]=decodeURIComponent(t[s+1])}),e};var ir=er({Concat:function(r){return r.children.reduce((function(t,e){var i=this.visit(e);return{re:t.re+i.re,captures:t.captures.concat(i.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(sr,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Bs({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),rr=ir,nr=Fs,or=nr({Concat:function(r,t){var e=r.children.map((function(i){return this.visit(i,t)}).bind(this));return e.some(function(i){return i===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),ar=or,lr=Qi,cr=rr,hr=ar;xt.prototype=Object.create(null);xt.prototype.match=function(r){var t=cr.visit(this.ast),e=t.match(r);return e||!1};xt.prototype.reverse=function(r){return hr.visit(this.ast,r)};function xt(r){var t;if(this?t=this:t=Object.create(xt.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=lr.parse(r),t}var dr=xt,ur=dr,pr=ur;const mr=Ji(pr);var fr=Object.defineProperty,qs=(r,t,e,i)=>{for(var s=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&fr(t,e,s),s};const Vs=class extends Z{constructor(t,e,i=""){super(),this._cases=[],this._fallback=()=>dt` <h1>Not Found</h1> `,this._cases=t.map(s=>({...s,route:new mr(s.path)})),this._historyObserver=new S(this,e),this._authObserver=new S(this,i)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),dt` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?($s(this,"auth/redirect"),dt` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):dt` <h1>Authenticating</h1> `;if("redirect"in e){const i=e.redirect;if(typeof i=="string")return this.redirect(i),dt` <h1>Redirecting to ${i}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:i}=t,s=new URLSearchParams(e),n=i+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:i,params:l,query:s}}}redirect(t){fe(this,"history/redirect",{href:t})}};Vs.styles=Oi`
    :host,
    main {
      display: contents;
    }
  `;let zt=Vs;qs([zs()],zt.prototype,"_user");qs([zs()],zt.prototype,"_match");const gr=Object.freeze(Object.defineProperty({__proto__:null,Element:zt,Switch:zt},Symbol.toStringTag,{value:"Module"})),Ws=class Gs extends HTMLElement{constructor(){if(super(),Gt(this).template(Gs.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Ws.template=F`
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
  `;let vr=Ws;const yr=Object.freeze(Object.defineProperty({__proto__:null,Element:vr},Symbol.toStringTag,{value:"Module"})),Ys=class he extends HTMLElement{constructor(){super(),this._array=[],Gt(this).template(he.template).styles(he.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Ks("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const i=new Event("change",{bubbles:!0}),s=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=s,this.dispatchEvent(i)}}}),this.addEventListener("click",t=>{le(t,"button.add")?Rt(t,"input-array:add"):le(t,"button.remove")&&Rt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],_r(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const i=Array.from(this.children).indexOf(e);this._array.splice(i,1),e.remove()}}};Ys.template=F`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;Ys.styles=ws`
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
  `;function _r(r,t){t.replaceChildren(),r.forEach((e,i)=>t.append(Ks(e)))}function Ks(r,t){const e=r===void 0?F`<input />`:F`<input value="${r}" />`;return F`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function $e(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var $r=Object.defineProperty,br=Object.getOwnPropertyDescriptor,wr=(r,t,e,i)=>{for(var s=br(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&$r(t,e,s),s};class St extends Z{constructor(t){super(),this._pending=[],this._observer=new S(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([i,s])=>{console.log("Dispatching queued event",s,i),i.dispatchEvent(s)}),e.setEffect(()=>{var i;if(console.log("View effect",this,e,(i=this._context)==null?void 0:i.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const i=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",i),e.dispatchEvent(i)):(console.log("Queueing message event",i),this._pending.push([e,i]))}ref(t){return this.model?this.model[t]:void 0}}wr([Ms()],St.prototype,"model");const Ar={},Er=["January","Febuary","March","April","May","June","July","August","September","October","November","December"],_t=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=Er[t.getUTCMonth()],i=t.getUTCDate(),s=t.getUTCFullYear();return`${i} ${e} ${s}`},xr=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=t.getUTCMonth()+1,i=t.getUTCDate(),s=t.getUTCFullYear();return e<10&&i<10?`${s}-0${e}-0${i}`:e<10?`${s}-0${e}-${i}`:`${s}-${e}-${i}`};function Sr(r,t,e){switch(r[0]){case"user/select":Ir(r[1],e).then(s=>t(n=>({...n,profile:s})));break;case"champion/select":kr(r[1]).then(s=>t(n=>({...n,champion:s})));break;case"teams/select":Or(r[1]).then(s=>t(n=>({...n,team:s})));break;case"players/select":Cr(r[1]).then(s=>t(n=>({...n,player:s})));break;case"tournament/select":Tr({tournamentId:r[1].tournamentId}).then(s=>{if(s){const{tournament:n,matches:o}=s;t(l=>({...l,tournament:n,matches:o}))}else console.error("Failed to fetch tournament or matches.")});break;case"tournaments/select":Ur().then(s=>t(n=>({...n,tournaments:s})));break;case"matches/select":Nr().then(s=>t(n=>({...n,matches:s})));break;case"match/select":Rr({matchId:r[1].matchId}).then(s=>{if(s){const{match:n,games:o}=s;t(l=>({...l,match:n,games:o}))}else console.error("Failed to fetch match or games.")});break;case"match/save":Pr({matchId:r[1].matchId,match:r[1].match}).then(s=>t(n=>({...n,match:s}))).then(()=>{const{onSuccess:s}=r[1];s&&s()}).catch(s=>{const{onFailure:n}=r[1];n&&n(s)});break;default:const i=r[0];throw new Error(`Unhandled Auth message "${i}"`)}}function Pr(r){return fetch(`/api/matches/${r.matchId}`,{method:"PUT",body:JSON.stringify(r.match)}).then(t=>{if(console.log(JSON.stringify(r.match)),console.log(t),t.status===200)return t.json();throw new Error(`Failed to save match for ${r.matchId}`)}).then(t=>{if(t)return t})}function kr(r){return fetch(`/api/champions/${r.championName}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Champion:",t),t})}function Or(r){return fetch(`/api/teams/${r.teamId}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Team:",t),t})}function Cr(r){return fetch(`/api/players/${r.playerName}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Player:",t),t})}function Tr(r){return fetch(`/api/tournaments/${r.tournamentId}`).then(t=>{if(t.status===200)return t.json();throw new Error("Failed to fetch tournament data")}).then(t=>{console.log("Tournament:",t);const{league:e,split:i,year:s}=t,n=i==="N/A"?`${e} ${s}`:`${e} ${s} ${i}`;return fetch(`/api/matches?tournamentName=${encodeURIComponent(n)}`).then(o=>{if(o.status===200)return o.json();throw new Error("Failed to fetch matches data")}).then(o=>(console.log("Matches:",o),{tournament:t,matches:o}))}).catch(t=>{console.error("Error:",t)})}function Ur(){return fetch("/api/tournaments").then(r=>{if(r.status!==200)throw"Failed to load index of tournaments";return r.json()}).then(r=>{if(r)return console.log("Tournament:",r),r})}function Nr(){return fetch("/api/matches").then(r=>{if(r.status!==200)throw"Failed to load index of matches";return r.json()}).then(r=>{if(r)return console.log("matches:",r),r})}function Rr(r){return fetch(`/api/matches/${r.matchId}`).then(t=>{if(t.status===200)return t.json();throw new Error("Failed to fetch tournament data")}).then(t=>{console.log("Match:",t);const{teamOne:e,teamTwo:i,date:s}=t,n=`${e} vs ${i} - ${xr(s)}`;return console.log(n),fetch(`/api/games?matchId=${encodeURIComponent(n)}`).then(o=>{if(o.status===200)return o.json();throw new Error("Failed to fetch matches data")}).then(o=>(console.log("Games:",o),{match:t,games:o}))}).catch(t=>{console.error("Error:",t)})}function Ir(r,t){return fetch(`/api/users/${r.userId}`,{headers:T.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=globalThis,be=Nt.ShadowRoot&&(Nt.ShadyCSS===void 0||Nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),is=new WeakMap;let Js=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(be&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=is.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&is.set(e,t))}return t}toString(){return this.cssText}};const jr=r=>new Js(typeof r=="string"?r:r+"",void 0,we),P=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new Js(e,r,we)},Mr=(r,t)=>{if(be)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=Nt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},rs=be?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return jr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:zr,defineProperty:Lr,getOwnPropertyDescriptor:Dr,getOwnPropertyNames:Hr,getOwnPropertySymbols:Fr,getPrototypeOf:Br}=Object,R=globalThis,ns=R.trustedTypes,qr=ns?ns.emptyScript:"",se=R.reactiveElementPolyfillSupport,ft=(r,t)=>r,Lt={toAttribute(r,t){switch(t){case Boolean:r=r?qr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ae=(r,t)=>!zr(r,t),os={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:Ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);class J extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=os){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Lr(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Dr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??os}static _$Ei(){if(this.hasOwnProperty(ft("elementProperties")))return;const t=Br(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ft("properties"))){const e=this.properties,i=[...Hr(e),...Fr(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(rs(s))}else t!==void 0&&e.push(rs(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var n;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:Lt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:Lt;this._$Em=s,this[s]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??Ae)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[ft("elementProperties")]=new Map,J[ft("finalized")]=new Map,se==null||se({ReactiveElement:J}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=globalThis,Dt=gt.trustedTypes,as=Dt?Dt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Zs="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Qs="?"+N,Vr=`<${Qs}>`,q=document,$t=()=>q.createComment(""),bt=r=>r===null||typeof r!="object"&&typeof r!="function",Ee=Array.isArray,Wr=r=>Ee(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ie=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ls=/-->/g,cs=/>/g,L=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hs=/'/g,ds=/"/g,Xs=/^(?:script|style|textarea|title)$/i,Gr=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),v=Gr(1),it=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),us=new WeakMap,H=q.createTreeWalker(q,129);function ti(r,t){if(!Ee(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return as!==void 0?as.createHTML(t):t}const Yr=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=ut;for(let l=0;l<e;l++){const a=r[l];let u,m,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,m=o.exec(a),m!==null);)c=o.lastIndex,o===ut?m[1]==="!--"?o=ls:m[1]!==void 0?o=cs:m[2]!==void 0?(Xs.test(m[2])&&(s=RegExp("</"+m[2],"g")),o=L):m[3]!==void 0&&(o=L):o===L?m[0]===">"?(o=s??ut,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?L:m[3]==='"'?ds:hs):o===ds||o===hs?o=L:o===ls||o===cs?o=ut:(o=L,s=void 0);const h=o===L&&r[l+1].startsWith("/>")?" ":"";n+=o===ut?a+Vr:d>=0?(i.push(u),a.slice(0,d)+Zs+a.slice(d)+N+h):a+N+(d===-2?l:h)}return[ti(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class wt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,m]=Yr(t,e);if(this.el=wt.createElement(u,i),H.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=H.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(Zs)){const c=m[o++],h=s.getAttribute(d).split(N),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Jr:p[1]==="?"?Zr:p[1]==="@"?Qr:Kt}),s.removeAttribute(d)}else d.startsWith(N)&&(a.push({type:6,index:n}),s.removeAttribute(d));if(Xs.test(s.tagName)){const d=s.textContent.split(N),c=d.length-1;if(c>0){s.textContent=Dt?Dt.emptyScript:"";for(let h=0;h<c;h++)s.append(d[h],$t()),H.nextNode(),a.push({type:2,index:++n});s.append(d[c],$t())}}}else if(s.nodeType===8)if(s.data===Qs)a.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(N,d+1))!==-1;)a.push({type:7,index:n}),d+=N.length-1}n++}}static createElement(t,e){const i=q.createElement("template");return i.innerHTML=t,i}}function rt(r,t,e=r,i){var o,l;if(t===it)return t;let s=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const n=bt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=rt(r,s._$AS(r,t.values),s,i)),t}class Kr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??q).importNode(e,!0);H.currentNode=s;let n=H.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new Pt(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Xr(n,this,t)),this._$AV.push(u),a=i[++l]}o!==(a==null?void 0:a.index)&&(n=H.nextNode(),o++)}return H.currentNode=q,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),bt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==it&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&bt(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=wt.createElement(ti(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const o=new Kr(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=us.get(t.strings);return e===void 0&&us.set(t.strings,e=new wt(t)),e}k(t){Ee(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Pt(this.O($t()),this.O($t()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Kt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=rt(this,t,e,0),o=!bt(t)||t!==this._$AH&&t!==it,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=rt(this,l[i+a],e,a),u===it&&(u=this._$AH[a]),o||(o=!bt(u)||u!==this._$AH[a]),u===b?t=b:t!==b&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Jr extends Kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Zr extends Kt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Qr extends Kt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??b)===it)return;const i=this._$AH,s=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Xr{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const re=gt.litHtmlPolyfillSupport;re==null||re(wt,Pt),(gt.litHtmlVersions??(gt.litHtmlVersions=[])).push("3.2.1");const tn=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new Pt(t.insertBefore($t(),n),n,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let O=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=tn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return it}};var ps;O._$litElement$=!0,O.finalized=!0,(ps=globalThis.litElementHydrateSupport)==null||ps.call(globalThis,{LitElement:O});const ne=globalThis.litElementPolyfillSupport;ne==null||ne({LitElement:O});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const en=P`
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
`,I={styles:en},sn=P`
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
    `,lt={styles:sn};function rn(r){const e=r.target.checked;bs.relay(r,"light-mode",{checked:e})}function nn(r){bs.relay(r,"auth:message",["auth/signout"])}const Wt=class Wt extends O{constructor(){super(...arguments),this._authObserver=new S(this,"lol:auth"),this._user=new T.User}render(){return v`
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
                            <a href="/login">Sign In</a>
                        </li>

                        <li class="when-signed-in">
                            <a href="/app/users/T1_Fan">Profile</a>
                        </li>

                        <li class="when-signed-in">
                            <a id="signout" @click=${nn}>Sign Out</a>
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

                <label @change=${rn}>
                    <input type="checkbox" autocomplete="off" />
                    Light Mode
                </label>
            </div>
        </header>`}static initializeOnce(){function t(e,i){e.classList.toggle("light-mode",i)}document.body.addEventListener("light-mode",e=>{var i;return t(e.currentTarget,(i=e.detail)==null?void 0:i.checked)})}};Wt.uses=$e({"drop-down":yr.Element}),Wt.styles=[I.styles,lt.styles,P`
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
        `];let Ht=Wt;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:Ae},an=(r=on,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,r),i==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(i==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function kt(r){return(t,e)=>typeof e=="object"?an(r,t,e):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(r){return kt({...r,state:!0,attribute:!1})}var ln=Object.defineProperty,cn=(r,t,e,i)=>{for(var s=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&ln(t,e,s),s};const Pe=class Pe extends O{constructor(){super(...arguments),this.src="/api/matches",this.matchIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load match data:",e)).then(e=>{e&&(console.log("Matches:",e),this.matchIndex=e)}).catch(e=>console.log("Failed to convert match data:",e))}render(){this.matchIndex.sort((e,i)=>new Date(i.date).getTime()-new Date(e.date).getTime());const t=this.matchIndex.slice(0,15).map(this.renderItem);return v`
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
      `}renderItem(t){const{tournamentName:e,date:i,teamOne:s,teamTwo:n,_id:o}=t;return v`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${o}">${e}</a>
                </dt>
                <dd>
                    <a href="/app/teams/${o}">${s} </a>
                    vs
                    <a href="/app/teams/${o}">${n} </a>
                </dd>
                <dd>
                <time>
                    ${_t(i)}
                </time>
                </dd>
            </div>
          `}};Pe.styles=[I.styles,lt.styles,P`
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
        `];let Ft=Pe;cn([k()],Ft.prototype,"matchIndex");var hn=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,xe=(r,t,e,i)=>{for(var s=i>1?void 0:i?dn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&hn(t,e,s),s};const ke=class ke extends St{constructor(){super("lol:model"),this.tournamentId="nothing",this._authObserver=new S(this,"lol:auth"),this._user=new T.User}get tournaments(){return this.model.tournaments}set tournaments(t){this.model.tournaments=t,this.requestUpdate()}get match(){return this.model.matches}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="tournament-id"&&e!==i&&i&&(this.dispatchMessage(["tournaments/select",{}]),this.dispatchMessage(["matches/select",{}]))}render(){var t=void 0;return this.match&&this.tournaments?t=this.tournaments.map(e=>this.renderItem(e,this.match)):t=v``,v`
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
      `}queryYear(t,e){if(console.log("query year"),e){const i=e.filter(s=>s.year===t);this.tournaments=i}}querySplit(t,e){if(console.log("query year"),e){var i=e;t==="First"?i=e.filter(s=>s.split==="Spring"||s.split==="Split 1"||s.split==="Champ 1"||s.split==="Opening"):t==="Second"?i=e.filter(s=>s.split==="Summer"||s.split==="Split 2"||s.split==="Champ 2"||s.split==="Closing"):i=e.filter(s=>s.split==="N/A"||s.split==="BLX Masters"||s.split==="Finals"||s.split==="Split 3"),this.tournaments=i}}reset(){this.tournamentId===""?this.tournamentId="nothing":this.tournamentId=""}renderItem(t,e){const{_id:i,league:s,year:n,split:o}=t,l=o==="N/A"?`${s} ${n}`:`${s} ${n} ${o}`;var a=[];return e?(a=e.filter(u=>u.tournamentName.trim().toLowerCase()===l.trim().toLowerCase()),a.sort((u,m)=>new Date(u.date).getTime()-new Date(m.date).getTime()),v`
                <div class="row">
                    <dt>
                        <a href="/app/tournaments/${i}">${l}</a>
                    </dt>
                    <dd>
                        ${a.length}
                    </dd>
                    <dd>
                        ${_t(a[0].date)}
                    </dd>
                    <dd>
                        ${_t(a[a.length-1].date)}
                    </dd>
                </div>
            `):v`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${i}">${l}</a>
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
        `}};ke.styles=[I.styles,lt.styles,P`
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
        `];let nt=ke;xe([kt({attribute:"tournament-id",reflect:!0})],nt.prototype,"tournamentId",2);xe([k()],nt.prototype,"tournaments",1);xe([k()],nt.prototype,"match",1);var un=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,Se=(r,t,e,i)=>{for(var s=i>1?void 0:i?pn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&un(t,e,s),s};const Oe=class Oe extends St{constructor(){super("lol:model"),this.tournamentId="",this._authObserver=new S(this,"lol:auth"),this._user=new T.User}get tournament(){return this.model.tournament}get match(){return this.model.matches}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="tournament-id"&&e!==i&&i&&this.dispatchMessage(["tournament/select",{tournamentId:i}])}render(){const{league:t,split:e,year:i}=this.tournament||{};var s=void 0,n=0;this.match===void 0?s=[].map(this.renderItem):(this.match.sort((l,a)=>new Date(a.date).getTime()-new Date(l.date).getTime()),s=this.match.map(this.renderItem),n=this.match.length);var o="";return e==="N/A"?o=`${t} ${i}`:o=`${t} ${i} ${e}`,v`
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
                ${s}
            </dl>
        </main>  
      `}renderItem(t){const{date:e,teamOne:i,teamTwo:s,games:n,patch:o,_id:l}=t;return v`
            <div class="row">
                <dt>
                    <a href="/app/matches/${l}">
                        ${i} 
                        vs
                        ${s}
                    </a> 
                </dt>
                <dd>
                    ${n.length}
                </dd>
                <dd>
                    <time>
                        ${_t(e)}
                    </time>
                </dd>
                <dd>
                    ${o}
                </dd>
            </div>
          `}};Oe.styles=[I.styles,lt.styles,P`
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
        `];let ot=Oe;Se([kt({attribute:"tournament-id",reflect:!0})],ot.prototype,"tournamentId",2);Se([k()],ot.prototype,"tournament",1);Se([k()],ot.prototype,"match",1);var mn=Object.defineProperty,fn=(r,t,e,i)=>{for(var s=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&mn(t,e,s),s};const Ce=class Ce extends O{constructor(){super(...arguments),this.src="/api/champions",this.championIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load champion data:",e)).then(e=>{e&&(console.log("Champions:",e),this.championIndex=e)}).catch(e=>console.log("Failed to convert champion data:",e))}render(){const t=this.championIndex.map(this.renderItem);return v`
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
                            Picks
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Bans
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Presence
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Win Rate
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            KDA
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Game Time
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Gold at 15
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,championId:i,champ_id:s,title:n}=t;return v`
            <div class="row">
                <dt>
                    ${e}
                </dt>
                <dd>
                    ${i}
                </dd>
                <dd>
                    ${s}
                </dd>
                <dd>
                    ${n}
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
        `];let Bt=Ce;fn([k()],Bt.prototype,"championIndex");var gn=Object.defineProperty,vn=(r,t,e,i)=>{for(var s=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&gn(t,e,s),s};const Te=class Te extends O{constructor(){super(...arguments),this.src="/api/teams",this.teamIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load team data:",e)).then(e=>{e&&(console.log("Teams:",e),this.teamIndex=e)}).catch(e=>console.log("Failed to convert team data:",e))}render(){const t=this.teamIndex.map(this.renderItem);return v`
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
                            Season
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Win Rate 
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Game Duration 
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Gold at 15 
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,year:i}=t;return v`
            <div class="row">
                <dt>
                    <a href="/app/teams/${e}">${e}</a>
                </dt>
                <dd>
                    ${i} 
                </dd>
            </div>
          `}};Te.styles=[I.styles,lt.styles,P`
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
        `];let qt=Te;vn([k()],qt.prototype,"teamIndex");var yn=Object.defineProperty,_n=(r,t,e,i)=>{for(var s=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(t,e,s)||s);return s&&yn(t,e,s),s};const Ue=class Ue extends O{constructor(){super(...arguments),this.src="/api/players",this.playerIndex=new Array,this._authObserver=new S(this,"lol:auth"),this._user=new T.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load Player data:",e)).then(e=>{e&&(console.log("Players:",e),this.playerIndex=e)}).catch(e=>console.log("Failed to convert tournament data:",e))}render(){const t=this.playerIndex.map(this.renderItem);return v`
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
                            Win Rate 
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            KDA
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Kills
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Deaths
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Assists
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            KP%
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Damage %
                        </h3>
                    </dd>
                </div>
                ${t}
            </dl>
        </main>
      `}renderItem(t){const{name:e,year:i}=t;return v`
            <div class="row">
                <dt>
                    ${e}
                </dt>
                <dd>
                    ${i}
                </dd>
                <dd>
                    ${i}
                </dd>
                <dd>
                    ${i}
                </dd>
                <dd>
                    ${i}
                </dd>
            </div>
          `}};Ue.styles=[I.styles,P`
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
        `];let Vt=Ue;_n([k()],Vt.prototype,"playerIndex");var $n=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Ot=(r,t,e,i)=>{for(var s=i>1?void 0:i?bn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&$n(t,e,s),s};const Ne=class Ne extends St{constructor(){super("lol:model"),this.matchId=""}get match(){return this.model.match}get game(){return this.model.games}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="match-id"&&e!==i&&i&&this.dispatchMessage(["match/select",{matchId:i}])}render(){const{teamOne:t,teamTwo:e,tournamentName:i,date:s,patch:n}=this.match||{};var o=void 0;return this.match&&this.game?o=this.game.map(l=>this.renderGame(l,this.match)):o=v``,v`
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
                <a href="">${i}</a>
            </div>
            <div>
                <span>Patch - ${n}</span>
            </div>
            <div>
                <span>${_t(s)}</span>
            </div>
            <div>
                <a href="/app/matches/edit/${this.matchId}">Edit</a>
            </div>
            ${o}
        </main>  
    `}findObjectiveCounts(t){var e=t.infernalDragons+t.mountainDragons+t.oceanDragons+t.cloudDragons+t.hextechDragons+t.chemtechDragons+t.elderDragons;return[t.towers,t.plates,t.voidGrubs,t.riftHearlds,t.baronNashors,e]}findWinLoss(t,e){var i="";if(e)i=e.teamOne;else return v`0 - 0`;if(t){var s=t.length,n=0;return t.forEach(o=>{const{blueTeam:l,blueWin:a}=o;var u="";i===l?u="Blue Side":u="Red Side",a&&u==="Blue Side"&&(n+=1)}),v`
            <span>${n} - ${s-n}</span>
            `}else return v`0 - 0`}renderGame(t,e){var i="";if(e)i=e.teamOne;else return v``;const{gameName:s,blueTeam:n,bluePickBans:o,redPickBans:l,blueWin:a,blueObjectives:u,redObjectives:m,duration:d}=t;var c="",h="";i===n?(c="Blue Side",h="Red Side"):(c="Red Side",h="Blue Side");var p="";a&&c==="Blue Side"?p="W - L":p="L - W";var g=Math.floor(d/60),f="";d%60<10?f=`0${d%60}`:f=`${d%60}`;var y=[],E=[];return c==="Blue Side"?(y=this.findObjectiveCounts(u),E=this.findObjectiveCounts(m)):(y=this.findObjectiveCounts(m),E=this.findObjectiveCounts(u)),v`
        <div class = "game">
            <h2>
                Game ${s[s.length-1]}
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
                    <span>${y[0]}</span>
                    <h4>Towers</h4>
                    <span>${E[0]}</span>
                </section>

                <section class="objective">
                    <span>${y[1]}</span>
                    <h4>Plates</h4>
                    <span>${E[1]}</span>
                </section>

                <section class="objective">
                    <span>${y[2]}</span>
                    <h4>Void Grubs</h4>
                    <span>${E[2]}</span>
                </section>

                <section class="objective">
                    <span>${y[3]}</span>
                    <h4>Rift Heralds</h4>
                    <span>${E[3]}</span>
                </section>

                <section class="objective">
                    <span>${y[4]}</span>
                    <h4>Baron Nashtors</h4>
                    <span>${E[4]}</span>
                </section>

                <section class="objective">
                    <span>${y[5]}</span>
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
          `}};Ne.styles=[I.styles,lt.styles,P`
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
            filter: grayscale(80%) !important;
            /* transition: filter 0.3s ease; */
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
        `];let at=Ne;Ot([kt({attribute:"match-id",reflect:!0})],at.prototype,"matchId",2);Ot([k()],at.prototype,"match",1);Ot([k()],at.prototype,"game",1);const Re=class Re extends St{constructor(){super("lol:model"),this.matchId=""}get match(){return this.model.match}render(){return v`
          <main class="page">
                <mu-form
                    .init=${this.match}
                    @mu-form:submit=${this._handleSubmit}>
                    <label>
                        <span>Team One</span>
                        <input name="teamOne" />
                    </label>
                    <label>
                        <span>Team Two</span>
                        <input name="teamTwo" />
                    </label>
                    <label>
                        <span>patch</span>
                        <input name="patch" />
                    </label>
                    <label>
                        <span>date</span>
                        <input name="date" />
                    </label>
                </mu-form>
          </main>`}_handleSubmit(t){this.dispatchMessage(["match/save",{matchId:this.matchId,match:t.detail,onSuccess:()=>xs.dispatch(this,"history/navigate",{href:`/app/matches/${this.matchId} `}),onFailure:e=>console.log("ERROR:",e)}])}};Re.uses=$e({"mu-form":bi.Element});let At=Re;Ot([kt({attribute:"match-id",reflect:!0})],At.prototype,"matchId",2);Ot([k()],At.prototype,"match",1);const wn=[{path:"/app/matches/edit/:id",view:r=>v`
        <match-edit match-id=${r.id}></match-edit>
        `},{path:"/app/matches/:id",view:r=>v`
            <match-view match-id=${r.id}></match-view>
        `},{path:"/app/tournaments/:id",view:r=>v`
            <tournament-view tournament-id=${r.id}></tournament-view>
        `},{path:"/app/tournaments",view:()=>v`
        <tournament-search-view></tournament-search-view>
      `},{path:"/app/tournaments/",redirect:"/app/tournaments"},{path:"/app/champions",view:()=>v`
        <champion-search-view></champion-search-view>
        `},{path:"/app/champions/",redirect:"/app/champions"},{path:"/app/teams/:id",view:r=>v`
        <team-view team-id=${r.id}></team-view>
        `},{path:"/app/teams",view:()=>v`
        <team-search-view></team-search-view>
      `},{path:"/app/teams/",redirect:"/app/teams"},{path:"/app/players",view:()=>v`
        <player-search-view></player-search-view>
      `},{path:"/app/players/",redirect:"/app/teams"},{path:"/app/",view:()=>v`
        <home-view></home-view>
      `},{path:"/app",view:()=>v`<home-view></home-view>`},{path:"/",redirect:"/app"}],Ie=class Ie extends O{render(){return v`
        <mu-switch></mu-switch>
        `}connectedCallback(){super.connectedCallback(),Ht.initializeOnce()}};Ie.styles=[P`
          :host {
            display: grid;
            grid-column: 1 / -1;
          }
        `];let de=Ie;$e({"mu-auth":T.Provider,"mu-history":xs.Provider,"mu-store":class extends Pi.Provider{constructor(){super(Sr,Ar,"lol:auth")}},"mu-switch":class extends gr.Element{constructor(){super(wn,"lol:history","lol:auth")}},"lol-app":de,"lol-header":Ht,"home-view":Ft,"tournament-search-view":nt,"tournament-view":ot,"champion-search-view":Bt,"team-search-view":qt,"player-search-view":Vt,"match-view":at,"match-edit":At});
