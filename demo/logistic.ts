import { map, omit, pick, values } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  train,
} from '../src';
import * as iris from './data/iris.json';

function formatDataSet(dataset: any) {
  const datasetSize = dataset.length;
  let inputValues: Array<number> = [];
  let outputValues: Array<number> = [];

  map(dataset, (example: {
    "sepalLength": number,
    "sepalWidth": number,
    "petalLength": number,
    "petalWidth": number,
    "species": string,
  }) => {
    const input: any = omit(example, 'species');
    const output: any = pick(example, 'species');
    inputValues = inputValues.concat(values(input));
    outputValues = outputValues.concat(output.species === 'setosa' ? 1 : 0);
  });

  return {
    input: new Array2D(
      [datasetSize, inputValues.length / datasetSize],
      inputValues,
    ).transpose(),
    output: new Array2D(
      [outputValues.length / datasetSize, datasetSize],
      outputValues,
    ),
  };
}

function formatNumToBool(output: Array2D) {
  return map(output.values, num => (num > 0.5 ? 1 : 0));
}

function predict(
  input: Array2D,
  output: Array2D,
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
  const trainSet = formatDataSet(iris);

  const initialParameters = initializeParameters([{
    size: trainSet.input.shape[0],
  }, {
    size: 1,
    activationFunc: 'relu',
  }, {
    size: trainSet.output.shape[0],
    activationFunc: 'sigmoid',
  }], 0, 1, 0.01);

  train(
    trainSet.input,
    trainSet.output,
    initialParameters,
    'cross-entropy',
    learningRate,
    numOfIterations,
    baseIterationToShowCost,
    learningRateDecayRate,
  ).then((ro) => {
    const { parameters, costs } = ro;
    predict(
      trainSet.input,
      trainSet.output,
      parameters,
      'training',
    );
  }).catch((err) => {
    console.log(err);
  });
}

logistic(
  0.0035,
  1000,
  100,
);
