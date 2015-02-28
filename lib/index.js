/**
*
*	COMPUTE: nanquantiles
*
*
*	DESCRIPTION:
*		-  Computes a quantile for a numeric array ignoring all non-numeric values.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Philipp Burckhardt.
*
*
*	AUTHOR:
*		Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );
var isObject = require( 'validate.io-object' );
var isInteger = require( 'validate.io-integer' );
var isNumber = require( 'validate.io-number' );
var isBoolean = require( 'validate.io-boolean' );

// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// QUANTILES //

/**
* FUNCTION: nanquantiles( arr, num[, opts] )
*	Computes quantiles for a numeric array.
*
* @param {Array} arr - array of values
* @param {Number} num - number of quantiles
* @param {Object} [options] - function options
* @returns {Array} quantiles
*/
function nanquantiles( arr, num, opts ) {
	if ( isArray( arr ) === false ) {
		throw new TypeError( 'nanquantiles()::invalid input argument. First argument must be an array.' );
	}
	if ( isInteger( num ) === false || num <= 0 ) {
		throw new TypeError( 'nanquantiles()::invalid input argument. Second argument must be a positive integer.' );
	}
	if ( arguments.length > 2 ) {
		if ( isObject( opts ) === false ) {
			throw new TypeError( 'nanquantiles()::invalid input argument. Options should be an object.' );
		}
		if ( opts.hasOwnProperty( 'sorted' ) && isBoolean(opts.sorted) === false ) {
			throw new TypeError( 'nanquantiles()::invalid input argument. Sorted flag must be a boolean.' );
		}
	} else {
		opts = {};
	}

	var red = [], qValues = new Array( num+1 ), id, val, len;
	for(var i = 0; i < arr.length; i++){
		if( isNumber(arr[i]) === true ){
			red.push( arr[i] );
		}
	}

	len = red.length;
	if ( !opts.sorted ) {
		red.sort( ascending );
	}

	// 0th quantile is the min:
	qValues[ 0 ] = red[ 0 ];

	// Max defines the quantile upper bound:
	qValues[ num ] = red[ len-1 ];

	// Get the quantiles...
	for ( i = 1; i < num; i++ ) {

		// Calculate the vector index marking the quantile:
		id = ( len * i / num ) - 1;

		// Is the index an integer?
		if ( id === Math.floor( id ) ) {
			// Value is the average between the value at id and id+1:
			val = ( red[ id ] + red[ id+1 ] ) / 2.0;
		} else {
			// Round up to the next index:
			id = Math.ceil( id );
			val = red[ id ];
		}
		qValues[ i ] = val;
	} // end FOR i
	return qValues;
} // end FUNCTION nanquantiles()


// EXPORTS //

module.exports = nanquantiles;
