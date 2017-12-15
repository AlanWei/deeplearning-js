import squeeze from './squeeze';

test('3D array with 1 element', () => {
  const ro = squeeze([
    [[1]]
  ]);
  expect(ro).toEqual([1]);
});

test('3D array with multiple elements', () => {
  const ro = squeeze([
    [[1]],
    [[2]],
    [[3]],
    [[4]],
    [[5]],
  ]);
  expect(ro).toEqual([1, 2, 3, 4, 5]);
});
