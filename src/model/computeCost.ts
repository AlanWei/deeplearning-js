import { map } from 'lodash';

function computeCost(
  output: Array<Array<number>>,
  y: Array<Array<number>>,
  costFunction: Function
) {
  const costMatrix: Array<Array<number>> = costFunction(output, y);

  let sum = 0;
  map(costMatrix, (example) => {
    map(example, (num) => (
      sum += num
    ));
  });

  return sum;
}

export default computeCost;
