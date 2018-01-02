import { map, sum, slice } from 'lodash';
import Array2D from '../data/Array2D';

function softmax(
  z: Array2D,
) {
  const rows = z.shape[0];
  const zT = z.transpose();
  const zTValues = map(zT.values, (num) => (
    Math.exp(num)
  ));
  const sums: Array<number> = [];
  for (let i = 0; i < zTValues.length / rows; i++) {
    const exampleSum = sum(slice(zTValues, i * rows, (i + 1) * rows));
    sums.push(exampleSum);
  }
  const values = map(zTValues, (num, idx) => (
    num / sums[Math.floor(idx / rows)]
  ));

  return {
    A: new Array2D(zT.shape, values).transpose(),
    cache: z,
  };
}

export default softmax;
