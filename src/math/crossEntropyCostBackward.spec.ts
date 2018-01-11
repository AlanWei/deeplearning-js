import crossEntropyCostBackward from './crossEntropyCostBackward';
import Array2D from '../data/Array2D';

test('logProb', () => {
  const left = new Array2D([1, 1], [0.2]);
  const right = new Array2D([1, 1], [0.8]);
  const ro = crossEntropyCostBackward(left, right);
  expect(ro.matrix).toEqual([
    [-3.75]
  ]);
});

test('invalid cross-entropy cost backward', () => {
  const left = new Array2D([1, 1], [0]);
  const right = new Array2D([1, 1], [0.8]);
  expect(() => (crossEntropyCostBackward(left, right))).toThrowError(
    '[Cross-entropy cost backward] exceeds threshold'
  );
});
