import initializeParameters from './initializeParameters';

test('2 layers neural network', () => {
  const ro = initializeParameters([{
    size: 2,
    activationFunc: '',
  }, {
    size: 1,
    activationFunc: '',
  }]);
  expect(ro['W1'].length).toEqual(1);
  expect(ro['W1'][0].length).toEqual(2);
  expect(ro['b1']).toEqual([[0]]);
});

test('3 layers neural network', () => {
  const ro = initializeParameters([{
    size: 3,
    activationFunc: '',
  }, {
    size: 2,
    activationFunc: '',
  }, {
    size: 1,
    activationFunc: '',
  }]);
  expect(ro['W1'].length).toEqual(2);
  expect(ro['W1'][0].length).toEqual(3);
  expect(ro['b1']).toEqual([
    [0],
    [0]
  ]);
});

test('5 layers neural network', () => {
  const ro = initializeParameters([{
    size: 5,
    activationFunc: '',
  }, {
    size: 4,
    activationFunc: '',
  }, {
    size: 3,
    activationFunc: '',
  }, {
    size: 2,
    activationFunc: '',
  }, {
    size: 1,
    activationFunc: '',
  }]);
  expect(ro['W1'].length).toEqual(4);
  expect(ro['W1'][0].length).toEqual(5);
  expect(ro['b1']).toEqual([
    [0],
    [0],
    [0],
    [0]
  ]);
});
