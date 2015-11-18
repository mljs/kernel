'use strict';

var kernel = require('..');

describe('kernel factory', function () {
    it('should create a gaussian kernel function', function () {
        var kernelFunction = kernel('gaussian');
        Array.from(kernelFunction([[1, 1]], [[1, 1]])).should.eql([[1]]);
        Array.from(kernelFunction([[1, 1]])).should.eql([[1]]); // auto landmarks
    });
    it('should be case-insensitive', function () {
        kernel('GaUsSian');
        kernel('RBF');
    });
    it('should throw on invalid types', function () {
        (function () {
            kernel('abc');
        }).should.throw(/unsupported kernel type/);
    });
});
