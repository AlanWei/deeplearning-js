import { map, mean } from 'lodash';
import { Array2D } from '../data/';
import { dot } from '../math';

function crossEntropyCostArray1D(
  yHat: Array2D,
  y: Array2D,
): number {
  const m = y.shape[1];
  const logYHatValues = map(yHat.values, (num) => (
    Math.log(num)
  ));
  const oneMinusLogYHatValues = map(yHat.values, (num) => (
    Math.log(1 - num)
  ));
  const oneMinusYValues = map(y.values, (num) => (
    1 - num
  ));
  const logYHat = new Array2D(yHat.shape, logYHatValues);
  const oneMinusLogYHat = new Array2D(yHat.shape, oneMinusLogYHatValues);
  const oneMinusLogY = new Array2D(y.shape, oneMinusYValues);
  const firstHalf = -(dot(y, logYHat.transpose()).squeeze());
  const secondHalf = dot(
    oneMinusLogY,
    oneMinusLogYHat.transpose(),
  ).squeeze();
  const cost = (1 / m) * (firstHalf - secondHalf);

  return cost;
}

function crossEntropyCost(
  yHat: Array2D,
  y: Array2D,
): number {
  const dims = y.shape[0];
  if (dims === 1) {
    return crossEntropyCostArray1D(yHat, y);
  }
  const yHatT = yHat.transpose();
  const yT = y.transpose();
  const costs = map(yHatT.matrix, (subArray, idx) => {
    const left = new Array2D([1, subArray.length], subArray);
    const right = new Array2D([1, subArray.length], yT.matrix[idx]);
    return crossEntropyCostArray1D(left, right);
  });

  return mean(costs);
}

export default crossEntropyCost;
