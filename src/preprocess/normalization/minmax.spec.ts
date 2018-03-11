import minmax from './minmax';

test('minmax', () => {
  const ro = minmax([1, 2, 3]);
  expect(ro).toEqual([0, 0.5, 1]);
});
