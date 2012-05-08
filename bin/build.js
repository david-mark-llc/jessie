#!/usr/bin/env node

var program = require('commander'),
	Table = require('cli-table'),
	Set = require('simplesets').Set,
	fs = require('fs'),
	path = require('path');

program
	.version('0.0.1')
	.usage('[options] <functions ...>')
	.option('-l, --list', 'Print a list of available functions')
	.option('-o, --output [file]', 'The file to output to (outputs to stdout by default)')
	.option('-a, --all', 'Include all Functions and Renditions')
	.option('-u, --uglify', 'Minify the output using UglifyJS')
	.option('--root [path]', 'the folder that jessie functions are located in', '../functions/')
	.option('--no-wrap', 'Don\'nt wrap the built file with the header/footer file contents')
	.parse(process.argv);


// look in the root directory and get an array of JessieFunctions
// doing this all sync for simplicity at the moment!
var functions = {};
fs.readdirSync(program.root).filter(function(f){
	return fs.statSync(path.join(program.root, f)).isDirectory();
}).forEach(function(f){
	f = new JessieFunction(path.join(program.root, f));
	functions[f.name] = f;
});


if(program.list) {
	var t = new Table({head: ["Function Name"], colWidths: [40]});
	functions.forEach(function(f){
		t.push([f.name]);
	});
	process.stdout.write(t.toString() + "\n");
	process.exit(0);
}

// if no args are used
if(program.args.length === 0) {
	process.stdout.write(program.helpInformation());
	program.emit('--help');
	process.exit(0);
}

// parse the args to get a map of functions that we need to output
var requestedFunctions = {};
program.args.forEach(function(v){
	// each argument can specify the renditions that are required
	// by separating them with colons
	v = v.split(":");
	requestedFunctions[v[0]] = v.splice(1);
});


var HEADER_DECLARATIONS = ["global", "globalDocument", "html", "canCall", "isHostObjectProperty", "isHostMethod"];

expandDependencies(HEADER_DECLARATIONS, functions, requestedFunctions);
process.stderr.write(Object.keys(requestedFunctions).join(", ") + "\n");

function Rendition(func, file) {
	this.func = func;
	this.file = file;
	
	this.getContents = function(){
		if(!this._contents) {
			this._contents = fs.readFileSync(this.file, 'utf8');
			console.log(this._contents)
		}
		return this._contents;
	}.bind(this);
	this.getDependencies = function(){
		if(!this._dependencies) {
			this._dependencies = new Set();
			var contents = this.getContents(),
				re = /\/\*global\s(.*)\s+?\*\//g,
				match;
			while((match = re.exec(contents))) {
				match[1].split(",").forEach(function(d){
					d = d.split(":")[0];
					if(d !== this.func.name) {
						this._dependencies.add(d);
					}
				}.bind(this));
			}
		}

		return this._dependencies;
	}.bind(this);
}


function JessieFunction(folder){
	this.folder = folder;
	this.name = path.basename(folder);
	this.renditions = fs.readdirSync(folder).filter(function(f){ 
		return f.indexOf(".js") === f.length - 3;
	}).map(function(f){
		return new Rendition(this, path.join(folder, f));
	}.bind(this));
	//console.log(this.renditions);
	
	this.getDependencies = function(renditions){
		if(renditions.length === 0) {
			renditions = range(1, this.renditions.length);
		}
		var dependencies = new Set();
		renditions.forEach(function(r){
			dependencies = dependencies.union(this.renditions[r-1].getDependencies());
		}.bind(this));
		return dependencies;
	}.bind(this);
}

// JessieFunction.prototype.getDependencies = function(renditions) {
// 	return [];
// };


function expandDependencies(glob, functions, required){
	var dep, deps = new Set(Object.keys(required));
	while((dep = deps.pop())) {
		functions[dep].getDependencies(required[dep]).each(function(d){
			if(!required[d] && !deps.has(d) && glob.indexOf(d) == -1) {
				// if(functions[d].renditions.length > 1) {
					//throw new Error(d+" is an implied dependency, but requires the rendition to be specified!");
				// }
				console.log("implied dependency: " + d)
				required[d] = range(1, functions[d].renditions.length);//[];
				deps.add(d);
			}
		});
	}
}

function range(start, end)
{
	var foo = [];
	for (var i = start; i <= end; i++)
		foo.push(i);
	return foo;
}