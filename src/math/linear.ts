import math from '../math';

function linearForward(
  a: Array<Array<number>>,
  w: Array<Array<number>>,
  b: Array<Array<number>>
) {
  const cache = {
    A: a,
    W: w,
    b,
  };

  const dot = math.dot(w, a);
  const z = math.add(dot, b);

  return {
    Z: z,
    cache,
  };
}

export default linearForward;
