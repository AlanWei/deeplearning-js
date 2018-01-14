import { Array2D } from '../data/';
import subtract from './subtract';

test('valid matrix subtract', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = subtract(left, right);
  expect(ro).toEqual(new Array2D([1, 3], [0, 0, 0]));
});

test('broadcasting matrix subtract', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 1], [1]);
  expect(subtract(left, right)).toEqual(new Array2D([1, 3], [0, 1, 2]));
});
