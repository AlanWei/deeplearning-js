const gaussian = require('gaussian');

function randn(dim1: number = 1, dim2: number = 1,
  mean: number = 0, variance: number = 1) {
  const ro = [];
  for (let i = 0; i < dim1; i++) {
    const row = [];
    for (let j = 0; j < dim2; j++) {
      const distribution = gaussian(mean, variance);
      const sample = distribution.ppf(Math.random());
      row.push(sample);
    }
    ro.push(row);
  }

  return ro;
}

export default randn;
