/*jshint node:true, strict:false*/

var path = require('path');
var Set = require('simplesets').Set;
var fs = require('fs');

function PrototypeMethod(constructorFn, file) {
	this.constructorFn = constructorFn;
	this.file = file;
	this.name = path.basename(file);
	this.name = this.name.substr(0, this.name.length-3);

	Object.defineProperties(this, {
		contents: {
			get: function(){
				if(!this._contents) {
					this._contents = fs.readFileSync(this.file, 'utf8');
				}
				return this._contents;
			}.bind(this)
		},
		dependencies: {
			get: function(){
				if(!this._dependencies) {
					this._dependencies = new Set();
					var match, re = /\/\*global\s(\S*)\s*\*\//g;
					while((match = re.exec(this.contents))) {
						match[1].split(",").forEach(function(d){
							this._dependencies.add(d);
						}.bind(this));
					}
				}
				return this._dependencies;
			}.bind(this)
		}
	});
}

PrototypeMethod.prototype.getDependencies = function() {
	return this.dependencies;
};

PrototypeMethod.prototype.getContents = function() {
	var contents = [this.contents.replace(/\/\*global\s(\S*)\s*\*\/\n*/g, "")];
	return contents.join("\n");
};

module.exports = PrototypeMethod;