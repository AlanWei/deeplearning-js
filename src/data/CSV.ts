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
        const formatData = processFunc(data);
        input = input.concat(formatData.x);
        output = output.concat(formatData.y);
      })
      .on('end', () => {
        resolve({
          input,
          output,
        });
      })
      .on('error', (error: string) => {
        throw new Error(error);
      });
    });
  }
}
