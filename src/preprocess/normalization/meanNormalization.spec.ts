import meanNormalization from './meanNormalization';

test('rescaling', () => {
  const ro = meanNormalization([1, 2, 3]);
  expect(ro).toEqual([-0.5, 0, 0.5]);
});
