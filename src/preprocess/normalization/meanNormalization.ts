import { map, max, min, mean } from 'lodash';

function meanNormalization(values: Array<number>) {
  const maxNum = max(values);
  const minNum = min(values);
  const meanNum = mean(values);

  return map(values, (num) => (
    (num - meanNum) / (maxNum - minNum)
  ));
}

export default meanNormalization;
