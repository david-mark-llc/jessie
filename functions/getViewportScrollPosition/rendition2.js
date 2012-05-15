/*global getViewportScrollPosition:true,globalDocument */

var getViewportScrollPosition;

if( globalDocument &&
	'number' == typeof globalDocument.scrollLeft &&
	'number' == typeof globalDocument.scrollTop &&
	'string' == typeof globalDocument.compatMode &&
	globalDocument.compatMode.indexOf('css') != -1) {
	
	getViewportScrollPosition = function() {
		return [document.scrollLeft, document.scrollTop];
	};

}
else if( globalDocument &&
	globalDocument.body &&
	'number' == typeof globalDocument.body.scrollLeft &&
	'number' == typeof globalDocument.body.scrollTop) {
	
	getViewportScrollPosition = function() {
		return [document.body.scrollLeft, document.body.scrollTop];
	};
}