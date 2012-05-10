# Jessie

Lean, beautiful and smart

## Find code and tips to help contribute

David Mark has put many tips on CLJ so search for "David Mark Tip" and start to add renditions.

You can also use David's MyLibrary code for reference.

## Developer guidelines

### Type checking

When type-checking put the type on the left hand side. It doesn't read as well but we have a good reason. The reason is that typos that exclude the second "=" will fail immediately, rather than creating an assignment.

	"string" == typeof whatever // good

	typeof whatever == "string" // bad

### File naming

For now each rendition should be held in a file called rendition#.js. So for example inside the attachListener folder we have three renditions:

* rendition1.js
* rendition2.js
* rendition3.js

Note: The number is not a version

## Builder

The builder has been created using Node so you must install that first. 

To run the builder:

	cd /bin
	./jessie (options are below)

Usage: jessie [options] <functions ...>

Options:

	-h, --help           output usage information
	-V, --version        output the version number
	-l, --list           Print a list of available functions
	-o, --output [file]  The file to output to (outputs to stdout by default)
	-a, --all            Include all Functions and Renditions
	--all-renditions     Include all renditions of a function if not specified explicitly
	-u, --uglify         Minify the output using UglifyJS
	--mangle             Mangle the generated output via UglifyJS
	--beautify           Output beautified JS
	--root [path]        the folder that jessie functions are located in
	--no-wrap            Don'nt wrap the built file with the header/footer file contents
	--exports <list>     A comma separated list of internal functions to export (default: [isHostMethod, isHostObjectProperty])
	--header [path]      The header file
	--footer [path]      The footer file
	--namespace [name]   The name of the global variable to export


Example usage:

	./jessie -a --root ../functions/ --namepsace "jessie" --header ../libraries/header1.inc --footer ../libraries/footer1.inc -o ~/Desktop/jessie.js bind:1 attachListener:1:2 attachBoundListener:1 query:1 toArray:1

## API documentation

Currently the documentation is very poor and could change but here is what we have:

### bind a function
	
	var boundFunction = jessie.bind(function() {}, this);

### for each
	
	var arr = [];
	var context = this;
	jessie.forEach(arr, function(value, index, array) {

	}, context);	

### attach event listener

	var listener = jessie.attachListener(el, "click", function(e) {
		jessie.cancelDefault(e);
		var target = jessie.getEventTarget(e);
	});

### remove event listener
	
	var listener = jessie.attachListener(el, "click", function(e) {});
	jessie.detachListener(el, "click", listener);

### attach window listener

	var listener = jessie.attachWindowListener("resize", function(e) {});

### detach window listener
	
	var listener = jessie.attachWindowListener("resize", function(e) {});
	jessie.detachWindowListener("resize", listener);

### add class to element

	jessie.addClass(el, "className");

### remove class from element

	jessie.removeClass(el, "className");

### check element has a class

	jessie.hasClass(el, "className"); // returns boolean

### get element (by id)

	var el = jessie.getElement("id"); // returns element node

### get element parent
	
	var parentEl = jessie.getElementParent(el);

### get descendants by class name

	var descendants = jessie.getDescendantsByClassName(el, "className");

### get descendants by tag name

	var descendants = jessie.getDescendantsByTagName(el, "span");

### get elements by selector

	var elements = jessie.query("ul li a.className");

### check if an element is a descendant (child of) another element

	var isDescendant = jessie.isDescendant(parentEl, descendantEl);

### get (inner) html

	var html = jessie.getHtml(el);

### set (inner) html

	jessie.setHtml(el, "<p>injected</p>");

### create element
	
	jessie.createElement("div");

### ajax

	jessie.ajax("/some/url/", {
		method: "post",
		data: "key=value",
		success: function(responseText, xhr) {},
		fail: function(xhr) {}
	});