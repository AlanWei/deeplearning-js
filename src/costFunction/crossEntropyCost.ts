const GPU = require('gpu.js');
const gpu = new GPU();

const crossEntropyCost = (
  yHat: number[][],
  y: number[][],
): number => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    let sum = 0;
    for (let i = 0; i < this.constants.cols; i++) {
      const currentA = a[this.thread.x][i];
      const currentB = b[this.thread.x][i];
      sum += currentB * Math.log(currentA) +
      (1 - currentB) * Math.log(1 - currentA);
    }
    return -(sum / this.constants.cols);
  }, {
    constants: {
      cols: yHat[0].length,
    },
    output: [1],
  })(yHat, y)[0]
);

export default crossEntropyCost;