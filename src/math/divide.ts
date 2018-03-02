const GPU = require('gpu.js');
const gpu = new GPU();

const divide = (
  left: number[][],
  right: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    let bValue = b[this.thread.y][0];
    if (this.constants.bCols !== 1) {
      bValue = b[this.thread.y][this.thread.x];
    }
    return a[this.thread.y][this.thread.x] / bValue;
  }, {
    constants: {
      bCols: right[0].length,
    },
    output: [left[0].length, left.length],
  })(left, right)
);

export default divide;