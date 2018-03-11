import loopMatrix from '../util/loopMatrix';

const relu = (
  z: number[][],
): {
  A: number[][],
  cache: number[][],
} => ({
  A: loopMatrix(z, (num: number) => (
    Math.max(num, 0)
  )),
  cache: z,
});

export default relu;