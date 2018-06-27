import train from './train';
const raf = require('raf');

const batchTrain = (
  currentBatch: number,
  totalBatch: number,
  batchSize: number,
  input: number[][],
  output: number[][],
  parameters: any,
  learningRate: number,
  costFunc: 'quadratic' | 'cross-entropy',
  onBatchTrainEnd: (ro: {
    costs: number[],
    parameters: any
  }, currentBatch: number) => any,
  onTrainEnd: (ro: {
    costs: number[],
    parameters: any,
  }) => any,
  costs: number[] = [],
  disableRaf: boolean = false,
): any => {
  if (currentBatch >= totalBatch) {
    return onTrainEnd({
      costs,
      parameters,
    });
  }

  const batchCosts: number[] = [];
  for (let i = 0; i < batchSize; i++) {
    const ro = train(
      input,
      output,
      parameters,
      costFunc,
      learningRate,
    );
    parameters = ro.parameters;
    batchCosts.push(ro.cost);
  }

  onBatchTrainEnd({
    costs: costs.concat(batchCosts),
    parameters,
  }, (currentBatch + 1) * batchSize);

  if (disableRaf) {
    return batchTrain(
      currentBatch + 1,
      totalBatch,
      batchSize,
      input,
      output,
      parameters,
      learningRate,
      costFunc,
      onBatchTrainEnd,
      onTrainEnd,
      costs.concat(batchCosts),
      disableRaf,
    );
  }
  return raf(() => batchTrain(
    currentBatch + 1,
    totalBatch,
    batchSize,
    input,
    output,
    parameters,
    learningRate,
    costFunc,
    onBatchTrainEnd,
    onTrainEnd,
    costs.concat(batchCosts),
    disableRaf,
  ));
};

export default batchTrain;