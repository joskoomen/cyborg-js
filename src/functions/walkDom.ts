export function walkDom(pEl: Element | null, pCallback: Function): void {
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
