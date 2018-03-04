import updateParameters from './updateParameters';
import { Array2D } from '../data';

test('updateParameters', () => {
  const ro = updateParameters({
    W1: new Array2D([2, 2], [1, 1, 1, 1]),
    b1: new Array2D([2, 2], [1, 1, 1, 1]),
    activation1: 'relu',
  }, {
    dW1: new Array2D([2, 2], [1, 1, 1, 1]),
    db1: new Array2D([2, 2], [1, 1, 1, 1]),
  },
  0.5);
  expect(ro).toEqual({
    W1: new Array2D([2, 2], [0.5, 0.5, 0.5, 0.5]),
    b1: new Array2D([2, 2], [0.5, 0.5, 0.5, 0.5]),
    activation1: 'relu',
  });
});
  