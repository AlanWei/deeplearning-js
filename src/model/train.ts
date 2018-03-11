import {
  quadraticCost,
  crossEntropyCost,
} from '../costFunction';
import forwardPropagation from './forwardPropagation';
import backPropagation from './backPropagation';
import updateParameters from './updateParameters';

const train = (
  input: number[][],
  output: number[][],
  parameters: any,
  costFunc: 'quadratic' | 'cross-entropy',
  learningRate: number,
) => {
  const forward = forwardPropagation(input, parameters);
  const grads = backPropagation(
    costFunc,
    forward,
    output,
  );

  let cost: number = 0;
  switch(costFunc) {
    case 'quadratic':
      cost = quadraticCost(forward.yHat, output);
      break;
    case 'cross-entropy':
      cost = crossEntropyCost(forward.yHat, output);
      break;
    default:
      throw new Error('Unsupported cost function');
  }

  return {
    parameters: updateParameters(parameters, grads, learningRate),
    cost,
  };
};

export default train;