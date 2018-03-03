import relu from './relu';

test('relu', () => {
  const test = [[-2], [1]];
  const ro = relu(test);
  expect(ro.A).toEqual([[0], [1]]);
});