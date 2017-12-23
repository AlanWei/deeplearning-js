import Array2D from './Array2D';
import convertArray2DToArray1D from '../utils/convertArray2DToArray1D';

function dot(
  left: Array2D,
  right: Array2D,
) {
  const leftNumRows = left.shape[0];
  const leftNumCols = left.shape[1];
  const rightNumRows = right.shape[0];
  const rightNumCols = right.shape[1];
  if (leftNumCols !== rightNumRows) {
    throw new Error('[dot] left matrix columns ' +
    'should be the same as right matrix rows');
  }

  const matrix: Array<Array<number>> = [];
  const leftMatrix = left.matrix;
  const rightMatrix = right.matrix;
  for (let i = 0; i < leftNumRows; i++) {
    matrix[i] = [];
    for (let j = 0; j < rightNumCols; j++) {
      matrix[i][j] = 0;
      for (let k = 0; k < leftNumCols; k++) {
        matrix[i][j] += leftMatrix[i][k] * rightMatrix[k][j];
      }
    }
  }

  const shape: [number, number] = [leftNumRows, rightNumCols];
  const values = convertArray2DToArray1D(shape, matrix);

  return new Array2D(shape, values);
}

export default dot;
