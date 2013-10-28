/*global delegateListener,isEventSupported*/

/*

For browsers that support focusout event. i.e. not firefox

*/

var delegateBlurListener;

if(delegateListener && isEventSupported('focusout')) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		return delegateListener(el, 'focusout', fn, fnDelegate);
	};
}