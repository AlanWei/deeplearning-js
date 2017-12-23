const fs = require('fs');
const csv = require('fast-csv');
import { map, slice } from 'lodash';
import Model from '../model';
import math from '../math';

function read(targetNum: number) {
  const Y: any = [];
  const X: any = [];
  let count = 0;
  fs.createReadStream("./mnist_train.csv")
    .pipe(csv())
    .on("data", (data: any) => {
      X[count] = [];
      Y[count] = [];
      const output = parseInt(data[0], 10);
      const input = slice(data, 1);
      if (output === targetNum) {
        Y[count].push([1]);
      } else {
        Y[count].push([0]);
      }
      map(input, (num: string, idx) => {
        X[count][idx] = [parseInt(num, 10)];
      });
      count++;
    })
    .on("end", () => {
      const x = X;
      let parameters = Model.initializeParameters([{
        size: x[0].length,
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

      for (let i = 1; i <= 1; i++) {
        map(x, (example: Array<Array<number>>, idx) => {
          console.log(example);
          const forward = Model.forwardPropagation(example, parameters);
          const grads = Model.backPropagation(
            math.subtract,
            Y[idx],
            forward,
          );
          parameters = Model.updateParameters(parameters, grads, 0.0075);
        });

        if (i % 10 === 0) {
          let predict: any = [];
          const costs: any = [];
          map(x, (example: Array<Array<number>>, idx) => {
            const ro = Model.forwardPropagation(example, parameters);
            const forward = ro.AL;
            const cost = Model.computeCost(forward, Y[idx], math.absDiff);
            predict.push(forward);
            costs.push(cost);
          });
          let costSum = 0;
          map(costs, (cost: number) => (
            costSum += cost
          ));
          console.log(`${i}: Cost is ${costSum / costs.length}`);
          predict = map(predict, (subArr: Array<Array<number>>) => (
            map(subArr, (arr) => (
              map(arr, (num) => (
                num > 0.5 ? 1 : 0
              ))
            ))
          ));
          let correct = 0;
          map(predict, (subArr: Array<Array<number>>, idx) => (
            map(subArr, (arr, i) => (
              map(arr, (num, j) => {
                if (num === Y[idx][i][j]) {
                  correct++;
                }
              })
            ))
          ));
          const m = Y.length;
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
    });
}

export default read;

read(1);
