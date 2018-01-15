import minMaxNormalization from './minMaxNormalization';

test('rescaling', () => {
  const ro = minMaxNormalization([1, 2, 3]);
  expect(ro).toEqual([0, 0.5, 1]);
});
