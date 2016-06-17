# ml-kernel

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

A factory for kernel functions

## Installation

`$ npm install ml-kernel`

## Usage

### new Kernel(type, options)

This function can be called with a matrix of input vectors
and optional landmarks. If no landmark is provided, the input vectors will be used.

__Available kernels__

* `gaussian` or `rbf` - [Gaussian (radial basis function) kernel](https://github.com/mljs/gaussian-kernel)
* `polynomial` or `poly` - [Polynomial kernel](https://github.com/mljs/polynomial-kernel)
* `exponential` - [Exponential kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#exponential)
* `laplacian` - [Laplacian kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#laplacian)
* `anova` - [ANOVA kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#anova)
* `rational quadratic` or `rational` - [Rational Quadratic kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#rational)
* `multiquadratic` - [Multiquadratic kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#multiquadric)
* `cauchy` - [Cauchy kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#cauchy)
* `histogram intersection`, `histogram` or `min` - [Histogram Intersection kernel](http://crsouza.com/2010/03/kernel-functions-for-machine-learning-applications/#histogram)

### kernel.compute(inputs, landmarks)

This function can be called with a matrix of input vectors and optional landmarks.
If no landmark is provided, the input vectors will be used.  
The function returns a kernel matrix of feature space vectors.

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
