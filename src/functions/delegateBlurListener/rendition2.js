/*global html,isHostMethod,getEventTarget */

/*
Description:
For browsers that can capture
*/


var delegateBlurListener;

if(html && isHostMethod(html, 'addEventListener')){
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