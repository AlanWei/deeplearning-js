import math from '../math';

function linearBack(dZ: Array<Array<number>>, cache: any) {
  const { A, W } = cache;
  const dW = math.dot(dZ, math.transpose(A));
  const db = dZ;
  const dAPrev = math.dot(math.transpose(W), dZ);

  return {
    dAPrev,
    dW,
    db,
  };
}

export default linearBack;
