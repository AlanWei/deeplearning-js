import { Array2D } from '../data/';
import dot from './dot';

test('valid matrix dot', () => {
  const left = [[1], [2], [3]];
  const right = [[1, 2, 3]];
  const ro = dot(left, right);
  expect(ro).toEqual(
    [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
  );
});

test('matrix dot', () => {
  const left = [[1, 2, 3, 4]];
  const right = [[1], [2], [3], [4]];
  const ro = dot(left, right);
  expect(ro).toEqual(
    [[30]]
  );
});