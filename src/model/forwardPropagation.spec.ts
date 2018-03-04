import forwardPropagation from './forwardPropagation';

test('forwardPropagation', () => {
  const ro = forwardPropagation(
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    {
      W1: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      b1: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      activation1: 'relu',
      W2: [[1, 1, 1]],
      b2: [[0, 0, 0]],
      activation2: 'sigmoid',
    },
  );
  expect(ro.activationFuncs).toEqual(["relu", "sigmoid"]);
  expect(ro.yHat).toEqual(
    [[0.9998766054240137, 0.9998766054240137, 0.9998766054240137]],
  );
});