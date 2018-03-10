import { map, isNil } from 'lodash';

const loopTwoMatrix = (
  left: number[][],
  right: number[][],
  func: Function,
) => (
  map(left, (subArr: number[], i) => (
    map(subArr, (num: number, j) => (
      !isNil(right[i][j]) ? func(num, right[i][j]) : func(num, right[i][0])
    ))
  ))
);

export default loopTwoMatrix;