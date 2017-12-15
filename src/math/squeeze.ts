import { map } from 'lodash';

function squeeze(matrix: Array<Array<Array<number>>>) {
  const ro: Array<number> = [];
  map(matrix, (first) => {
    map(first, (second) => {
      map(second, (third) => {
        ro.push(third);
      });
    });
  });

  return ro;
}

export default squeeze;
