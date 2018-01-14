import Array2D from '../data/Array2D';
import {
  quadraticCost,
  crossEntropyCost,
} from '../math';
import forwardPropagation from './forwardPropagation';
import backPropagation from './backPropagation';
import updateParameters from './updateParameters';

function learningRateDecay(
  learningRate: number,
  decayRate: number,
  iteration: number,
) {
  return (1 / (1 + decayRate * iteration)) * learningRate;
}

function train(
  input: Array2D,
  output: Array2D,
  initialParameters: any,
  costFunc: 'quadratic' | 'cross-entropy',
  learningRate: number,
  numOfIterations: number,
  baseIterationToComputeCost: number,
  learningRateDecayRate?: number,
  showLog?: boolean,
): {
  parameters: any,
  costs: Array<{
    epoch: number,
    cost: number,
  }>,
} {
  let parameters = initialParameters;
  const costs: Array<{
    epoch: number,
    cost: number,
  }> = [];

  for (let i: number = 1; i <= numOfIterations; i++) {
    const forward = forwardPropagation(input, parameters);
    const grads = backPropagation(
      costFunc,
      forward,
      output,
    );
    if (learningRateDecayRate) {
      learningRate = learningRateDecay(
        learningRate,
        learningRateDecayRate,
        i,
      );
    }
    parameters = updateParameters(parameters, grads, learningRate);

    if (i % baseIterationToComputeCost === 0 || i === 1) {
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
      costs.push({
        epoch: i,
        cost,
      });
      if (showLog) {
        console.log(`${i} iteration: Cost is ${cost}`); 
      }
    }
  }

  return {
    parameters,
    costs,
  };
}

export default train;
