import Array2D from './Array2D';

test('Array2D', () => {
  const array2D = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 1, 1]);
  const matrix = new Array2D([3, 1], [1, 1, 1]);
  const scalar = new Array2D([1, 1], [1]);
  expect(array2D.shape).toEqual([1, 3]);
  expect(array2D.values).toEqual([1, 2, 3]);
  expect(array2D.matrix).toEqual([
    [1, 2, 3]
  ]);
  expect(array2D.as1D()).toEqual([1, 2, 3]);
  expect(scalar.squeeze()).toEqual(1);
});
