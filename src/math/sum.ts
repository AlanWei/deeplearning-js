import { map } from 'lodash';

function sum(
  matrix: Array<number>,
  isAbs: boolean = false,
): number {
  let sum: number = 0;
  map(matrix, (num) => {
    if (isAbs) {
      sum += Math.abs(num);
    } else {
      sum += num;
    }
  });

  return sum;
}

export default sum;
