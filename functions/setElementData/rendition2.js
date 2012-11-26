/*global html,isHostMethod */

/*
 Description:
 Relies on el.setAttribute, <string>.replace, <string>.toLowerCase
 */

/*
 Degrades:
 IE5-
 */

/*
 Author:
 Graham Veal
 */

var setElementData;

if( html && isHostMethod( html, "setAttribute" ) ){

	setElementData = function( el, dataName, dataValue ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		el.setAttribute( dataName, dataValue );
	};
}