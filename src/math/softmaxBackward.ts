import { map } from 'lodash';
import Array2D from './Array2D';

function softmaxBackward(
  dA: Array2D,
  cache: Array2D,
) {
  const dAValues = dA.values;
  const cacheValues = cache.values;
  const zValues = map(cacheValues, (num, idx) => (
    dAValues[idx] * num * (1 - num)
  ));

  return new Array2D(cache.shape, zValues);
}

export default softmaxBackward;
