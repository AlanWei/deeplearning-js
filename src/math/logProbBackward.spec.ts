import logProbBackward from './logProbBackward';

test('logProb', () => {
  const ro = logProbBackward([[0.2]], [[0.8]]);
  expect(ro).toEqual([[-3.75]]);
});
