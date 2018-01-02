import Array2D from '../data/Array2D';
import dot from './dot';

function linearBackward(
  dZ: Array2D,
  cache: {
    A: Array2D,
    W: Array2D,
    b: Array2D,
  },
): {
  dAPrev: Array2D,
  dW: Array2D,
  db: Array2D,
} {
  const { A, W } = cache;
  const dW = dot(dZ, A.transpose());
  const db = dZ;
  const dAPrev = dot(W.transpose(), dZ);

  return {
    dAPrev,
    dW,
    db,
  };
}

export default linearBackward;
