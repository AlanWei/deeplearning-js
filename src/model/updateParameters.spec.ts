import updateParameters from './updateParameters';

test('updateParameters', () => {
  const ro = updateParameters({
    W1: [[1, 1], [1, 1]],
    b1: [[1, 1], [1, 1]],
    activation1: 'relu',
  }, {
    dW1: [[1, 1], [1, 1]],
    db1: [[1, 1], [1, 1]],
  },
  0.5);
  expect(ro).toEqual({
    W1: [[0.5, 0.5], [0.5, 0.5]],
    b1: [[0.5, 0.5], [0.5, 0.5]],
    activation1: 'relu',
  });
});