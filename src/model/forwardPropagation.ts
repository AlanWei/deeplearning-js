import { keys } from 'lodash';
import Array2D from '../math/Array2D';
import linear from '../math/linear';
import relu from '../math/relu';
import sigmoid from '../math/sigmoid';

function forwardPropagation(
  x: Array2D,
  parameters: any
) {
  const l: number = keys(parameters).length / 3;
  let input = x;

  const caches = [];
  const activationFuncs = [];
  for (let i = 1; i <= l; i++) {
    const cache: any = {};
    const w = parameters[`W${i}`];
    const b = parameters[`b${i}`];
    const a = linear(input, w, b);
    cache.linearCache = a.cache;
    const activationFunc = parameters[`activation${i}`];
    activationFuncs.push(activationFunc);
    let z;
    switch(activationFunc) {
      case 'relu':
        z = relu(linear.Z);
        break;
      case 'sigmoid':
        z = sigmoid(linear.Z);
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
