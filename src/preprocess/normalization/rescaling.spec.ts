import rescaling from './rescaling';

test('rescaling', () => {
  const ro = rescaling([1, 2, 3]);
  expect(ro).toEqual([0, 0.5, 1]);
});
