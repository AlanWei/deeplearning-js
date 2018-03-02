import { keys } from 'lodash';
import Cache from './Cache';
import { Array2D } from '../data/';
import {
  linear,
  relu,
  sigmoid,
  softmax,
} from '../activationFunction';

const PARAMS_PER_LAYER = 3;

const forwardPropagation = (
  x: number[][],
  parameters: any
): {
  yHat: number[][],
  caches: Cache[],
  activationFuncs: string[],
} => {
  const l: number = keys(parameters).length / PARAMS_PER_LAYER;

  let yHat = x;
  const caches: Cache[] = [];
  const activationFuncs = [];

  for (let i = 1; i <= l; i++) {
    const w: number[][] = parameters[`W${i}`];
    const b: number[][] = parameters[`b${i}`];
    const a = linear(yHat, w, b);
    const activationFunc = parameters[`activation${i}`];
    activationFuncs.push(activationFunc);
    let z: {
      A: number[][],
      cache: number[][],
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
};

export default forwardPropagation;
