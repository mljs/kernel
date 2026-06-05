import { euclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  sigma: 1,
};

export default class ExponentialKernel {
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
    this.divisor = 2 * options.sigma * options.sigma;
  }

  compute(x, y) {
    const distance = euclidean(x, y);
    return Math.exp(-distance / this.divisor);
  }
}
