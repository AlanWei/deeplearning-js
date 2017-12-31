import normalization from './normalization';

test('normalization', () => {
  const ro = normalization([1, 2, 3]);
  expect(ro).toEqual([0, 0.5, 1]);
});
