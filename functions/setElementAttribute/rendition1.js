/*global html,isHostMethod */

/*
 Description:
 Relies on el.setAttribute
 */

/*
 Degrades:
 IE5
 */

/*
 Author:
 Graham Veal
 */

var setElementAttribute;

if( html && isHostMethod( html, "setAttribute" ) ){

	setElementAttribute = function( el, attributeName, attributeValue ){

		el.setAttribute( attributeName, attributeValue );
	};
}