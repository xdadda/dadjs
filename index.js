//////
// IMPORTANT
//    - SSR: use module async in html: <script type="module" async src="/src/main.js"></script> to allow for instant partial hydration!
//    - onMount/onUnmount should be placed at the very beginning of the async component, well before any await function (e.g. fetching data)
//      (this can be solved if/when asyncontext in browser will be available)

// TODO: 
//      SSR: error handling
//      CACHING API request
//      seperate dad library from ssr framework (router, store, serverfetch, auth, api)?!
//
"use strict";
export { html } from './dad_html.js';

import { reactive as rC, untrack as uC } from './dad_dom_signal.js';
import { reactive as rS, untrack as uS } from './dad_server_signal.js';

const isServer=typeof window == "undefined"; //import.meta.env.SSR;
const isSSR = isServer || !!window._ctx_;
const reactive=isServer?rS:rC;
const untrack=isServer?uS:uC;
export { reactive, untrack, isServer, isSSR };

import {onMount as omC, onUnmount as ouC} from './dad_dom.js';
const onMount=isServer?()=>{}:omC;
const onUnmount=isServer?()=>{}:ouC;
export { onMount, onUnmount };

export { serverFetch, Suspense } from './dad_utils.js';
export { render, hydrate } from './dad_dom.js';

export {serverState} from './dad_server_ctx.js';
