import Cache from './Cache';
import Array2D from '../data/Array2D';
import {
  quadraticCostBackward,
  crossEntropyCostBackward,
  linearBackward,
  reluBackward,
  sigmoidBackward,
  softmaxBackward,
} from '../math';

function backPropagation(
  costFunc: 'quadratic' | 'cross-entropy',
  forwardResults: {
    yHat: Array2D,
    caches: Array<Cache>,
    activationFuncs: Array<string>,
  },
  y: Array2D,
) {
  const { yHat, caches, activationFuncs } = forwardResults;
  const l: number = caches.length;

  const grads: any = {};
  let dy: Array2D = new Array2D();

  switch(costFunc) {
    case 'quadratic':
      dy = quadraticCostBackward(yHat, y);
      break;
    case 'cross-entropy':
      dy = crossEntropyCostBackward(yHat, y);
      break;
    default:
      throw new Error('Unsupported cost function');
  }

  for (let i = l; i > 0; i--) {
    const activationFunc = activationFuncs[i-1];
    const cache: Cache = caches[i-1];
    const dA = i === l ? dy : grads[`dA${i+1}`];
    let dZ = dA;
    switch(activationFunc) {
      case 'linear':
      break;
      case 'relu':
        dZ = reluBackward(
          dA, cache.activationCache,
        );
        break;
      case 'sigmoid':
        dZ = sigmoidBackward(
          dA, cache.activationCache,
        );
        break;
      case 'softmax':
        dZ = softmaxBackward(
          dA, cache.activationCache,
        );
        break;
      default:
        throw new Error('Unsupported activation function');
    }
    const { dAPrev, dW, db } = linearBackward(
      dZ, cache.linearCache,
    );
    grads[`dA${i}`] = dAPrev;
    grads[`dW${i}`] = dW;
    grads[`db${i}`] = db;
  }

  return grads;
}

export default backPropagation;
