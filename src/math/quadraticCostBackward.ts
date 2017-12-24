import Array2D from './Array2D';
import subtract from './subtract';

function quadraticCostBackward(
  yHat: Array2D,
  y: Array2D,
): Array2D {
  return subtract(yHat, y);
}

export default quadraticCostBackward;
