import multiply from './multiply';

test('valid matrix multiply', () => {
  const left = [[1, 2, 3]];
  const right = [[1, 2, 3]];
  const ro = multiply(left, right);
  expect(ro).toEqual([
    [1, 4, 9]
  ]);
});

test('valid matrix multiply with broadcasting', () => {
  const left = [[1, 2, 3]];
  const right = [[2]];
  const ro = multiply(left, right);
  expect(ro).toEqual([
    [2, 4, 6]
  ]);
});
