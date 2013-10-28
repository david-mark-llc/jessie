/*global delegateListener*/

/*

For browsers that support focusout event. i.e. not firefox

*/

var delegateBlurListener;

if(delegateListener) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		return delegateListener(el, 'focusout', fn, fnDelegate);
	};
}