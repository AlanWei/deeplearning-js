import math from '../math';

function initializeParameters(layerDims: Array<number>, scale: number = 0.01) {
  const parameters: any = {};
  const l = layerDims.length;
  
  for (let i = 1; i < l; i++) {
    parameters[`W${i}`] = math.randn(layerDims[i], layerDims[i-1], 0, 1, scale);
    parameters[`b${i}`] = math.zeros(layerDims[i], 1);
  }

  return parameters;
}

export default initializeParameters;
