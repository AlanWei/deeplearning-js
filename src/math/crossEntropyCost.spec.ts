import crossEntropyCost from './crossEntropyCost';

test('cross-entropy cost', () => {
  const ro = crossEntropyCost([0.8], [0.2]);
  expect(ro).toEqual(1.3321790402101226);
});

test('invalid cross-entropy cost', () => {
  expect(() => (crossEntropyCost([0.8], [0.2, 1]))).toThrowError(
    '[cross-entropy] array size should be the same'
  );
});
