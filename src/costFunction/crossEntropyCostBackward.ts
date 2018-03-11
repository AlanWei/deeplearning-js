import loopTwoMatrix from '../util/loopTwoMatrix';

const crossEntropyCostBackward = (
  yHat: number[][],
  y: number[][],
): number[][] => (
  loopTwoMatrix(yHat, y, (a: number, b: number) => (
    -((b / a) - ((1 - b) / (1 - a)))
  ))
);

export default crossEntropyCostBackward;