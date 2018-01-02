import linearBackward from './linearBackward';
import Array2D from '../data/Array2D';

test('valid linearBackward', () => {
  const dZ = new Array2D([3, 1], [1, 1, 1]);
  const A = new Array2D([3, 1], [1, 1, 1]);
  const W = new Array2D([3, 1], [1, 1, 1]);
  const b = new Array2D([3, 1], [1, 1, 1]);
  const cache = {
    A,
    W,
    b,
  };
  const ro = linearBackward(dZ, cache);
  expect(ro).toEqual({
    dAPrev: new Array2D([1, 1], [3]),
    dW: new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1]),
    db: new Array2D([3, 1], [1, 1, 1]),
  });
});
