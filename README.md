# Jessie

Lean, beautiful and smart

## Find code and tips to help contribute

David Mark has put many tips on CLJ so search for "David Mark Tip" and start to add renditions.

You can also use David's MyLibrary code for reference.

## Developer guidelines

### Type checking

When type-checking put the type on the left hand side so that it fails early when making the mistake of writing only one "=" sign. It doesn't read as well but we have a good reason.

	"string" == typeof whatever // good

	typeof whatever == "string" // bad

### File naming

For now each rendition should be held in a file called rendition#.js. So for example inside the attachListener folder we have three renditions:

* rendition1.js
* rendition2.js
* rendition3.js

Note: The number is not a version