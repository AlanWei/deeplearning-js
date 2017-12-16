import vectorize from './vectorize';

test('vectorize', () => {
  const ro = vectorize(1);
  expect(ro).toEqual([[1]]);
});

test('vectorize', () => {
  const ro = vectorize(1, 3, 3);
  expect(ro).toEqual([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);
});
