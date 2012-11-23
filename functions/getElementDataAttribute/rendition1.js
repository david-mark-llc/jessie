/*global html,isHostObjectProperty */

/*
 Description:
 Relies on el.dataset
 */

/*
 Degrades:
 IE11-, FF5-, Chrome 6-, Safari 5.0-, Opera 11.0-, iOS 4.3-, Android 2.3-
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
}