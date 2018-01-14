import { map } from 'lodash';
import { Array2D } from '../data/';

function sigmoid(
  z: Array2D,
) {
  const values = map(z.values, (num) => (
    1 / (1 + Math.exp(-num))
  ));

  return {
    A: new Array2D(z.shape, values),
    cache: z,
  };
}

export default sigmoid;
