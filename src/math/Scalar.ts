import Array2D from "./Array2D";

export default class Scalar {
  shape: [number, number];
  value: number;
  array2D: Array2D;
  constructor(
    shape: [number, number] = [0, 0],
    value: number = 0,
  ) {
    this.shape = shape;
    this.value = value;
    this.array2D = this.formatMatrix();
  }
  formatMatrix() {
    const row: number = this.shape[0];
    const col: number = this.shape[1];
    const values: Array<number> = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        values.push(this.value);
      }
    }

    return new Array2D(this.shape, values);
  }
}
