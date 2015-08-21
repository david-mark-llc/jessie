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

## Progressive Enhancement Javascript articles

* [Attaching and detaching event listeners](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/b94b12547ed572f8?hl=en&noredirect=true)
* [The load problem and related matters](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/6d5575fd79d1169d?hl=en&noredirect=true)
* [Creating XHR objects](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/4323efb65cebb31e/a4f28c7fbe305bca?hl=en&lnk=gst&q=ow+to+Create+an+XHR)
* [Properties and attributes](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/838804e32224601f/502a23cab0057bcd?hl=en&lnk=gst&q=tip+of+the+day+david)
* [Adding and removing host objects](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/d1f64857442e3b10/3d3d3d0174a46bcb?hl=en&lnk=gst&q=tip+of+the+day+david)
* [Measuring element dimensions](https://groups.google.com/group/comp.lang.javascript/msg/8178b2d490d34b0e?hl=en)
* [Computing styles](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/fb7af3e938d90588?hl=en&noredirect=true)
* [Getting and setting html](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/410f4294e4fa8a04?hl=en&noredirect=true)
* [Querying elements](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/f80345226219d424?hl=en&noredirect=true)
* [Querying single elements](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/7d5a7e0d60081a77?hl=en&noredirect=true)
* [Determining element position](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/cd625a14ce603084?hl=en&noredirect=true)
* [Measuring the viewport](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/c611a7fecdb75edb/d4cce070c87c270b)

You can also use[My Library](http://www.cinsoft.net) code for reference and for porting over.
