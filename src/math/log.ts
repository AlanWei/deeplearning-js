import { map } from 'lodash';

function log(arr: Array<number>) {
  return map(arr, (num) => (
    Math.log(num)
  ));
}

export default log;
