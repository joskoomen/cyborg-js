// @flow

/**
 * Throttle event handlers
 * @param {number} pDelay - Delay in seconds
 * @param {function} pFn - Event handler
 * @returns {function(...[*]): *}
 */
export function throttle(pFn: function, pDelay: number): function {
  let lastCall = 0;
  return (...args: any) => {
    const now = (new Date()).getTime();
    if (now - lastCall < pDelay) {
      return;
    }
    lastCall = now;
    return pFn(...args);
  };
}
