import { map } from 'lodash';
import loopTwoMatrix from '../util/loopTwoMatrix';

const crossEntropyCost = (
  yHat: number[][],
  y: number[][],
): number => {
  const costs = loopTwoMatrix(yHat, y, (a: number, b: number) => (
    Math.log(a) * b + Math.log(1 - a) * (1 - b)
  ));

  let sum: number = 0;
  let count: number = 0;
  map(costs, (subArr) => (
    map(subArr, (num: number) => {
      sum += num;
      count++;
    })
  ));

  return -(sum / count);
};

export default crossEntropyCost;