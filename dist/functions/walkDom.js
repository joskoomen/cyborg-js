"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkDom = void 0;
function walkDom(pEl, pCallback) {
    if (pEl) {
        pCallback(pEl);
        pEl = pEl.firstElementChild;
        while (pEl) {
            if (!pEl.hasAttribute('data-component')) {
                walkDom(pEl, pCallback);
            }
            pEl = pEl.nextElementSibling;
        }
    }
}
exports.walkDom = walkDom;
//# sourceMappingURL=walkDom.js.map