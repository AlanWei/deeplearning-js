import broadcasting from './broadcasting';
import Array2D from '../data/Array2D';

test('col broadcasting', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 1], [1]);
  const ro = broadcasting(left, right).right;
  expect(ro).toEqual(new Array2D([1, 3], [1, 1, 1]));
});

test('row broadcasting', () => {
  const left = new Array2D([3, 1], [1, 2, 3]);
  const right = new Array2D([1, 1], [1]);
  const ro = broadcasting(left, right).right;
  expect(ro).toEqual(new Array2D([3, 1], [1, 1, 1]));
});
