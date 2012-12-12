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
	this.metaFilePath = this.folder + '\\' + this.metaFileName;
	this.metaFileExists = fs.existsSync(this.folder + '/' +'meta.js');
	this.groupName = "Misc.";
	if(this.metaFileExists) {
		this.metaFileContents = fs.readFileSync(this.metaFilePath, 'utf8');
		this.groupName = this.getGroupName(this.metaFileContents);
	}
	
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

jessie.Function.prototype.metaFileName = 'meta.js';

jessie.Function.prototype.getGroupName = function(fileContents) {
	var group = "";
	var re = /^\s*Group:\s*([^*]+)\*\/$/gm;
	var matches = re.exec(fileContents);
	if(matches && matches.length > 1) {
		group = matches[1].trim();
	}
	return group;
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
	// makes sure only reading .js files that are renditions
	files = files.filter(function(file) {
		var isJsFile = file.indexOf(".js") === file.length - 3;
		var isMetaFile = file.indexOf("meta.js") > -1;
		return isJsFile && !isMetaFile;
	}.bind(this));
	files = files.map(function(file) {
		var filePath = path.join(this.folder, file);
		return new this.JessieRendition(functionInstance, filePath);
	}.bind(this));
	return files;
};

module.exports = jessie.Function;