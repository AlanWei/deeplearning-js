import add from './add';

test('valid matrix add', () => {
  const left = [[1, 2, 3]];
  const right = [[1, 2, 3]];
  const ro = add(left, right);
  expect(ro).toEqual([[2, 4, 6]]);
});

test('valid matrix add with broadcasting', () => {
  const left = [[1, 2, 3]];
  const right = [[1]];
  const ro = add(left, right);
  expect(ro).toEqual([[2, 3, 4]]);
});