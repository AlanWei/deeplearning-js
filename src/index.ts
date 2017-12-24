import {
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
} from './model';
import Array2D from './math/Array2D';
import quadraticCost from './math/quadraticCost';

export {
  // data structure
  Array2D,
  // model training
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  // cost function
  quadraticCost,
};
