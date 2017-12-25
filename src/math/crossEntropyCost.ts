import { map } from 'lodash';

function crossEntropyCost(
  yHat: Array<number>,
  y: Array<number>,
): number {
  const yHatSize = yHat.length;
  const ySize = y.length;

  if (yHatSize !== ySize) {
    throw new Error('[cross-entropy] array size should be the same');
  }

  let cost = 0;
  map(yHat, (num, idx) => {
    cost += (Math.log(num) * y[idx]) + ((1 - y[idx]) *  Math.log(1 - num));
  });

  return (-cost / yHatSize);
}

export default crossEntropyCost;
