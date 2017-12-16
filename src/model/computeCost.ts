import { map } from 'lodash';

function computeCost(output: Array<Array<number>>, y: Array<Array<number>>,
  costFunction: Function) {
  const costMatrix: Array<Array<number>> = costFunction(output, y);

  let sum = 0;
  map(costMatrix, (subArr) => {
    map(subArr, (num) => {
      sum += num;
    });
  });

  const m = output[0].length;
  const cost = -1 / m * sum;

  return cost;
}

export default computeCost;
