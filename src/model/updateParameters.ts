import { keys } from 'lodash';
import math from '../math';

function updateParameters(
  parameters: any,
  grads: any,
  learningRate: number
) {
  const l = keys(parameters).length / 3;

  for (let i = 0; i < l; i++) {
    parameters[`W${i+1}`] = math.subtract(
      parameters[`W${i+1}`],
      math.multiply(
        grads[`dW${i+1}`],
        math.vectorize(
          learningRate, grads[`dW${i+1}`].length, grads[`dW${i+1}`][0].length,
        ),
      ),
    );
    parameters[`b${i+1}`] = math.subtract(
      parameters[`b${i+1}`],
      math.multiply(
        grads[`db${i+1}`],
        math.vectorize(
          learningRate, grads[`db${i+1}`].length, grads[`db${i+1}`][0].length,
        ),
      )
    );
  }

  return parameters;
}

export default updateParameters;
