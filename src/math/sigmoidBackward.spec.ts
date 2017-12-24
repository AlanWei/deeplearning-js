import sigmoidBackward from './sigmoidBackward';
import Array2D from './Array2D';

test('valid sigmoidBackward', () => {
  const dA = new Array2D([1, 3], [1, 2, -1]);
  const cache = new Array2D([1, 3], [1, 1, 1]);
  const ro = sigmoidBackward(dA, cache);
  expect(ro).toEqual(
    new Array2D(
      [1, 3],
      [0.19661193324148185, 0.39322386648296370, -0.19661193324148185]),
  );
});
