import { map } from 'lodash';

function sum(matrix: Array<Array<number>>, isAbs: boolean = false) {
  let sum = 0;
  map(matrix, (subArr) => (
    map(subArr, (num) => {
      if (isAbs) {
        sum += Math.abs(num);
      } else {
        sum += num;
      }
    })
  ));

  return sum;
}

export default sum;
