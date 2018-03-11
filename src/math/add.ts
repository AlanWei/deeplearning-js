import loopTwoMatrix from '../util/loopTwoMatrix';

const add = (
  left: number[][],
  right: number[][],
): number[][] => (
  loopTwoMatrix(left, right, (a: number, b: number) => (
    a + b
  ))
);

export default add;