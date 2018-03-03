const GPU = require('gpu.js');
const gpu = new GPU();

const reluBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][]) {
    return Math.max(a[this.thread.y][this.thread.x], 0);
  }, {
    output: [cache[0].length, cache.length],
  })(cache)
);

export default reluBackward;
