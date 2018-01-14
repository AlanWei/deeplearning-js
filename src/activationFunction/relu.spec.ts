import { Array2D } from '../data/';
import relu from './relu';

test('relu input < 0', () => {
  const test = new Array2D([1, 1], [-1]);
  const ro = relu(test);
  expect(ro.A).toEqual(
    new Array2D([1, 1], [0]),
  );
});

test('relu input > 0', () => {
  const test = new Array2D([1, 1], [1]);
  const ro = relu(test);
  expect(ro.A).toEqual(
    new Array2D([1, 1], [1]),
  );
});
