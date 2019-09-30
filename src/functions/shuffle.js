// @flow

/**
 * Shuffle an array
 * @param {Array} pArray - Array to shuffle
 * @returns {Array} - Shuffled Array
 */
export function shuffle(pArray: Array<any>): Array<any> {
  let counter: number = pArray.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    // And swap the last element with it
    const temp: any = pArray[counter];
    pArray[counter] = pArray[index];
    pArray[index] = temp;
  }
  return pArray;
}
