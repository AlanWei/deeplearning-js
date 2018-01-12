import Scalar from './Scalar';
import Array2D from './Array2D';

test('Scalar', () => {
  const scalar = new Scalar([3, 3], 1);
  expect(scalar.shape === [3, 3]);
  expect(scalar.value === 1);
  expect(scalar.array2D === new Array2D(
    [3, 3],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ));
});
