import Array2D from '../math/Array2D';
import quadraticCost from '../math/quadraticCost';
import crossEntropyCost from '../math/crossEntropyCost';
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
) {
  let parameters = initialParameters;

  for (let i = 1; i <= numOfIterations; i++) {
    const forward = forwardPropagation(input, parameters);
    const grads = backPropagation(
      'cross-entropy',
      forward,
      output,
    );
    if (learningRateDecayRate) {
      learningRate = learningRateDecay(learningRate, learningRateDecayRate, i);
    }
    parameters = updateParameters(parameters, grads, learningRate);

    if (i % baseIterationToShowCost === 0 || i === 1) {
      let cost = 0;
      switch(costFunc) {
        case 'quadratic':
          cost = quadraticCost(forward.yHat.as1D(), output.as1D());
          break;
        case 'cross-entropy':
          cost = crossEntropyCost(forward.yHat.as1D(), output.as1D());
          break;
        default:
          throw new Error('Unsupported cost function');
      }
      console.log(`${i} iteration: Cost is ${cost}`);
    }
  }

  return parameters;
}

export default train;
