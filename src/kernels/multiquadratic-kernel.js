'use strict';

const squaredEuclidean = require('ml-euclidean-distance').squared;

const defaultOptions =
    {
        constant: 1
    };

class MultiquadraticKernel
{
    constructor(options)
    {
        options = Object.assign({}, defaultOptions, options);
        this.constant = options.constant;
    }

    compute(x, y)
    {
        return Math.sqrt(squaredEuclidean(x, y) + this.constant * this.constant);
    }
}

module.exports = MultiquadraticKernel;
