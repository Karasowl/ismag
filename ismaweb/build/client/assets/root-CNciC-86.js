import{r as l,j as e}from"./jsx-runtime-D58fAJBj.js";import{l as y,n as S,o as f,p as g,_ as w,M as u,L as d,O as E,S as h,q as k,t as M}from"./components-DOmHNxYD.js";/**
 * @remix-run/react v2.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let c="positions";function R({getKey:s,...r}){let{isSpaMode:o}=y(),i=S(),x=f();g({getKey:s,storageKey:c});let m=l.useMemo(()=>{if(!s)return null;let t=s(i,x);return t!==i.key?t:null},[]);if(o)return null;let p=((t,j)=>{if(!window.history.state||!window.history.state.key){let n=Math.random().toString(32).slice(2);window.history.replaceState({key:n},"")}try{let a=JSON.parse(sessionStorage.getItem(t)||"{}")[j||window.history.state.key];typeof a=="number"&&window.scrollTo(0,a)}catch(n){console.error(n),sessionStorage.removeItem(t)}}).toString();return l.createElement("script",w({},r,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${p})(${JSON.stringify(c)}, ${JSON.stringify(m)})`}}))}const b="/assets/global-Sxjdx_E5.css",_=()=>[{rel:"stylesheet",href:b}],L=()=>[{charSet:"utf-8"},{name:"viewport",content:"width=device-width,initial-scale=1"}];function v(){return e.jsxs("html",{lang:"es",className:"theme",children:[e.jsxs("head",{children:[e.jsx(u,{}),e.jsx(d,{})]}),e.jsxs("body",{children:[e.jsx(E,{}),e.jsx(R,{}),e.jsx(h,{})]})]})}function H(){const s=k();let r=500,o="Ha ocurrido un error inesperado.";return M(s)&&(r=s.status,o=s.statusText),e.jsxs("html",{lang:"es",children:[e.jsxs("head",{children:[e.jsx(u,{}),e.jsx(d,{})]}),e.jsxs("body",{className:"error",children:[e.jsxs("main",{children:[e.jsxs("h1",{children:["Error ",r]}),e.jsx("p",{children:o})]}),e.jsx(h,{})]})]})}export{H as ErrorBoundary,v as default,_ as links,L as meta};
