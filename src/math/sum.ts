import { map } from 'lodash';

function sum(matrix: Array<Array<number>>) {
  let sum = 0;
  map(matrix, (subArr) => (
    map(subArr, (num) => {
      sum += num;
    })
  ));

  return sum;
}

export default sum;
