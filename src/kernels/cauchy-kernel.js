import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  sigma: 1,
};

export default class CauchyKernel {
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
  }

  compute(x, y) {
    return 1 / (1 + squaredEuclidean(x, y) / (this.sigma * this.sigma));
  }
}
