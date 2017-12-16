import { map } from 'lodash';

function transpose(matrix: Array<Array<number>>) {
  return map(matrix[0], (col, i) => (
    map(matrix, (row) => (
      row[i]
    ))
  ));
}

export default transpose;
