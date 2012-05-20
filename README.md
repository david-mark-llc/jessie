# Jessie

Lean, beautiful and smart

## About Jessie's design

Jessie has a flat API. It is simply a collection of functions. Each function has many renditions. Each rendition is based on feature detection and testing. Let's take one example:

`jessie.attachListener` is a function and it currently has two renditions. One rendition uses W3C compliant `el.addEventListener` and the other uses Microsofts implementation `el.attachEvent`.

Some functions depend on other functions and properties. For example `jessie.attachBoundListener` depends on `jessie.attachListener` and `jessie.bind`.

## Dynamic API

Most of the jessie functions are dynamic. This means the calling application should check the functions existence before using them allowing the application to degrade (as if JavaScript was turned off). Let's take an example:

	if(jessie.attachListener && jessie.ajax) {
		// write an application that relies on (and uses) attachListener and ajax
	}

A side effect of this design is that you have two choices of what to do when a particular function is not supported in a particular browser - either degrade gracefully or simply create another rendition that allows that function to work in another set of browsers. There will be no change to the application code meaning Jessie can grow or shrink as your project requirements change. 

Peter Michaux has an excellent article based on this concept found: [here](http://peter.michaux.ca/articles/cross-browser-widgets).

## Builder

The builder has been created using Node so you must install that first.

### About the builder

If you have read the above you should understand how Jessie is designed and therefore understand how the builder needs to work; it takes a list of functions. Each function must specify which rendition to use. The builder will tell you if you're missing any dependencies. Then it will build the jessie.js file for you to your specific needs.

### Using the builder

To run the builder:

	cd /bin
	./jessie

Options:

	-h, --help           output usage information
	-V, --version        output the version number
	-l, --list           Print a list of available functions
	-o, --output [file]  The file to output to (outputs to stdout by default)
	-u, --uglify         Minify the output using UglifyJS
	--mangle             Mangle the generated output via UglifyJS
	--beautify           Output beautified JS
	--root [path]        the folder that jessie functions are located in
	--no-wrap            Don'nt wrap the built file with the header/footer file contents
	--exports <list>     A comma separated list of internal functions to export (default: [isHostMethod, isHostObjectProperty])
	--header [path]      The header file
	--footer [path]      The footer file
	--namespace [name]   The name of the global variable to export

Example on Linux

	node jessie -o /path/to/jessie.js bind:1 attachListener:2 attachBoundListener:1 query:1 toArray:1

Example on Windows:

	node jessie getEventTarget:1 attachListener:2 delegateTagNameListener:1 > /path/to/jessie.js

## API documentation

Currently the documentation is very basic and the API could change for the better but for now this is what we have:

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

### get ancestors by tag name

	var ancestors = jessie.getAncestorsByTagName(el, "span");

### get ancestors by class name

	var ancestors = jessie.getAncestorsByClassNameName(el, "className");

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

### Find code and tips to help contribute

David Mark has put many tips on CLJ so search for "David Mark Tip" and start to add renditions.

* [Attaching and detaching event listeners](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/b94b12547ed572f8?hl=en&noredirect=true)
* [The load problem and related matters](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/6d5575fd79d1169d?hl=en&noredirect=true)
* [How to Create an XHR object](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/4323efb65cebb31e/a4f28c7fbe305bca?hl=en&lnk=gst&q=ow+to+Create+an+XHR+(Ajax)+O)
* [Properties and attributes](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/838804e32224601f/502a23cab0057bcd?hl=en&lnk=gst&q=tip+of+the+day+david)
* [Adding and removing host objects](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/d1f64857442e3b10/3d3d3d0174a46bcb?hl=en&lnk=gst&q=tip+of+the+day+david)
* [How to measure element dimensions](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/24fd33cc9f206ea0/8c8397bebd0a0188?hl=en&lnk=gst&q=tip+of+the+day+david)

You can also use David's MyLibrary code for reference.