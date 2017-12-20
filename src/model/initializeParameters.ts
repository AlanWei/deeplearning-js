import math from '../math';

function initializeParameters(
  layers: Array<{
    size: number,
    activationFunc: string,
  }>,
  scale: number = 0.01,
) {
  const parameters: any = {};
  const l = layers.length;
  
  for (let i = 1; i < l; i++) {
    const currentLayerSize: number = layers[i].size;
    const prevLayerSize: number = layers[i-1].size;
    parameters[`W${i}`] = math.randn(
      currentLayerSize, prevLayerSize, 0, 1, scale,
    );
    parameters[`b${i}`] = math.zeros(currentLayerSize, 1);
    parameters[`activation${i}`] = layers[i].activationFunc;
  }

  return parameters;
}

export default initializeParameters;
