import initializeParameters from './initializeParameters';

test('invalid 1 layer neural network', () => {
  expect(() => initializeParameters([{
    size: 1,
    activationFunc: 'linear',
  }])).toThrowError('[initializeParameters] needs at least 2 layers');
});

test('2 layers neural network', () => {
  const ro = initializeParameters([{
    size: 2,
    activationFunc: 'linear',
  }, {
    size: 1,
    activationFunc: 'linear',
  }]);
  expect(ro['W1'].shape[0]).toEqual(1);
  expect(ro['W1'].shape[1]).toEqual(2);
  expect(ro['b1'].matrix).toEqual([[0]]);
});

test('3 layers neural network', () => {
  const ro = initializeParameters([{
    size: 3,
    activationFunc: 'linear',
  }, {
    size: 2,
    activationFunc: 'linear',
  }, {
    size: 1,
    activationFunc: 'linear',
  }]);
  expect(ro['W1'].shape[0]).toEqual(2);
  expect(ro['W1'].shape[1]).toEqual(3);
  expect(ro['b1'].matrix).toEqual([
    [0],
    [0]
  ]);
});

test('5 layers neural network', () => {
  const ro = initializeParameters([{
    size: 5,
    activationFunc: 'linear',
  }, {
    size: 4,
    activationFunc: 'linear',
  }, {
    size: 3,
    activationFunc: 'linear',
  }, {
    size: 2,
    activationFunc: 'linear',
  }, {
    size: 1,
    activationFunc: 'linear',
  }]);
  expect(ro['W1'].shape[0]).toEqual(4);
  expect(ro['W1'].shape[1]).toEqual(5);
  expect(ro['b1'].matrix).toEqual([
    [0],
    [0],
    [0],
    [0]
  ]);
});
