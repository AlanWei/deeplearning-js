import Array2D from './Array2D';

function zeros(
  shape: [number, number],
): Array2D {
  const row: number = shape[0];
  const col: number = shape[1];
  const values: Array<number> = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      values.push(0);
    }
  }

  return new Array2D(shape, values);
}

export default zeros;
