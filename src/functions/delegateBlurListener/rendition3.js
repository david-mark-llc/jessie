/*global html,isHostMethod,getEventTarget,delegateListener,isEventSupported */

/*
Description:
Wide support
*/


var delegateBlurListener;


if(delegateListener && isEventSupported('focusout', html)) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		return delegateListener(el, 'focusout', fn, fnDelegate);
	};
} else if(html && isHostMethod(html, 'addEventListener')){
	delegateBlurListener = function(el, fn, fnDelegate) {
		var listener = function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(currentTarget, e, currentTarget, el);
			}
		};
		el.addEventListener('blur', listener, true);
		return listener;
	};
}