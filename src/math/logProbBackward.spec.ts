import logProbBackward from './logProbBackward';

test('logProb', () => {
  const ro = logProbBackward([[0.2]], [[1]]);
  expect(ro).toEqual([[-5]]);
});
