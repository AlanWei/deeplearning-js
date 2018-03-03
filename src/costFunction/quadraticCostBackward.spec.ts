import quadraticCostBackward from './quadraticCostBackward';

test('valid quadraticCostBackward', () => {
  const yHat = [[1, 2, 3]];
  const y = [[2, 3, 2]];
  const ro = quadraticCostBackward(yHat, y);
  expect(ro).toEqual([[-1, -1, 1]]);
});