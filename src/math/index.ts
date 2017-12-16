import randn from './randn';
import zeros from './zeros';
import dot from './dot';
import add from './add';
import subtract from './subtract';
import multiply from './multiply';
import transpose from './transpose';
import squeeze from './squeeze';
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
  // initialize
  randn,
  zeros,
  // operation
  dot,
  add,
  subtract,
  multiply,
  transpose,
  // util
  squeeze,
  vectorize,
  // algorithm
  logProb,
  logProbBackward,
  linear,
  linearBackward,
  relu,
  reluBackward,
  sigmoid,
  sigmoidBackward,
};
