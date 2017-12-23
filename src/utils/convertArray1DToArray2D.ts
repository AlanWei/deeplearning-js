function convertArray1DToArray2D(
  shape: [number, number],
  values: Array<number>
): Array<Array<number>> {
  const row: number = shape[0];
  const col: number = shape[1];
  const array2D: Array<Array<number>> = [];
  for (let i = 0; i < row; i++) {
    array2D[i] = [];
    for (let j = 0; j < col; j++) {
      array2D[i][j] = values[i * col + j];
    }
  }

  return array2D;
}

export default convertArray1DToArray2D;
