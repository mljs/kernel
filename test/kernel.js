'use strict';

var Kernel = require('..');

describe('kernel factory', function () {
    it('should compute a linear kernel', function () {
        var kernel = new Kernel('linear');
        Array.from(kernel.compute([[1, 2], [3, 4]])).should.eql([[5, 11], [11, 25]]);
        Array.from(kernel.compute([[1, 3]])).should.eql([[10]]);
    });

    it('should compute a linear kernel with landmarks', function () {
        var kernel = new Kernel('linear');
        Array.from(kernel.compute([[1, 2], [3, 4]], [[1, 1], [2, 2]])).should.eql([[3, 6], [7, 14]]);
    });
    it('should create a gaussian kernel function', function () {
        var kernel = new Kernel('gaussian');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
        Array.from(kernel.compute([[1, 1]])).should.eql([[1]]); // auto landmarks
    });
    it('should create a polynomial kernel function', function () {
        var kernel = new Kernel('polynomial');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[3]]);
    });
    it('should create a exponential kernel function', function () {
        var kernel = new Kernel('exponential');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
    });
    it('should create a laplacian kernel function', function () {
        var kernel = new Kernel('laplacian');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
    });
    it('should create a anova kernel function', function () {
        var kernel = new Kernel('anova');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[2]]);
    });
    it('should create a rational quadratic kernel function', function () {
        var kernel = new Kernel('rational');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
    });
    it('should create a multiquadratic kernel function', function () {
        var kernel = new Kernel('multiquadratic');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
    });
    it('should create a cauchy kernel function', function () {
        var kernel = new Kernel('cauchy');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[1]]);
    });
    it('should create a histogram intersection kernel function', function () {
        var kernel = new Kernel('histogram');
        Array.from(kernel.compute([[1, 1]], [[1, 1]])).should.eql([[2]]);
    });
    it('should be case-insensitive', function () {
        new Kernel('GaUsSian');
        new Kernel('RBF');
    });
    it('should throw on invalid types', function () {
        ( function () {
            new Kernel('abc');
        } ).should.throw(/unsupported kernel type/);
    });
});
