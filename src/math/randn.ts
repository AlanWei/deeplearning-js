const gaussian = require('gaussian');
import { Array2D } from '../data/';

function randn(
  shape: [number, number],
  mean: number = 0,
  variance: number = 1,
  scale: number = 1,
): Array2D {
  const row: number = shape[0];
  const col: number = shape[1];
  const values: Array<number> = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const distribution = gaussian(mean, variance);
      const sample: number = distribution.pdf(Math.random()) * scale;
      values.push(sample);
    }
  }

  return new Array2D(shape, values);
}

export default randn;
