/*global */

/*
Description:
Wide support.
*/

/*
Author:
Graham Veal
*/

var some;

some = function(arr, iterator, context) {
        var i = 0, l = arr.length;

        for( ; i < l; i++ ) {
                if ( iterator.call(context, arr[ i ], i, arr) ) {
                        return true;
                }
        }

        return false;
};
