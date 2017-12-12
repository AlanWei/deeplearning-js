import math from '../math';

function initializeParameters(layerDims: Array<number>) {
  const parameters: any = {};
  const l = layerDims.length;
  
  for (let i = 1; i <= l; i++) {
    parameters[`W${i}`] = math.randn(i, i+1);
    parameters[`b${i}`] = math.zeros(i, 1);
  }

  return parameters;
}

export default initializeParameters;
