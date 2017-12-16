import math from '../math';

function linearBack(dZ: Array<Array<number>>, cache: any) {
  const { A, W } = cache;
  const dW = math.dot(A, dZ);
  const db = dZ;
  const dAPrev = math.dot(dZ, W);

  return {
    dAPrev,
    dW,
    db,
  };
}

export default linearBack;
