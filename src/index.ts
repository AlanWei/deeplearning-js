import {
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  train,
} from './model';
import {
  quadraticCost,
  crossEntropyCost,
} from './costFunction';
import { Normalization } from './preprocess';

export {
  // preprocess
  Normalization,
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
