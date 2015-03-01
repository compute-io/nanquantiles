/**
*
*	COMPUTE: nanquantiles
*
*
*	DESCRIPTION:
*		-  Computes quantiles for an array ignoring non-numeric values.
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

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isNumber = require( 'validate.io-number' ),
	isBoolean = require( 'validate.io-boolean' );


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


// NANQUANTILES //

/**
* FUNCTION: nanquantiles( arr, num[, opts] )
*	Computes quantiles for an array ignoring non-numeric values.
*
* @param {Array} arr - array of values
* @param {Number} num - number of quantiles
* @param {Object} [opts] - function options
* @param {Boolean} [opts.sorted=false] - boolean flag indicating if the input array is sorted in ascending order.
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Array|null} array of quantiles or null
*/
function nanquantiles( arr, num, opts ) {
	var sorted,
		clbk,
		qValues,
		id,
		val,
		len,
		d,
		x,
		i;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'nanquantiles()::invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	if ( !isNonNegativeInteger( num ) ) {
		throw new TypeError( 'nanquantiles()::invalid input argument. Number of quantiles must be a nonnegative integer. Value: `' + num + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'nanquantiles()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'sorted' ) ) {
			sorted = opts.sorted;
			if ( !isBoolean( sorted ) ) {
				throw new TypeError( 'nanquantiles()::invalid option. Sorted flag must be a boolean. Option: `' + sorted + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( typeof clbk !== 'function' ) {
				throw new TypeError( 'nanquantiles()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	d = [];
	for ( i = 0; i < arr.length; i++ ) {
		x = ( clbk ) ? clbk( arr[i] ) : arr[ i ];
		if ( isNumber( x ) ) {
			d.push( x );
		}
	}
	len = d.length;
	if ( !len ) {
		return null;
	}
	if ( !sorted ) {
		d.sort( ascending );
	}
	qValues = new Array( num+1 );

	// 0th quantile is the min:
	qValues[ 0 ] = d[ 0 ];

	// Max defines the quantile upper bound:
	qValues[ num ] = d[ len-1 ];

	// Get the quantiles...
	for ( i = 1; i < num; i++ ) {
		// Calculate the vector index marking the quantile:
		id = ( len * i / num ) - 1;

		// Is the index an integer?
		if ( id%1 === 0 ) {
			// Value is the average between the value at id and id+1:
			val = ( d[ id ] + d[ id+1 ] ) / 2.0;
		} else {
			// Round up to the next index:
			id = Math.ceil( id );
			val = d[ id ];
		}
		qValues[ i ] = val;
	} // end FOR i
	return qValues;
} // end FUNCTION nanquantiles()


// EXPORTS //

module.exports = nanquantiles;
