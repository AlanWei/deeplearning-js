import { map } from 'lodash';
import { Array2D } from '../data/';

function reluBackward(
  dA: Array2D,
  cache: Array2D,
): Array2D {
  const dAValues = dA.values;
  const cacheValues = cache.values;

  const dZValues = map(dAValues, (num, idx) => (
    cacheValues[idx] < 0 ? 0 : num
  ));

  return new Array2D(cache.shape, dZValues);
}

export default reluBackward;
