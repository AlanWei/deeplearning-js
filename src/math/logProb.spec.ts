import logProb from './logProb';

test('logProb', () => {
  const ro = logProb([[[0.49695898228806995]]], [[[1]]]);
  expect(ro).toEqual([[[-0.6992477868988515]]]);
});
