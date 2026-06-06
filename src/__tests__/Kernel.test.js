import { expect, test } from 'vitest';

import { Kernel } from '../index.js';

test('should compute a linear kernel', () => {
  const kernel = new Kernel('linear');

  expect(
    kernel
      .compute([
        [1, 2],
        [3, 4],
      ])
      .to2DArray(),
  ).toStrictEqual([
    [5, 11],
    [11, 25],
  ]);
  expect(kernel.compute([[1, 3]]).to2DArray()).toStrictEqual([[10]]);
});

test('should compute a linear kernel with landmarks', () => {
  const kernel = new Kernel('linear');

  expect(
    kernel
      .compute(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [1, 1],
          [2, 2],
        ],
      )
      .to2DArray(),
  ).toStrictEqual([
    [3, 6],
    [7, 14],
  ]);
});

test('should create a gaussian kernel function', () => {
  const kernel = new Kernel('gaussian');

  expect(kernel.compute([[1, 1]], [[1, 1]]).to2DArray()).toStrictEqual([[1]]);
  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]); // auto landmarks
});

test('should create a polynomial kernel function', () => {
  const kernel = new Kernel('polynomial');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[3]]);
});

test('should create a exponential kernel function', () => {
  const kernel = new Kernel('exponential');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
});

test('should create a laplacian kernel function', () => {
  const kernel = new Kernel('laplacian');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
});

test('should create a anova kernel function', () => {
  const kernel = new Kernel('anova');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[2]]);
});

test('should create a rational quadratic kernel function', () => {
  const kernel = new Kernel('rational');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
});

test('should create a multiquadratic kernel function', () => {
  const kernel = new Kernel('multiquadratic');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
});

test('should create a cauchy kernel function', () => {
  const kernel = new Kernel('cauchy');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[1]]);
});

test('should create a histogram intersection kernel function', () => {
  const kernel = new Kernel('histogram');

  expect(kernel.compute([[1, 1]]).to2DArray()).toStrictEqual([[2]]);
});

test('should create a sigmoid kernel', () => {
  const kernel = new Kernel('sigmoid');

  expect(kernel.compute([[1, 1]]).get(0, 0)).toBeCloseTo(-1, 1);
});

test('should be case-insensitive', () => {
  expect(() => new Kernel('GaUsSian')).not.toThrow();
  expect(() => new Kernel('RBF')).not.toThrow();
});

test('should throw on invalid types', () => {
  expect(() => new Kernel('abc')).toThrow(/unsupported kernel type/);
});
