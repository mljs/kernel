import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  constant: 1,
};

export default class RationalQuadraticKernel {
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.constant = options.constant;
  }

  compute(x, y) {
    const distance = squaredEuclidean(x, y);
    return 1 - distance / (distance + this.constant);
  }
}
