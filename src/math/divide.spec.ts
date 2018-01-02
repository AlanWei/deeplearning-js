import divide from './divide';
import Array2D from '../data/Array2D';

test('valid matrix divide', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = divide(left, right);
  expect(ro.matrix).toEqual([
    [1, 1, 1]
  ]);
});
