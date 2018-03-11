const gaussian = require('gaussian');

const randn = (
  shape: [number, number],
  mean: number = 0,
  variance: number = 1,
  scale: number = 1,
): number[][] => {
  const row: number = shape[0];
  const col: number = shape[1];
  const ro: number[][] = [];
  for (let i = 0; i < row; i++) {
    const values = [];
    for (let j = 0; j < col; j++) {
      const distribution = gaussian(mean, variance);
      const sample: number = distribution.pdf(Math.random()) * scale;
      values.push(sample);
    }
    ro.push(values);
  }

  return ro;
};

export default randn;