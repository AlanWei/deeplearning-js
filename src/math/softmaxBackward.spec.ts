import softmaxBackward from './softmaxBackward';
import Array2D from '../data/Array2D';

test('valid softmax backward', () => {
  const dA = new Array2D([1, 3], [1, 2, -1]);
  const cache = new Array2D([1, 3], [0.5, 0.5, 0.5]);
  const ro = softmaxBackward(dA, cache);
  expect(ro).toEqual(
    new Array2D(
      [1, 3],
      [0.25, 0.5, -0.25],
    ),
  );
});
