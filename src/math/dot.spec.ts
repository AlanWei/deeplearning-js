import { Array2D } from '../data/';
import dot from './dot';

test('valid matrix dot', () => {
  const left = new Array2D([3, 1], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = dot(left, right);
  expect(ro).toEqual(
    new Array2D(
      [3, 3],
      [1, 2, 3, 2, 4, 6, 3, 6, 9]
    )
  );
});

test('matrix dot', () => {
  const left = new Array2D([2, 1], [1, 2]);
  const right = new Array2D([1, 4], [1, 2, 3, 4]);
  const ro = dot(left, right);
  expect(ro).toEqual(
    new Array2D(
      [2, 4],
      [1, 2, 3, 4, 2, 4, 6, 8]
    )
  );
});

test('invalid matrix dot', () => {
  const left = new Array2D([2, 1], [1, 2]);
  const right = new Array2D([2, 2], [1, 2, 3, 4]);
  expect(() => dot(left, right))
  .toThrowError('[dot] left matrix columns ' +
  'should be the same as right matrix rows');
});
