import { map } from 'lodash';

function reluBackward(dA: Array<Array<number>>, cache: Array<Array<number>>) {
  return map(cache, (subArr, i) => (
    map(subArr, (num, j) => (
      dA[i][j] < 0 ? 0 : dA[i][j]
    ))
  ));
}

export default reluBackward;
