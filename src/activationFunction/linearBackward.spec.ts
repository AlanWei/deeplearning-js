import { Array2D } from '../data/';
import linearBackward from './linearBackward';

test('valid linearBackward', () => {
  const dZ = [[1], [1], [1]];
  const A = [[1], [1], [1]];
  const W = [[1], [1], [1]];
  const b = [[1], [1], [1]];
  const cache = {
    A,
    W,
    b,
  };
  const ro = linearBackward(dZ, cache);
  expect(ro).toEqual({
    dAPrev: [[3]],
    dW: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    db: [[1], [1], [1]],
  });
});
