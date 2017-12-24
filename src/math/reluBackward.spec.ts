import reluBackward from './reluBackward';
import Array2D from './Array2D';

test('valid reluBackward', () => {
  const dA = new Array2D([1, 3], [2, -1, 3]);
  const cache = new Array2D([1, 3], [1, 1, 1]);
  const ro = reluBackward(dA, cache);
  expect(ro).toEqual(new Array2D([1, 3], [1, 0, 1]));
});
