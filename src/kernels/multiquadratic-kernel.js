import { squaredEuclidean } from 'ml-distance-euclidean';

const defaultOptions = {
  constant: 1,
};

/**
 * Multiquadratic kernel.
 */
export default class MultiquadraticKernel {
  /**
   * Create a new multiquadratic kernel.
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
    return Math.sqrt(squaredEuclidean(x, y) + this.constant * this.constant);
  }
}
