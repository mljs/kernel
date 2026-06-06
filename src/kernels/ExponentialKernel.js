import { euclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  sigma: 1,
};

/**
 * Exponential kernel.
 */
export class ExponentialKernel {
  /**
   * Create a new exponential kernel.
   * @param {object} [options] - Kernel options.
   * @param {number} [options.sigma=1] - Value for the sigma parameter.
   */
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
    this.divisor = 2 * options.sigma * options.sigma;
  }

  /**
   * Compute the value of the kernel between two vectors.
   * @param {number[]} x - First vector.
   * @param {number[]} y - Second vector.
   * @returns {number} The dot product between `x` and `y` in feature space.
   */
  compute(x, y) {
    const distance = euclidean(x, y);
    return Math.exp(-distance / this.divisor);
  }
}
