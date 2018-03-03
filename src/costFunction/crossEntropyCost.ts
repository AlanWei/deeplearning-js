import { mean } from 'lodash';
const GPU = require('gpu.js');
const gpu = new GPU();

const crossEntropyCost = (
  yHat: number[][],
  y: number[][],
): number => (
  -mean(gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    let sum = 0;
    for (let i = 0; i < this.constants.cols; i++) {
      const currentA = a[this.thread.x][i];
      const currentB = b[this.thread.x][i];
      sum += (Math.log(currentA) * currentB) +
      (Math.log(1 - currentA) * (1 - currentB));
    }
    return sum / this.constants.cols;
  }, {
    constants: {
      cols: yHat[0].length,
    },
    output: [yHat.length],
  })(yHat, y))
);

export default crossEntropyCost;