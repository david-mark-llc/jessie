/*global html,isHostMethod,getEventTarget,delegateListener */

/*

For browsers that can capture inc firefox

*/

var delegateBlurListener;

// for browsers that can capture including firefox
if(html && isHostMethod(html, 'addEventListener')) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		var listener = function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(currentTarget, e, currentTarget, el);
			}
		};
		return el.addEventListener('blur', listener, true);
	};
// for browsers that use attachEvent which we know supports the focusout event
} else if(html && isHostMethod(html, 'attachEvent') && delegateListener) {
	delegateBlurListener = function(el, fn, fnDelegate) {
		return delegateListener(el, 'focusout', fn, fnDelegate);
	};
}