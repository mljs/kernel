"use strict";

const squaredEuclidean = require( "ml-euclidean-distance" ).squared;

const defaultOptions =
{
    sigma : 1
};

class LaplacianKernel
{
    constructor( options )
    {
        options = Object.assign( {}, defaultOptions, options );
        this.sigma = options.sigma;
    }

    compute( x, y )
    {
        const distance = Math.sqrt( squaredEuclidean( x, y ) );
        return Math.exp( -distance / this.sigma );
    }
}

module.exports = LaplacianKernel;
