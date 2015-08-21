# Authoring

Thinking of contributing to Jessie? This is the place for you.

## Functions

You will find all the functions under the _functions_ directory. Either edit an existing rendition or add a new one. Follow the _Rendition structure_ found below.

If you want to create a new function for Jessie then create a new folder with the name of the function as the name and follow the _Rendition structure_ below.

## Rendition structure

There are coding conventions used for each rendition and it should look something like this:

	/*global html,isHostMethod*/

	/*
	Description:
	The description of the rendition
	*/

	/*
	Degrades:
	Where this rendition will degrade
	*/

	/*
	See:
	Additional information e.g. reciprocal links between related functions
	*/

	var theNameOfTheFunction;

	if(/* some feature detection*/) {
		theNameOfTheFunction = function(param1, param2) {
			/*SCAFFOLDING:Start*/
			// some code here
			/*SCAFFOLDING:End*/

			/* some implementation based on the feature detection */
		};
	}

So let's break this down slightly...

### Dependency declarations

	/*global html,isHostMethod*/

This tells the builder and jslint what the dependencies are for the rendition.

### Description

	/*
	Description:
	The description of the rendition
	*/

This is exposed in the builder web UI giving a description of what features this rendition relies on and to what context it is best suited.

### Degrades

	/*
	Degrades:
	Where this rendition will degrade
	*/

This is also exposed in the builder web UI giving information of where this rendition is going to degrade.

### See also

	/*
	See:
	Additional information e.g. reciprocal links between related functions
	*/

This is also exposed in the builder web UI giving additional information about the rendition.

### Function name variable

	var theNameOfTheFunction;

This names the function and will ultimately be called using `jessie.theNameOfTheFunction`. It is `undefined` by default and gets assigned a function in the event the feature detection was positive. This is why the API is dynamic and puts the developer in control as mentioned above.

	if(/* some feature detection*/) {
		theNameOfTheFunction = function(param1, param2) {
			/*SCAFFOLDING:Start*/
			// some code here
			/*SCAFFOLDING:End*/
			/* some implementation based on the feature detection */
		};
	}

This part varies - sometimes it's one line for detection and sometimes it's more involved. The principle is you detect a particular feature and assign that implementation to the function name variable when the feature detection has passed.

### Scaffolding tokens

The scaffolding is only required for development as hints for developers using the function in the wrong way. See attachWindowListener for an example. The builder has an option to remove scaffolding and you must use the above delimiters `/*SCAFFOLDING:End*/` and `/*SCAFFOLDING:End*/` when defining any scaffolding in the implementation.