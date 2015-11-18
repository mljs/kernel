'use strict';

const gaussianKernel = require('ml-gaussian-kernel');

module.exports = kernel;

function kernel(type, options) {
    var kernelFunction;
    switch (type.toLowerCase()) {
        case 'gaussian':
        case 'rbf':
            kernelFunction = gaussianKernel;
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
