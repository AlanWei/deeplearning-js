import { map, omit, pick, values, indexOf, max } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  train,
  Normalization,
  convertArray2DToArray1D,
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
    let result = [1, 0, 0];
    switch (output.species) {
      case 'setosa':
        result = [1, 0, 0];
        break;
      case  'versicolor':
        result = [0, 1, 0];
        break;
      case 'virginica':
        result = [0, 0, 1];
        break;
      default:
        break;
    }
    outputValues = outputValues.concat(result);
  });

  const input = new Array2D(
    [datasetSize, inputValues.length / datasetSize],
    inputValues,
  ).transpose();

  const matrix = map(input.matrix, (subArray) => (
    Normalization.meanNormalization(subArray)
  ));

  return {
    input: new Array2D(
      [inputValues.length / datasetSize, datasetSize],
      convertArray2DToArray1D(
        [inputValues.length / datasetSize, datasetSize],
        matrix
      ),
    ),
    output: new Array2D(
      [datasetSize, outputValues.length / datasetSize],
      outputValues,
    ).transpose(),
  };
}

function predict(
  input: Array2D,
  output: Array2D,
  parameters: any,
  datasetType: string,
) {
  const forward = forwardPropagation(input, parameters).yHat;
  const transform = map(forward.transpose().matrix, (subArray) => {
    const maxIdx = indexOf(subArray, max(subArray));
    return map(subArray, (num, idx) => (idx === maxIdx ? 1 : 0));
  });
  const predictSet = new Array2D(
    [output.shape[1], output.shape[0]],
    convertArray2DToArray1D([output.shape[1], output.shape[0]], transform),
  ).transpose();

  let correctCount1 = 0;
  let correctCount2 = 0;
  let correctCount3 = 0;
  map(predictSet.transpose().matrix, (subArray, idx) => {
    const correctSubArr = output.transpose().matrix[idx];
    const maxIdx = indexOf(subArray, max(subArray));
    const correctMaxIdx = indexOf(correctSubArr, max(correctSubArr));
    if (maxIdx === correctMaxIdx) {
      if (idx < 50) {
        correctCount1 += 1;
      } else if (idx >= 50 && idx < 100) {
        correctCount2 += 1;
      } else {
        correctCount3 += 1;
      }
    }
  });

  // console.log(
  //   `${datasetType} set accuracy: ${(correctCount / output.shape[1]) * 100}%`,
  // );
  // console.log(`${datasetType} set correct count: ${correctCount}`);
  console.log(correctCount1);
  console.log(correctCount2);
  console.log(correctCount3);
}

export default function softmax(
  learningRate: number,
  numOfIterations: number,
  baseIterationToShowCost: number,
  learningRateDecayRate?: number,
) {
  const trainSet = formatDataSet(iris);

  const initialParameters = initializeParameters([{
    size: trainSet.input.shape[0],
  }, {
    size: 30,
    activationFunc: 'relu',
  }, {
    size: 3,
    activationFunc: 'softmax',
  }], 0, 1, 0.01);

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

softmax(
  0.05,
  1000,
  50,
  0.0000002,
);
