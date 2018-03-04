import train from './train';
import { Array2D } from '../data';

test('train', () => {
  const ro = train(
    new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1]),
    new Array2D([1, 3], [1, 1, 0]),
    {
      W1: new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1]),
      b1: new Array2D([3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0]),
      activation1: 'relu',
      W2: new Array2D([1, 3], [1, 1, 1]),
      b2: new Array2D([1, 3], [0, 0, 0]),
      activation2: 'sigmoid',
    },
    "cross-entropy",
    0.005,
    100,
    10,
  );
  expect(ro.costs).toEqual([
    { "cost": 3.000123402189504, "epoch": 1 },
    { "cost": 2.444335515707496, "epoch": 10 },
    { "cost": 1.9236466648888535, "epoch": 20 },
    { "cost": 1.4908991471053739, "epoch": 30 },
    { "cost": 1.1412473225091597, "epoch": 40 },
    { "cost": 0.8788591076050484, "epoch": 50 },
    { "cost": 0.7063979185079626, "epoch": 60 },
    { "cost": 0.6100490648188892, "epoch": 70 },
    { "cost": 0.5621151678810197, "epoch": 80 },
    { "cost": 0.5379460417115285, "epoch": 90 },
    { "cost": 0.5235682292490216, "epoch": 100 }
  ]);
  expect(ro.parameters.W1).toEqual(
    new Array2D([3, 3], [
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057,
      0.8105190973738057
    ]),
  );
  expect(ro.parameters.W2).toEqual(
    new Array2D([1, 3], [
      0.14727924102167664,
      0.14727924102167664,
      0.14727924102167664
    ]),
  );
});