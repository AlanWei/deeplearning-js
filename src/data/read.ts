const fs = require('fs');
const csv = require('fast-csv');
import { map, slice } from 'lodash';
import Model from '../model';
import math from '../math';

// const start = Date.now();

function read(targetNum: number) {
  const Y: any = [];
  const X: any = [];
  let count = 0;
  fs.createReadStream("./mnist_sample.csv")
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
      let parameters = Model.initializeParameters([x[0].length, 4, 1]);

      for (let i = 0; i < 100; i++) {
        map(x, (example: Array<Array<number>>, idx) => {
          const ro = Model.forwardPropagation(example, parameters);
          const forward = ro.AL;
          const caches = ro.caches;
          const grads = Model.backPropagation(forward, Y[idx], caches);
          parameters = Model.updateParameters(parameters, grads, 0.0075);
        });

        let predict: any = [];
        map(x, (example: Array<Array<number>>) => {
          const ro = Model.forwardPropagation(example, parameters);
          const forward = ro.AL;
          predict.push(forward);
        });
        const cost = Model.computeCost(predict, Y, math.logProb);
        console.log(`${i}: Cost is ${cost}`);
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
      }

      // console.log('time:', (Date.now() - start) / 1000);
    });
}

export default read;

read(1);
