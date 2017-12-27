# deeplearning-js
[![npm version](https://badge.fury.io/js/deeplearning-js.svg)](https://badge.fury.io/js/deeplearning-js)
[![CircleCI](https://circleci.com/gh/AlanWei/deeplearning-js.svg?style=shield)](https://circleci.com/gh/AlanWei/deeplearning-js)

## Intention
**deeplearning-js** is an open source JavaScript library for deep learning. **deeplearning-js** provides all JavaScript developers a new way to play around with deep learning models without learning unfamiliar Python, statistics or calculus knowledge.

## Getting started
`npm install deeplearning-js` or `yarn add deeplearning-js`

## Example
```javascript
import mnist from 'mnist';
import { map, slice } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  train,
} from 'deeplearning-js';

function formatDataSet(dataset) {
  const datasetSize = dataset.length;
  let inputValues = [];
  let outputValues = [];
  map(dataset, (example) => {
    inputValues = inputValues.concat(example.input);
    outputValues = outputValues.concat(example.output);
  });
  return {
    input: new Array2D(
      [inputValues.length / datasetSize, datasetSize],
      inputValues,
    ),
    output: new Array2D(
      [outputValues.length / datasetSize, datasetSize],
      outputValues,
    ),
  };
}

function formatBoolToNum(output) {
  const rows = output.shape[0];
  const outputT = output.transpose();
  const outputTValues = outputT.values;
  const predict = [];
  for (let i = 0; i < outputTValues.length / rows; i++) {
    const subArray = slice(outputTValues, i * rows, (i + 1) * rows);
    predict.push(
      subArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0),
    );
  }
  return predict;
}

function predict(
  input,
  output,
  parameters,
  datasetType,
) {

  const forward = forwardPropagation(input, parameters).yHat;
  const predict = formatBoolToNum(forward);
  const correct = formatBoolToNum(output);
  let correctCount = 0;
  map(predict, (num, idx) => {
    if (num === correct[idx]) {
      correctCount++;
    }
  });

  console.log(`${datasetType} set accuracy: ${correctCount / correct.length * 100}%`);
  console.log(`${datasetType} set correct count: ${correctCount}`);
}

function main(
  trainingSetSize,
  testSetSize,
  learningRate,  
  numOfIterations,
  baseIterationToShowCost,
) {
  const set = mnist.set(trainingSetSize, testSetSize);
  const trainingSet = formatDataSet(set.training);
  const testSet = formatDataSet(set.test);

  const initialParameters = initializeParameters([{
    size: trainingSet.input.shape[0],
  }, {
    size: 98,
    activationFunc: 'relu',
  }, {
    size: trainingSet.output.shape[0],
    activationFunc: 'softmax',
  }], 0, 1, 0.01);

  const parameters = train(
    trainingSet.input,
    trainingSet.output,
    initialParameters,
    'cross-entropy',
    learningRate,
    numOfIterations,
    baseIterationToShowCost,
  );

  predict(
    trainingSet.input,
    trainingSet.output,
    parameters,
    'training',
  );
  predict(
    testSet.input,
    testSet.output,
    parameters,
    'test',    
  );
}

main(
  10, // trainingSetSize
  10, // testSetSize
  0.0006, // learningRate
  1000, // numOfIterations
  50, // baseIterationToShowCost
);
```