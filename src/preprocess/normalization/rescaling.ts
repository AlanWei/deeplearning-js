import { map, max, min } from 'lodash';

function rescaling(values: Array<number>) {
  const maxNum = max(values);
  const minNum = min(values);

  return map(values, (num) => (
    (num - minNum) / (maxNum - minNum)
  ));
}

export default rescaling;
