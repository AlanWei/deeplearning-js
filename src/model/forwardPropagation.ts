import { keys } from 'lodash';
import Cache from './Cache';
import Array2D from '../math/Array2D';
import linear from '../math/linear';
import relu from '../math/relu';
import sigmoid from '../math/sigmoid';
import softmax from '../math/softmax';

function forwardPropagation(
  x: Array2D,
  parameters: any
): {
  yHat: Array2D,
  caches: Array<Cache>,
  activationFuncs: Array<string>,
} {
  const l: number = keys(parameters).length / 3;

  let yHat = x;
  const caches: Array<Cache> = [];
  const activationFuncs = [];

  for (let i = 1; i <= l; i++) {
    const w: Array2D = parameters[`W${i}`];
    const b: Array2D = parameters[`b${i}`];
    const a = linear(yHat, w, b);
    const activationFunc = parameters[`activation${i}`];
    activationFuncs.push(activationFunc);
    let z: {
      A: Array2D,
      cache: Array2D,
    };
    switch(activationFunc) {
      case 'linear':
      z = {
        A: a.Z,
        cache: a.Z,
      };
      break;
      case 'relu':
        z = relu(a.Z);
        break;
      case 'sigmoid':
        z = sigmoid(a.Z);
        break;
      case 'softmax':
        z = softmax(a.Z);
        break;
      default:
        throw new Error('Unsupported activation function');
    }
    caches.push(new Cache(a.cache, z.cache));
    yHat = z.A;
  }

  return {
    yHat,
    caches,
    activationFuncs,
  };
}

export default forwardPropagation;
