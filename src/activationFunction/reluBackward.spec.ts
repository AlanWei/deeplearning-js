import reluBackward from './reluBackward';

test('valid reluBackward', () => {
  const dA = [[2, -1, 3]];
  const cache = [[1, -1, 1]];
  const ro = reluBackward(dA, cache);
  expect(ro).toEqual([[2, 0, 3]]);
});