import crossEntropyCost from './crossEntropyCost';

test('cross-entropy cost', () => {
  const ro = crossEntropyCost(
    [[0.3, 0.4, 0.9, 0.1]],
    [[0, 0, 1, 0]],
  );
  expect(ro).toEqual(0.26955539975509396);
});