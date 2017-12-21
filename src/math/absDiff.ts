import substract from './subtract';
import sum from './sum';
import vectorize from './vectorize';

function absDiff(x: Array<Array<number>>, y: Array<Array<number>>) {
  const diff = substract(x, y);
  const sumValue = sum(diff, true);
  return vectorize(sumValue, x.length, x[0].length);
}

export default absDiff;
