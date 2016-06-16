'use strict';

const Matrix = require('ml-matrix');

const GaussianKernel = require('ml-gaussian-kernel');
const PolynomialKernel = require('ml-polynomial-kernel');

class Kernel {
    constructor (type, options) {
        if (typeof type === 'string') {
            switch (type.toLowerCase()) {
                case 'gaussian':
                case 'rbf':
                    this.kernelFunction = new GaussianKernel(options);
                    break;
                case 'polynomial':
                case 'poly':
                    this.kernelFunction = new PolynomialKernel(options);
                    break;
                default:
                    throw new Error('unsupported kernel type: ' + type);
            }
        } else if (typeof type === 'object' && typeof type.compute === 'function') {
            this.kernelFunction = type;
        } else {
            throw new TypeError('first argument must be a valid kernel type or instance');
        }
    }

    compute(inputs, landmarks) {
        if (landmarks === undefined) {
            landmarks = inputs;
        }
        const kernelMatrix = new Matrix(inputs.length, landmarks.length);
        var i, j;
        if (inputs === landmarks) { // fast path, matrix is symmetric
            for (i = 0; i < inputs.length; i++) {
                for (j = i; j < inputs.length; j++) {
                    kernelMatrix[i][j] = kernelMatrix[j][i] = this.kernelFunction.compute(inputs[i], inputs[j]);
                }
            }
        } else {
            for (i = 0; i < inputs.length; i++) {
                for (j = 0; j < landmarks.length; j++) {
                    kernelMatrix[i][j] = this.kernelFunction.compute(inputs[i], landmarks[j]);
                }
            }
        }
        return kernelMatrix;
    }
}

module.exports = Kernel;
