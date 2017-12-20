import computeCost from './computeCost';
import math from '../math';

test('compute cost with log probability', () => {
  const output = [[0.001, 0.001, 0.999, 0.001]];
  const Y = [[0, 0, 1, 0]];
  const cost = computeCost(output, Y, math.logProb);
  expect(cost).toEqual(-0.0040020013343341375);
});
