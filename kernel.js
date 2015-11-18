'use strict';

const gaussianKernel = require('ml-gaussian-kernel');
const polynomialKernel = require('ml-polynomial-kernel');

module.exports = kernel;

function kernel(type, options) {
    var kernelFunction;
    switch (type.toLowerCase()) {
        case 'gaussian':
        case 'rbf':
            kernelFunction = gaussianKernel;
            break;
        case 'polynomial':
        case 'poly':
            kernelFunction = polynomialKernel;
            break;
        default:
            throw new Error('unsupported kernel type: ' + type);
    }

    return function (inputs, landmarks) {
        if (landmarks === undefined) {
            landmarks = inputs;
        }
        return kernelFunction(inputs, landmarks, options);
    };
}
