import { map } from 'lodash';
import Array2D from './Array2D';

function sigmoidBackward(
  dA: Array2D,
  cache: Array2D,
) {
  const dAValues = dA.values;
  const cacheValues = cache.values;
  const zValues = map(cacheValues, (num, idx) => {
    const s = 1 / (1 + Math.exp(-num));
    return dAValues[idx] * s * (1 - s);
  });

  return new Array2D(cache.shape, zValues);
}

export default sigmoidBackward;
