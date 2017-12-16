import transpose from './transpose';

test('transpose', () => {
  const ro = transpose([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  expect(ro).toEqual([
    [1, 3, 5],
    [2, 4, 6],
  ]);
});

test('transpose same dimension', () => {
  const ro = transpose([
    [1, 2],
    [3, 4],
  ]);
  expect(ro).toEqual([
    [1, 3],
    [2, 4],
  ]);
});
