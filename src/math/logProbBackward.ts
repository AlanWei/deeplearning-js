import { map } from 'lodash';

function logProbBackward(
  x: Array<Array<number>>,
  y: Array<Array<number>>
) {
  return map(x, (subArr, i) => (
    map(subArr, (num, j) => {
      const yHat = y[i][j];
      return -((yHat / num) - (1 - yHat) / (1 - num));
    })
  ));
}

export default logProbBackward;
