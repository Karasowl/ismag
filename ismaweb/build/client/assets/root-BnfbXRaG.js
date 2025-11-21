import{r as c,j as e}from"./jsx-runtime-BfF-YriY.js";import{c as h}from"./createLucideIcon-CtW4PRxQ.js";import{o as g,p as k,q as j,t as w,_ as b,L as S,M as f,v as x,O as M,S as y,w as v,x as _}from"./components-BecE-BSL.js";/**
 * @remix-run/react v2.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let p="positions";function N({getKey:t,...r}){let{isSpaMode:s}=g(),o=k(),i=j();w({getKey:t,storageKey:p});let d=c.useMemo(()=>{if(!t)return null;let n=t(o,i);return n!==o.key?n:null},[]);if(s)return null;let a=((n,l)=>{if(!window.history.state||!window.history.state.key){let m=Math.random().toString(32).slice(2);window.history.replaceState({key:m},"")}try{let u=JSON.parse(sessionStorage.getItem(n)||"{}")[l||window.history.state.key];typeof u=="number"&&window.scrollTo(0,u)}catch(m){console.error(m),sessionStorage.removeItem(n)}}).toString();return c.createElement("script",b({},r,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${a})(${JSON.stringify(p)}, ${JSON.stringify(d)})`}}))}const I="/assets/index-Dlz0tZTq.css";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],C=h("menu",E);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],L=h("moon",T);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],$=h("sun",O);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],R=h("x",z);function H({className:t=""}){const[r,s]=c.useState("dark");c.useEffect(()=>{const a=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),n=typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches:!0,l=a||(n?"dark":"light");document.documentElement.dataset.theme=l,s(l)},[]);const o=()=>{const a=r==="dark"?"light":"dark";document.documentElement.dataset.theme=a;try{localStorage.setItem("theme",a)}catch{}s(a)},i=r==="dark",d=i?"Cambiar a modo claro":"Cambiar a modo oscuro";return e.jsx("button",{type:"button","aria-label":d,onClick:o,className:`theme-toggle ${t}`,children:i?e.jsx($,{size:20}):e.jsx(L,{size:20})})}const q=[{label:"Inicio",href:"/"},{label:"Sobre mí",href:"/sobre"},{label:"Música",href:"/music"},{label:"Blog",href:"/blog"},{label:"Conecta",href:"/conecta"},{label:"Videos",href:"https://www.youtube.com/@IsmaelGuimarais",external:!0}];function A(){const[t,r]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(H,{}),e.jsxs("nav",{className:`mobile-nav ${t?"mobile-nav--open":""}`,children:[e.jsx("button",{className:"mobile-nav__toggle",onClick:()=>r(s=>!s),"aria-label":t?"Cerrar menú":"Abrir menú",children:t?e.jsx(R,{size:24}):e.jsx(C,{size:24})}),t&&e.jsx("div",{className:"mobile-nav__menu",children:q.map(({label:s,href:o,external:i})=>i?e.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",onClick:()=>r(!1),children:s},s):e.jsx(S,{to:o,onClick:()=>r(!1),children:s},s))})]})]})}const V=()=>[{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;600;700;800&display=swap"},{rel:"stylesheet",href:I}],F=()=>[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"}];function G(){return e.jsxs("html",{lang:"es",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("script",{dangerouslySetInnerHTML:{__html:"(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s||m;document.documentElement.dataset.theme=t;}catch(e){}})();"}}),e.jsx(f,{}),e.jsx(x,{})]}),e.jsxs("body",{children:[e.jsx(A,{}),e.jsx(M,{}),e.jsx(N,{}),e.jsx(y,{})]})]})}function K(){const t=v();let r=500,s="Ha ocurrido un error inesperado.";return _(t)&&(r=t.status,s=t.statusText),e.jsxs("html",{lang:"es",children:[e.jsxs("head",{children:[e.jsx(f,{}),e.jsx(x,{})]}),e.jsxs("body",{className:"error",children:[e.jsxs("main",{children:[e.jsxs("h1",{children:["Error ",r]}),e.jsx("p",{children:s})]}),e.jsx(y,{})]})]})}export{K as ErrorBoundary,G as default,V as links,F as meta};
