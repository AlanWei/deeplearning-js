import computeCost from './computeCost';
import math from '../math';

test('compute cost with log probability', () => {
  const output = [[0.4, 0.2, 0.9, 0.1]];
  const Y = [[0, 0, 1, 0]];
  const cost = computeCost(output, Y, math.logProb);
  expect(cost).toEqual(0.23617255159896328);
});
