nanquantiles
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

>  Computes quantiles for an array ignoring non-numeric values.


## Installation

``` bash
$ npm install compute-nanquantiles
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var nanquantiles = require( 'compute-nanquantiles' );
```

#### nanquantiles( arr, num[, opts] )

Computes _q_-quantiles for an `array` ignoring non-numeric values. `num` specifies the number of quantiles to compute. For unsorted primitive `arrays`,

``` javascript
var unsorted = [ 4, 2, null, 5, 3 ];

var q = nanquantiles( unsorted, 2 );
// returns [ 2, 3.5, 5 ]
```

The function accepts the following `options`:
*	`sorted`: `boolean` flag indicating if an input `array` is sorted in __ascending__ order. Default: `false`.
*	`accessor`: accessor `function` for accessing values in an object `array`.

If the input `array` is already sorted in __ascending__ order, set the `sorted` option to `true`.

``` javascript
var sorted = [ 2, 3, null, 4, 5 ];

var q = nanquantiles( sorted, 2, {
	'sorted': true
});
// returns [ 2, 3.5, 5 ];
```

For object `arrays`, provide an accessor `function` for accessing `array` values

``` javascript
var data = [
	[1,2],
	[2,3],
	[3,null],
	[4,4],
	[5,5]
];

function getValue( d ) {
	return d[ 1 ];
}

var q = nanquantiles( data, 2, {
	'sorted': true,
	'accessor': getValue
});
// returns [ 2, 3.5, 5 ];
```


## Notes

*	For an input `array` containing no numeric values, the function returns `null`.
* 	The function returns the 0th and 100th quantiles; a.k.a., the min and the max. For example, when computing the median,

``` javascript
var data = new Array( 11 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i + 1;
}
console.log( nanquantiles( data, 2 ) );
// returns [ 1, 6, 11 ]
```

the function returns `[1,6,11]`, where `min = 1`, `max = 11`, and `median = 6`. Accordingly, you should expect the output to be an `array` with `length = q + 1`, where `q` is the number of quantiles.




## Examples

``` javascript
var nanquantiles = require( 'compute-nanquantiles' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	if ( i%2 === 0 ) {
		data[ i ] = null;
	} else {
		data[ i ] = Math.round( Math.random() * 100 );
	}
}
console.log( nanquantiles( data, 10 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```





## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/compute-nanquantiles.svg
[npm-url]: https://npmjs.org/package/compute-nanquantiles

[travis-image]: http://img.shields.io/travis/compute-io/nanquantiles/master.svg
[travis-url]: https://travis-ci.org/compute-io/nanquantiles

[coveralls-image]: https://img.shields.io/coveralls/compute-io/nanquantiles/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/nanquantiles?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/nanquantiles.svg
[dependencies-url]: https://david-dm.org/compute-io/nanquantiles

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nanquantiles.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nanquantiles

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nanquantiles.svg
[github-issues-url]: https://github.com/compute-io/nanquantiles/issues
