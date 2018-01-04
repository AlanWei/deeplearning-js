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
  baseIterationToShowCost: number,
  learningRateDecayRate?: number,
  onCostChange?: Function,
  showLog?: boolean,
): Promise<{
  parameters: any,
  costs: Array<{[x: number]: number}>,
}> {
  let parameters = initialParameters;
  const costs: Array<{[x: number]: number}> = [];

  return new Promise((resolve, reject) => {
    for (let i: number = 1; i <= numOfIterations; i++) {
      const forward = forwardPropagation(input, parameters);
      const grads = backPropagation(
        'cross-entropy',
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
  
      if (i % baseIterationToShowCost === 0 || i === 1) {
        let cost: number = 0;
        switch(costFunc) {
          case 'quadratic':
            cost = quadraticCost(forward.yHat.as1D(), output.as1D());
            break;
          case 'cross-entropy':
            cost = crossEntropyCost(forward.yHat.as1D(), output.as1D());
            break;
          default:
            reject('Unsupported cost function');
        }
        costs.push({
          [i]: cost,
        });
        if (onCostChange) {
          onCostChange(i, cost);
        }
        if (showLog) {
          console.log(`${i} iteration: Cost is ${cost}`); 
        }
      }
    }

    resolve({
      parameters,
      costs,
    });
  });
}

export default train;
