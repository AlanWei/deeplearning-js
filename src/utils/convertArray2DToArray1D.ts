function convertArray2DToArray1D(
  shape: [number, number],
  matrix: Array<Array<number>>
): Array<number> {
  const row: number = shape[0];
  const col: number = shape[1];
  const array1D: Array<number> = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      array1D.push(matrix[i][j]);
    }
  }

  return array1D;
}

export default convertArray2DToArray1D;
