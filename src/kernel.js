"use strict";

const Matrix = require( "ml-matrix" );

const GaussianKernel = require( "ml-gaussian-kernel" );
const PolynomialKernel = require( "ml-polynomial-kernel" );
const ExponentialKernel = require( "./kernels/exponential-kernel" );
const LaplacianKernel = require( "./kernels/laplacian-kernel" );
const ANOVAKernel = require( "./kernels/anova-kernel" );

class Kernel
{
    constructor( type, options )
    {
        var kernelType = {"gaussian" : new GaussianKernel( options ), "rbf" : new GaussianKernel( options ),
            "polynomial" : new PolynomialKernel( options ), "poly" : new PolynomialKernel( options ),
            "exponential" : new ExponentialKernel( options ), "laplacian" : new LaplacianKernel( options ),
            "anova" : new ANOVAKernel( options )};
        if( typeof type === "string" )
        {
            type = type.toLowerCase();

            var aux = kernelType[type];
            if( aux == null )
                throw new Error( "unsupported kernel type: " + type );

            this.kernelFunction = aux;
        }
        else if( typeof type === "object" && typeof type.compute === "function" )
            this.kernelFunction = type;
        else
            throw new TypeError( "first argument must be a valid kernel type or instance" );
    }

    compute( inputs, landmarks )
    {
        if( landmarks === undefined )
            landmarks = inputs;
        const kernelMatrix = new Matrix( inputs.length, landmarks.length );
        if( inputs === landmarks ) // fast path, matrix is symmetric
            for( var i = 0; i < inputs.length; ++i )
                for( var j = i; j < inputs.length; ++j)
                    kernelMatrix[i][j] = kernelMatrix[j][i] = this.kernelFunction.compute( inputs[i], inputs[j] );
        else
            for( var i = 0; i < inputs.length; ++i )
                for( var j = 0; j < landmarks.length; ++j )
                    kernelMatrix[i][j] = this.kernelFunction.compute( inputs[i], landmarks[j] );
        return kernelMatrix;
    }
}

module.exports = Kernel;
