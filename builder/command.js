#!/usr/bin/env node
/*jslint node:true, strict:false */

// imports
var program = require('commander'),
	Table = require('cli-table'),
	Set = require('simplesets').Set,
	fs = require('fs'),
	path = require('path'),
	jsp = require("uglify-js").parser,
	pro = require("uglify-js").uglify,
	JessieFunction = require('../builder/libs/jessie/Function.js'),
	JessieRendition = require('../builder/libs/jessie/Rendition.js'),
	JessieConstructorFn = require('../builder/libs/jessie/ConstructorFn.js'),
	JessiePrototypeMethod = require('../builder/libs/jessie/PrototypeMethod.js'),
	JessieFunctionSet = require('../builder/libs/jessie/FunctionSet.js'),
	JessieConstructorFnSet = require('../builder/libs/jessie/ConstructorFnSet.js'),
	JessieBuilder = require('../builder/libs/jessie/Builder.js'),
	functionSet = new JessieFunctionSet('../functions/', JessieFunction, JessieRendition),
	constructorFnSet = new JessieConstructorFnSet('../constructors/', JessieConstructorFn, JessiePrototypeMethod),
	requestedFunctions = [],
	requestedConstructorFns = [],
	buildOptions = {
		headerPath: '../libraries/header1.inc',
		footerPath: '../libraries/footer1.inc'
	},
	builder = null,
	response = null,
	output = null,
	firstError,
	message;

program
	.version('0.0.1')
	.usage('[options] <functions ...>')
	.option('-o, --output [file]', 'The file to output to (outputs to stdout by default)')
	.option('--minify', 'Minify the output using UglifyJS')
	.option('--namespace [name]', 'The name of the global variable to export', "jessie")
	.parse(process.argv);

functionSet.create();
constructorFnSet.create();

// if no args are used, output the help
if(program.args.length === 0) {
	process.stdout.write(program.helpInformation());
	program.emit('--help');
	process.exit(0);
}

setupRequestedFunctions();

if(program.minify) {
	buildOptions.minify = true;
}

if(program.namespace) {
	buildOptions.namespace = program.namespace.trim();
}

builder = new JessieBuilder(functionSet, constructorFnSet, requestedFunctions, requestedConstructorFns, buildOptions);
response = builder.build();

if(response.success) {
	if(program.output) {
		output = fs.createWriteStream(program.output);
		output.once('open', function(){
			output.write(response.output);
		});
	} else {
		process.stdout.write(response.output);
	}
}
else {
	firstError = response.errors[0];
	message = "" + firstError.itemName + ": depends on " + firstError.dependency;
	throw new Error(message);
}

// output some info to stderr
process.stderr.write("\n========================================================\n\n");
process.stderr.write("Jessie build successful!\n\n");
process.stderr.write("The following functions have been included:\n\n");

requestedFunctions.forEach(function(requestedFunction, i) {
	process.stderr.write(""+(i+1));
	process.stderr.write(".\t");
	process.stderr.write(requestedFunction.functionName);
	process.stderr.write("\n");
});

if(program.output) {
	process.stderr.write("\n");
	process.stderr.write("File written to: " + program.output + ".");
	process.stderr.write("\n");
}

process.stderr.write("\nEnjoy and happy cross-browser scripting!");
process.stderr.write("\n\n========================================================\n\n");

function list(val) {
	return val.split(',');
}

function setupRequestedFunctions() {
	// parse the args to get a map of functions that we need to output
	program.args.forEach(function(arg){
		// each argument can specify the renditions that are required
		// by separating them with colons
		arg = arg.split(":");

		// first part is the function name
		var functionName = arg[0];

		// second part is the renditionId (1 or 2 or 3 etc)
		var renditionId = arg[1];

		if(!renditionId) {
			throw new Error("You must specify a particular rendition e.g. "+functionName+":1");
		}

		if(arg.length > 2) {
			throw new Error("Only one rendition allowed");
		}

		requestedFunctions.push({
			functionName: functionName,
			renditionId: parseInt(renditionId, 10)
		});

		if(functionSet.getFunctionByName(functionName) === null) {
			throw new Error("Could not find function: " + functionName);
		}
	});
}