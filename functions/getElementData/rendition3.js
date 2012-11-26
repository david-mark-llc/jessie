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

		dataName = dataName.toLowerCase().replace( /-([a-z])/g, function( match, letter ){

			return letter.toUpperCase();
		} );

		return el.dataset[ dataName ];
	};

} else if( html && isHostMethod( html, "getAttribute" ) ){

	getElementData = function( el, dataName ){

		return el.getAttribute( 'data-' + dataName );
	};
}