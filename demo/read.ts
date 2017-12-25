const fs = require('fs');
const csv = require('fast-csv');
import { map, slice } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  // quadraticCost,
  crossEntropyCost,
} from '../src';

const start = Date.now();

function read(targetNum: number) {
  const Y: Array<Array2D> = [];
  const X: Array<Array2D> = [];
  fs.createReadStream("./mnist_train.csv")
    .pipe(csv())
    .on("data", (data: Array<string>) => {
      const output = parseInt(data[0], 10);
      const input = map(slice(data, 1), (num) => (
        parseInt(num, 10)
      ));
      X.push(new Array2D([input.length, 1], input));
      if (output === targetNum) {
        Y.push(new Array2D([1, 1], [1]));
      } else {
        Y.push(new Array2D([1, 1], [0]));
      }
    })
    .on("end", () => {
      const yArray: any = map(Y, (example) => (
        example.squeeze()
      ));
      let parameters = initializeParameters([{
        size: X[0].shape[0], // for each example
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

      const iterations = 20;

      for (let i = 1; i <= iterations; i++) {
        map(X, (example: Array2D, idx) => {
          const forward = forwardPropagation(example, parameters);
          const grads = backPropagation(
            'cross-entropy',
            forward,
            Y[idx],
          );
          parameters = updateParameters(parameters, grads, 0.00075);
        });

        if (i % 1 === 0) {
          let predict: any = [];
          map(X, (example: Array2D, idx) => {
            const forward = forwardPropagation(example, parameters);
            predict.push(forward.yHat);
          });
          predict = map(predict, (example: Array2D) => (
            example.squeeze()
          ));
          const cost = crossEntropyCost(predict, yArray);
          console.log(`${i}: Cost is ${cost}`);
          predict = map(predict, (num) => (
            num > 0.5 ? 1 : 0
          ));
          let correct = 0;
          map(predict, (num, idx) => {
            if (num === yArray[idx]) {
              correct++;
            }
          });
          const m = yArray.length;
          console.log(`Accuracy: ${correct / m * 100}%`);
          console.log(`Correct count: ${correct}`);
        }
      }

      const yTest: Array<Array2D> = [];
      const xTest: Array<Array2D> = [];
      fs.createReadStream("./mnist_test.csv")
        .pipe(csv())
        .on("data", (data: Array<string>) => {
          const output = parseInt(data[0], 10);
          const input = map(slice(data, 1), (num) => (
            parseInt(num, 10)
          ));
          xTest.push(new Array2D([input.length, 1], input));
          if (output === targetNum) {
            yTest.push(new Array2D([1, 1], [1]));
          } else {
            yTest.push(new Array2D([1, 1], [0]));
          }
        })
        .on("end", () => {
          let predict: any = [];
          map(xTest, (example: Array2D, idx) => {
            const forward = forwardPropagation(example, parameters);
            predict.push(forward.yHat);
          });
          predict = map(predict, (example: Array2D) => (
            example.squeeze()
          ));
          const yResult: any = map(yTest, (example: Array2D) => (
            example.squeeze()
          ));
          const cost = crossEntropyCost(predict, yResult);
          console.log(`Test: Cost is ${cost}`);
          predict = map(predict, (num) => (
            num > 0.5 ? 1 : 0
          ));
          let correct = 0;
          map(predict, (num, idx) => {
            if (num === yResult[idx]) {
              correct++;
            }
          });
          const m = yResult.length;
          console.log(`Test Accuracy: ${correct / m * 100}%`);
          console.log(`Test Correct count: ${correct}`);
          const end = Date.now();
          console.log(`Total running time is: ${(end - start) / 1000} seconds`);
        });
    });
}

export default read;

read(1);
