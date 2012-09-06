/*jslint node:true, strict:false*/

var path = require('path');
var Set = require('simplesets').Set;
var fs = require('fs');

var jessie = {};

jessie.Rendition = function(func, file) {
	this.func = func;
	this.file = file;
	this.name = path.basename(file);
	this.id = this.name.substring(this.name.length-4, this.name.length-3);

	Object.defineProperties(this, {
		contents: {
			get: function(){
				if(!this._contents) {
					this._contents = fs.readFileSync(this.file, 'utf8');
				}
				return this._contents;
			}.bind(this)
		},

		description: {
			get: function() {
				var description = "";
				var re = /^\s*Description:\s*([^*]+)\*\/$/gm;
				var matches = re.exec(this.contents);
				if(matches && matches.length > 1) {
					description = matches[1].trim();
				}
				return description;
			}
		},

		degrades: {
			get: function() {
				var support = "";
				var re = /^\s*Degrades:\s*([^*]+)\*\/$/gm;
				var matches = re.exec(this.contents);
				if(matches && matches.length > 1) {
					support = matches[1].trim();
				}
				return support;
			}
		},

		seeAlso: {
			get: function() {
				var support = "";
				var re = /^\s*See:\s*([^*]+)\*\/$/gm;
				var matches = re.exec(this.contents);
				if(matches && matches.length > 1) {
					support = matches[1].trim();
				}
				return support;
			}
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

	this.getContents = function() {
		// remove the /*global / declarations
		var contents = [this.contents.replace(/\/\*global\s(\S*)\s*\*\/\n*/g, "")];
		return contents.join("\n");
	}.bind(this);

};

/**
 * Checks if this rendition degrades in a particular version of IE
 * @param  {String} version Possible values IE10, IE9, IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
 * @return {Boolean} True when it degrades in the specified version
 */
jessie.Rendition.prototype.degradesInIEVersion = function(version) {
	return (this.degrades.length == 0 || this.degrades.indexOf(version) > -1);
};

module.exports = jessie.Rendition;