import add from './add';
import Array2D from './Array2D';

test('valid matrix add', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = add(left, right);
  expect(ro).toEqual(new Array2D([1, 3], [2, 4, 6]));
});

test('invalid matrix add', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 4], [1, 2, 3, 4]);
  expect(() => add(left, right))
  .toThrowError('[add] left matrix shape ' +
  'should be the same as right matrix shape');
});
