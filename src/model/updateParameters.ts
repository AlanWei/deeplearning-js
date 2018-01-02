import { keys } from 'lodash';
import Scalar from '../data/Scalar';

function updateParameters(
  parameters: any,
  grads: any,
  learningRate: number,
) {
  const l: number = keys(parameters).length / 3;

  for (let i = 0; i < l; i++) {
    parameters[`W${i+1}`] = parameters[`W${i+1}`].subtract(
      grads[`dW${i+1}`].multiply(
        new Scalar(parameters[`W${i+1}`].shape, learningRate).array2D,
      )
    );
    parameters[`b${i+1}`] = parameters[`b${i+1}`].subtract(
      grads[`db${i+1}`].multiply(
        new Scalar(parameters[`b${i+1}`].shape, learningRate).array2D,
      )
    );
  }

  return parameters;
}

export default updateParameters;
