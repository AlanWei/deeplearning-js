import log from './log';

test('log on array', () => {
  const ro = log([1, Math.exp(1), Math.pow(Math.exp(1), 2), 0]);
  expect(ro).toEqual([
    0, 1, 2, -Infinity
  ]);
});
