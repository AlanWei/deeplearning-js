# deeplearning-js
[![npm v](https://img.shields.io/npm/v/deeplearning-js.svg)](https://www.npmjs.com/package/deeplearning-js)
[![npm dm](https://img.shields.io/npm/dm/deeplearning-js.svg)](https://www.npmjs.com/package/deeplearning-js)
[![CircleCI](https://circleci.com/gh/AlanWei/deeplearning-js.svg?style=shield)](https://circleci.com/gh/AlanWei/deeplearning-js)
<a id="intention"></a>
## Intention
**deeplearning-js** is an open source JavaScript library for deep learning. **deeplearning-js** provides all JavaScript developers a new way to play around with deep learning models without learning unfamiliar Python, statistics or calculus knowledge.

<a id="gettingstarted"></a>
## Getting started
~~~~bash
npm install deeplearning-js
~~~~

~~~~bash
yarn add deeplearning-js
~~~~

<a id="api"></a>
## API
<a id="normalization"></a>
### Normalization
Normalize 1D Array data set.

Support normalization method:

* minmax: (num - min) / (max - min)
* zscore: (num - mean) / std

#### Usage
~~~~typescript
import { Normalization } from 'deeplearning-js';

expect(Normalization.zscore([1, 2, 3])).toEqual([-1.224744871391589, 0, 1.224744871391589]);
expect(Normalization.minmax([1, 2, 3])).toEqual([0, 0.5, 1]);
~~~~

<a id="initializeparameters"></a>
### initializeParameters
Return initial parameters according to model structure.

Support activation functions:

* linear
* relu
* sigmoid
* softmax

#### Usage
~~~~typescript
const initialParameters = initializeParameters(
  [{
    size: trainingSet.input.shape[0],  // input layer nerouns
  }, {
    size: 56,                          // hidden layer nerouns
    activationFunc: 'relu',            // hidden layer activation function
  }, {
    ...                                // more hidden layers
  }, {
    size: trainingSet.output.shape[0], // output layer nerouns
    activationFunc: 'softmax',         // output layer activation function
  }],
  0,                                   // mean (default: 0)
  1,                                   // variance (default: 1)
  0.01,                                // scale (default: 0.01)
);
~~~~

#### Return
~~~~typescript
{
  W1: number[][],
  b1: number[][],
  ...
  Wl: number[][],
  bl: number[][],
}
~~~~

<a id="train"></a>
### train
Return parameters and cost after training for 1 epoch.

Support cost functions:

* quadratic
* cross-entropy

#### Usage
~~~~typescript
train(
  input: number[][],
  output: number[][],
  parameters: any,
  costFunc: 'quadratic' | 'cross-entropy',
  learningRate: number,
)
~~~~

#### Return
~~~~typescript
{
  parameters: {
    W1: number[][],
    b1: number[][],
    ...
    Wl: number[][],
    bl: number[][],
  },
  cost: number,
}
~~~~

<a id="batchtrain"></a>
### batchTrain
Return parameters and costs after multiple batches of epochs training.

#### Usage
~~~~typescript
batchTrain(
  currentBatch: number,
  totalBatch: number,
  batchSize: number,
  input: number[][],
  output: number[][],
  parameters: any,
  learningRate: number,
  costFunc: 'quadratic' | 'cross-entropy',
  onBatchTrainEnd: (ro: {                    // invoke when each batch training ends
    costs: number[],
    parameters: any
  }, currentBatch: number) => any,
  onTrainEnd: (ro: {                         // invoke when all batches training ends
    costs: number[],
    parameters: any,
  }) => any,
  costs?: number[] = [],
  disableRaf?: boolean = false,
)
~~~~

#### Return
batchTrain is a recursive function so please handle intermediate training results in onBatchTrainEnd callback and final training results in onTrainEnd callback.

<a id="forwardpropagation"></a>
### forwardPropagation
Return predict values based on input data and model parameters.

#### Usage
~~~~typescript
const forwardResults = forwardPropagation(input, parameters);
const predict = forwardResults.yHat;
~~~~

#### Return
~~~~typescript
{
  yHat: number[][],                          // predict values
  caches: Cache[],                           // for backPropagation
  activationFuncs: string[],                 // for backPropagation
}
~~~~