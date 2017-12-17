import linear from './linear';

test('linear', () => {
  const ro = linear(
    [[1, 2, 3]],
    [
      [1],
      [2],
      [3],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
  );
  const z = ro.Z;
  const cache = ro.cache;
  expect(z).toEqual([
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
  ]);
  expect(cache).toEqual({
    A: [[1, 2, 3]],
    W: [
      [1],
      [2],
      [3],
    ],
    b: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  });
});
