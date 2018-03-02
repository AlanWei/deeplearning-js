import zeros from './zeros';

test('1*3 matrix', () => {
  const ro = zeros([1, 3]);
  expect(ro).toEqual([
    [0, 0, 0],
  ]);
});

test('3*3 matrix', () => {
  const ro = zeros([3, 3]);
  expect(ro).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});
