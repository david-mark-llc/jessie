/*global setElementAttribute */

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

var setElementDataAttribute;

if( setElementAttribute ){

	setElementDataAttribute = function( el, dataName, dataValue ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		setElementAttribute( el, dataName, dataValue );
	};
}