import { map } from 'lodash';

const transpose = (
  matrix: number[][],
): number[][] => (
  map(matrix[0], (col, i) => (
    map(matrix, (row) => (
      row[i]
    ))
  ))
);

export default transpose;