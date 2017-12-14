import { get, keys, map } from 'lodash';
import Math from '../math';

function linearForward(a: any, w: any, b: any) {
  const cache = {
    A: a,
    W: w,
    b,
  };

  const z = Math.add(Math.dot(w, a), b);

  return {
    Z: z,
    cache,
  };
}

function activationForward(aPrev: any, w: any, b: any, activation = 'relu') {
  let z, linearCache, a, activationCache;
  switch (activation) {
    case 'sigmoid':
      const linearSigmoid = linearForward(aPrev, w, b);
      z = get(linearSigmoid, 'Z');
      linearCache = get(linearSigmoid, 'cache');
      const activationSigmoid = Math.sigmoid(z);
      a = get(activationSigmoid, 'A');
      activationCache = get(activationSigmoid, 'cache');
      break;
    case 'relu':
      const linearRelu = linearForward(aPrev, w, b);
      z = get(linearRelu, 'Z');
      linearCache = get(linearRelu, 'cache');
      const activationRelu = Math.relu(z);
      a = get(activationRelu, 'A');
      activationCache = get(activationRelu, 'cache');
      break;
    default:
      break;
  }

  return {
    A: a,
    cache: {
      linearCache,
      activationCache,
    }
  };
}

function forward(x: any, parameters: any) {
  const l = keys(parameters).length / 2;
  const allaL: any = [];
  const allCaches: any = [];

  map(x, (example) => {
    const caches = [];
    for (let i = 1; i < l; i++) {
      const aPrev = example;
      const w = parameters[`W${i}`];
      const b = parameters[`b${i}`];
      const ro = activationForward(aPrev, w, b, 'relu');
      example = get(ro, 'A');
      const cache = get(ro, 'cache');
      caches.push(cache);
    }
  
    const w = parameters[`W${l}`];
    const b = parameters[`b${l}`];
  
    const ro = activationForward(example, w, b, 'sigmoid');
    const aL = get(ro, 'A');
    const cache = get(ro, 'cache');
    caches.push(cache);
    allaL.push(aL);
    allCaches.push(caches);
  });

  return {
    AL: allaL,
    caches: allCaches,
  };
}

export default forward;
