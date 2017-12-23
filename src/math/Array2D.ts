import add from './add';
import convertArray1DToArray2D from '../utils/convertArray1DToArray2D';

export default class Array2D {
  shape: [number, number];
  values: Array<number>;
  matrix: Array<Array<number>>;
  constructor(shape: [number, number], values?: Array<number>) {
    this.shape = shape;
    this.values = values;
    this.matrix = convertArray1DToArray2D(shape, values);
  }
  add(matrix: Array2D) {
    return add(this, matrix);
  }
}
