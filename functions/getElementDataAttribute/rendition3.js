/*global html,isHostObjectProperty,getElementAttribute */

/*
 Description:
 Relies on el.dataset or el.getAttribute for the most support
 */

/*
 Degrades:
 IE5-
 */

/*
 Author:
 Graham Veal
 */

var getElementDataAttribute;

if( html && isHostObjectProperty( html, "dataset" ) ){

	getElementDataAttribute = function( el, dataName ){

		return el.dataset[ dataName ];
	};

} else if( getElementAttribute ){

	getElementDataAttribute = function( el, dataName ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		return getElementAttribute( el, 'data-' + dataName );
	};
}