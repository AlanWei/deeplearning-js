import sigmoid from './sigmoid';

test('sigmoid', () => {
  const ro = sigmoid(
    [[5]]
  );
  expect(ro.A).toEqual([[0.9933071490757153]]);
});
