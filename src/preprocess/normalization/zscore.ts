import { map, mean, reduce } from 'lodash';

function zscore(values: number[]) {
  const meanNum = mean(values);
  const std = Math.sqrt(reduce(values, (sum, num) => (
    sum + Math.pow(num - meanNum, 2)
  ), 0) / values.length);

  return map(values, (num) => (
    (num - meanNum) / std
  ));
}

export default zscore;
