import Array2D from './Array2D';
import randn from './randn';
import zeros from './zeros';
import dot from './dot';
import add from './add';
import subtract from './subtract';
import multiply from './multiply';
import divide from './divide';
import transpose from './transpose';
import sum from './sum';
import absDiff from './absDiff';
import vectorize from './vectorize';
import logProb from './logProb';
import logProbBackward from './logProbBackward';
import linear from './linear';
import linearBackward from './linearBackward';
import relu from './relu';
import reluBackward from './reluBackward';
import sigmoid from './sigmoid';
import sigmoidBackward from './sigmoidBackward';

export default {
  // data structure
  Array2D,
  // initialize
  randn,
  zeros,
  // operation
  dot,
  add,
  subtract,
  multiply,
  divide,
  transpose,
  sum,
  // util
  vectorize,
  // algorithm
  absDiff,
  logProb,
  logProbBackward,
  linear,
  linearBackward,
  relu,
  reluBackward,
  sigmoid,
  sigmoidBackward,
};
