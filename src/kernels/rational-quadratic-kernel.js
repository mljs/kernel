'use strict';

const squaredEuclidean = require('ml-euclidean-distance').squared;

const defaultOptions = {
    constant: 1
};

class RationalQuadraticKernel {
    constructor(options) {
        options = Object.assign({}, defaultOptions, options);
        this.constant = options.constant;
    }

    compute(x, y) {
        const distance = squaredEuclidean(x, y);
        return 1 - (distance / (distance + this.constant));
    }
}

module.exports = RationalQuadraticKernel;
