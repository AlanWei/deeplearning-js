import { Array2D } from '../data/';
import { convertArray2DToArray1D } from '../utils';

const GPU = require('gpu.js');
const gpu = new GPU();

const gpuDot = (a: any, b: any) => {
  const dot = gpu.createKernel(function(this: any, a: any, b: any) {
    let sum = 0;
    for (let i = 0; i < this.constants.size; i++) {
      sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
  }, {
    constants: { size: a.shape[1] },
    output: [b.shape[1], a.shape[0]],
  });

  return dot(a.matrix, b.matrix);
};

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

  const matrix = gpuDot(left, right);
  const shape: [number, number] = [leftNumRows, rightNumCols];
  const values = convertArray2DToArray1D(shape, matrix);

  return new Array2D(shape, values);
}

export default dot;