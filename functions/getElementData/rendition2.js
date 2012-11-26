/*global html,isHostMethod */

/*
 Description:
 Relies on el.getAttribute
 */

/*
 Degrades:
 IE5-
 */

/*
 Author:
 Graham Veal
 */

var getElementData;

if( html && isHostMethod( html, "getAttribute" ) ){

	getElementData = function( el, dataName ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		return el.getAttribute( 'data-' + dataName );
	};
}