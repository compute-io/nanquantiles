'use strict';

var nanquantiles = require( './../lib' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	if ( i%2 === 0 ) {
		data[ i ] = null;
	} else {
		data[ i ] = Math.round( Math.random() * 100 );
	}
}
console.log( nanquantiles( data, 10 ) );
