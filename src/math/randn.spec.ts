import randn from './randn';

test('1 test case with 1 parameter', () => {
  const ro = randn();
  expect(ro.length).toEqual(1);
  expect(ro[0].length).toEqual(1);
});

test('1 test case with multiple parameters', () => {
  const ro = randn(3);
  expect(ro.length).toEqual(1);
  expect(ro[0].length).toEqual(3);
});

test('multiple test cases with 1 parameter', () => {
  const ro = randn(1, 3);
  expect(ro.length).toEqual(3);
  expect(ro[0].length).toEqual(1);
});

test('multiple test cases with multiple parameters', () => {
  const ro = randn(3, 3);
  expect(ro.length).toEqual(3);
  expect(ro[0].length).toEqual(3);
});
