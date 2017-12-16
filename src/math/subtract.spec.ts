import subtract from './subtract';

test('valid matrix subtract', () => {
  const ro = subtract([
    [1, 2, 3]
  ], [
    [1, 2, 3]
  ]);
  expect(ro).toEqual([
    [0, 0, 0]
  ]);
});

test('invalid matrix subtract', () => {
  expect(() => subtract([[1, 2], [2, 3], [3, 4]], [[1, 2, 3]]))
  .toThrowError('[subtract] left matrix shape ' +
  'should be the same as right matrix shape');
});
