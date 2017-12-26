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
    input: Array<number>,
    output: Array<number>,
  }> {
    let input: Array<number> = [];
    let output: Array<number> = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('data', (data: Array<string>) => {
        const x: Array<number> = processFunc(data).x;
        const y: Array<number> = processFunc(data).y;
        input = input.concat(x);
        output = output.concat(y);
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