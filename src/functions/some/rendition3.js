/*
Description:
Wide support, cutting edge where possible
*/

/*
Author:
Adam Silver
*/

var some;

if(Array.prototype.some) {
	some = function(arr, iterator, context) {
		return arr.some(iterator, context);
	};
} else {
	some = function(arr, iterator, context) {

		var i = 0,
			l = arr.length;

		context = context || arr;

		for( ; i < l; i++ ){

			if( iterator.call(context, arr[ i ], i, arr) ){
				return true;
			}
		}

		return false;
	};
}