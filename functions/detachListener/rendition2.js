/*global detachListener:true,html,isHostMethod */
// Works in IE 8- 

if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) {
		el.detachEvent('on'+eventType, fn);
	};
}