import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  sigma: 1,
};

/**
 * Cauchy kernel.
 */
export class CauchyKernel {
  /**
   * Create a new Cauchy kernel.
   * @param {object} [options] - Kernel options.
   * @param {number} [options.sigma=1] - Value for the sigma parameter.
   */
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
  }

  /**
   * Compute the value of the kernel between two vectors.
   * @param {number[]} x - First vector.
   * @param {number[]} y - Second vector.
   * @returns {number} The dot product between `x` and `y` in feature space.
   */
  compute(x, y) {
    return 1 / (1 + squaredEuclidean(x, y) / (this.sigma * this.sigma));
  }
}
