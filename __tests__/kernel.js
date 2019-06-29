'use strict';

var Kernel = require('..');

describe('kernel factory', function () {
  it('should compute a linear kernel', function () {
    var kernel = new Kernel('linear');
    expect(kernel.compute([[1, 2], [3, 4]]).to2DArray()).toStrictEqual([
      [5, 11],
      [11, 25]
    ]);
    expect(kernel.compute([[1, 3]]).to2DArray()).toStrictEqual([[10]]);
  });

  it('should compute a linear kernel with landmarks', function () {
    var kernel = new Kernel('linear');
    expect(
      kernel.compute([[1, 2], [3, 4]], [[1, 1], [2, 2]]).to2DArray()
    ).toStrictEqual([[3, 6], [7, 14]]);
  });

  it('should create a gaussian kernel function', function () {
    var kernel = new Kernel('gaussian');
    expect(kernel.compute([[1, 1]], [[1, 1]]).to2DArray()).toStrictEqual([[1]]);
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]); // auto landmarks
  });

  it('should create a polynomial kernel function', function () {
    var kernel = new Kernel('polynomial');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[3]]);
  });

  it('should create a exponential kernel function', function () {
    var kernel = new Kernel('exponential');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  });

  it('should create a laplacian kernel function', function () {
    var kernel = new Kernel('laplacian');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  });

  it('should create a anova kernel function', function () {
    var kernel = new Kernel('anova');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[2]]);
  });

  it('should create a rational quadratic kernel function', function () {
    var kernel = new Kernel('rational');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  });

  it('should create a multiquadratic kernel function', function () {
    var kernel = new Kernel('multiquadratic');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  });

  it('should create a cauchy kernel function', function () {
    var kernel = new Kernel('cauchy');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  });

  it('should create a histogram intersection kernel function', function () {
    var kernel = new Kernel('histogram');
    expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[2]]);
  });

  it('should create a sigmoid kernel', function () {
    var kernel = new Kernel('sigmoid');
    expect(kernel.compute([[1, 1]]).get(0, 0)).toBeCloseTo(-1, 1);
  });

  it('should be case-insensitive', function () {
    expect(() => new Kernel('GaUsSian')).not.toThrow();
    expect(() => new Kernel('RBF')).not.toThrow();
  });

  it('should throw on invalid types', function () {
    expect(() => new Kernel('abc')).toThrow(/unsupported kernel type/);
  });
});
