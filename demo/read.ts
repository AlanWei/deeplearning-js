const fs = require('fs');
const csv = require('fast-csv');
import { map, slice } from 'lodash';
import {
  Array2D,
  initializeParameters,
  forwardPropagation,
  backPropagation,
  updateParameters,
  quadraticCost,
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

      const iterations = 30;

      for (let i = 1; i <= iterations; i++) {
        map(X, (example: Array2D, idx) => {
          const forward = forwardPropagation(example, parameters);
          const grads = backPropagation(
            'quadratic',
            forward,
            Y[idx],
          );
          parameters = updateParameters(parameters, grads, 0.0075);
        });

        if (i % 10 === 0) {
          let predict: any = [];
          map(X, (example: Array2D, idx) => {
            const forward = forwardPropagation(example, parameters);
            predict.push(forward.yHat);
          });
          predict = map(predict, (example: Array2D) => (
            example.squeeze()
          ));
          const cost = quadraticCost(predict, yArray);
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

      // const X2: any = [];
      // const Y2: any = [];
      // let count = 0;
      // fs.createReadStream("./mnist_test.csv")
      //   .pipe(csv())
      //   .on("data", (data: any) => {
      //     X2[count] = [];
      //     Y2[count] = [];
      //     const output = parseInt(data[0], 10);
      //     const input = slice(data, 1);
      //     if (output === targetNum) {
      //       Y2[count].push([1]);
      //     } else {
      //       Y2[count].push([0]);
      //     }
      //     map(input, (num: string, idx) => {
      //       X2[count][idx] = [parseInt(num, 10)];
      //     });
      //     count++;
      //   })
      //   .on("end", () => {
      //     const x = X2;
      //     let predict: any = [];
      //     const costs: any = [];
      //     map(x, (example: Array<Array<number>>, idx) => {
      //       const ro = Model.forwardPropagation(example, parameters);
      //       const forward = ro.AL;
      //       const cost = Model.computeCost(forward, Y2[idx], math.absDiff);
      //       predict.push(forward);
      //       costs.push(cost);
      //     });
      //     let costSum = 0;
      //     map(costs, (cost: number) => (
      //       costSum += cost
      //     ));
      //     console.log(`Cost is ${costSum / costs.length}`);
      //     predict = map(predict, (subArr: Array<Array<number>>) => (
      //       map(subArr, (arr) => (
      //         map(arr, (num) => (
      //           num > 0.5 ? 1 : 0
      //         ))
      //       ))
      //     ));
      //     let correct = 0;
      //     map(predict, (subArr: Array<Array<number>>, idx) => (
      //       map(subArr, (arr, i) => (
      //         map(arr, (num, j) => {
      //           if (num === Y2[idx][i][j]) {
      //             correct++;
      //           } else {
      //             console.log(idx);
      //           }
      //         })
      //       ))
      //     ));
      //     const m = Y2.length;
      //     console.log(`Test Accuracy: ${correct / m * 100}%`);
      //     console.log(`Test Correct count: ${correct}`);
      //   });

      const end = Date.now();
      console.log(`Total running time is: ${(end - start) / 1000} seconds`);
    });
}

export default read;

read(1);
