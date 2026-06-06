import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  constant: 1,
};

/**
 * Rational quadratic kernel.
 */
export class RationalQuadraticKernel {
  /**
   * Create a new rational quadratic kernel.
   * @param {object} [options] - Kernel options.
   * @param {number} [options.constant=1] - Value for the constant.
   */
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.constant = options.constant;
  }

  /**
   * Compute the value of the kernel between two vectors.
   * @param {number[]} x - First vector.
   * @param {number[]} y - Second vector.
   * @returns {number} The dot product between `x` and `y` in feature space.
   */
  compute(x, y) {
    const distance = squaredEuclidean(x, y);
    return 1 - distance / (distance + this.constant);
  }
}
