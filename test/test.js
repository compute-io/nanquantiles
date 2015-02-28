/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanquantiles = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanquantiles', function tests() {

	it( 'should export a function', function test() {
		expect( nanquantiles ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array for the first argument', function test() {
		var values = [
				'5',
				5,
				true,
				undefined,
				null,
				NaN,
				function(){},
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nanquantiles( value, 10 );
			};
		}
	});

	it( 'should throw an error if provided a non-positive integer for the number of quantiles', function test() {
		var values = [
				'5',
				-1,
				[],
				true,
				undefined,
				null,
				NaN,
				function(){},
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nanquantiles( [1,2,3,4], value );
			};
		}
	});

	it( 'should throw an error if `options` is not an object', function test(){
		var values = [
				'',
				5,
				null,
				undefined,
				NaN,
				true,
				function(){},
				[]
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				nanquantiles( [1,2,3,4], 1, value );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean sorted flag', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				nanquantiles( [], 1, {'sorted': value } );
			};
		}
	});

	it( 'should compute quantiles', function test() {
		var data, expected;

		data = new Array( 20 );
		for ( var i = data.length; i > 0; i-- ) {
			data[ i-1 ] = i;
		}

		// Quantiles also returns the min and max (0th and 100th percentiles):
		expected = [ 1, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5, 16.5, 18.5, 20 ];

		assert.deepEqual( nanquantiles( data, 10 ), expected );

		data = new Array( 11 );
		for ( var j = data.length; j > 0; j-- ) {
			data[ j-1 ] = j;
		}

		// Return the median...
		expected = [ 1, 6, 11 ];

		assert.deepEqual( nanquantiles( data, 2 ), expected );

		// Sorted:
		data = [ 1, 2, 3, 4, 5 ];
		expected = [ 1, 3, 5 ];

		assert.deepEqual( nanquantiles( data, 2, {'sorted': true} ), expected );
	});

	it( 'should compute quantiles ignoring non-numeric values', function test() {
		var data, expected;

		data = new Array( 20 );
		for ( var i = data.length; i > 0; i-- ) {
			data[ i-1 ] = i;
		}

		// insert null values
		data.splice(2, 0, null, null, null);

		// Quantiles also returns the min and max (0th and 100th percentiles):
		expected = [ 1, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5, 16.5, 18.5, 20 ];

		assert.deepEqual( nanquantiles( data, 10 ), expected );

		data = new Array( 11 );
		for ( var j = data.length; j > 0; j-- ) {
			data[ j-1 ] = j;
		}

		// insert null values
		data.splice(2, 0, null, null, null);

		// Return the median...
		expected = [ 1, 6, 11 ];

		assert.deepEqual( nanquantiles( data, 2 ), expected );

		// Sorted:
		data = [ 1, 2, 3, 4, 5 ];
		expected = [ 1, 3, 5 ];

		assert.deepEqual( nanquantiles( data, 2, {'sorted': true} ), expected );
	});

});
