import zeroMeanNormalization from './zeroMeanNormalization';

test('rescaling', () => {
  const ro = zeroMeanNormalization([1, 2, 3]);
  expect(ro).toEqual([-1.224744871391589, 0, 1.224744871391589]);
});
