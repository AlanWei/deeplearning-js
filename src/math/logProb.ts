function logProb(x: number, y: number) {
  if (x === 0 || x === 1) {
    throw new Error('[logProb] x is not a valid input');
  }

  return y * Math.log(x) + (1 - y) * Math.log(1 - x);
}

export default logProb;
