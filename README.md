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

Currently there is no builder meaning for now it's a cut and paste job which doesn't take a long time anyway. Please bear with us on this.

## API documentation

Currently the documentation is very poor and could change but here is what we have:

### attach event listener

	jessie.attachListener(el, "click", function(e) {
		var target = jessie.getEventTarget(e);
	});

### remove event listener
	
	var listener = jessie.attachListener(el, "click", function(e) {});
	jessie.detachListener(el, "click", listener);

### attach window listener

	jessie.attachWindowListener("resize", function(e) {});

### detach window listener
	
	var listener = jessie.attachWindowListener("resize", function(e) {});
	jessie.detachWindowListener("resize", listener);

### add class to element

	jessie.addClass(el, "className");

### remove class from element

	jessie.removeClass(el, "className");

### check element has a class

	jessie.hasClass(el, "className"); // returns boolean

### ajax

	jessie.ajax("/some/url/", {
		method: "post",
		data: "key=value",
		success: function(responseText, xhr) {},
		fail: function(xhr) {}
	});