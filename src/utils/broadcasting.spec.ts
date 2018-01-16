import { Array2D } from '../data/';
import broadcasting from './broadcasting';

test('col broadcasting', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 1], [1]);
  const ro = broadcasting(left, right).right;
  expect(ro).toEqual(new Array2D([1, 3], [1, 1, 1]));
});

test('col broadcasting multiple rows', () => {
  const left = new Array2D([2, 3], [1, 2, 3, 4, 5, 6]);
  const right = new Array2D([2, 1], [1, 2]);
  const ro = broadcasting(left, right).right;
  expect(ro).toEqual(new Array2D([2, 3], [1, 1, 1, 2, 2, 2]));
});

test('row broadcasting', () => {
  const left = new Array2D([3, 1], [1, 2, 3]);
  const right = new Array2D([1, 1], [1]);
  const ro = broadcasting(left, right).right;
  expect(ro).toEqual(new Array2D([3, 1], [1, 1, 1]));
});
