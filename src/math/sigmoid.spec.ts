import sigmoid from './sigmoid';
import Array2D from '../data/Array2D';

test('sigmoid', () => {
  const test = new Array2D([1, 1], [5]);
  const ro = sigmoid(test);
  expect(ro.A).toEqual(
    new Array2D([1, 1], [0.9933071490757153]),
  );
});
