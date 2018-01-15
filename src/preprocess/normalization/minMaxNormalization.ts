import { map, max, min } from 'lodash';

function minMaxNormalization(values: Array<number>) {
  const maxNum = max(values);
  const minNum = min(values);

  return map(values, (num) => (
    (num - minNum) / (maxNum - minNum)
  ));
}

export default minMaxNormalization;
