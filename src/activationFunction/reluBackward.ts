const GPU = require('gpu.js');
const gpu = new GPU();

const reluBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    if (b[this.thread.y][this.thread.x] < 0) {
      return 0;
    } else {
      return a[this.thread.y][this.thread.x];
    }
  }, {
    output: [dA[0].length, dA.length],
  })(dA, cache)
);

export default reluBackward;