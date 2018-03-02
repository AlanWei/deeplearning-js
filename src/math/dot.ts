const GPU = require('gpu.js');
const gpu = new GPU();

const dot = (
  left: number[][],
  right: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    let sum = 0;
    for (let i = 0; i < this.constants.size; i++) {
      sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
  }, {
    constants: { size: left[0].length },
    output: [right[0].length, left.length],
  })(left, right)
);

export default dot;