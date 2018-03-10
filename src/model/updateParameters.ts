import { keys } from 'lodash';
import { subtract, multiply } from '../math';

const formatLearningRate = (
  matrix: number[][],
  learningRate: number,
): number[][] => {
  const row: number = matrix.length;
  const col: number = matrix[0].length;
  const ro = [];
  for (let i = 0; i < row; i++) {
    const rowValues = Array(col).fill(learningRate);
    ro.push(rowValues);
  }
  return ro;
};

function updateParameters(
  parameters: any,
  grads: any,
  learningRate: number,
) {
  const l: number = keys(parameters).length / 3;

  for (let i = 0; i < l; i++) {
    const lrW = formatLearningRate(grads[`dW${i + 1}`], learningRate);
    parameters[`W${i + 1}`] = subtract(
      parameters[`W${i + 1}`],
      multiply(grads[`dW${i + 1}`], lrW)
    );
    const lrb = formatLearningRate(grads[`db${i + 1}`], learningRate);
    parameters[`b${i + 1}`] = subtract(
      parameters[`b${i + 1}`],
      multiply(grads[`db${i + 1}`], lrb)
    );
  }

  return parameters;
}

export default updateParameters;