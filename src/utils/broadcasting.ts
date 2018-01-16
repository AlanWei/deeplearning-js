import { Array2D } from '../data/';

function broadcasting(
  left: Array2D,
  right: Array2D,
): {
  left: Array2D,
  right: Array2D,
} {
  const leftRow = left.shape[0];
  const leftCol = left.shape[1];  
  const rightRow = right.shape[0];
  const rightCol = right.shape[1];

  let rightValues: Array<number> = [];
  let rightShape = right.shape;
  if (rightRow === 1 && leftCol === rightCol) {
    rightShape = left.shape;
    for (let i = 0; i < leftRow; i++) {
      rightValues = rightValues.concat(right.values);
    }
  } else if (rightCol === 1 && leftRow === rightRow) {
    rightShape = left.shape;
    for (let i = 0; i < leftRow; i++) {
      for (let j = 0; j < leftCol; j++) {
        rightValues = rightValues.concat(right.values[i]);
      }
    }
  } else {
    rightValues = right.values;
  }

  return {
    left,
    right: new Array2D(rightShape, rightValues),
  };
}

export default broadcasting;
