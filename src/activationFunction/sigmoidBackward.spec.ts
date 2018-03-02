import { Array2D } from '../data/';
import sigmoidBackward from './sigmoidBackward';

test('valid sigmoidBackward', () => {
  const dA = [[1, 2, -1]];
  const cache = [[1, 1, 1]];
  const ro = sigmoidBackward(dA, cache);
  expect(ro).toEqual(
    [[0.19661193324148185, 0.39322386648296370, -0.19661193324148185]],
  );
});
