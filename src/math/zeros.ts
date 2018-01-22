import { Array2D } from '../data/';

function zeros(
  shape: [number, number],
): Array2D {
  const row: number = shape[0];
  const col: number = shape[1];
  let values: Array<number> = [];
  for (let i = 0; i < row; i++) {
    const rowValues = Array(col).fill(0);
    values = values.concat(rowValues);
  }

  return new Array2D(shape, values);
}

export default zeros;
