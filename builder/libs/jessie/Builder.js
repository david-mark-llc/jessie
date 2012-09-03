/*jslint node:true, strict:false*/

var fs = require('fs'),
	uglifyParser = require("uglify-js").parser,
	pro = require("uglify-js").uglify,
	jessie = {};

/*
 * Responsible for building the contents for jessie.js
 * @constructor
 * @param functionSet {Object} Instance of jessie.FunctionSet
 * @param constructorFnSet {Object} Instance of jessie.ConstructorFnSet
 * @param requestedFunctions {Array} List of requested function objects in
 * format { functionName: 'addClass', renditionId: 2 }
 * @param requestedConstructorFns {Array} List of requested constructor
 * function objects in format { constructorName: 'Element', methods: ['addClass', 'attachListener'] }
 * @param options {Object} List of options for the builder
 * @param options.headerPath {String} Path to header file. Defaults to '../libraries/header1.inc'
 * @param options.footerPath {String} Path to footer file. Defaults to '../libraries/footer1.inc'
 * @param options.licensePath {String} Path to license file. Defaults to '../LICENSE'
 * asdas
 */
jessie.Builder = function(functionSet, constructorFnSet, requestedFunctions, requestedConstructorFns, options) {
	this.defaultExports = ['isHostMethod', 'isHostObjectProperty', 'areFeatures'];

	// function stuff
	this.functionSet = functionSet;
	this.functions = this.functionSet.getFunctions();
	this.requestedFunctions = requestedFunctions;

	// constructor stuff
	this.constructorFnSet = constructorFnSet;
	this.constructorFns = this.constructorFnSet.getConstructorFns();
	this.requestedConstructorFns = requestedConstructorFns;

	this.setupOptions(options);

	this.headerDeclarations = ['global'];
	this.setupLicense();
	this.setupHeader();
	this.setupFooter();
	this.setupHeaderDeclarations();
};

jessie.Builder.prototype.setupOptions = function(options) {
	this.options = options || {};
	this.options.namespaceToken = 'jessieNamespace';
	this.options.headerPath = this.options.headerPath || '../libraries/header1.inc';
	this.options.footerPath = this.options.footerPath || '../libraries/footer1.inc';
	this.options.licensePath = this.options.licensePath || '../LICENSE';
	this.options.namespace = this.options.namespace || 'jessie';
	this.options.minify = this.options.minify || false;
};

jessie.Builder.prototype.setupHeader = function() {
	this.header = fs.readFileSync(this.options.headerPath, "utf8");
};

jessie.Builder.prototype.setupFooter = function() {
	this.footer = fs.readFileSync(this.options.footerPath, "utf8");
};

jessie.Builder.prototype.setupLicense = function() {
	this.license = '/*' + fs.readFileSync(this.options.licensePath, "utf8") + '*/\n\n';
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

	var errors = [];

	if(this.requestedFunctions.length === 0) {
		errors.push('Please choose at least one function');
	}

	var missingFunctionDependencies = this.getMissingFunctionDependencies();
	var missingContructorDependencies = this.getMissingConstructorDependencies();

	errors = errors.concat(missingFunctionDependencies, missingContructorDependencies);

	if(errors.length > 0) {
		builderResponse.success = false;
		builderResponse.errors = errors;
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


		var constructorFn;
		if(this.requestedConstructorFns) {
			this.requestedConstructorFns.forEach(function(requestedConstructorFn, i) {
				constructorFn = this.constructorFnSet.getConstructorFnByName(requestedConstructorFn.constructorName);
				if(constructorFn) {
					jsContents += ("\n\n"+constructorFn.getContents() + "\n\n");

					var requestedMethods = requestedConstructorFn.methods;
					requestedMethods.forEach(function(requestedMethod) {
						var method = constructorFn.getPrototypeMethodByName(requestedMethod);
						jsContents += ("\n\n"+method.getContents() + "\n\n");
					});
				}
			}.bind(this));
		}


		jsContents += this.createExportDeclaration(order);

		jsContents += this.footer;
		builderResponse.output = jsContents;


		if(this.options.minify) {
			builderResponse.output = this.minify(builderResponse.output);
		}

		builderResponse.output = this.license + builderResponse.output;
		builderResponse.output = this.replaceNamespaceToken(builderResponse.output, this.options.namespace);
	}

	return builderResponse;
};

jessie.Builder.prototype.replaceNamespaceToken = function(output, namespace) {
	var re = new RegExp(this.options.namespaceToken, 'g');
	return output.replace(re, namespace);
};

jessie.Builder.prototype.minify = function(output) {
	var ast = uglifyParser.parse(output);
	return pro.gen_code(ast);
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
	var hasRequestedConstructors = (this.requestedConstructorFns && this.requestedConstructorFns.length > 0);

	var out = '';

	order = this.defaultExports.concat(order);

	order.forEach(function(functionName, i){
		out += '\n' + this.options.namespace;
		out += '.' + functionName;
		out += ' = ';
		out += functionName;
		out += ';';
	}.bind(this));

	if(this.requestedConstructorFns) {
		this.requestedConstructorFns.forEach(function(requestedConstructorFn, i) {
			out += '\n' + this.options.namespace;
			out += '.'+ requestedConstructorFn.constructorName;
			out += ' = ';
			out += requestedConstructorFn.constructorName;
			out += ';';
		}.bind(this));
	}

	out += '\n';
	
	return out;
};

// this function needs a look
// all it should do is return any errors around dependencies that
// havent been specified rather than throwing etc
jessie.Builder.prototype.getMissingFunctionDependencies = function() {
	var errors = [];

	var func;

	// for each requested function
	for(var i = 0; i < this.requestedFunctions.length; i++) {
		// find the function
		func = this.functionSet.getFunctionByName(this.requestedFunctions[i].functionName);
		// get the dependecies for the requested rendition
		if(func) {
			var dependencies = func.getDependencies(this.requestedFunctions[i].renditionId);
			dependencies.each(function(dependency) {
				if(	dependency) {
					if(	this.requestedFunctionsContainDependency(dependency) ||
						this.headerContainsDependency(dependency)) {
					}
					else {
						errors.push({itemName: func.name, dependency: dependency});
					}
				}
			}.bind(this));
		}
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

	if(this.requestedConstructorFns) {
		for( ; i < this.requestedConstructorFns.length; i++) {
			requestedConstructor = this.requestedConstructorFns[i];

			constructorFn = this.constructorFnSet.getConstructorFnByName(requestedConstructor.constructorName);

			if(constructorFn) {
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
							missing.push({itemName: constructorFn.constructorName, dependency: dependency});
						}
					}
				}.bind(this));

				// now check constructors' prototypMethods for dependencies

				i = 0;
				for(; i < requestedConstructor.methods.length; i++) {
					prototypeMethod = constructorFn.getPrototypeMethodByName(requestedConstructor.methods[i]);
					if(prototypeMethod) {
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
										itemName: constructorFn.name+"#"+prototypeMethod.name,
										dependency: dependency
									});
								}
							}

						}.bind(this));
					}
				}
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

module.exports = jessie.Builder;