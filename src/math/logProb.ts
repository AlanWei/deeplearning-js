import { map } from 'lodash';
import NP from 'number-precision';

function logProb(
  x: Array<Array<number>>,
  y: Array<Array<number>>,
) {
  return map(x, (example, i) => (
    map(example, (num, j) => {
      const yHat = y[i][j];
      return NP.plus(
        yHat * Math.log(num),
        NP.minus(1, yHat) * Math.log(
          NP.minus(1, num)
        )
      );
    })
  ));
}

export default logProb;
