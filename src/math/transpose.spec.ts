import transpose from './transpose';

test('transpose', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const ro = transpose(matrix);
  expect(ro).toEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});

test('transpose same dimension', () => {
  const matrix = [[1, 2], [3, 4]];
  const ro = transpose(matrix);
  expect(ro).toEqual([
    [1, 3],
    [2, 4],
  ]);
});
