//@flow

export function walkDom(pEl: HTMLElement, pCallback: HTMLElement) {
  pCallback(pEl);
  pEl = pEl.firstElementChild;

  while (pEl) {
    walkDom(pEl, pCallback);
    pEl = pEl.nextElementSibling;
  }
}
