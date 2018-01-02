import convertArray1DToArray2D from '../utils/convertArray1DToArray2D';
import {
  add,
  subtract,
  divide,
  multiply,
  dot,
  transpose,
} from '../math';

export default class Array2D {
  shape: [number, number];
  values: Array<number>;
  matrix: Array<Array<number>>;
  constructor(
    shape: [number, number] = [0, 0],
    values: Array<number> = []
  ) {
    this.shape = shape;
    this.values = values;
    this.matrix = convertArray1DToArray2D(shape, values);
  }
  add(matrix: Array2D): Array2D {
    return add(this, matrix);
  }
  subtract(matrix: Array2D): Array2D {
    return subtract(this, matrix);
  }
  multiply(matrix: Array2D): Array2D {
    return multiply(this, matrix);
  }
  divide(matrix: Array2D): Array2D {
    return divide(this, matrix);
  }
  dot(matrix: Array2D): Array2D {
    return dot(this, matrix);
  }
  transpose() {
    return transpose(this);
  }
  as1D(): Array<number> {
    return this.values;
  }
  squeeze(): number {
    const row = this.shape[0];
    const col = this.shape[1];
    if (row === 1 && col === 1) {
      return this.values[0];
    }
    throw new Error('[Array2D] can not be squeezed');
  }
}
