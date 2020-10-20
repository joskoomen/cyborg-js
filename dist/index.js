"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){t.DOCUMENT_READY="DOMContentLoaded",t.NODE_REMOVED="DOMNodeRemovedFromDocument"}(t||(t={}));var e=function(t,e,n){this.name=e,this.handler=n,this.target=t},n=function(){function t(){if(t._instance)throw new Error("Use NotificationController.getInstance()");t._instance=this,this._listeners=[]}return t.getInstance=function(){return t._instance?t._instance:new t},t.prototype.notify=function(t,e){this._listeners.filter((function(e){return e.name===t})).forEach((function(n){var o={notification:t,payload:e||{}};n.handler(o)}))},t.prototype.addNotificationListener=function(t,n,o){var i=new e(t,n,o.bind(t));this._listeners.push(i)},t.prototype.removeNotificationListener=function(t,e){var n=this._listeners,o=n.findIndex((function(n){return n.name===t&&n.target===e}));this._listeners=n.splice(o,1)},t.prototype.removeAllListenersFor=function(t){var e=this._listeners;this._listeners=e.filter((function(e){return e.target.name!==t.name}))},Object.defineProperty(t.prototype,"listeners",{get:function(){return this._listeners},enumerable:!1,configurable:!0}),t}(),o=function(){function e(){if(this.componentsMap=[],this._components=[],this._data={},e._instance)throw new Error("Use MotherBoard.getInstance()");e._instance=this,this.init()}return e.getInstance=function(){return e._instance?e._instance:new e},e.prototype.init=function(){var e=this;window.onload=function(){e.onload()},window.onunload=function(){e.onunload()},window.onpagehide=function(){e.destroy()},document.addEventListener(t.DOCUMENT_READY,(function(){e.bind()}),!1)},e.prototype.bind=function(){var t=document.querySelector("html");if(!t)throw Error("No html tag available");t.classList.remove("no-js"),t.classList.add("js"),this.build(t)},e.prototype.build=function(t){var n=this,o=Array.from(t.querySelectorAll("[data-component]"));o.length>0&&o.forEach((function(t){var o=t.dataset;o&&o.component&&o.component.replace(" ","").split(",").forEach((function(o){var i=e.getComponentMapByName(n.componentsMap,o);if(i){var r=new i;r.notifications&&r.notifications.length>0&&n.registerNotification({name:o,notifications:r.notifications,classRef:r}),r.bind(t),n._components.push(r),n.destroyComponentListener(r,t)}}))}))},e.prototype.onload=function(){this._components.forEach((function(t){t.onload()}))},e.prototype.onunload=function(){this._components.forEach((function(t){t.onunload()}))},e.prototype.destroyComponentListener=function(e,n){var o=e,i=n;if(i)if(window.MutationObserver){var r=new MutationObserver((function(t){t.forEach((function(t){t.removedNodes.forEach((function(t){o&&t===n&&(o.destroy(),r&&(r.disconnect(),r=null),o=null,i=null)}))}))}));r.observe(document,{childList:!0,subtree:!0})}else e.addEventListener(t.NODE_REMOVED,(function(){e.destroy(),o=null,i=null}))},e.prototype.registerNotification=function(t){var e=this;if(t.notifications){var n=t.notifications,o=t.classRef;n.forEach((function(t){e.notifier.addNotificationListener(o,t,o.handleNotifications)}))}},Object.defineProperty(e.prototype,"notifier",{get:function(){return n.getInstance()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"data",{get:function(){return this._data},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"components",{get:function(){return this._components},enumerable:!1,configurable:!0}),e.getComponentMapByName=function(t,e){return t&&t.length>0&&t[e]||null},e.prototype.destroy=function(){for(;this._components.length>0;){var t=this._components[0];t&&t.el&&t.el.remove(),this._components.shift()}},e}();function i(t,e){if(t)for(e(t),t=t.firstElementChild;t;)i(t,e),t=t.nextElementSibling}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function r(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),i=0;for(e=0;e<n;e++)for(var r=arguments[e],s=0,a=r.length;s<a;s++,i++)o[i]=r[s];return o}var s=function(){function t(){var t=this;this._name="",this._notifications=[],this._motherboard=o.getInstance(),this._events=[],this._addEventListener=function(e,n,o){var i=o.bind(t);return t._events.push({target:e,name:n,handler:i}),i},this._removeEventListener=function(e,n,o){var i=t._events.findIndex((function(t){return t.name===n&&t.handler===o}));return t._events.splice(i,1),e}}return t.prototype.bind=function(t){this._el=t,this._name=t.dataset.component||"",this.registerInlineListeners()},t.prototype.onload=function(){},t.prototype.onunload=function(){},t.prototype.addListener=function(t){this.motherboard.notifier.addNotificationListener(this,t,this.handleNotifications)},t.prototype.removeListener=function(t){this.motherboard.notifier.removeNotificationListener(t,this)},t.prototype.notify=function(t,e){void 0===e&&(e={}),this.motherboard.notifier.notify(t,e)},t.prototype.handleNotifications=function(t){t.notification},t.prototype.registerInlineListeners=function(){var t=this;this._el&&i(this._el,(function(e){e.dataset.component||Array.from(e.attributes).forEach((function(n){if(n.name.startsWith("on")){var o=n.name.replace("data-on:","");if(e.dataset[n.name]=n.value,e.removeAttribute(n.name),n.value.includes("(")&&n.value.includes(")")){var i=t._addEventListener(e,o,new Function("this."+n.value).bind(t));e.addEventListener(o,i)}else{i=t._addEventListener(e,o,(function(){var e,o,i,s;e=t._motherboard.data,o=n.value,s=i||{},"function"==typeof e?e.call(o):(new(Function.bind.apply(Function,r([void 0],Object.keys(s),["var __cyborg_result; with($data) { __cyborg_result = "+e+" }; return __cyborg_result"])))).apply(void 0,r([o],Object.values(s)))}));e.addEventListener(o,i)}}}))}))},t.prototype.addEventListener=function(t,e){if(this._el){var n=this._addEventListener(this._el,t,e);this._el.addEventListener(t,n,!1)}},t.prototype.removeEventListener=function(t,e){this._el&&(this._removeEventListener(this._el,t,e),this._el.removeEventListener(t,e))},t.prototype.render=function(t,e){if(this._el){if(this._el.children)for(;this._el.children.length>0;)this._el.children[0].remove();this._el.innerHTML=e?e(t):this.getTemplate(t),this.motherboard.build(this._el)}},t.prototype.getTemplate=function(t){return""},Object.defineProperty(t.prototype,"notifications",{get:function(){return this._notifications},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"el",{get:function(){return this._el},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"motherboard",{get:function(){return this._motherboard},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"events",{get:function(){return this._events},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){for(this.motherboard.notifier.removeAllListenersFor(this);this._events.length>0;){var t=this._events[0];this._removeEventListener(t.target,t.name,t.handler),t.target.removeEventListener(t.name,t.handler)}this._el&&(this._el.remove(),this._el=void 0)},t}();exports.Component=s,exports.MotherBoard=o,exports.Notification=e;
//# sourceMappingURL=index.js.map