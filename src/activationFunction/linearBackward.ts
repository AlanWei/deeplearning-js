import { dot, transpose } from '../math';

function linearBackward(
  dZ: number[][],
  cache: {
    A: number[][],
    W: number[][],
    b: number[][],
  },
): {
  dAPrev: number[][],
  dW: number[][],
  db: number[][],
} {
  const { A, W } = cache;
  const dW = dot(dZ, transpose(A));
  const db = dZ;
  const dAPrev = dot(transpose(W), dZ);

  return {
    dAPrev,
    dW,
    db,
  };
}

export default linearBackward;