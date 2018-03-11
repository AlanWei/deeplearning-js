import { map, omit, pick, values, indexOf, max } from 'lodash';
import { transpose } from '../src/math';
import {
  initializeParameters,
  forwardPropagation,
  batchTrain,
  Normalization,
} from '../src';
import * as irisTrain from './data/iris.train.json';
import * as irisTest from './data/iris.test.json';

function formatDataSet(dataset: any) {
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
    let result = [1, 0, 0];
    switch (output.species) {
      case 'setosa':
        result = [1, 0, 0];
        break;
      case 'versicolor':
        result = [0, 1, 0];
        break;
      case 'virginica':
        result = [0, 0, 1];
        break;
      default:
        break;
    }
    outputValues[idx] = result;
  });

  return {
    input: map(transpose(inputValues), (subArray) => (
      Normalization.zscore(subArray)
    )),
    output: transpose(outputValues),
  };
}

function predict(
  input: number[][],
  output: number[][],
  parameters: any,
  datasetType: string,
  step: number,
) {
  const forward = forwardPropagation(input, parameters).yHat;
  const transform = map(transpose(forward), (subArray) => {
    const maxIdx = indexOf(subArray, max(subArray));
    return map(subArray, (num, idx) => (idx === maxIdx ? 1 : 0));
  });
  const predictSet = transpose(transform);

  let correctCount = 0;
  let correctCount1 = 0;
  let correctCount2 = 0;
  let correctCount3 = 0;
  map(transpose(predictSet), (subArray, idx) => {
    const correctSubArr = transpose(output)[idx];
    const maxIdx = indexOf(subArray, max(subArray));
    const correctMaxIdx = indexOf(correctSubArr, max(correctSubArr));
    if (maxIdx === correctMaxIdx) {
      if (idx < step) {
        correctCount1 += 1;
      } else if (idx >= step && idx < step * 2) {
        correctCount2 += 1;
      } else {
        correctCount3 += 1;
      }
      correctCount += 1;
    }
  });

  console.log(
    `${datasetType} set accuracy: ${(correctCount / output[0].length) * 100}%`,
  );
  console.log(`${datasetType} set correct count: ${correctCount}`);
  console.log(correctCount1);
  console.log(correctCount2);
  console.log(correctCount3);
}

export default function softmax(
  learningRate: number,
  numOfIterations: number,
  batchSize: number,
  callback: any,
  resolve: any,
) {
  const trainSet = formatDataSet(irisTrain);
  // const testSet = formatDataSet(irisTest);

  const initialParameters = initializeParameters([{
    size: trainSet.input.length,
  }, {
    size: 40,
    activationFunc: 'relu',
  }, {
    size: 40,
    activationFunc: 'relu',
  }, {
    size: 3,
    activationFunc: 'softmax',
  }], 0, 1, 0.01);

  batchTrain(
    0,
    numOfIterations / batchSize,
    batchSize,
    trainSet.input,
    trainSet.output,
    initialParameters,
    learningRate,
    'cross-entropy',
    callback,
    resolve,
  );
}

softmax(
  0.005,
  1000,
  100,
  () => {},
  (ro: any) => {
    map(ro.costs, (cost) => {
      console.log(cost);
    });
  },
);