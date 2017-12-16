import multiply from './multiply';

test('valid matrix multiply', () => {
  const ro = multiply([
    [1, 2, 3]
  ], [
    [2, 2, 2]
  ]);
  expect(ro).toEqual([
    [2, 4, 6]
  ]);
});

test('invalid matrix multiply', () => {
  expect(() => multiply([[1, 2], [2, 3], [3, 4]], [[1, 2, 3]]))
  .toThrowError('[multiply] left matrix shape ' +
  'should be the same as right matrix shape');
});
