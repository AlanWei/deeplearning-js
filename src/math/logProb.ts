import { map } from 'lodash';

function logProb(x: Array<Array<number>>, y: Array<Array<number>>) {
  return map(x, (subArr, i) => (
    map(subArr, (num, j) => (
      y[i][j] * Math.log(num) + (1 - y[i][j]) * Math.log(1 - num)
    ))
  ));
}

export default logProb;
