import { map, isEqual } from 'lodash';
import Array2D from './Array2D';

function add(
  left: Array2D,
  right: Array2D
): Array2D {
  if (!isEqual(left.shape, right.shape)) {
    throw new Error('[add] left matrix shape ' +
    'should be the same as right matrix shape');
  }

  const leftValues: Array<number> = left.values;
  const rightValues: Array<number> = right.values;
  const values = map(leftValues, (num: number, idx) => (
    num + rightValues[idx]
  ));

  return new Array2D(left.shape, values);
}

export default add;
