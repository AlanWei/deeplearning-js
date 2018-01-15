export interface Array2DValidator {
  shape: [number, number];
  values: Array<number>;
  matrix: Array<Array<number>>;
  add(matrix: Array2DValidator): Array2DValidator;
  subtract(matrix: Array2DValidator): Array2DValidator;
  multiply(matrix: Array2DValidator): Array2DValidator;
  divide(matrix: Array2DValidator): Array2DValidator;
  dot(matrix: Array2DValidator): Array2DValidator;
  transpose(): Array2DValidator;
  as1D(): Array<number>;
  squeeze(): number;
}
