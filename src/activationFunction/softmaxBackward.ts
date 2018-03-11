import softmax from './softmax';
import loopTwoMatrix from '../util/loopTwoMatrix';

const softmaxBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  loopTwoMatrix(softmax(cache).A, dA, (a: number, b: number) => (
    b * a * (1 - a)
  ))
);

export default softmaxBackward;