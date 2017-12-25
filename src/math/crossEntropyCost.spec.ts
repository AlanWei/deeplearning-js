import crossEntropyCost from './crossEntropyCost';

test('cross-entropy cost', () => {
  const ro = crossEntropyCost([0.8], [0.2]);
  expect(ro).toEqual(1.3321790402101226);
});
