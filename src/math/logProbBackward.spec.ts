import logProbBackward from './logProbBackward';

test('logProb', () => {
  const ro = logProbBackward([[0.46595245025069704]], [[1]]);
  expect(ro).toEqual([[-2.146141734981689]]);
});
