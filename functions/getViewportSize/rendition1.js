/*global global */

var getViewportSize;

/*

Description:
Will likely *include* space occupied by scroll bars

*** Viewport META

Relies on:
Degrades: IE8
*/


/*
Author: David Mark
*/

if (typeof global.innerWidth == 'number') {
	getViewportSize = function(win /* window */) {
		return [win.innerWidth, win.innerHeight]; // Array
	};
}