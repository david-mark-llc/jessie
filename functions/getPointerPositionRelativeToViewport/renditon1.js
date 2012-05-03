//So let's finish this off. If you need it to work in IE 9 and
//virtually every other browser made since the turn of the century:-
// Works for mouse or touch
if ('number' == typeof global.pageXOffset) {
	getPointerPositionRelativeToViewport = function(e) {
		return [e.pageX - window.pageXOffset, e.pageY -	window.pageYOffset]
	};
};

//Now, what if you need IE 6-8 to join in the fun?

//Put this script inside conditional comments (so the others don't
//download it):-

// Last test is to exclude IE quirks mode and IE 5

if (html
	&& 'number' == typeof html.scrollLeft 
	&& html.clientWidth) {
		
	getScrollPosition = function() {
		return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
	};

	getPointerPositionRelativeToViewport = function(e) {

		// Yes, we would use these in non-IE browsers too if history of
		// implementation
		// wasn't atrocious. Perhaps in a few years...
		// Regardless, you know for sure these work as advertised in
		// legacy IE versions
		// NOTE: the HTML border "issue" is irrelevant as same offset for
		//element positions

		return [e.clientX, e.clientY]
	};
}

/*
Will leave rest as an exercise. Hint: need to add
getElementRectangleRelativeToViewport (see
getElementPositionRelativeToViewport from previous tip). Also need
isPointInRectangle, which is trivial and browser agnostic (so no need
to make that function's creation conditional).


And actually, the way it ended up (with the two functions working
independently), don't even need getScrollPosition. Could have written
getPointerPositionRelativeToViewport to call the getScrollPosition
function, but that would just slow things down (and retrieving pointer
position needs to be as fast as possible). Better to render the two
functions as a unit (if the other one is needed at all).

if (getPointerPositionRelativeToViewport) {
var el = getElementById('johnstockton');
el.onmousedown = ...
el.ondblclick = ...
}

And may not need the latter either; depends on what this is to be used
for (was envisioning a single canvas with regions delineated by
drawing). As always, YMMV.
*/