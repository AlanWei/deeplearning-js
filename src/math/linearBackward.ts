import math from '../math';

function linearBackward(dZ: Array<Array<number>>, cache: any) {
  const { A, W, b } = cache;
  const m = A[0].length;
  const dZADot = math.dot(dZ, math.transpose(A));
  const dW = math.divide(
    dZADot,
    math.vectorize(m, dZADot.length, dZADot[0].length),
  );
  const db = math.vectorize(
    math.sum(dZ) / m,
    b.length,
    b[0].length,
  );
  const dAPrev = math.dot(math.transpose(W), dZ);

  return {
    dAPrev,
    dW,
    db,
  };
}

export default linearBackward;
