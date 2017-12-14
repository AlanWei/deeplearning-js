import dot from './dot';

test('valid matrix dot', () => {
  const ro = dot([[1], [2], [3]], [[1, 2, 3]]);
  expect(ro).toEqual([
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
  ]);
});

test('invalid matrix dot', () => {
  expect(() => dot([[1, 2], [2, 3], [3, 4]], [[1, 2, 3]]))
  .toThrowError('[dot] left matrix column count ' +
  'should be the same as right matrix row count');
});
