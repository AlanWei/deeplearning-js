import { Array2D } from '../data/';
import softmaxBackward from './softmaxBackward';

test('valid softmax backward', () => {
  const dA = [[1, 2, 1.5], [1, 2, 1.5], [1, 2, 1.5]];
  const cache = [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, 0.5]];
  const ro = softmaxBackward(dA, cache);
  expect(ro).toEqual(
    [
      [0.22222222222222224, 0.4444444444444445, 0.33333333333333337],
      [0.22222222222222224, 0.4444444444444445, 0.33333333333333337],
      [0.22222222222222224, 0.4444444444444445, 0.33333333333333337],
    ],
  );
});
