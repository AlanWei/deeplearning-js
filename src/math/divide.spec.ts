import divide from './divide';

test('valid matrix add', () => {
  const ro = divide([
    [1, 2, 3]
  ], [
    [1, 2, 3]
  ]);
  expect(ro).toEqual([
    [1, 1, 1]
  ]);
});
