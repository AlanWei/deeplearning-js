import { map, omit, pick, values } from 'lodash';
import {
  initializeParameters,
  forwardPropagation,
  train,
  Normalization,
} from '../src';
import * as iris from './data/iris.json';
import { transpose } from '../src/math';

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
    outputValues[idx] = [output.species === 'sentosa' ? 1 : 0];
  });

  return {
    input: map(transpose(inputValues), (subArray) => (
      Normalization.zscore(subArray)
    )),
    output: transpose(outputValues),
  };
}

function formatNumToBool(output: number[]) {
  return map(output, num => (num > 0.5 ? 1 : 0));
}

function predict(
  input: number[][],
  output: number[][],
  parameters: any,
  datasetType: string,
) {
  const forward = forwardPropagation(input, parameters).yHat;
  const predictSet = formatNumToBool(forward[0]);
  const correctSet = formatNumToBool(output[0]);
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

function batchUpdate(
  currentBatch: number,
  totalBatch: number,
  batchSize: number,
  trainSet: any,
  parameters: any,
  learningRate: number,
  callback: Function,
  costs: number[],
  resolve: Function,
): any {
  if (currentBatch >= totalBatch) {
    return resolve(costs, parameters);
  }
  const tempCosts = [];
  for (let i = 0; i < batchSize; i++) {
    const ro = train(
      trainSet.input,
      trainSet.output,
      parameters,
      'cross-entropy',
      learningRate,
    );
    callback(ro, currentBatch * batchSize + i);
    parameters = ro.parameters;
    tempCosts.push(ro.cost);
  }
  return batchUpdate(
    currentBatch + 1,
    totalBatch,
    batchSize,
    trainSet,
    parameters,
    learningRate,
    callback,
    costs.concat(tempCosts),
    resolve,
  );
}

export default function logistic(
  learningRate: number,
  numOfIterations: number,
  batchSize: number,
  callback: Function = () => {},
  resolve: Function = () => {},
) {
  const trainSet = formatDataSet(iris);

  const initialParameters = initializeParameters([{
    size: trainSet.input.length,
  }, {
    size: 200,
    activationFunc: 'relu',
  }, {
    size: trainSet.output.length,
    activationFunc: 'sigmoid',
  }], 0, 1, 0.01);

  batchUpdate(
    0,
    numOfIterations / batchSize,
    batchSize,
    trainSet,
    initialParameters,
    learningRate,
    callback,
    [],
    resolve,
  );
}

logistic(
  0.005,
  300,
  100,
  () => {},
  (costs: number[]) => {
    console.log(costs, costs.length);
  },
);
