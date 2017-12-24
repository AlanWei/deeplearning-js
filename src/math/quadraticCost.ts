import { map } from 'lodash';

function quadraticCost(
  yHat: Array<number>,
  y: Array<number>,
): number {
  const yHatSize = yHat.length;
  const ySize = y.length;

  if (yHatSize !== ySize) {
    throw new Error('[quadratic] array size should be the same');
  }

  let cost = 0;
  map(yHat, (num, idx) => {
    cost += Math.pow(num - y[idx], 2);
  });

  return (cost / yHatSize);
}

export default quadraticCost;
