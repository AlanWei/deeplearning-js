import { dot, add } from '../math';

function linearForward(
  a: number[][],
  w: number[][],
  b: number[][],
): {
  Z: number[][],
  cache: {
    A: number[][],
    W: number[][],
    b: number[][],
  }
} {
  const z = add(dot(w, a), b);

  return {
    Z: z,
    cache: {
      A: a,
      W: w,
      b,
    }
  };
}

export default linearForward;