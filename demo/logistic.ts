import { map, omit, pick, values } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  train,
  Normalization,
  convertArray2DToArray1D,
} from '../src';
import * as iris from './data/iris.json';
import { transpose } from '../src/math';

function formatDataSet(dataset: any) {
  const datasetSize = dataset.length;
  const inputValues: number[][] = [];
  const outputValues: number[][] = [];

  map(dataset, (example: {
    "sepalLength": number,
    "sepalWidth": number,
    "petalLength": number,
    "petalWidth": number,
    "species": string,
  }, idx: number) => {
    const input: any = omit(example, 'species');
    const output: any = pick(example, 'species');
    inputValues[idx] = values(input);
    outputValues[idx] = [output.species === 'versicolor' ? 1 : 0];
  });

  return {
    input: map(transpose(inputValues), (subArray) => (
      Normalization.zscore(subArray)
    )),
    output: outputValues,
  };
}

function formatNumToBool(output: number[][]) {
  return map(output, subArray => (
    map(subArray, num => (num > 0.5 ? 1 : 0))
  ));
}

function predict(
  input: number[][],
  output: number[][],
  parameters: any,
  datasetType: string,
) {
  const forward = forwardPropagation(input, parameters).yHat;
  const predictSet = formatNumToBool(forward);
  const correctSet = formatNumToBool(output);
  let correctCount = 0;
  map(predictSet, (num, idx) => {
    if (num === correctSet[idx]) {
      correctCount += 1;
    }
  });

  console.log(
    `${datasetType} set accuracy: ${(correctCount / correctSet.length) * 100}%`,
  );
  console.log(`${datasetType} set correct count: ${correctCount}`);
}

export default function logistic(
  learningRate: number,
  numOfIterations: number,
  baseIterationToShowCost: number,
  learningRateDecayRate?: number,
) {
  const start = Date.now();
  const trainSet = formatDataSet(iris);

  const initialParameters = initializeParameters([{
    size: trainSet.input.length,
  }, {
    size: 3,
    activationFunc: 'relu',
  }, {
    size: trainSet.output.length,
    activationFunc: 'sigmoid',
  }], 0, 1, 0.01);
  // console.log(Date.now() - start);

  const { parameters } = train(
    trainSet.input,
    trainSet.output,
    initialParameters,
    'cross-entropy',
    learningRate,
    numOfIterations,
    baseIterationToShowCost,
    learningRateDecayRate,
    true,
  );

  predict(trainSet.input, trainSet.output, parameters, 'train');
}

logistic(
  0.005,
  1,
  10,
  0.0000005,
);
