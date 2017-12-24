import { keys } from 'lodash';
import Array2D from '../math/Array2D';
import linear from '../math/linear';
import relu from '../math/relu';
import sigmoid from '../math/sigmoid';
import Cache from './Cache';

function forwardPropagation(
  x: Array2D,
  parameters: any
): {
  yHat: Array2D,
  caches: Array<Cache>,
  activationFuncs: Array<'linear' | 'relu' | 'sigmoid'>,
} {
  const l: number = keys(parameters).length / 3;
  let yHat = x;

  const caches: Array<Cache> = [];
  const activationFuncs: Array<'linear' | 'relu' | 'sigmoid'> = [];
  for (let i = 1; i <= l; i++) {
    const w: Array2D = parameters[`W${i}`];
    const b: Array2D = parameters[`b${i}`];
    const a = linear(yHat, w, b);
    const activationFunc: 'linear' | 'relu' | 'sigmoid' =
      parameters[`activation${i}`];
    activationFuncs.push(activationFunc);
    let z: {
      A: Array2D,
      cache: Array2D,
    };
    switch(activationFunc) {
      case 'relu':
        z = relu(a.Z);
        break;
      case 'sigmoid':
        z = sigmoid(a.Z);
        break;
      case 'linear':
        z = {
          A: a.Z,
          cache: a.Z,
        };
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
