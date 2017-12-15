const fs = require('fs');
const csv = require('fast-csv');
import { map, slice } from 'lodash';
import Model from '../model';
import math from '../math';

const start = Date.now();

function read(targetNum: number) {
  const Y: any = [];
  const X: any = [];
  let count = 0;
  fs.createReadStream("./mnist_test.csv")
    .pipe(csv())
    .on("data", (data: any) => {
      X[count] = [];
      const output = parseInt(data[0], 10);
      const input = slice(data, 1);
      if (output === targetNum) {
        Y.push(1);
      } else {
        Y.push(0);
      }
      map(input, (num: string, idx) => {
        X[count][idx] = [parseInt(num, 10)];
      });
      count++;
    })
    .on("end", () => {
      const x = X;
      const parameters = Model.initializeParameters([x[0].length, 4, 1]);
      const ro = Model.forwardPropagation(x, parameters);
      const forward = ro.AL;
      const squeezeForward = math.squeeze(forward);
      const cost = Model.computeCost(squeezeForward, Y, (x: any, y: any) => (
        math.logProb(x, y)
      ));
      console.log('cost:', cost);
      console.log('time:', (Date.now() - start) / 1000);
    });
}

export default read;

read(7);
