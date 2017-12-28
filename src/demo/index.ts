import { map, slice } from 'lodash';
import Array2D from "../math/Array2D";
import {
  initializeParameters,
  forwardPropagation,
  train,
} from '../model';
const mnist = require('mnist');

const start = Date.now();

function formatDataSet(dataset: any) {
  const datasetSize = dataset.length;
  let inputValues: Array<number> = [];
  let outputValues: Array<number> = [];
  map(dataset, (example: any) => {
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

function formatBoolToNum(output: Array2D) {
  const rows = output.shape[0];
  const outputT = output.transpose();
  const outputTValues = outputT.values;
  const predict: Array<number> = [];
  for (let i = 0; i < outputTValues.length / rows; i++) {
    const subArray = slice(outputTValues, i * rows, (i + 1) * rows);
    predict.push(
      subArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0),
    );
  }
  return predict;
}

function predict(
  input: Array2D,
  output: Array2D,
  parameters: any,
  datasetType: 'training' | 'test',
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

  console.log(
    `${datasetType} set accuracy: ${correctCount / correct.length * 100}%`,
  );
  console.log(`${datasetType} set correct count: ${correctCount}`);
  const end = Date.now();
  console.log(`Total time: ${(end - start) / 1000} seconds`);
}

function main(
  trainingSetSize: number,
  testSetSize: number,
  learningRate: number,  
  numOfIterations: number,
  baseIterationToShowCost: number,
  learningRateDecayRate: number,
) {
  const set = mnist.set(trainingSetSize, testSetSize);
  const trainingSet = formatDataSet(set.training);
  // const testSet = formatDataSet(set.test);

  const initialParameters = initializeParameters([{
    size: trainingSet.input.shape[0],
  }, {
    size: 56,
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
    learningRateDecayRate,
  );

  predict(
    trainingSet.input,
    trainingSet.output,
    parameters,
    'training',
  );
  // predict(
  //   testSet.input,
  //   testSet.output,
  //   parameters,
  //   'test',
  // );
}

main(
  20,
  10,
  0.0025,
  1200,
  100,
  0.000003,
);
