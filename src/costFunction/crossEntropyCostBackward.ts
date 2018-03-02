const GPU = require('gpu.js');
const gpu = new GPU();

const crossEntropyCostBackward = (
  yHat: number[][],
  y: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    const yHat = a[this.thread.y][this.thread.x];
    const y = b[this.thread.y][this.thread.x];
    return -((y / yHat) - ((1 - y) / (1 - yHat)));
  }, {
    output: [yHat[0].length, yHat.length],
  })(yHat, y)
);

export default crossEntropyCostBackward;
