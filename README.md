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

The builder has been created using Node so you must install that first. To run the builder:

	cd /bin
	./jessie (with some options)

A typical call with some options might look like

	./jessie -a --root ../functions/ --namepsace "jessie" --header ../libraries/header1.inc --footer ../libraries/footer1.inc -o ~/Desktop/jessie.js bind:1 attachListener:1:2 attachBoundListener:1 query:1 toArray:1

This tells the builder the following information:

* --root tells the builder where to find the functions (and their renditions)
* --namepsace tells the builder what to call your library - you can call it whatever you like - it's your library!
* --header tells the builder what header to include (it's the start of the anonymous function)
* --footer tells the builder what footer to include (it's the end of the anonymous function)
* -o tells the builder where to save the generated .js file to
* bind:1 attachListener:1:2 query:1 toArray:1 tells the builder to include the functions bind (rendition 1), attachListener (rendition 1 and 2), attachBoundListener (rendition 1), query (rendition 1) and toArray (rendition 1)

There are more options including minifying. Just run `./jessie` to see the full list of options.

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