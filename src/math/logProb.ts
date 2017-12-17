import { map } from 'lodash';

function logProb(x: Array<Array<Array<number>>>,
  y: Array<Array<Array<number>>>) {
  return map(x, (example, i) => (
    map(example, (subArr, j) => (
      map(subArr, (num, k) => {
        const yHat = y[i][j][k];
        return (yHat * Math.log(num)) + ((1 - yHat) * Math.log(1 - num));
      })
    ))
  ));
}

export default logProb;
