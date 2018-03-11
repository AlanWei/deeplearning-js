import loopTwoMatrix from '../util/loopTwoMatrix';

const reluBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  loopTwoMatrix(cache, dA, (a: number, b: number) => (
    a < 0 ? 0 : b
  ))
);

export default reluBackward;