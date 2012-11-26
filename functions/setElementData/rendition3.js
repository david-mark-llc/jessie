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

		//convert the dataName to lowercase
		//then remove the dash and replace the character next to the dash with the upper case version
		dataName = dataName.toLowerCase().replace( /-([a-z])/g, function( match, letter ){

			return letter.toUpperCase();
		} );

		el.dataset[ dataName ] = dataValue;
	};

} else if( html && isHostMethod( html, "setAttribute" ) ){

	setElementData = function( el, dataName, dataValue ){

		el.setAttribute( 'data-' + dataName, dataValue );
	};
}
