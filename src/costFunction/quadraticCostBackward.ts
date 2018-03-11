import { subtract } from '../math';

function quadraticCostBackward(
  yHat: number[][],
  y: number[][],
): number[][] {
  return subtract(yHat, y);
}

export default quadraticCostBackward;