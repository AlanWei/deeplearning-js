import linear from './linear';

test('linear', () => {
  const a = [[1, 2, 3]];
  const w = [[1], [2], [3]];
  const b = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
  const ro = linear(a, w, b);
  const z = ro.Z;
  const cache = ro.cache;
  expect(z).toEqual([
    [2, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
  ]);
  expect(cache).toEqual({
    A: a,
    W: w,
    b,
  });
});
