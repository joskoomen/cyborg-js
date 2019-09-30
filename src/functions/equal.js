// @flow

/**
 * Compare 2 Objects
 * @param {Object} pA - first Object
 * @param {Object} pB - second Object
 * @returns {boolean} - equal or not
 */
export function equal(pA: Object, pB: Object): boolean {
  const keysA: any = Object.keys(pA).sort();
  const keysB: any = Object.keys(pB).sort();
  const objectA: Object = {};
  const objectB: Object = {};
  keysA.forEach(function(key: any) {
    objectA[key] = pA[key];
  });
  keysB.forEach(function(key: any) {
    objectB[key] = pB[key];
  });
  return JSON.stringify(objectA) === JSON.stringify(objectB);
}
