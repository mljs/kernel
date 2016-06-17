'use strict';

const Matrix = require('ml-matrix');

const GaussianKernel = require('ml-gaussian-kernel');
const PolynomialKernel = require('ml-polynomial-kernel');
const ANOVAKernel = require('./kernels/anova-kernel');
const CauchyKernel = require('./kernels/cauchy-kernel');
const ExponentialKernel = require('./kernels/exponential-kernel');
const HistogramKernel = require('./kernels/histogram-intersection-kernel');
const LaplacianKernel = require('./kernels/laplacian-kernel');
const MultiquadraticKernel = require('./kernels/multiquadratic-kernel');
const RationalKernel = require('./kernels/rational-quadratic-kernel');

class Kernel {
    constructor(type, options) {
        var kernelType = {  'gaussian' : new GaussianKernel(options),
                            'rbf' : new GaussianKernel(options),
                            'polynomial' : new PolynomialKernel(options),
                            'poly' : new PolynomialKernel(options),
                            'anova' : new ANOVAKernel(options),
                            'cauchy' : new CauchyKernel(options),
                            'exponential' : new ExponentialKernel(options),
                            'histogram intersection' : new HistogramKernel(options),
                            'histogram' : new HistogramKernel(options),
                            'min' : new HistogramKernel(options),
                            'laplacian' : new LaplacianKernel(options),
                            'multiquadratic' : new MultiquadraticKernel(options),
                            'rational quadratic' : new RationalKernel(options),
                            'rational' : new RationalKernel(options)};
        if(typeof type === 'string') {
            type = type.toLowerCase();
            var aux = kernelType[type];
            if( aux == null )
                throw new Error('unsupported kernel type: ' + type);
            this.kernelFunction = aux;
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
