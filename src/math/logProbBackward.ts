import { map } from 'lodash';

function logProbBackward(x: Array<Array<number>>, y: Array<Array<number>>) {
  return map(x, (subArr, i) => (
    map(subArr, (num, j) => (
      -((y[i][j] / num) - (1 - y[i][j]) / (1 - num))
    ))
  ));
}

export default logProbBackward;
