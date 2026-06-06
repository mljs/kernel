import GaussianKernel from 'ml-kernel-gaussian';
import PolynomialKernel from 'ml-kernel-polynomial';
import SigmoidKernel from 'ml-kernel-sigmoid';
import { Matrix, MatrixTransposeView } from 'ml-matrix';

import ANOVAKernel from './kernels/anova-kernel.js';
import CauchyKernel from './kernels/cauchy-kernel.js';
import ExponentialKernel from './kernels/exponential-kernel.js';
import HistogramKernel from './kernels/histogram-intersection-kernel.js';
import LaplacianKernel from './kernels/laplacian-kernel.js';
import MultiquadraticKernel from './kernels/multiquadratic-kernel.js';
import RationalKernel from './kernels/rational-quadratic-kernel.js';

const kernelType = {
  gaussian: GaussianKernel,
  rbf: GaussianKernel,
  polynomial: PolynomialKernel,
  poly: PolynomialKernel,
  anova: ANOVAKernel,
  cauchy: CauchyKernel,
  exponential: ExponentialKernel,
  histogram: HistogramKernel,
  min: HistogramKernel,
  laplacian: LaplacianKernel,
  multiquadratic: MultiquadraticKernel,
  rational: RationalKernel,
  sigmoid: SigmoidKernel,
  mlp: SigmoidKernel,
};

/**
 * Factory that builds a kernel from its name (or a custom kernel instance) and
 * computes the kernel matrix between sets of vectors.
 */
export default class Kernel {
  /**
   * Create a new kernel.
   * @param {string|object} type - Name of the kernel (e.g. `gaussian`, `polynomial`,
   * `linear`, ...) or a custom kernel instance exposing a `compute(x, y)` method.
   * @param {object} [options] - Options forwarded to the underlying kernel constructor.
   */
  constructor(type, options) {
    this.kernelType = type;
    if (type === 'linear') return;

    if (typeof type === 'string') {
      type = type.toLowerCase();

      const KernelConstructor = kernelType[type];
      if (KernelConstructor) {
        this.kernelFunction = new KernelConstructor(options);
      } else {
        throw new Error(`unsupported kernel type: ${type}`);
      }
    } else if (typeof type === 'object' && typeof type.compute === 'function') {
      this.kernelFunction = type;
    } else {
      throw new TypeError(
        'first argument must be a valid kernel type or instance',
      );
    }
  }

  /**
   * Compute the kernel matrix between the input vectors and the landmarks.
   * @param {Array<Array<number>>|import('ml-matrix').Matrix} inputs - Matrix of input row vectors.
   * @param {Array<Array<number>>|import('ml-matrix').Matrix} [landmarks] - Matrix of landmark row
   * vectors. When omitted, the input vectors are used as landmarks.
   * @returns {import('ml-matrix').Matrix} The kernel matrix of feature-space dot products.
   */
  compute(inputs, landmarks) {
    inputs = Matrix.checkMatrix(inputs);
    if (landmarks === undefined) {
      landmarks = inputs;
    } else {
      landmarks = Matrix.checkMatrix(landmarks);
    }
    if (this.kernelType === 'linear') {
      return inputs.mmul(new MatrixTransposeView(landmarks));
    }

    const kernelMatrix = new Matrix(inputs.rows, landmarks.rows);
    if (inputs === landmarks) {
      // fast path, matrix is symmetric
      for (let i = 0; i < inputs.rows; i++) {
        for (let j = i; j < inputs.rows; j++) {
          const value = this.kernelFunction.compute(
            inputs.getRow(i),
            inputs.getRow(j),
          );
          kernelMatrix.set(i, j, value);
          kernelMatrix.set(j, i, value);
        }
      }
    } else {
      for (let i = 0; i < inputs.rows; i++) {
        for (let j = 0; j < landmarks.rows; j++) {
          kernelMatrix.set(
            i,
            j,
            this.kernelFunction.compute(inputs.getRow(i), landmarks.getRow(j)),
          );
        }
      }
    }
    return kernelMatrix;
  }
}
