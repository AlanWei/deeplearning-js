import { map } from 'lodash';

function relu(z: Array<Array<number>>) {
  return {
    A: map(z, (subArr) => (
      map(subArr, (num) => (
        Math.max(0, num)
      ))
    )),
    cache: z,
  };
}

export default relu;
