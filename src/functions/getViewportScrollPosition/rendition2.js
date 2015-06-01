/*global global, html, globalDocument */

/*
Description:
No quirks mode, frames or other windows (just the one running the script)
*/

/*
Author:
David Mark
*/

var getViewportScrollPosition;

if('number' == typeof window.pageXOffset) {

	/*
	Many "standards-based" browsers feature this non-standard property. No ambiguity about what this window property means
	 */
	getViewportScrollPosition = function() {
		return [window.pageXOffset, window.pageYOffset];
	};

} else if(html && 'number' == typeof html.scrollTop) {

	/*
	Proprietary IE properties, copied widely by others; often 0,0 in mobile browsers; ambiguous as many mobiles represent an un-scrolled document (i.e.scrollHeight == clientHeight), regardless of which portion of document is viewable
	 */
	getViewportScrollPosition = function() {
		return [html.scrollLeft, html.scrollTop];
	};
}