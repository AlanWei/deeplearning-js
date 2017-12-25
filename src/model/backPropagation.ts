import Cache from './Cache';
import Array2D from '../math/Array2D';
import quadraticCostBackward from '../math/quadraticCostBackward';
import crossEntropyCostBackward from '../math/crossEntropyCostBackward';
import linearBackward from '../math/linearBackward';
import reluBackward from '../math/reluBackward';
import sigmoidBackward from '../math/sigmoidBackward';

function backPropagation(
  costFunc: 'quadratic' | 'cross-entropy',
  forwardResults: {
    yHat: Array2D,
    caches: Array<Cache>,
    activationFuncs: Array<'linear' | 'relu' | 'sigmoid'>,
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
    const activationFunc: 'linear' | 'relu' | 'sigmoid' = activationFuncs[i-1];
    const cache: Cache = caches[i-1];
    const dA = i === l ? dy : grads[`dA${i+1}`];
    let dZ = dA;
    switch(activationFunc) {
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
      case 'linear':
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
