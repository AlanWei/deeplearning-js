import { Array2D } from '../data/';

export default class Cache {
  linearCache: {
    A: Array2D,
    W: Array2D,
    b: Array2D,
  };
  activationCache: Array2D;
  constructor(
    linearCache: {
      A: Array2D,
      W: Array2D,
      b: Array2D,
    },
    activationCache: Array2D,
  ) {
    this.linearCache = linearCache;
    this.activationCache = activationCache;
  }
}
