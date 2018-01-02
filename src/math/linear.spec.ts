import linear from './linear';
import Array2D from '../data/Array2D';

test('linear', () => {
  const a = new Array2D([1, 3], [1, 2, 3]);
  const w = new Array2D([3, 1], [1, 2, 3]);
  const b = new Array2D([3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ro = linear(a, w, b);
  const z = ro.Z;
  const cache = ro.cache;
  expect(z.matrix).toEqual([
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
  ]);
  expect(cache).toEqual({
    A: a,
    W: w,
    b,
  });
});
