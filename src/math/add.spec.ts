import add from './add';

test('valid matrix add', () => {
  const ro = add([
    [1, 2, 3]
  ], [
    [1, 2, 3]
  ]);
  expect(ro).toEqual([
    [2, 4, 6]
  ]);
});

test('invalid matrix add', () => {
  expect(() => add([[1, 2], [2, 3], [3, 4]], [[1, 2, 3]]))
  .toThrowError('[add] left matrix shape ' +
  'should be the same as right matrix shape');
});
