const GPU = require('gpu.js');
const gpu = new GPU();

const relu = (
  z: number[][],
): {
  A: number[][],
  cache: number[][],
} => ({
  A: gpu.createKernel(function(this: any, a: number[][]) {
    return Math.max(a[this.thread.y][this.thread.x], 0);
  }, {
    output: [z[0].length, z.length],
  })(z),
  cache: z,
});

export default relu;
