import { map, sum } from 'lodash';
import { transpose } from '../math';
const GPU = require('gpu.js');
const gpu = new GPU();

const expZ = (z) => (
  gpu.createKernel(function(this: any, a: number[][]) {
    return Math.exp(a[this.thread.y][this.thread.x]);
  }, {
    output: [z[0].length, z.length],
  })(z)
);

const calculateA = (z) => {
  const zT = transpose(z);
  const expZT = expZ(zT);
  const matrix = map(expZT, (subArray: number[]) => (
    map(subArray, (num) => num / sum(subArray)
  )));

  return transpose(matrix);
};

const softmax = (
  z: number[][],
): {
  A: number[][],
  cache: number[][],
} => ({
  A: calculateA(z),
  cache: z,
});

export default softmax;
