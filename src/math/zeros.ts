const GPU = require('gpu.js');
const gpu = new GPU();

const zeros = (
  shape: [number, number],
): number[][] => (
  gpu.createKernel(() => 0, {
    output: [shape[1], shape[0]],
  })()
);

export default zeros;
