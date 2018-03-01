import { Array2D } from '../data/';
import { convertArray2DToArray1D } from '../utils';

const GPU = require('gpu.js');
const gpu = new GPU();

const gpuTranspose = (a: Array2D) => {
  const transpose = gpu.createKernel(function(this: any, a: any) {
    return a[this.thread.x][this.thread.y];
  }).setOutput([a.shape[0], a.shape[1]]);

  return transpose(a.matrix);
};

function transpose(
  matrix: Array2D,
) {
  const newMatrix = gpuTranspose(matrix);

  const values = convertArray2DToArray1D(
    [matrix.shape[1], matrix.shape[0]],
    newMatrix,
  );

  return new Array2D([matrix.shape[1], matrix.shape[0]], values);
}

export default transpose;