const dot = (
  left: number[][],
  right: number[][],
): number[][] => {
  const leftNumRows = left.length;
  const leftNumCols = left[0].length;
  const rightNumRows = right.length;
  const rightNumCols = right[0].length;
  if (leftNumCols !== rightNumRows) {
    throw new Error('[dot] left matrix columns ' +
    'should be the same as right matrix rows');
  }

  const matrix: number[][] = [];
  for (let i = 0; i < leftNumRows; i++) {
    matrix[i] = [];
    for (let j = 0; j < rightNumCols; j++) {
      matrix[i][j] = 0;
      for (let k = 0; k < leftNumCols; k++) {
        matrix[i][j] += left[i][k] * right[k][j];
      }
    }
  }

  return matrix;
};

export default dot;