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

function processData(
  data: Array<string>,
  targetNum: number,
) {
  const output = parseInt(data[0], 10);
  const input = map(slice(data, 1), (num) => (
    parseInt(num, 10)
  ));
  return {
    x: new Array2D([input.length, 1], input),
    y: output === targetNum ?
      new Array2D([1, 1], [1]) : new Array2D([1, 1], [0]),
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
    const outputArray1D = map(output, (example) => (
      example.squeeze()
    ));
    const predict: Array<number> = map(input, (example: Array2D, idx) => {
      const forward = forwardPropagation(example, parameters);
      const yHat = forward.yHat.squeeze();
      return yHat > 0.5 ? 1 : 0;
    });
    let correct = 0;
    map(predict, (num, idx) => {
      if (num === outputArray1D[idx]) {
        correct++;
      }
    });
    const m = outputArray1D.length;
    console.log(`Test accuracy: ${correct / m * 100}%`);
    console.log(`Test correct count: ${correct}`);
  });
}

function startTraining(
  input: Array<Array2D>,
  output: Array<Array2D>,
  numOfIterations: number,
  baseIterationToShowCost: number,
) {
  // format output to 1D for cost computing
  const outputArray1D: Array<number> = map(output, (example) => (
    example.squeeze()
  ));
  // training
  let parameters = initializeParameters([{
    size: input[0].shape[0],
  }, {
    size: 8,
    activationFunc: 'linear',
  }, {
    size: 4,
    activationFunc: 'linear',
  }, {
    size: 1,
    activationFunc: 'sigmoid',
  }], 0, 1, 0.01);

  for (let i = 1; i <= numOfIterations; i++) {
    map(input, (example: Array2D, idx) => {
      const forward = forwardPropagation(example, parameters);
      const grads = backPropagation(
        'cross-entropy',
        forward,
        output[idx],
      );
      parameters = updateParameters(parameters, grads, 0.00075);
    });

    if (i % baseIterationToShowCost === 0) {
      const predict: Array<number> = [];
      map(input, (example: Array2D, idx) => {
        const forward = forwardPropagation(example, parameters);
        predict.push(forward.yHat.squeeze());
      });
      const cost = crossEntropyCost(predict, outputArray1D);
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
  100,
  10,
);
