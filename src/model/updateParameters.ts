import { map, keys } from 'lodash';
import math from '../math';

function updateParameters(parameters: any, grads: any,
  learningRate: number) {
  const l = keys(parameters).length / 2;

  map(grads, (grad: any) => {
    for (let i = 0; i < l; i++) {
      parameters[`W${i+1}`] = math.subtract(parameters[`W${i+1}`],
        math.multiply(
          grad[`dW${i+1}`],
          math.vectorize(
            learningRate, grad[`dW${i+1}`].length, grad[`dW${i+1}`][0].length,
          ),
        ),
      );
      parameters[`b${i+1}`] = math.subtract(parameters[`b${i+1}`],
        math.multiply(
          grad[`db${i+1}`],
          math.vectorize(
            learningRate, grad[`db${i+1}`].length, grad[`db${i+1}`][0].length,
          ),
        )
      );
    }
  });

  return parameters;
}

export default updateParameters;
