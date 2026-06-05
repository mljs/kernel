import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  constant: 1,
};

export default class MultiquadraticKernel {
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.constant = options.constant;
  }

  compute(x, y) {
    return Math.sqrt(squaredEuclidean(x, y) + this.constant * this.constant);
  }
}
