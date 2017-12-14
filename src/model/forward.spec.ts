import forward from './forward';
import initializeParameters from './initializeParameters';

test('2 layers neural network', () => {
  const x = [[2], [4]];
  const parameters = initializeParameters([x.length, 2, 1]);
  const ro = forward(x, parameters);
});
