import { map } from 'lodash';
import sigmoid from './sigmoid';
import Array2D from '../data/Array2D';

function sigmoidBackward(
  dA: Array2D,
  cache: Array2D,
) {
  const sigmoidCache = sigmoid(cache);
  const values = map(sigmoidCache.A.values, (num, idx) => (
    dA.values[idx] * num * (1 - num)
  ));

  return new Array2D(cache.shape, values);
}

export default sigmoidBackward;
