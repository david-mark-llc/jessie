/*global getElementAttribute */

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

if( getElementAttribute ){

	getElementData = function( el, dataName ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		return getElementAttribute( el, 'data-' + dataName );
	};
}