var getViewportScrollPosition;
if( globalDocument && 
	'number' == typeof globalDocument.scrollLeft &&
	'number' == typeof globalDocument.scrollTop &&
	'string' == typeof globalDocument.compatMode &&
	globalDocument.compatMode.indexOf('css') != -1) {
	
	getViewportScrollPosition = function() {
		return [document.scrollLeft, document.scrollTop];
	};	

};