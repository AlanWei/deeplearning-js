import subtract from './subtract';
import Array2D from './Array2D';

test('valid matrix subtract', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = subtract(left, right);
  expect(ro).toEqual(new Array2D([1, 3], [0, 0, 0]));
});

test('invalid matrix subtract', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 4], [1, 2, 3, 4]);
  expect(() => subtract(left, right))
  .toThrowError('[subtract] left matrix shape ' +
  'should be the same as right matrix shape');
});
