import { map, sum } from 'lodash';
import { Array2D } from '../data/';
import { convertArray2DToArray1D } from '../utils';

function softmax(
  z: Array2D,
) {
  const values = map(z.values, (num) => (Math.exp(num)));
  const zT = new Array2D(z.shape, values).transpose();
  const matrix = map(zT.matrix, (subArray) => (
    map(subArray, (num) => num / sum(subArray)
  )));

  return {
    A: new Array2D(
      zT.shape,
      convertArray2DToArray1D(zT.shape, matrix)
    ).transpose(),
    cache: z,
  };
}

export default softmax;
