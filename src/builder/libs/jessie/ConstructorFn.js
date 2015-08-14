/*jshint node:true, strict:false*/

var path = require('path');
var fs = require('fs');

// a constructor takes a path to the folder root and a ref to PrototypeMethod
// it grabs it's own content from the constructor.js file
// it creates a list of all instances of PrototypeMethod objects

function ConstructorFn(folder, PrototypeMethod) {
	this.folder = folder;
	this.PrototypeMethod = PrototypeMethod;
	this.prototypeFolderRoot = folder + '/prototype';
	this.file = this.folder + '/constructor.js';
	this.name = path.basename(folder);
	this.prototypeMethods = [];

	this.createPrototypeMethods();

	Object.defineProperties(this, {
		contents: {
			get: function(){
				if(!this._contents) {
					this._contents = fs.readFileSync(this.file, 'utf8');
				}
				return this._contents;
			}.bind(this)
		}
	});
}

ConstructorFn.prototype.getDependencies = function() {
	return [];
};

ConstructorFn.prototype.createPrototypeMethods = function() {
	var fileNames = fs.readdirSync(this.prototypeFolderRoot);
	fileNames.forEach(function(fileName) {
		var file = path.join(this.prototypeFolderRoot, fileName);
		var constructorFnInstance = this;
		var jessiePrototypeMethod = new this.PrototypeMethod(constructorFnInstance, file);

		this.prototypeMethods.push(jessiePrototypeMethod);
	}.bind(this));
};

ConstructorFn.prototype.getPrototypeMethods = function() {
	return this.prototypeMethods;
};

ConstructorFn.prototype.getContents = function() {
	// remove the /*global / declarations
	var contents = [this.contents.replace(/\/\*global\s(\S*)\s*\*\/\n*/g, "")];
	return contents.join("\n");
};

ConstructorFn.prototype.getPrototypeMethodByName = function(methodName) {
	var prototypeMethod;
	for(var i = 0; i < this.prototypeMethods.length; i++) {
		if(this.prototypeMethods[i].name == methodName) {
			prototypeMethod = this.prototypeMethods[i];
			break;
		}
	}
	return prototypeMethod;
};

module.exports = ConstructorFn;