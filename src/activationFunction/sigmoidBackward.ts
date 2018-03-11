import sigmoid from './sigmoid';
import loopTwoMatrix from '../util/loopTwoMatrix';

const sigmoidBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  loopTwoMatrix(sigmoid(cache).A, dA, (a: number, b: number) => (
    b * a * (1 - a)
  ))
);

export default sigmoidBackward;