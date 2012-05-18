/*jslint node:true, strict:false */
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express.createServer();
var Set = require('simplesets').Set;
//var program = require('../bin/jessie');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false});
app.use(express.static(__dirname + '/public'));
app.listen(1337);

var JessieFunction = function(folder) {
	this.folder = folder;
	this.name = path.basename(folder);
	
	this.renditions = fs.readdirSync(folder).sort().filter(function(f){
		return f.indexOf(".js") === f.length - 3;
	}).map(function(f){
		return new Rendition(this, path.join(folder, f));
	}.bind(this));
	
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

var Rendition = function(func, file) {
	this.func = func;
	this.file = file;
	
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

	this.getContents = function() {
		// remove the /*global / declarations
		var contents = [this.contents.replace(/\/\*global\s(\S*)\s*\*\/\n*/g, "")];
		return contents.join("\n");
	}.bind(this);
};


// populate functions with an array of JessieFunction objects
var functions = [];
fs.readdirSync('../functions/').filter(function(f){
	return fs.statSync(path.join('../functions/', f)).isDirectory();
}).forEach(function(f){
	functions.push(new JessieFunction(path.join('../functions/', f)));
});

functions = functions.sort(nameSorter);

function nameSorter(a, b) {
	var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
	if(nameA < nameB) {
		return -1;
	}
	if(nameA > nameB) {
		return 1;
	}
	return 0;
}

app.get('/', function(req, res){
	res.render('index.ejs', { functions: functions });
});

app.get('/buildresponse', function(req, res){

	var requestJessieFunctions = req.query;

	res.render('builderresponse.ejs', { functions: functions });
});