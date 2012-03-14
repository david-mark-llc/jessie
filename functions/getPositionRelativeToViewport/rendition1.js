var getPositionRelativeToViewport;
if(html && isHostMethod(html, 'getBoundingClientRect')) {
	getPositionRelativeToViewport = function(el) {
		var rect = el.getBoundingClientRect();
		return [rect.left, rect.top];
	};
};