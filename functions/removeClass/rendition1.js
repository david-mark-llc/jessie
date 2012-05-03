/*global removeClass:true,html */
if(html && "string" == typeof html.className) {
	removeClass = function(el, className) {
		var re, m;
		if (el.className) {
			if (el.className == className) {
				el.className = '';
			} else {
				re = new RegExp('(^|\\s)' + className + '(\\s|$)');
				m = el.className.match(re);
				if (m && m.length == 3) {
					el.className = el.className.replace(re, (m[1] && m[2])?' ':'');
				}
			}
		}
	};
}