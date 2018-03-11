import { map } from 'lodash';

const loopMatrix = (
  matrix: number[][],
  func: Function,
): number[][] => (
  map(matrix, (subArr: number[], i) => (
    map(subArr, (num: number, j) => (
      func(num, i, j)
    ))
  ))
);

export default loopMatrix;