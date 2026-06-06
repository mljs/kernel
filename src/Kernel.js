import { GaussianKernel } from 'ml-kernel-gaussian';
import { PolynomialKernel } from 'ml-kernel-polynomial';
import { SigmoidKernel } from 'ml-kernel-sigmoid';
import { Matrix, MatrixTransposeView } from 'ml-matrix';

import { ANOVAKernel } from './kernels/ANOVAKernel.js';
import { CauchyKernel } from './kernels/CauchyKernel.js';
import { ExponentialKernel } from './kernels/ExponentialKernel.js';
import { HistogramIntersectionKernel } from './kernels/HistogramIntersectionKernel.js';
import { LaplacianKernel } from './kernels/LaplacianKernel.js';
import { MultiquadraticKernel } from './kernels/MultiquadraticKernel.js';
import { RationalQuadraticKernel } from './kernels/RationalQuadraticKernel.js';

const kernelType = {
  gaussian: GaussianKernel,
  rbf: GaussianKernel,
  polynomial: PolynomialKernel,
  poly: PolynomialKernel,
  anova: ANOVAKernel,
  cauchy: CauchyKernel,
  exponential: ExponentialKernel,
  histogram: HistogramIntersectionKernel,
  min: HistogramIntersectionKernel,
  laplacian: LaplacianKernel,
  multiquadratic: MultiquadraticKernel,
  rational: RationalQuadraticKernel,
  sigmoid: SigmoidKernel,
  mlp: SigmoidKernel,
};

/**
 * Factory that builds a kernel from its name (or a custom kernel instance) and
 * computes the kernel matrix between sets of vectors.
 */
export class Kernel {
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
    // Extract each row once: getRow() allocates a new array, so calling it
    // inside the O(n*m) loop would re-extract the same rows n (or m) times.
    const inputRows = getRows(inputs);
    if (inputs === landmarks) {
      // fast path, matrix is symmetric
      for (let i = 0; i < inputs.rows; i++) {
        for (let j = i; j < inputs.rows; j++) {
          const value = this.kernelFunction.compute(inputRows[i], inputRows[j]);
          kernelMatrix.set(i, j, value);
          kernelMatrix.set(j, i, value);
        }
      }
    } else {
      const landmarkRows = getRows(landmarks);
      for (let i = 0; i < inputs.rows; i++) {
        for (let j = 0; j < landmarks.rows; j++) {
          kernelMatrix.set(
            i,
            j,
            this.kernelFunction.compute(inputRows[i], landmarkRows[j]),
          );
        }
      }
    }
    return kernelMatrix;
  }
}

/**
 * Extract every row of a matrix once into an array of plain arrays.
 * @param {import('ml-matrix').Matrix} matrix - Matrix to extract rows from.
 * @returns {Array<Array<number>>} The matrix rows.
 */
function getRows(matrix) {
  const rows = new Array(matrix.rows);
  for (let i = 0; i < matrix.rows; i++) {
    rows[i] = matrix.getRow(i);
  }
  return rows;
}
