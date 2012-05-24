
/*jslint node:true, strict:false*/

// dependencies
var fs = require('fs');
var path = require('path');
var Set = require('simplesets').Set;
var uglifyParser = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

// jessie
var jessie = {};

// a constructor takes a path to the folder root and a ref to jessie.PrototypeMethod
// it grabs it's own content from the constructor.js file
// it creates a list of all instances of PrototypeMethod objects
jessie.ConstructorFn = function(folder, PrototypeMethod) {
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
};

jessie.ConstructorFn.prototype.getDependencies = function() {
	return [];
};

jessie.ConstructorFn.prototype.createPrototypeMethods = function() {
	var fileNames = fs.readdirSync(this.prototypeFolderRoot);
	fileNames.forEach(function(fileName) {
		var file = path.join(this.prototypeFolderRoot, fileName);
		var constructorFnInstance = this;
		var jessiePrototypeMethod = new this.PrototypeMethod(constructorFnInstance, file);

		this.prototypeMethods.push(jessiePrototypeMethod);
	}.bind(this));
};

jessie.ConstructorFn.prototype.getPrototypeMethods = function() {
	return this.prototypeMethods;
};

jessie.PrototypeMethod = function(constructorFn, file) {
	this.constructorFn = constructorFn;
	this.file = file;
	this.name = path.basename(file);
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
};

jessie.PrototypeMethod.prototype.getDependencies = function() {
	return this.dependencies;
};

jessie.ConstructorFnSet = function(constructorRoot, JessieConstructorFn) {
	this.constructorRoot = constructorRoot;
	this.JessieConstructorFn = JessieConstructorFn;
	this.constructorFns = [];
};

jessie.ConstructorFnSet.prototype.create = function() {
	var fileNames = fs.readdirSync(this.constructorRoot).filter(function(fileName){
		return fs.statSync(path.join(this.constructorRoot, fileName)).isDirectory();
	}.bind(this));

	fileNames.forEach(function(fileName) {
		var constructorFn = new this.JessieConstructorFn(path.join(this.constructorRoot, fileName), jessie.PrototypeMethod);
		this.constructorFns.push(constructorFn);
	}.bind(this));
};

jessie.ConstructorFnSet.prototype.getConstructorFnByName = function(name) {
	var constructorFn;
	for(var i = 0; i < this.constructorFns.length; i++) {
		if(this.constructorFns[i].name === name) {
			constructorFn = this.constructorFns[i];
			break;
		}
	}
	return constructorFn;
};

jessie.ConstructorFnSet.prototype.getConstructorFns = function() {
	return this.constructorFns;
};

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

		support: {
			get: function() {
				var support = "";
				var re = /^\s*Support:\s*([^*]+)\*\/$/gm;
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

jessie.Builder = function(functionSet, requestedFunctions, constructorFnSet, requestedConstructors, options) {
	// function stuff
	this.functionSet = functionSet;
	this.functions = this.functionSet.getFunctions();
	this.requestedFunctions = requestedFunctions;

	// constructor stuff
	this.constructorFnSet = constructorFnSet;
	this.constructorFns = this.constructorFnSet.getConstructorFns();
	this.requestedConstructors = requestedConstructors;

	this.options = this.options || {};
	this.options.headerPath = this.options.headerPath || '../libraries/header1.inc';
	this.options.footerPath = this.options.footerPath || '../libraries/footer1.inc';
	this.headerDeclarations = ['global'];
	this.setupHeader();
	this.setupFooter();
	this.setupHeaderDeclarations();
};

jessie.Builder.prototype.setupHeader = function() {
	this.header = fs.readFileSync(this.options.headerPath, "utf8");
};

jessie.Builder.prototype.setupFooter = function() {
	this.footer = fs.readFileSync(this.options.footerPath, "utf8");
};

jessie.Builder.prototype.setupHeaderDeclarations = function() {
	var ast = uglifyParser.parse(this.header + this.footer);
	var w = pro.ast_walker();
	ast = w.with_walkers({
		"var": function (defs) {
			defs.forEach(function(def){
				this.headerDeclarations.push(def[0]);
			}.bind(this));
		}.bind(this)
	}, function() {
        return w.walk(ast);
	});
};


jessie.Builder.prototype.build = function() {
	var builderResponse = {
		success: false
	};

	var errors = this.expandDependencies();
	var missingContructorDependencies = this.getMissingConstructorDependencies();

	if(errors.length > 0) {
		builderResponse.success = false;
		builderResponse.errors = errors;
	}
	else if(missingContructorDependencies.length > 0) {
		builderResponse.success = false;
		builderResponse.errors = missingContructorDependencies;
	}
	else {
		builderResponse.success = true;
		var order = sortDependencies(this.functions, this.requestedFunctions);

		var jsContents = '';
		jsContents += this.header;

		/*

		going to have think about this but thinking aloud:
		check whether the "functionName" variable e.g. 'addClass'
		is a prototype method name or just a normal function
		
		order might be:

				[
					'bind',
					'attachListener',
					'attachBoundListener',
					'addClass', // this is a function name
					'Element',
					'addClass' // this one is a protoype method name
					'Element#addClass' // or this instead?
				]

		OR

		we know that constructors come after functions
		and we know prototypeMethods come after constructor
		(in any order)

		so loop through all requested constructors and output them
		lets hope constructors dont depend on other constructors
		or MUCH worse have functions depend on constructors which I
		highly doubt is a reality.

		*/

		order.forEach(function(functionName, i){
			var func = this.functionSet.getFunctionByName(functionName);
			var requestedFunc = this.getRequestedFunctionByName(functionName);
			jsContents += ("\n\n"+func.getContentsForRendition(requestedFunc.renditionId) + "\n\n");
		}.bind(this));

		jsContents += this.createExportDeclaration(order);

		jsContents += this.footer;
		builderResponse.output = jsContents;
	}

	return builderResponse;
};

jessie.Builder.prototype.getRequestedFunctionByName = function(functionName) {
	var requestedFunc;
	for(var i = 0; i < this.requestedFunctions.length; i++) {
		if(this.requestedFunctions[i].functionName === functionName) {
			requestedFunc = this.requestedFunctions[i];
			break;
		}
	}
	return requestedFunc;
};

function sortDependencies(functions, required, constructorFns, requestedConstructorFns) {
	var graph = [], initialOrder = Object.keys(required);


	var requiredFunctionNames = [];

	for(var p = 0; p < required.length; p++) {
		requiredFunctionNames.push(required[p].functionName);
	}

	initialOrder = requiredFunctionNames;

	var functionsAsHash = {};
	for(var h = 0; h < functions.length; h++) {
		functionsAsHash[functions[h].name] = functions[h];
	}

	functions = functionsAsHash;

	var requiredHash = {};

	for(var t = 0; t < required.length; t++) {
		requiredHash[required[t].functionName] = required[t].renditionId;
	}

	required = requiredHash;

	initialOrder.forEach(function(f, i){
		graph[i] = {
			edges: functions[f].getDependencies(required[f]).array().map(function(d){
				return initialOrder.indexOf(d);
			}).filter(function(d) {
				return d >= 0;
			})
		};
	});

	// sort the graph, reverse it, then convert it back from index to function names
	return topologicalSort(graph).reverse().map(function(f) {
		return initialOrder[f];
	});
}

function topologicalSort(graph) {
	var numberOfNodes = graph.length;
	var processed = [];
	var unprocessed = [];
	var queue = [];

	function iterate(arr, callback){
		var i;
		for(i=0;i<arr.length;i++){
			callback(arr[i], i);
		}
	}

	function processList(){
		for(var i=0; i<unprocessed.length; i++){
			var nodeid = unprocessed[i];
			if(graph[nodeid].indegrees === 0){
				queue.push(nodeid);
				unprocessed.splice(i, 1); //Remove this node, its all done.
				i--;//decrement i since we just removed that index from the iterated list;
			}
		}

		processStartingPoint(queue.shift());
		if(processed.length<numberOfNodes){
			processList();
		}
	}


	function processStartingPoint(nodeId){
		if(nodeId == undefined){
			throw "You have a cycle!!";
		}
		iterate(graph[nodeId].edges, function(e){
			graph[e].indegrees--;
		});
		processed.push(nodeId);
	}


	function populateIndegreesAndUnprocessed(){
		iterate(graph, function(node, nodeId){
			unprocessed.push(nodeId);
			if(!node.hasOwnProperty('indegrees')){
				node.indegrees = 0;
			}
			iterate(node.edges, function(e){
				if(!graph[e].hasOwnProperty('indegrees')){
					graph[e].indegrees = 1;
				}
				else{
					graph[e].indegrees = graph[e].indegrees + 1;
				}
			});
		});
	}

	populateIndegreesAndUnprocessed();
	processList();
	return processed;
}


jessie.Builder.prototype.createExportDeclaration = function(order) {
	var out = '\n\nglobal[\"' + 'jessie' + '\"] = {\n';
	order.forEach(function(functionName, i){
		out += '\t';
		out += '"'+ functionName +'": ';
		out += functionName;
		out += (i === order.length-1 ? "" : ",");
		out += '\n';
	}.bind(this));
	out += '};\n';
	return out;
};

// this function needs a look
// all it should do is return any errors around dependencies that
// havent been specified rather than throwing etc
jessie.Builder.prototype.expandDependencies = function() {
	var errors = [];

	var func;

	// for each requested function
	for(var i = 0; i < this.requestedFunctions.length; i++) {
		// find the function
		func = this.functionSet.getFunctionByName(this.requestedFunctions[i].functionName);
		// get the dependecies for the requested rendition
		var dependencies = func.getDependencies(this.requestedFunctions[i].renditionId);
		dependencies.each(function(dependency) {
			if(	dependency) {
				if(	this.requestedFunctionsContainDependency(dependency) ||
					this.headerContainsDependency(dependency)) {
				}
				else {
					errors.push({functionName: func.name, dependency: dependency});
				}
			}
		}.bind(this));
	}
	return errors;
};

jessie.Builder.prototype.getMissingConstructorDependencies = function() {
	var missing = [],
		constructorFn,
		requestedConstructor,
		prototypeMethod,
		dependencies,
		i = 0;

	if(this.requestedConstructors) {
		for( ; i < this.requestedConstructors.length; i++) {
			requestedConstructor = this.requestedConstructors[i];
			constructorFn = this.constructorFnSet.getConstructorFnByName(requestedConstructor.constructorName);
			dependencies = constructorFn.getDependencies();
			// this handles constructor dependencies
			dependencies.forEach(function(dependency) {
				if(dependency) {
					// does the constructor dependency appear in the requested functions
					// or in the header declarations
					if(	this.requestedFunctionsContainDependency(dependency) ||
						this.headerContainsDependency(dependency)) {
					}
					// no it doesn't
					else {
						missing.push({functionName: constructorFn.constructorName, dependency: dependency});
					}
				}
			}.bind(this));

			// now check constructors' prototypMethods for dependencies
			var prototypeMethods = constructorFn.getPrototypeMethods();
			i = 0;
			for(; i < prototypeMethods.length; i++) {
				prototypeMethod = prototypeMethods[i];
				dependencies = prototypeMethod.getDependencies();
				dependencies.each(function(dependency) {
					if(dependency) {
						// does the requestedFunctions contain the dependency
						// does the header contain the dependency
						// is the dependency the constructor name itself
						if(	this.requestedFunctionsContainDependency(dependency) ||
							this.headerContainsDependency(dependency) ||
							dependency === constructorFn.name) {
						}
						// no it doesn't
						else {
							missing.push({
								functionName: constructorFn.name+"#"+prototypeMethod.name,
								dependency: dependency
							});
						}
					}

				}.bind(this));
			}
		}
	}

	return missing;
};

jessie.Builder.prototype.requestedFunctionsContainDependency = function(dependency) {
	var containsDependency = false;
	for(var i = 0; i < this.requestedFunctions.length; i++) {
		if(dependency == this.requestedFunctions[i].functionName) {
			containsDependency = true;
			break;
		}
	}
	return containsDependency;
};

jessie.Builder.prototype.headerContainsDependency = function(dependency) {
	return this.headerDeclarations.indexOf(dependency) >= 0;
};

jessie.Builder.prototype.getContents = function() {
	var output = '';
	this.requestedFunctions.forEach(function(func) {
		var rendition = this.getRendition(func.functionName, func.renditionId);
		//var dependencies = rendition.dependencies;
		//console.log(dependencies);
		output += "\n\n" + rendition.getContents(func.functionName, func.renditionId) + "\n\n";
	}.bind(this));
	return output;
};

jessie.Builder.prototype.getRendition = function(functionName, renditionId) {
	var rendition;
	this.functionSet.getFunctions().forEach(function(func) {
		if(func.name === functionName) {
			rendition = func.renditions[renditionId-1];
		}
	}.bind(this));
	return rendition;
};

module.exports.jessie = jessie;