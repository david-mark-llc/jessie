
/*jslint node:true, strict:false*/

// dependencies
var fs = require('fs');
var path = require('path');
var Set = require('simplesets').Set;

// jessie
var jessie = {};

/*
* @constructor
* @functionRoot {String} Path to function folder
* @JessieFunction {Function} Jessie Function Constructor reference
*/
jessie.FunctionSet = function(functionRoot, JessieFunction) {
	this.JessieFunction = JessieFunction;
	this.functionRoot = functionRoot;
	this.functions = [];
};
jessie.FunctionSet.prototype.create = function() {
	// find fileNames based on directory inside root
	var fileNames = fs.readdirSync(this.functionRoot).filter(function(fileName){
		return fs.statSync(path.join(this.functionRoot, fileName)).isDirectory();
	}.bind(this));

	// create and store a new jessie function in the functions array
	fileNames.forEach(function(fileName) {
		var jessieFn = new this.JessieFunction(path.join(this.functionRoot, fileName), jessie.Rendition);
		this.functions.push(jessieFn);
	}.bind(this));

	// sort the functions array by function name
	this.functions.sort(this.sortByName);
};
jessie.FunctionSet.prototype.sortByName = function(a, b) {
	var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
	if(nameA < nameB) {
		return -1;
	}
	if(nameA > nameB) {
		return 1;
	}
	return 0;
};
jessie.FunctionSet.prototype.getFunctions = function() {
	return this.functions;
};

/*
* @constructor
* @folder {String} Path to function folder
* @JessieRendition {Function} Jessie Rendition Constructor reference
*/
jessie.Function = function(folder, JessieRendition) {
	this.folder = folder;
	this.JessieRendition = JessieRendition;
	this.name = path.basename(folder);

	this.renditions = this.createRenditions();
	
	this.getDependencies = function(renditionId){
		var dependencies = new Set();
		dependencies = dependencies.union(this.renditions[renditionId-1].dependencies);
		return dependencies;
	}.bind(this);

	this.getContentsForRendition = function(renditionId) {
		var contents = this.renditions[renditionId-1].getContents();
		return contents;
	};
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

/*
* @param functions {Array[{}]} An array of jessie.Function objects
*/
jessie.Builder = function(functions) {
	this.functions = functions;
};
/*
* @param requestedFunctions {Array[{functionName: "", renditionId: 1}]} An array of requested function objects
* @return The javascript contents for Jessie
*/
jessie.Builder.prototype.getContents = function(requestedFunctions) {

};

exports.jessie = jessie;