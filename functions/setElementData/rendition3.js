/*global html,isHostObjectProperty,isHostMethod */

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

var setElementData;

if( html && isHostObjectProperty( html, "dataset" ) ){

	setElementData = function( el, dataName, dataValue ){

		el.dataset[ dataName ] = dataValue;
	};

} else if( html && isHostMethod( html, "setAttribute" ) ){

	setElementData = function( el, dataName, dataValue ){

		dataName = dataName.replace( /([A-Z])/g, '-$1' ).toLowerCase();

		el.setAttribute( dataName, dataValue );
	};
}