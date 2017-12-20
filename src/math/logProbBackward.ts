import { map } from 'lodash';
import NP from 'number-precision';

function logProbBackward(
  x: Array<Array<number>>,
  y: Array<Array<number>>
) {
  return map(x, (subArr, i) => (
    map(subArr, (num, j) => {
      const yHat = y[i][j];
      return -NP.minus(
        yHat / num,
        NP.minus(1, yHat) / NP.minus(1, num),
      );
    })
  ));
}

export default logProbBackward;
