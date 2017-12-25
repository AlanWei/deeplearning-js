import { map } from 'lodash';
import Array2D from './Array2D';

function crossEntropyCostBackward(
  yHat: Array2D,
  y: Array2D,
): Array2D {
  const yHatValues = yHat.values;
  const yValues = y.values;

  const values = map(yHatValues, (num, idx) => {
    const yIdx = yValues[idx];
    return -((yIdx / num) - ((1 - yIdx) / (1 - num)));
  });

  return new Array2D(yHat.shape, values);
}

export default crossEntropyCostBackward;
