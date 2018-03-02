const gaussian = require('gaussian');
const GPU = require('gpu.js');
const gpu = new GPU();

const randn = (
  shape: [number, number],
  mean: number = 0,
  variance: number = 1,
  scale: number = 1,
): number[][] => {
  const distribution = gaussian(mean, variance);
  return gpu.createKernel(function(this: any) {
    return this.constants.distribution.pdf(Math.random())* this.constants.scale;
  }, {
    constants: { distribution, scale },
    output: [shape[1], shape[0]],
  })();
};

export default randn;