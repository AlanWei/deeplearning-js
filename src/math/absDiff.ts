import substract from './subtract';
import sum from './sum';
import Array2D from './Array2D';

function absDiff(
  x: Array2D,
  y: Array2D,
): number {
  const diff: Array2D = substract(x, y);
  const sumValue: number = sum(diff.values, true);
  return sumValue;
}

export default absDiff;
