/*global isHostMethod,isHostObjectProperty,html,appendChild*/

/*
 Description:
 Relies on `el.firstChild`, `el.insertBefore`, `jessie.appendChild`
 */

/*
 Degrades:

 */

/*
 Author:
Graham Veal
 */

var prependChild;

if (html && isHostMethod(html, 'insertBefore') && isHostObjectProperty(html, 'firstChild') && appendChild) {

	prependChild = function(container, node){

		var firstChild = container.firstChild;

		if( firstChild ){

			container.insertBefore( node, firstChild );

		} else {

			appendChild( container, node );
		}
	};
}