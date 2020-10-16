export function walkDom(pEl: Element, pCallback: Function): void{
    if (pEl) {
        pCallback(pEl);
        pEl = pEl.firstElementChild;

        while (pEl) {
            walkDom(pEl, pCallback);
            pEl = pEl.nextElementSibling;
        }
        
    }
}
