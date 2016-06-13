"use strict";

var Kernel = require( ".." );

describe( "kernel factory", function ()
{
    it( "should create a gaussian kernel function", function ()
    {
        var kernel = new Kernel( "gaussian" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[1]] );
        Array.from( kernel.compute( [[1, 1]] ) ).should.eql( [[1]] ); // auto landmarks
    } );
    it( "should create a polynomial kernel function", function ()
    {
        var kernel = new Kernel( "polynomial" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[3]] );
    } );
    it( "should create a exponential kernel function", function ()
    {
        var kernel = new Kernel( "exponential" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[1]] );
    } );
    it( "should create a laplacian kernel function", function ()
    {
        var kernel = new Kernel( "laplacian" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[1]] );
    } );
    it( "should create a anova kernel function", function ()
    {
        var kernel = new Kernel( "anova" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[2]] );
    } );
    it( "should create a rational quadratic kernel function", function ()
    {
        var kernel = new Kernel( "rational quadratic" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[1]] );
    } );
    it( "should create a multiquadratic kernel function", function ()
    {
        var kernel = new Kernel( "multiquadratic" );
        Array.from( kernel.compute( [[1, 1]], [[1, 1]] ) ).should.eql( [[1]] );
    } );
    it( "should be case-insensitive", function ()
    {
        new Kernel( "GaUsSian" );
        new Kernel( "RBF" );
    } );
    it( "should throw on invalid types", function ()
    {
        ( function ()
        {
            new Kernel('abc');
        } ).should.throw( /unsupported kernel type/ );
    } );
} );
