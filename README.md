# Jessie

Lean, beautiful and smart

## User guides

### General information

Jessie has a flat API. It is simply a collection of functions where `jessie` is the default namespace* to attach those functions to so that they are not on the global (`window`) object.

	jessie.attachListener
	jessie.getDescendantsByClassName
	jessie.ajax
	jessie.parseJson
	jessie.forEach

*You can replace `jessie` with any name you want using the builder making it your library.

Additionally you can use the builder to choose which functions you want in your custom build for your library.

### Renditions

Each function has one or more renditions. Each rendition is based on feature detection, feature testing and the context of your application i.e. what type of application are you building and what browsers are you supporting. You need to think about which rendition suits your context best.

Let's take a look at an example function with particular renditions:

`jessie.attachListener` is function to add event listeners to dom nodes. It (currently) has three renditions:

1. W3C compliant `el.addEventListener` 
2. Microsofts implementation `el.attachEvent`
3. A combination of #1 and #2

If you're building a mobile only site or a site that only has to work in Chrome or Safari etc then rendition #1 will be perfect.

If you're building an intranet site that only has to work in IE7 then you can use rendition #2.

If you're building a site for many browsers then you will choose rendition #3 which is a combination of rendition #1 and rendition #2.

### Dynamic API

Most of the jessie functions are dynamic. This means the calling application should check the functions existence before using them allowing the application to degrade (as if JavaScript was turned off). Let's take an example:

	if(jessie.attachListener && jessie.ajax) {
		// write an application that relies on (and uses) attachListener and ajax
	}

A side effect of this design is that you have two choices of what to do when a particular function is not supported in a particular browser:

1. Degrade gracefully 
2. Simply create another rendition that allows that function to work in another set of browsers. There will be no change to the application code meaning Jessie can grow or shrink as your project requirements change. 

Peter Michaux has an excellent article based on this concept found: [here](http://peter.michaux.ca/articles/cross-browser-widgets).

### Builder

The builder has been created using Node so you must install that first.

#### About the builder

If you have read the above you should understand how Jessie is designed and therefore understand how the builder needs to work; it takes a list of functions. Each function must specify which rendition to use. The builder will tell you if you're missing any dependencies. Then it will build the jessie.js file for you to your specific needs.

#### Using the builder

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

	cd /bin
	node jessie -o /path/to/jessie.js bind:1 attachListener:2 attachBoundListener:1 query:1 toArray:1

Example on Windows:

	cd /bin
	node jessie getEventTarget:1 attachListener:2 delegateTagNameListener:1 > /path/to/jessie.js

### API documentation

Currently the documentation is very basic and the API could change for the better but for now this is what we have:

#### bind a function
	
	var boundFunction = jessie.bind(function() {}, this);

#### for each
	
	var arr = [];
	var context = this;
	jessie.forEach(arr, function(value, index, array) {

	}, context);	

#### attach event listener

	var listener = jessie.attachListener(el, "click", function(e) {
		jessie.cancelDefault(e);
		var target = jessie.getEventTarget(e);
	});

#### remove event listener
	
	var listener = jessie.attachListener(el, "click", function(e) {});
	jessie.detachListener(el, "click", listener);

#### attach window listener

	var listener = jessie.attachWindowListener("resize", function(e) {});

#### detach window listener
	
	var listener = jessie.attachWindowListener("resize", function(e) {});
	jessie.detachWindowListener("resize", listener);

#### add class to element

	jessie.addClass(el, "className");

#### remove class from element

	jessie.removeClass(el, "className");

#### check element has a class

	jessie.hasClass(el, "className"); // returns boolean

#### get element (by id)

	var el = jessie.getElement("id"); // returns element node

#### get element parent
	
	var parentEl = jessie.getElementParent(el);

#### get descendants by class name

	var descendants = jessie.getDescendantsByClassName(el, "className");

#### get descendants by tag name

	var descendants = jessie.getDescendantsByTagName(el, "span");

#### get ancestor by tag name

	var ancestor = jessie.getAncestorByTagName(el, "span");

#### get ancestor by class name

	var ancestor = jessie.getAncestorByClassNameName(el, "className");

#### get elements by selector

	var elements = jessie.query("ul li a.className");

#### check if an element is a descendant (child of) another element

	var isDescendant = jessie.isDescendant(parentEl, descendantEl);

#### get (inner) html

	var html = jessie.getHtml(el);

#### set (inner) html

	jessie.setHtml(el, "<p>injected</p>");

#### create element
	
	jessie.createElement("div");

#### ajax

	jessie.ajax("/some/url/", {
		method: "post",
		data: "key=value",
		success: function(responseText, xhr) {},
		fail: function(xhr) {}
	});

## Developer guides

To begin working on Jessie there are a few simple things you have to be aware of.

### Functions

You will most likely be contributing to a function. All functions can be found in their own folder under "functions". Each function has a number of renditions.

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