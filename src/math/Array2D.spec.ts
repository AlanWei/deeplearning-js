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
  expect(array2D.add(right).matrix).toEqual([
    [2, 3, 4]
  ]);
  expect(array2D.subtract(right).matrix).toEqual([
    [0, 1, 2]
  ]);
  expect(array2D.multiply(right).matrix).toEqual([
    [1, 2, 3]
  ]);
  expect(array2D.divide(right).matrix).toEqual([
    [1, 2, 3]
  ]);
  expect(array2D.dot(matrix).matrix).toEqual([
    [6]
  ]);
  expect(array2D.transpose().matrix).toEqual([
    [1],
    [2],
    [3],
  ]);
  expect(array2D.as1D()).toEqual([1, 2, 3]);
  expect(matrix.squeeze()).toEqual([1, 1, 1]);
  expect(scalar.squeeze()).toEqual(1);
});
