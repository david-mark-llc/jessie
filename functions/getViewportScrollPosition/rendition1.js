/*global getViewportScrollPosition:true,global */

if('number' == typeof global.pageXOffset && 'number' == typeof global.pageYOffset ) {
	getViewportScrollPosition = function() {
		return [global.pageXOffset, global.pageYOffset];
	};
}