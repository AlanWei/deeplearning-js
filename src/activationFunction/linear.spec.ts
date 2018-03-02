import linear from './linear';
import Array2D from '../data/Array2D';

test('linear', () => {
  const a = [[1, 2, 3]];
  const w = [[1], [2], [3]];
  const b = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const ro = linear(a, w, b);
  const z = ro.Z;
  const cache = ro.cache;
  expect(z).toEqual([
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
