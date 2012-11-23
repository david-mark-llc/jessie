/*global html,isHostObjectProperty,setElementAttribute */

/*
 Description:
 Relies on el.dataset or el.setAttribute
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

if( html && isHostObjectProperty( html, "dataset" ) ){

	setElementDataAttribute = function( el, dataName, dataValue ){

		el.dataset[ dataName ] = dataValue;
	};

} else if( setElementAttribute ){

	setElementDataAttribute = function( el, dataName, dataValue ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		setElementAttribute( el, dataName, dataValue );
	};
}