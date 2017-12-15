import { map } from 'lodash';

function computeCost(output: Array<number>, y: Array<number>,
  costFunction: Function) {
  if (output.length !== y.length) {
    throw new Error('[computeCost] Output array size ' +
    'should be the same as Y array size');
  }

  let sum = 0;
  map(output, (x, idx) => {
    sum += costFunction(x, y[idx]);
  });

  const m = output.length;
  const cost = -1 / m * sum;

  return cost;
}

export default computeCost;
