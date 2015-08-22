/*global delegateListener,isEventSupported*/

/*
Description:
For browsers that support focusout i.e. not Firefox
*/

/*
Author:
Adam Silver
*/

var delegateBlurListener;

if(delegateListener && isEventSupported('focusout')) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		return delegateListener(el, 'focusout', fn, fnDelegate);
	};
}