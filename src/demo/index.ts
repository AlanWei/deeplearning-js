import { map, slice } from 'lodash';
import CSV from '../data/CSV';
import Array2D from "../math/Array2D";
import crossEntropyCost from '../math/crossEntropyCost';
import {
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
} from '../model';

const start = Date.now();

function processData(
  data: Array<string>,
  targetNum: number,
) {
  const x = map(slice(data, 1), (num) => (
    parseInt(num, 10)
  ));
  const y = map(slice(data, 0, 1), (num) => (
    parseInt(num, 10) === targetNum ? 1 : 0
  ));
  return {
    x,
    y,
  };
}

function predict(
  targetNum: number,
  testFilePath: string,
  parameters: any,
) {
  const csv = new CSV(testFilePath);
  return csv.read(
    (data: Array<string>) => processData(data, targetNum),
  ).then((result) => {
    const { input, output } = result;
    const m = output.length;
    const dims = input.length / m;
    const inputArray2D = new Array2D([m, dims], input).transpose();
    const forward = forwardPropagation(inputArray2D, parameters).yHat.as1D();
    const predict: Array<number> = map(forward, (num) => (
      num > 0.5 ? 1 : 0
    ));
      
    let correct = 0;
    map(predict, (num, idx) => {
      if (num === output[idx]) {
        correct++;
      }
    });
    console.log(`Test accuracy: ${correct / m * 100}%`);
    console.log(`Test correct count: ${correct}`);
    const end = Date.now();
    console.log(`Total time: ${(end - start) / 1000} seconds`);
  });
}

function startTraining(
  input: Array<number>,
  output: Array<number>,
  numOfIterations: number,
  baseIterationToShowCost: number,
) {
  const m = output.length;
  const dims = input.length / m;
  const inputArray2D = new Array2D([m, dims], input).transpose();
  const outputArray2D = new Array2D([1, m], output);
  // training
  let parameters = initializeParameters([{
    size: dims,
  }, {
    size: 8,
    activationFunc: 'linear',
  }, {
    size: 4,
    activationFunc: 'linear',
  }, {
    size: 2,
    activationFunc: 'linear',
  }, {
    size: 1,
    activationFunc: 'sigmoid',
  }], 0, 1, 0.01);

  for (let i = 1; i <= numOfIterations; i++) {
    const forward = forwardPropagation(inputArray2D, parameters);
    const grads = backPropagation(
      'cross-entropy',
      forward,
      outputArray2D,
    );
    parameters = updateParameters(parameters, grads, 0.0000005);

    if (i % baseIterationToShowCost === 0) {
      const predict = forwardPropagation(inputArray2D, parameters);
      const cost = crossEntropyCost(predict.yHat.as1D(), output);
      console.log(`${i}: Cost is ${cost}`);
    }
  }

  return parameters;
}

function main(
  trainFilePath: string,
  testFilePath: string,
  targetNum: number,
  numOfIterations: number,
  baseIterationToShowCost: number,
) {
  const csv = new CSV(trainFilePath);
  csv.read(
    (data: Array<string>) => processData(data, targetNum),
  ).then((result) => {
    const { input, output } = result;
    const parameters= startTraining(
      input,
      output,
      numOfIterations,
      baseIterationToShowCost,
    );
    predict(targetNum, testFilePath, parameters);
  });
}

main(
  './mnist_train.csv',
  './mnist_test.csv',
  1,
  20,
  1,
);
