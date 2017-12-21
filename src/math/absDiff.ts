import substract from './subtract';
import sum from './sum';

function absDiff(x: Array<Array<number>>, y: Array<Array<number>>) {
  const diff = substract(x, y);
  return sum(diff, true);
}

export default absDiff;
