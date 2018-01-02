import Array2D from '../data/Array2D';
import dot from './dot';

function linearForward(
  a: Array2D,
  w: Array2D,
  b: Array2D,
): {
  Z: Array2D,
  cache: {
    A: Array2D,
    W: Array2D,
    b: Array2D,
  }
} {
  const z = dot(w, a).add(b);

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
