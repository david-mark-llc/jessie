/*jslint node:true, strict:false*/

var Set = require('simplesets').Set;
var path = require('path');
var fs = require('fs');

/*
* @constructor
* @folder {String} Path to function folder
* @JessieRendition {Function} Jessie Rendition Constructor reference
*/

var jessie = {};

jessie.Function = function(folder, JessieRendition) {
	this.folder = folder;
	this.JessieRendition = JessieRendition;
	this.name = path.basename(folder);

	this.renditions = this.createRenditions();
	
	this.getDependencies = function(renditionId){
		var dependencies = null;
		if(this.renditions[renditionId-1]) {
			dependencies = new Set();
			dependencies = dependencies.union(this.renditions[renditionId-1].dependencies);
		}
		
		return dependencies;
	}.bind(this);

	this.getContentsForRendition = function(renditionId) {
		var contents = this.renditions[renditionId-1].getContents();
		return contents;
	};
};

jessie.Function.prototype.getRenditionsFilteredByIEVersion = function(version) {
	var renditions = [];
	for(var i = 0; i < this.renditions.length; i++) {
		if(this.renditions[i].degradesInIEVersion(version) ||
			this.renditions[i].degrades.length === 0) {
			renditions.push(this.renditions[i]);
		}
	}
	return renditions;
};

jessie.Function.prototype.createRenditions = function() {
	var functionInstance = this;
	var files = fs.readdirSync(this.folder).sort();
	// makes sure only reading .js files
	files = files.filter(function(file) {
		return file.indexOf(".js") === file.length - 3;
	}.bind(this));
	files = files.map(function(file) {
		var filePath = path.join(this.folder, file);
		return new this.JessieRendition(functionInstance, filePath);
	}.bind(this));
	return files;
};

module.exports = jessie.Function;