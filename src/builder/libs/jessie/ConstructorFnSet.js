/*jslint node:true, strict:false*/

var path = require('path');
var fs = require('fs');

function ConstructorFnSet(constructorRoot, JessieConstructorFn, JessiePrototypeMethod) {
	this.constructorRoot = constructorRoot;
	this.JessieConstructorFn = JessieConstructorFn;
	this.JessiePrototypeMethod = JessiePrototypeMethod;
	this.constructorFns = [];
};

ConstructorFnSet.prototype.create = function() {
	var fileNames = fs.readdirSync(this.constructorRoot).filter(function(fileName){
		return fs.statSync(path.join(this.constructorRoot, fileName)).isDirectory();
	}.bind(this));

	fileNames.forEach(function(fileName) {
		var constructorFn = new this.JessieConstructorFn(path.join(this.constructorRoot, fileName), this.JessiePrototypeMethod);
		this.constructorFns.push(constructorFn);
	}.bind(this));
};

ConstructorFnSet.prototype.getConstructorFnByName = function(name) {
	var constructorFn;
	for(var i = 0; i < this.constructorFns.length; i++) {
		if(this.constructorFns[i].name === name) {
			constructorFn = this.constructorFns[i];
			break;
		}
	}
	return constructorFn;
};

ConstructorFnSet.prototype.getConstructorFns = function() {
	return this.constructorFns;
};

module.exports = ConstructorFnSet;