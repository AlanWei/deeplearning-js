import { map } from 'lodash';
import Array2D from '../data/Array2D';

function crossEntropyCostBackward(
  yHat: Array2D,
  y: Array2D,
): Array2D {
  const yHatValues = yHat.values;
  const yValues = y.values;

  const values = map(yHatValues, (num, idx) => {
    if (num === 0 || num === 1) {
      throw new Error('[Cross-entropy cost backward] exceeds threshold');
    }
    const yIdx = yValues[idx];
    return -((yIdx / num) - ((1 - yIdx) / (1 - num)));
  });

  return new Array2D(yHat.shape, values);
}

export default crossEntropyCostBackward;
