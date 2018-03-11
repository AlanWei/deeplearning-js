import {
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  train,
  batchTrain,
} from './model';
import {
  quadraticCost,
  crossEntropyCost,
} from './costFunction';
import { transpose } from './math';
import { Normalization } from './preprocess';

export {
  // preprocess
  Normalization,
  // matrix manipulation
  transpose,
  // model training
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  train,
  batchTrain,
  // cost function
  quadraticCost,
  crossEntropyCost,
};