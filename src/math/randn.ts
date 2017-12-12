const gaussian = require('gaussian');

function randn(dim1: number = 1, dim2: number = 1) {
  const ro = [];
  for (let i = 0; i < dim2; i++) {
    const row = [];
    for (let j = 0; j < dim1; j++) {
      const distribution = gaussian(0, 1);
      const sample = distribution.ppf(Math.random());
      row.push(sample);
    }
    ro.push(row);
  }

  return ro;
}

export default randn;
