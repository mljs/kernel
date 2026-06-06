/**
 * Histogram intersection kernel.
 */
export default class HistogramIntersectionKernel {
  /**
   * Compute the value of the kernel between two vectors.
   * @param {number[]} x - First vector.
   * @param {number[]} y - Second vector.
   * @returns {number} The dot product between `x` and `y` in feature space.
   */
  compute(x, y) {
    let min = Math.min(x.length, y.length);
    let sum = 0;
    for (let i = 0; i < min; ++i) {
      sum += Math.min(x[i], y[i]);
    }

    return sum;
  }
}
