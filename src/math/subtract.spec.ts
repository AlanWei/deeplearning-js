import subtract from './subtract';

test('valid matrix subtract', () => {
  const left = [[1, 2, 3]];
  const right = [[1, 2, 3]];
  const ro = subtract(left, right);
  expect(ro).toEqual([[0, 0, 0]]);
});

test('broadcasting matrix subtract', () => {
  const left = [[1, 2, 3]];
  const right = [[1]];
  const ro = subtract(left, right);
  expect(ro).toEqual([[0, 1, 2]]);
});
