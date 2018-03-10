import loopMatrix from '../util/loopMatrix';

const sigmoid = (
  z: number[][],
): {
  A: number[][],
  cache: number[][],
} => ({
  A: loopMatrix(z, (num: number) => (
    1 / (1 + Math.exp(-num))
  )),
  cache: z,
});

export default sigmoid;