#!/usr/bin/env node
/*jslint node:true, strict:false */

// imports
var program = require('commander'),
	Table = require('cli-table'),
	Set = require('simplesets').Set,
	fs = require('fs'),
	path = require('path'),
	jsp = require("uglify-js").parser,
	pro = require("uglify-js").uglify;

var JessieFunction = require('../builder/libs/jessie/Function.js');
var JessieRendition = require('../builder/libs/jessie/Rendition.js');
var JessieConstructorFn = require('../builder/libs/jessie/ConstructorFn.js');
var JessiePrototypeMethod = require('../builder/libs/jessie/PrototypeMethod.js');
var JessieFunctionSet = require('../builder/libs/jessie/FunctionSet.js');
var JessieConstructorFnSet = require('../builder/libs/jessie/ConstructorFnSet.js');
var JessieBuilder = require('../builder/libs/jessie/Builder.js');

program
	.version('0.0.1')
	.usage('[options] <functions ...>')
	.option('-l, --list', 'Print a list of available functions')
	.option('-o, --output [file]', 'The file to output to (outputs to stdout by default)')
	.option('--minify', 'Minify the output using UglifyJS')
	.option('--mangle', 'Mangle the generated output via UglifyJS')
	.option('--beautify', 'Output beautified JS')
	.option('--root [path]', 'the folder that jessie functions are located in', path.join(__dirname, '../functions/'))
	.option('--exports <list>', 'A comma separated list of internal functions to export (default: [isHostMethod, isHostObjectProperty])', list, ['isHostMethod', 'isHostObjectProperty'])
	.option('--header [path]', 'The header file', path.join(__dirname, '../libraries/header1.inc'))
	.option('--footer [path]', 'The footer file', path.join(__dirname, '../libraries/footer1.inc'))
	.option('--namespace [name]', 'The name of the global variable to export', "jessie")
	.parse(process.argv);

var functionSet = new JessieFunctionSet('../functions/', JessieFunction, JessieRendition);
functionSet.create();

var constructorFnSet = new JessieConstructorFnSet('../constructors/', JessieConstructorFn, JessiePrototypeMethod);
constructorFnSet.create();

var requestedFunctions = [];
var requestedConstructorFns = [];

// if no args are used, output the help
if(program.args.length === 0) {
	process.stdout.write(program.helpInformation());
	program.emit('--help');
	process.exit(0);
}

setupRequestedFunctions();

var buildOptions = {};
buildOptions.headerPath = '../libraries/header1.inc';
buildOptions.footerPath = '../libraries/footer1.inc';

if(program.minify) {
	buildOptions.minify = true;
}

if(program.namespace) {
	buildOptions.namespace = program.namespace.trim();
}

var builder = new JessieBuilder(functionSet, constructorFnSet, requestedFunctions, requestedConstructorFns, buildOptions);

var response = builder.build();
if(response.success) {
	if(program.output) {
		var output = fs.createWriteStream(program.output);
		output.once('open', function(){
			output.write(response.output);
		});
	} else {
		process.stdout.write(response.output);
	}
}
else {
	var firstError = response.errors[0];
	var message = "" + firstError.itemName + ": " + firstError.message;
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

process.stderr.write("\nFile written to: '" + program.output + "'. \n\nEnjoy and happy cross-browser scripting!");

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