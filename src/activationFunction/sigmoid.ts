const GPU = require('gpu.js');
const gpu = new GPU();

const sigmoid = (
  z: number[][],
): {
  A: number[][],
  cache: number[][],
} => ({
  A: gpu.createKernel(function(this: any, a: number[][]) {
    return 1 / (1 + Math.exp(-a[this.thread.y][this.thread.x]));
  }, {
    output: [z[0].length, z.length],
  })(z),
  cache: z,
});

export default sigmoid;