import quadraticCost from './quadraticCost';

test('valid quadraticCost', () => {
  const ro = quadraticCost(
    [1, 2, 3],
    [2, 3, 2],
  );
  expect(ro).toEqual(1);
});

test('invalid quadraticCost', () => {
  expect(() => quadraticCost([1, 2], [1, 2, 3]))
  .toThrowError('[quadratic] array size should be the same');
});
