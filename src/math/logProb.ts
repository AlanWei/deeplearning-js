import { map } from 'lodash';

function logProb(
  x: Array<Array<number>>,
  y: Array<Array<number>>,
) {
  return map(x, (example, i) => (
    map(example, (num, j) => {
      const yHat = y[i][j];
      return (yHat * Math.log(num)) +
      (1 - yHat) * (Math.log(1 - num));
    })
  ));
}

export default logProb;
