import { Array2D } from '../data/';
import crossEntropyCostBackward from './crossEntropyCostBackward';

test('logProb', () => {
  const left = [[0.2]];
  const right = [[0.8]];
  const ro = crossEntropyCostBackward(left, right);
  expect(ro).toEqual([
    [-3.75]
  ]);
});