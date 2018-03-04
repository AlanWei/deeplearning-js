import forwardPropagation from './forwardPropagation';
import { Array2D } from '../data';

test('forwardPropagation', () => {
  const ro = forwardPropagation(
    new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1]),
    {
      W1: new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1]),
      b1: new Array2D([3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0]),
      activation1: 'relu',
      W2: new Array2D([1, 3], [1, 1, 1]),
      b2: new Array2D([1, 3], [0, 0, 0]),
      activation2: 'sigmoid',
    },
  );
  expect(ro.activationFuncs).toEqual(["relu", "sigmoid"]);
  expect(ro.yHat.matrix).toEqual(
    [[0.9998766054240137, 0.9998766054240137, 0.9998766054240137]],
  );
});