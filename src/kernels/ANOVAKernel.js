const defaultOptions = {
  sigma: 1,
  degree: 1,
};

/**
 * ANOVA kernel.
 */
export class ANOVAKernel {
  /**
   * Create a new ANOVA kernel.
   * @param {object} [options] - Kernel options.
   * @param {number} [options.sigma=1] - Value for the sigma parameter.
   * @param {number} [options.degree=1] - Degree of the kernel.
   */
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
    this.degree = options.degree;
  }

  /**
   * Compute the value of the kernel between two vectors.
   * @param {number[]} x - First vector.
   * @param {number[]} y - Second vector.
   * @returns {number} The dot product between `x` and `y` in feature space.
   */
  compute(x, y) {
    let sum = 0;
    let len = Math.min(x.length, y.length);
    for (let i = 1; i <= len; ++i) {
      sum +=
        Math.exp(-this.sigma * (x[i - 1] ** i - y[i - 1] ** i) ** 2) **
        this.degree;
    }
    return sum;
  }
}
