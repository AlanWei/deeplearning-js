import zeros from './zeros';

test('1 test case with 1 parameter', () => {
  expect(zeros()).toEqual([[0]]);
});

test('1 test case with multiple parameters', () => {
  expect(zeros(3)).toEqual([[0, 0, 0]]);
});

test('multiple test cases with 1 parameter', () => {
  expect(zeros(1, 3)).toEqual([
    [0],
    [0],
    [0],
  ]);
});

test('multiple test cases with multiple parameters', () => {
  expect(zeros(3, 3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});
