import absDiff from './absDiff';

test('valid matrix absDiff', () => {
  const ro = absDiff([
    [2, 2, 2]
  ], [
    [1, 2, 3]
  ]);
  expect(ro).toEqual(2);
});
