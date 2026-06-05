export default class HistogramIntersectionKernel {
  compute(x, y) {
    let min = Math.min(x.length, y.length);
    let sum = 0;
    for (let i = 0; i < min; ++i) {
      sum += Math.min(x[i], y[i]);
    }

    return sum;
  }
}
