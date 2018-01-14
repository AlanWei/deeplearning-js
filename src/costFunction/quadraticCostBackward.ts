import { Array2D } from '../data/';
import { subtract } from '../math';

function quadraticCostBackward(
  yHat: Array2D,
  y: Array2D,
): Array2D {
  return subtract(yHat, y);
}

export default quadraticCostBackward;
