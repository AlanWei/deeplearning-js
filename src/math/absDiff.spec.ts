import absDiff from './absDiff';
import Array2D from './Array2D';

test('valid matrix absDiff', () => {
  const left = new Array2D([1, 3], [2, 2, 2]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro: number = absDiff(left, right);
  expect(ro).toEqual(2);
});
