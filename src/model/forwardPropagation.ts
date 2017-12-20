import { keys } from 'lodash';
import math from '../math';

function forwardPropagation(
  x: Array<Array<number>>,
  parameters: any
) {
  const l = keys(parameters).length / 3;
  let a = x;

  const caches = [];
  const activationFuncs = [];
  for (let i = 1; i <= l; i++) {
    const cache: any = {};
    const w = parameters[`W${i}`];
    const b = parameters[`b${i}`];
    const linear = math.linear(a, w, b);
    cache.linearCache = linear.cache;
    const activationFunc = parameters[`activation${i}`];
    activationFuncs.push(activationFunc);
    let z;
    switch(activationFunc) {
      case 'relu':
        z = math.relu(linear.Z);
        break;
      case 'sigmoid':
        z = math.sigmoid(linear.Z);
        break;
      case 'linear':
        z = {
          A: linear.Z,
          cache: linear.Z,
        };
        break;
      default:
        throw new Error('Unsupported activation function');
    }
    cache.activationCache = z.cache;
    caches.push(cache);
    a = z.A;
  }

  return {
    AL: a,
    caches,
    activationFuncs,
  };
}

export default forwardPropagation;
