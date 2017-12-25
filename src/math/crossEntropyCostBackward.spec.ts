import crossEntropyCostBackward from './crossEntropyCostBackward';
import Array2D from './Array2D';

test('logProb', () => {
  const left = new Array2D([1, 1], [0.2]);
  const right = new Array2D([1, 1], [0.8]);
  const ro = crossEntropyCostBackward(left, right);
  expect(ro.matrix).toEqual([
    [-3.75]
  ]);
});
