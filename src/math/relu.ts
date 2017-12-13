function relu(z: number) {
  return {
    A: Math.max(0, z),
    cache: z,
  };
}

export default relu;
