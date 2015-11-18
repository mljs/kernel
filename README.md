# ml-kernel

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

A factory for kernel functions

## Installation

`$ npm install ml-kernel`

## Usage

### kernel(type, options)

Returns a kernel function. This function can be called with a matrix of input vectors
and optional landmarks. If no landmark is provided, the input vectors will be used.

## Available kernels

* [Gaussian (radial basis function) kernel](https://github.com/mljs/gaussian-kernel)
* [Polynomial kernel](https://github.com/mljs/polynomial-kernel)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-kernel.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-kernel
[travis-image]: https://img.shields.io/travis/mljs/kernel/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/kernel
[david-image]: https://img.shields.io/david/mljs/kernel.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/kernel
[download-image]: https://img.shields.io/npm/dm/ml-kernel.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-kernel
