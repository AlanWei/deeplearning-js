import { map } from 'lodash';
import { Array2D } from '../data/';

function relu(
  z: Array2D,
) {
  const shape = z.shape;
  const values = map(z.values, (num) => (
    Math.max(0, num)
  ));

  return {
    A: new Array2D(shape, values),
    cache: z,
  };
}

export default relu;
