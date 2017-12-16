import { map } from 'lodash';
import math from '../math';

function activationBack(dA: Array<Array<number>>, cache: any,
  activation = 'relu') {
  const { linearCache, activationCache } = cache;
  switch (activation) {
    case 'sigmoid':
      const dZSigmoid = math.sigmoidBackward(dA, activationCache);
      return math.linearBackward(dZSigmoid, linearCache);
    case 'relu':
      console.log(activationCache);
      const dZRelu = math.reluBackward(dA, activationCache);
      return math.linearBackward(dZRelu, linearCache);
    default:
      throw new Error('Unsupported activation function');
  }
}

function backPropagation(aL: Array<Array<Array<number>>>,
  Y: Array<Array<Array<number>>>, caches: any) {
  const l = caches[0].length;
  const gradsAll: any = [];

  map(aL, (output, idx) => {
    const grads: any = {};
    const y = Y[idx];
    const cache = caches[idx];
    const dAL = math.logProbBackward(output, y);
    const currentCache = cache[l - 1];
    const { dAPrev, dW, db } = activationBack(
      dAL, currentCache, 'sigmoid',
    );
    grads[`dA${l}`] = dAPrev;
    grads[`dW${l}`] = dW;
    grads[`db${l}`] = db;

    for (let i = l - 1; i > 0; i--) {
      const currentCache = cache[i-1];
      const { dAPrev, dW, db } = activationBack(
        grads[`dA${i+1}`], currentCache, 'relu',
      );
      grads[`dA${i}`] = dAPrev;
      grads[`dW${i}`] = dW;
      grads[`db${i}`] = db;
    }

    gradsAll.push(grads);
  });

  return gradsAll;
}

export default backPropagation;
