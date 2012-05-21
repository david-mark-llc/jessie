/*
Description:
Rendition for both W3C and MS event model which supports IE- as well.
*/

var getEventTargetRelated;

getEventTargetRelated = function(e) {
	if (e.relatedTarget) {
		return (e.relatedTarget.nodeType == 3)?e.relatedTarget.parentNode:e.relatedTarget;
	}
	if (e.srcElement) {
		if (e.srcElement == e.fromElement) { return e.toElement; }
		if (e.srcElement == e.toElement) { return e.fromElement; }
	}
	return null;
};