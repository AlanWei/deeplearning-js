import math from '../math';

function activationBack(dA: Array<Array<number>>, cache: any,
  activation = 'relu') {
  const { linearCache, activationCache } = cache;
  switch (activation) {
    case 'sigmoid':
      const dZSigmoid = math.sigmoidBackward(dA, activationCache);
      return math.linearBackward(dZSigmoid, linearCache);
    case 'relu':
      const dZRelu = math.reluBackward(dA, activationCache);
      return math.linearBackward(dZRelu, linearCache);
    default:
      throw new Error('Unsupported activation function');
  }
}

function backPropagation(aL: Array<Array<number>>,
  Y: Array<Array<number>>, caches: any) {
  const l = caches.length;

  const grads: any = {};
  const dAL = math.logProbBackward(aL, Y);
  const { dAPrev, dW, db } = activationBack(
    dAL, caches[l-1], 'sigmoid',
  );
  grads[`dA${l}`] = dAPrev;
  grads[`dW${l}`] = dW;
  grads[`db${l}`] = db;

  for (let i = l - 1; i > 0; i--) {
    const { dAPrev, dW, db } = activationBack(
      grads[`dA${i+1}`], caches[i-1], 'relu',
    );
    grads[`dA${i}`] = dAPrev;
    grads[`dW${i}`] = dW;
    grads[`db${i}`] = db;
  }

  return grads;
}

export default backPropagation;
