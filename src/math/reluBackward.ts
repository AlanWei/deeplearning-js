function reluBackward(dA: number, cache: any) {
  if (cache < 0) {
    return 0;
  }

  return dA;
}

export default reluBackward;
