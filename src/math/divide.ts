import { Array2D } from '../data/';
import { broadcasting } from '../utils';

const GPU = require('gpu.js');
const gpu = new GPU();

const gpuDivide = (a: any, b: any) => {
  const add = gpu.createKernel(function(this: any, a: any, b: any) {
    return a[this.thread.x] / b[this.thread.x];
  }).setOutput([a.length]);

  return add(a, b);
};

const add =(
  left: Array2D,
  right: Array2D,
): Array2D => {
  const afterBroadcasting = broadcasting(left, right);
  const broadcastedLeft = afterBroadcasting.left;
  const broadcastedRight = afterBroadcasting.right;

  const values = gpuDivide(broadcastedLeft.values, broadcastedRight.values);

  return new Array2D(left.shape, values);
};

export default add;