import { map, sum } from 'lodash';
import Array2D from '../data/Array2D';
import convertArray2DToArray1D from '../utils/convertArray2DToArray1D';

function softmaxBackward(
  dA: Array2D,
  cache: Array2D,
) {
  const values = map(cache.values, (num) => (Math.exp(num)));
  const cacheT = new Array2D(cache.shape, values).transpose();
  const dAT = dA.transpose();
  const derivativeMatrix = map(cacheT.matrix, (subArray, i) => (
    map(subArray, (num, j) => {
      const softmaxNum = num / sum(subArray);
      return dAT.matrix[i][j] * softmaxNum * (1 - softmaxNum);
    }
  )));

  return new Array2D(
    cacheT.shape,
    convertArray2DToArray1D(cacheT.shape, derivativeMatrix),
  ).transpose();
}

export default softmaxBackward;
