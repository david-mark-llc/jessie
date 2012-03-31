var getPositionRelativeToWindow;
if(html && isHostMethod(html, 'getBoundingClientRect')) {
	getPositionRelativeToWindow = function(el) {
		var rect = el.getBoundingClientRect();
		return [rect.left, rect.top];
	};
};