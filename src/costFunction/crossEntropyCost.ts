import { map, mean } from 'lodash';
import { transpose } from '../math';
const GPU = require('gpu.js');
const gpu = new GPU();

const crossEntropyCost = (
  yHat: number[][],
  y: number[][],
): number => (
  -mean(gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    const currentA = a[this.thread.y][this.thread.x];
    const currentB = b[this.thread.y][this.thread.x];
    return Math.log(currentA) * currentB +
    (1 - currentB) * Math.log(1 - currentA);
  }, {
    output: [y[0].length],
  })(yHat, y))
);

export default crossEntropyCost;
