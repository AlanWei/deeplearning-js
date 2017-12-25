import Array2D from "../math/Array2D";

const fs = require('fs');
const csv = require('fast-csv');

export default class CSV {
  filePath: string;
  constructor(
    filePath: string,
  ) {
    this.filePath = filePath;
  }
  read(
    processFunc: Function,
  ): Promise<{
    input: Array<Array2D>,
    output: Array<Array2D>,
  }> {
    const input: Array<Array2D> = [];
    const output: Array<Array2D> = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('data', (data: Array<string>) => {
        const x: Array2D = processFunc(data).x;
        const y: Array2D = processFunc(data).y;
        input.push(x);
        output.push(y);
      })
      .on('end', () => {
        resolve({
          input,
          output,
        });
      })
      .on('error', (error: string) => {
        console.log(error);
      });
    });
  }
}