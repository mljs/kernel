const defaultOptions = {
  sigma: 1,
  degree: 1,
};

export default class ANOVAKernel {
  constructor(options) {
    options = { ...defaultOptions, ...options };
    this.sigma = options.sigma;
    this.degree = options.degree;
  }

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
