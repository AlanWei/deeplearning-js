import { map } from 'lodash';

function sigmoid(z: Array<Array<number>>) {
  return {
    A: map(z, (subArr) => (
      map(subArr, (num) => (
        1 / (1 + Math.exp(-num))
      ))
    )),
    cache: z,
  };
}

export default sigmoid;
