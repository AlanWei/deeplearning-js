const GPU = require('gpu.js');
const gpu = new GPU();

const transpose = (
  matrix: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][]) {
    return a[this.thread.x][this.thread.y];
  }, {
    output: [matrix.length, matrix[0].length],
  })(matrix)
);

export default transpose;