import { map, slice } from 'lodash';
import CSV from '../data/CSV';
import Array2D from "../math/Array2D";
import convertArray2DToArray1D from '../utils/convertArray2DToArray1D';
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
) {
  const x = map(slice(data, 1), (num) => (
    parseInt(num, 10)
  ));
  const y = map(slice(data, 0, 1), (num) => (
    parseInt(num, 10)
  ));
  return {
    x,
    y,
  };
}

function predict(
  testFilePath: string,
  parameters: any,
) {
  const csv = new CSV(testFilePath);
  return csv.read(
    (data: Array<string>) => processData(data),
  ).then((result) => {
    const { input, output } = result;
    const m = output.length;
    const dims = input.length / m;
    const inputArray2D = new Array2D([m, dims], input).transpose();
    // format predict
    const forward = forwardPropagation(inputArray2D, parameters).yHat;
    const rows = forward.shape[0];
    const forwardT = forward.transpose();
    const forwardTValues = forwardT.values;
    const predict: Array<number> = [];
    for (let i = 0; i < forwardTValues.length / rows; i++) {
      const subArray = slice(forwardTValues, i*rows, (i+1)*rows);
      predict.push(
        subArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0),
      );
    }
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
  const categories = 10;
  const inputArray2D = new Array2D([m, dims], input).transpose();
  const matrix: Array<Array<number>> = [];
  for (let i = 0; i < categories; i++) {
    matrix[i] = [];
    for (let j = 0; j < m; j++) {
      matrix[i][j] = output[j] === i ? 1 : 0;
    }
  }
  const outputArray2D = new Array2D(
    [categories, m],
    convertArray2DToArray1D([categories, m], matrix),
  );
  // training
  let parameters = initializeParameters([{
    size: dims,
  }, {
    size: 10,
    activationFunc: 'linear',
  }, {
    size: categories,
    activationFunc: 'softmax',
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
      const cost = crossEntropyCost(predict.yHat.as1D(), outputArray2D.as1D());
      console.log(`${i}: Cost is ${cost}`);
    }
  }

  return parameters;
}

function main(
  trainFilePath: string,
  testFilePath: string,
  numOfIterations: number,
  baseIterationToShowCost: number,
) {
  const csv = new CSV(trainFilePath);
  csv.read(
    (data: Array<string>) => processData(data),
  ).then((result) => {
    const { input, output } = result;
    const parameters= startTraining(
      input,
      output,
      numOfIterations,
      baseIterationToShowCost,
    );
    predict(trainFilePath, parameters);
  });
}

main(
  './mnist_train.csv',
  './mnist_test.csv',
  1000,
  1,
);
