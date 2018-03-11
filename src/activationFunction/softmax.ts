import { map, sum } from 'lodash';
import { transpose } from '../math';
import loopMatrix from '../util/loopMatrix';

const expZ = (z: number[][]) => (
  loopMatrix(z, (num: number) => (
    Math.exp(num)
  ))
);

const calculateA = (z: number[][]) => {
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