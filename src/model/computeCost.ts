import { map } from 'lodash';

function computeCost(output: Array<Array<Array<number>>>,
  y: Array<Array<Array<number>>>,
  costFunction: Function) {
  const costMatrix: Array<Array<Array<number>>> = costFunction(output, y);

  let sum = 0;
  map(costMatrix, (example) => {
    map(example, (subArr) => (
      map(subArr, (num) => {
        sum += num;
      })
    ));
  });

  const m = costMatrix.length;
  const cost = -1 / m * sum;

  return cost;
}

export default computeCost;
