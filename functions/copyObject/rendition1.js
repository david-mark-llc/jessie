/*global isOwnProperty,deepMixin */

/*
Description:
Creates a new object by copying by val
Relies on 'jessie.isOwnProperty' && 'jessie.deepMixin'
*/

/*
Author:
Ian Crowther / Graham Veal
*/

var copyObject;

if(isOwnProperty && deepMixin) {
	copyObject = function(source) {
		var target;

		if (typeof source !== "object") {
			return source;
    }

		switch(Object.prototype.toString.call(source)) {
			case "[object Array]":
			case "[object Arguments]":
			case "[object NodeList]":
				target = [];
				break;
			case "[object Object]":
				target = {};
				break;
		}

		if(target){
			for(var property in source) {
				if(isOwnProperty(source, property)) {
					if ( Object.prototype.toString.call(source[property]) === "[object Object]") {
						target[property] = {};
						deepMixin(target[property], source[property]);
					} else {
						target[property] = source[property];
					}
				}
			}
		}

		return target || source;
	};
}