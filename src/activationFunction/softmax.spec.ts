import { Array2D } from '../data/';
import softmax from './softmax';

test('softmax', () => {
  const test = new Array2D(
    [2, 2],
    [1, 1, 1, 1],
  );
  const ro = softmax(test);
  expect(ro.A).toEqual(
    new Array2D([2, 2], [0.5, 0.5, 0.5, 0.5]),
  );
});
