import divide from './divide';

test('valid matrix divide', () => {
  const left = [[1, 2, 3]];
  const right = [[1, 2, 3]];
  const ro = divide(left, right);
  expect(ro).toEqual([
    [1, 1, 1]
  ]);
});

test('valid matrix divide with broadcasting', () => {
  const left = [[1, 2, 3]];
  const right = [[2]];
  const ro = divide(left, right);
  expect(ro).toEqual([
    [0.5, 1, 1.5]
  ]);
});