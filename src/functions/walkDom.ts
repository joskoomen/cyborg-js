export function walkDom(pEl: Element, pCallback: Function): void{
    if (pEl) {
        pCallback(pEl);
        pEl = pEl.firstElementChild as Element;

        while (pEl) {
            walkDom(pEl, pCallback);
            pEl = pEl.nextElementSibling as Element;
        }
        
    }
}
