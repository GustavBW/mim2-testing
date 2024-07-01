import { RouterOutlet } from '@angular/router';
import { Renderer2, OnInit, Inject, Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <main class="main" #compRootElement>
    <p>Root is below this guy</p>
    <div id="solidjs-inlay-placeholder">PLACEHOLDER</div>
  </main>`,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('compRootElement', { static: true }) compRootElement!: ElementRef<HTMLDivElement>;
  private injectionComplete = false;

    constructor(
        private _renderer2: Renderer2, 
        @Inject(DOCUMENT) private _document: Document
    ) { 
    }

    public ngOnInit() {
        let script = this._renderer2.createElement('script');
        script.type = `text/javascript`;
        script.textContent = `
          const placeholder = document.getElementById('solidjs-inlay-placeholder');
          if (placeholder){
            const root = document.createElement('div');
            root.id = 'solidjs-inlay-root';
            placeholder.parentElement.appendChild(root);
            placeholder.remove();
            ${iReallyDidntWantToDoThis}
          }`;
        this._renderer2.appendChild(this.compRootElement.nativeElement, script);
    }
}

const iReallyDidntWantToDoThis = `(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();let G=j;const w=1,A=2,P={owned:null,cleanups:null,context:null,owner:null};var u=null;let b=null,H=null,h=null,p=null,g=null,C=0;function V(e,t){const n=h,i=u,s=e.length===0,l=t===void 0?i:t,f=s?P:{owned:null,cleanups:null,context:l?l.context:null,owner:l},o=s?e:()=>e(()=>B(()=>x(f)));u=f,h=null;try{return E(o,!0)}finally{h=n,u=i}}function N(e,t,n){const i=J(e,t,!1,w);U(i)}function B(e){if(h===null)return e();const t=h;h=null;try{return e()}finally{h=t}}function _(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&E(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],f=b&&b.running;f&&b.disposed.has(l),(f?!l.tState:!l.state)&&(l.pure?p.push(l):g.push(l),l.observers&&D(l)),f||(l.state=w)}if(p.length>1e6)throw p=[],new Error},!1)),t}function U(e){if(!e.fn)return;x(e);const t=C;q(e,e.value,t)}function q(e,t,n){let i;const s=u,l=h;h=u=e;try{i=e.fn(t)}catch(f){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(x),e.owned=null),e.updatedAt=n+1,F(f)}finally{h=l,u=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?_(e,i):e.value=i,e.updatedAt=n)}function J(e,t,n,i=w,s){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:u,context:u?u.context:null,pure:n};return u===null||u!==P&&(u.owned?u.owned.push(l):u.owned=[l]),l}function I(e){if(e.state===0)return;if(e.state===A)return T(e);if(e.suspense&&B(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<C);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===w)U(e);else if(e.state===A){const i=p;p=null,E(()=>T(e,t[0]),!1),p=i}}function E(e,t){if(p)return e();let n=!1;t||(p=[]),g?n=!0:g=[],C++;try{const i=e();return K(n),i}catch(i){n||(g=null),p=null,F(i)}}function K(e){if(p&&(j(p),p=null),e)return;const t=g;g=null,t.length&&E(()=>G(t),!1)}function j(e){for(let t=0;t<e.length;t++)I(e[t])}function T(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===w?i!==t&&(!i.updatedAt||i.updatedAt<C)&&I(i):s===A&&T(i,t)}}}function D(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=A,n.pure?p.push(n):g.push(n),n.observers&&D(n))}}function x(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),f=n.observerSlots.pop();i<s.length&&(l.sourceSlots[f]=i,s[i]=l,n.observerSlots[i]=f)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)x(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Q(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function F(e,t=u){throw Q(e)}let W=!1;function M(e,t){return B(()=>e(t||{}))}function X(e,t,n){let i=n.length,s=t.length,l=i,f=0,o=0,r=t[s-1].nextSibling,a=null;for(;f<s||o<l;){if(t[f]===n[o]){f++,o++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===f){const c=l<i?o?n[o-1].nextSibling:n[l-o]:r;for(;o<l;)e.insertBefore(n[o++],c)}else if(l===o)for(;f<s;)(!a||!a.has(t[f]))&&t[f].remove(),f++;else if(t[f]===n[l-1]&&n[o]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[o++],t[f++].nextSibling),e.insertBefore(n[--l],c),t[s]=n[l]}else{if(!a){a=new Map;let d=o;for(;d<l;)a.set(n[d],d++)}const c=a.get(t[f]);if(c!=null)if(o<c&&c<l){let d=f,S=1,v;for(;++d<s&&d<l&&!((v=a.get(t[d]))==null||v!==c+S);)S++;if(S>c-o){const $=t[f];for(;o<c;)e.insertBefore(n[o++],$)}else e.replaceChild(n[o++],t[f++])}else f++;else t[f++].remove()}}}function Y(e,t,n,i={}){let s;return V(l=>{s=l,t===document?e():Z(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function R(e,t,n){let i;const s=()=>{const f=document.createElement("template");return f.innerHTML=e,f.content.firstChild},l=()=>(i||(i=s())).cloneNode(!0);return l.cloneNode=l,l}function Z(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return m(e,t,i,n);N(s=>m(e,t(),s,n),i)}function m(e,t,n,i,s){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,f=i!==void 0;if(e=f&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(f){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=y(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=y(e,n,i);else{if(l==="function")return N(()=>{let o=t();for(;typeof o=="function";)o=o();n=m(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],r=n&&Array.isArray(n);if(L(o,t,n,s))return N(()=>n=m(e,o,n,i,!0)),()=>n;if(o.length===0){if(n=y(e,n,i),f)return n}else r?n.length===0?O(e,o,i):X(e,n,o):(n&&y(e),O(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(f)return n=y(e,n,i,t);y(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function L(e,t,n,i){let s=!1;for(let l=0,f=t.length;l<f;l++){let o=t[l],r=n&&n[e.length],a;if(!(o==null||o===!0||o===!1))if((a=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))s=L(e,o,r)||s;else if(a==="function")if(i){for(;typeof o=="function";)o=o();s=L(e,Array.isArray(o)?o:[o],Array.isArray(r)?r:[r])||s}else e.push(o),s=!0;else{const c=String(o);r&&r.nodeType===3&&r.data===c?e.push(r):e.push(document.createTextNode(c))}}return s}function O(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function y(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let l=!1;for(let f=t.length-1;f>=0;f--){const o=t[f];if(s!==o){const r=o.parentNode===e;!l&&!f?r?e.replaceChild(s,o):e.insertBefore(s,n):r&&o.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}var z=R("<p>I'm a part of a separate SolidJS project!");const k=()=>z();var ee=R("<h1>Hello world!!!!");const te=()=>[ee(),M(k,{})],ne=document.getElementById("solidjs-inlay-root");Y(()=>M(te,{}),ne);
`;