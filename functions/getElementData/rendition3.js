/*global html,isHostObjectProperty,isHostMethod */

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

var getElementData;

if( html && isHostObjectProperty( html, "dataset" ) ){

	getElementData = function( el, dataName ){

		return el.dataset[ dataName ];
	};

} else if( html && isHostMethod( html, "getAttribute" ) ){

	getElementData = function( el, dataName ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		return el.getAttribute( 'data-' + dataName );
	};
}