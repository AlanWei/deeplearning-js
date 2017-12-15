import computeCost from './computeCost';
import math from '../math';

test('output and y array size not match', () => {
  expect(() => computeCost([1, 2], [2, 3, 4], () => {}))
  .toThrowError('[computeCost] Output array size ' +
  'should be the same as Y array size');
});

test('compute cost with abs difference', () => {
  const cost = computeCost([1, 2], [2, 3], (x, y) => {
    return Math.abs(x - y);
  });
  expect(cost).toEqual(-1);
});

test('compute cost with log probability', () => {
  const output = [0.4, 0.2, 0.9, 0.1];
  const Y = [0, 0, 1, 0];
  const cost = computeCost(output, Y, (x, y) => (
    math.logProb(x, y)
  ));
  expect(cost).toEqual(0.23617255159896328);
});
