import logProb from './logProb';

test('logProb', () => {
  const ro = logProb([[0.8]], [[0.2]]);
  expect(ro).toEqual([[-1.3321790402101223]]);
});
