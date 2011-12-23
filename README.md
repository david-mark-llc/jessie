# Jessie


## Developer guidelines

When type-checking put the type on the left hand side so that it fails early when making the mistake of writing only one "=" sign.

	"string" == typeof whatever // good

	typeof whatever == "string" // bad