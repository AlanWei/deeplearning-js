import { Array2D } from '../data/';
import transpose from './transpose';

test('transpose', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const ro = transpose(matrix);
  expect(ro).toEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});