function add(left: Array<Array<number>>, right: Array<Array<number>>) {
  const leftNumRows = left.length;
  const leftNumCols = left[0].length;
  const rightNumRows = right.length;
  const rightNumCols = right[0].length;

  const ro: any = [];
  if (leftNumRows === rightNumRows && leftNumCols === rightNumCols) {
    for (let i = 0; i < leftNumRows; i++) {
      ro[i] = [];
      for (let j = 0; j < leftNumCols; j++) {
        ro[i][j] = left[i][j] + right[i][j];
      }
    }

    return ro;
  } else {
    throw new Error('[add] left matrix shape ' +
    'should be the same as right matrix shape');
  }
}

export default add;
