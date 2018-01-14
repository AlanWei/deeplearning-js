import { Array2D } from '../data/';
import add from './add';

test('valid matrix add', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = add(left, right);
  expect(ro).toEqual(new Array2D([1, 3], [2, 4, 6]));
});
