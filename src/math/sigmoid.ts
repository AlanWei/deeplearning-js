function sigmoid(z: number) {
  const a = 1 / (1 + Math.exp(-z));

  return {
    A: a,
    cache: z,
  };
}

export default sigmoid;
