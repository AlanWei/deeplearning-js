import loopTwoMatrix from '../util/loopTwoMatrix';

const divide = (
  left: number[][],
  right: number[][],
): number[][] => (
  loopTwoMatrix(left, right, (a: number, b: number) => (
    a / b
  ))
);

export default divide;