/*global html,isHostMethod */

/*
 Description:
 Relies on el.getAttribute
 */

/*
 Degrades:
 IE5
 */

/*
 Author:
 Graham Veal
 */

var getElementAttribute;

if( html && isHostMethod( html, "getAttribute" ) ){

	getElementAttribute = function( el, attributeName ){

		return el.getAttribute( attributeName );
	};
}