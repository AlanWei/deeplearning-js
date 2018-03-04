export default class Cache {
  linearCache: {
    A: number[][],
    W: number[][],
    b: number[][],
  };
  activationCache: number[][];
  constructor(
    linearCache: {
      A: number[][],
      W: number[][],
      b: number[][],
    },
    activationCache: number[][],
  ) {
    this.linearCache = linearCache;
    this.activationCache = activationCache;
  }
}