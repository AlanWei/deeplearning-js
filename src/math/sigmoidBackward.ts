import { map } from 'lodash';

function sigmoidBackward(dA: Array<Array<number>>,
  cache: Array<Array<number>>) {
  return map(cache, (subArr, index) => (
    map(subArr, (num, idx) => {
      const s = 1 / (1 + Math.exp(-dA[index][idx]));
      return num * s * (1 - s);
    })
  ));
}

export default sigmoidBackward;
