import sigmoid from './sigmoid';

test('sigmoid', () => {
  const test = [[5]];
  const ro = sigmoid(test);
  expect(ro.A).toEqual([[0.9933071490757153]]);
});