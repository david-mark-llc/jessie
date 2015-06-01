/*jslint node:true, strict:false*/

var fs = require('fs');
var path = require('path');

var jessie = {};

/*
* @constructor
* @functionRoot {String} Path to function folder
* @JessieFunction {Function} Jessie Function Constructor reference
*/
jessie.FunctionSet = function(functionRoot, JessieFunction, JessieRendition) {
	this.JessieFunction = JessieFunction;
	this.JessieRendition = JessieRendition;
	this.functionRoot = functionRoot;
	this.functions = [];
};
jessie.FunctionSet.prototype.create = function() {
	this.functions = [];
	// find fileNames based on directory inside root
	var fileNames = fs.readdirSync(this.functionRoot).filter(function(fileName){
		return fs.statSync(path.join(this.functionRoot, fileName)).isDirectory();
	}.bind(this));

	// create and store a new jessie function in the functions array
	fileNames.forEach(function(fileName) {
		var jessieFn = new this.JessieFunction(path.join(this.functionRoot, fileName), this.JessieRendition);
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
	this.create();
	return this.functions;
};

jessie.FunctionSet.prototype.getFunctionsFilteredByIEVersion = function(version) {
	this.create();
	var fns = [],
		fn = null,
		renditions;
	for(var i = 0; i < this.functions.length; i++) {
		fn = this.functions[i];
		fn.renditions = fn.getRenditionsFilteredByIEVersion(version);
		// if the function has no renditions, don't include
		if(fn.renditions.length > 0) {
			fns.push(fn);
		}
	}
	return fns;
};

jessie.FunctionSet.prototype.getFunctionByName = function(name) {
	var func = null;
	for(var i = 0; i < this.functions.length; i++) {
		if(this.functions[i].name == name) {
			func = this.functions[i];
			break;
		}
	}
	return func;
};

module.exports = jessie.FunctionSet;