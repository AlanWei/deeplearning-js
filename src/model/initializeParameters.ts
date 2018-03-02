import {
  randn,
  zeros,
} from '../math';

function initializeParameters(
  layers: {
    size: number,
    activationFunc?: string,
  }[],
  mean: number = 0,
  variance: number = 1,
  scale: number = 1,
) {
  const parameters: any = {};
  const l: number = layers.length;

  if (l < 2) {
    throw new Error('[initializeParameters] needs at least 2 layers');
  }
  
  for (let i = 1; i < l; i++) {
    const currentLayerSize: number = layers[i].size;
    const prevLayerSize: number = layers[i - 1].size;
    parameters[`W${i}`] = randn(
      [currentLayerSize, prevLayerSize],
      mean,
      variance,
      scale,
    );
    parameters[`b${i}`] = zeros([currentLayerSize, 1]);
    parameters[`activation${i}`] = layers[i].activationFunc;
  }

  return parameters;
}

export default initializeParameters;
