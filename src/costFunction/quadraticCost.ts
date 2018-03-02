import { map, mean } from 'lodash';
import { transpose } from '../math';
const GPU = require('gpu.js');
const gpu = new GPU();

const quadraticCost = (
  yHat: number[][],
  y: number[][],
): number => (
  mean(gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    const currentA = a[this.thread.y][this.thread.x];
    const currentB = b[this.thread.y][this.thread.x];
    return Math.pow(currentA - currentB, 2);
  }, {
    output: [y[0].length],
  })(yHat, y))
);

export default quadraticCost;
