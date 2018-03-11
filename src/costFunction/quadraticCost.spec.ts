import quadraticCost from './quadraticCost';

test('quadraticCost', () => {
  const ro = quadraticCost(
    [[0.3, 0.4, 0.9, 0.1]],
    [[0, 0, 1, 0]],
  );
  expect(ro).toEqual(0.0675);
});

test('quadraticCost', () => {
  const ro = quadraticCost(
    [[0.3, 0.4, 0.9, 0.1], [0.7, 0.6, 0.1, 0.9]],
    [[0, 0, 1, 0], [1, 1, 0, 1]],
  );
  expect(ro).toEqual(0.0675);
});