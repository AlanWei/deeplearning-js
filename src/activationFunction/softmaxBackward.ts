import softmax from './softmax';
const GPU = require('gpu.js');
const gpu = new GPU();

const softmaxBackward = (
  dA: number[][],
  cache: number[][],
): number[][] => (
  gpu.createKernel(function(this: any, a: number[][], b: number[][]) {
    const currentA = a[this.thread.y][this.thread.x];
    const currentB = b[this.thread.y][this.thread.x];
    return currentB * currentA * (1 - currentA);
  }, {
    output: [dA[0].length, dA.length],
  })(softmax(cache).A, dA)
);

export default softmaxBackward;
