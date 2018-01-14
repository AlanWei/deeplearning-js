import { map, mean } from 'lodash';
import { Array2D } from '../data/';

function quadraticCostArray1D(
  yHat: Array2D,
  y: Array2D,
): number {
  const costs = map(yHat.values, (num, idx) => (
    Math.pow(num - y.values[idx], 2)
  ));

  return mean(costs);
}

function quadraticCost(
  yHat: Array2D,
  y: Array2D,
): number {
  const dims = y.shape[0];
  if (dims === 1) {
    return quadraticCostArray1D(yHat, y);
  }

  const yHatT = yHat.transpose();
  const yT = y.transpose();
  const costs = map(yHatT.matrix, (subArray, idx) => {
    const left = new Array2D([1, subArray.length], subArray);
    const right = new Array2D([1, subArray.length], yT.matrix[idx]);
    return quadraticCostArray1D(left, right);
  });

  return mean(costs);
}

export default quadraticCost;
