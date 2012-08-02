/*global isHostMethod,html */

/*
Description:
Relies on MS event model `e.cancelBubble`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var cancelPropagation;

if(html && isHostMethod(html, 'attachEvent')) {
	cancelPropagation = function(e) {
		e.cancelBubble = true;
	};
}