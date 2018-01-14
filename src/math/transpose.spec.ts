import { Array2D } from '../data/';
import transpose from './transpose';

test('transpose', () => {
  const matrix = new Array2D([3, 2], [1, 2, 3, 4, 5, 6]);
  const ro = transpose(matrix);
  expect(ro.matrix).toEqual([
    [1, 3, 5],
    [2, 4, 6],
  ]);
});

test('transpose same dimension', () => {
  const matrix = new Array2D([2, 2], [1, 2, 3, 4]);
  const ro = transpose(matrix);
  expect(ro.matrix).toEqual([
    [1, 3],
    [2, 4],
  ]);
});
