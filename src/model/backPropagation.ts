import { map } from 'lodash';
import math from '../math';

function linearBack(dZ: Array<Array<number>>, cache: any) {
  const { A, W, b } = cache;
  const m = A[0].length;
  const dW = (math.dot(A, dZ));
  let sum = 0;
  map(dZ, (subArr) => {
    map(subArr, (num) => {
      sum += num;
    });
  });
  const db = 1 / m * sum;
  const dAPrev = (math.dot(dZ, W));

  return {
    dAPrev,
    dW,
    db,
  };
}

function activationBack(dA: Array<Array<number>>, cache: any,
  activation = 'relu') {
  const { linearCache, activationCache } = cache;
  switch (activation) {
    case 'sigmoid':
      const dZSigmoid = math.sigmoidBackward(dA, activationCache);
      return linearBack(dZSigmoid, linearCache);
    case 'relu':
      // const dZRelu = math.reluBackward(dA, activationCache);
      // return linearBack(dZRelu, linearCache);
    default:
      return;
  }
}

function backPropagation(aL: Array<Array<Array<number>>>,
  Y: Array<Array<Array<number>>>, caches: any) {
  const l = caches[0].length;
  const m = aL.length;

  map(aL, (output, idx) => {
    const grads: any = {};
    const y = Y[idx];
    // const dAL = -((y / output) - (1 - y) / (1 - output));
    // const currentCache = caches[idx][l - 1];
    // if(idx === 0) {
    //   const { dAPrev, dW, db } = activationBack(
    //     [[dAL]], currentCache, 'sigmoid',
    //   );
    //   grads[`dA${l}`] = dAPrev;
    //   grads[`dW${l}`] = dW;
    //   grads[`db${l}`] = db;
    //   console.log(grads);
    // }
  });
}

export default backPropagation;
