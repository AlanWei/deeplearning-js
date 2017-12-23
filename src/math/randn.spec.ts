import randn from './randn';

test('1*3 matrix', () => {
  const ro = randn([1, 3]).matrix;
  expect(ro.length).toEqual(1);
  expect(ro[0].length).toEqual(3);
});

test('3*3 matrix', () => {
  const ro = randn([3, 3]).matrix;
  expect(ro.length).toEqual(3);
  expect(ro[0].length).toEqual(3);
});
