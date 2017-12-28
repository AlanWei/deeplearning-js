import {
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  train,
} from './model';
import Array2D from './math/Array2D';
import Scalar from './math/Scalar';
import quadraticCost from './math/quadraticCost';
import crossEntropyCost from './math/crossEntropyCost';

export {
  // data model
  Array2D,
  Scalar,
  // model training
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  train,
  // cost function
  quadraticCost,
  crossEntropyCost,
};
