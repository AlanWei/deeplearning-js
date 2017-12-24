import sum from './sum';

test('valid matrix sum', () => {
  const ro = sum([1, 2, 3]);
  expect(ro).toEqual(6);
});
