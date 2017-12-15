import { map } from 'lodash';

function sigmoidBackward(dA: Array<Array<number>>, cache: any) {
  return map(dA, (subArr, index) => (
    map(subArr, (num, idx) => {
      const currentCache = cache[index][idx];
      const s = 1 / (1 + Math.exp(-currentCache));
      return num * s * (1 - s);
    })
  ));
}

export default sigmoidBackward;
