const GPU = require('gpu.js');
const gpu = new GPU();

const sigmoidBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    const cache = 1 / (1 + Math.exp(-a[this.thread.y][this.thread.x]));
    return b[this.thread.y][this.thread.x] * cache * (1 - cache);
  }, {
    output: [dA[0].length, dA.length],
  })(cache, dA)
);

export default sigmoidBackward;