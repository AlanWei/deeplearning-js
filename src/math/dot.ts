function dot(left: Array<Array<number>>, right: Array<Array<number>>) {
  const leftNumRows = left.length;
  const leftNumCols = left[0].length;
  const rightNumRows = right.length;
  const rightNumCols = right[0].length;

  const ro: any = [];
  if (leftNumCols === rightNumRows) {
    for (let i = 0; i < leftNumRows; i++) {
      ro[i] = [];
      for (let j = 0; j < rightNumCols; j++) {
        ro[i][j] = 0;
        for (let k = 0; k < leftNumCols; k++) {
          ro[i][j] += left[i][k] * right[k][j];
        }
      }
    }

    return ro;
  } else {
    throw new Error('[dot] left matrix column count ' +
    'should be the same as right matrix row count');
  }
}

export default dot;
