import { Array2D } from '../data/';
import { broadcasting, convertArray2DToArray1D } from '../utils';

const GPU = require('gpu.js');
const gpu = new GPU();

const gpuDivide = (a: Array2D, b: Array2D) => {
  const divide = gpu.createKernel(function(this: any, a: any, b: any) {
    return a[this.thread.y][this.thread.x] / b[this.thread.y][this.thread.x];
  }).setOutput([a.shape[1], a.shape[0]]);

  return divide(a.matrix, b.matrix);
};

const divide = (
  left: Array2D,
  right: Array2D,
): Array2D => {
  const afterBroadcasting = broadcasting(left, right);
  const broadcastedLeft = afterBroadcasting.left;
  const broadcastedRight = afterBroadcasting.right;

  const matrix = gpuDivide(broadcastedLeft, broadcastedRight);
  const values = convertArray2DToArray1D(broadcastedLeft.shape, matrix);

  return new Array2D(broadcastedLeft.shape, values);
};

export default divide;