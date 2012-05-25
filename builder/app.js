
// dependencies
var express = require('express');
var querystring = require('querystring');
var jessie = require('./libs/jessie/jessie.js').jessie;



// setup express
var app = express.createServer();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false, md: require("node-markdown").Markdown });
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
});
app.listen(1337);

var functionSet = new jessie.FunctionSet('../functions/', jessie.Function);
functionSet.create();

var constructorFnSet = new jessie.ConstructorFnSet('../constructors/', jessie.ConstructorFn);
constructorFnSet.create();
/*
var requestedFunctions = [{
	functionName: "detachListener",
	renditionId: 1 
}, {
	functionName: "addClass",
	renditionId: 2
},{
	functionName: "removeClass",
	renditionId: 1
},{
	functionName: "hasClass",
	renditionId: 1
},{
	functionName: "attachBoundListener",
	renditionId: 1
},{
	functionName: "bind",
	renditionId: 1
},{
	functionName: "attachListener",
	renditionId: 1
}];

var requestedConstructors = [{
	constructorName: "Element1",
	methods: ["addClass", "removeClass", "attachListener"]
}];


builder = new jessie.Builder(functionSet, requestedFunctions, constructorFnSet, requestedConstructors, {
	headerPath: '../libraries/header1.inc',
	footerPath: '../libraries/footer1.inc'
});

var builderResponse = builder.build();

*/


var excludedQuerystringKeys = ['download'];

// form
app.get('/', function(req, res){
	var query = req.query;
	var builder;


	// Trying to download
	if(query['download']) {

		var requestedFunctions = [];
		for(var key in req.query) {
			if(excludedQuerystringKeys.indexOf(key) > -1) {
				continue;
			}
			requestedFunctions.push({
				functionName: key,
				renditionId: parseInt(req.query[key], 10)
			});
		}

		builder = new jessie.Builder(functionSet, requestedFunctions, null, null, {
			headerPath: '../libraries/header1.inc',
			footerPath: '../libraries/footer1.inc'
		});

		var errors = [];

		if(requestedFunctions.length === 0) {
			errors.push('Please select at least one rendition.');
			res.render('index.ejs', {
				functions: functionSet.getFunctions(),
				errors: errors,
				query: query
			});
		}
		else {
			var buildResponse = builder.build();
			if(buildResponse.errors) {

				for(var i = 0; i < buildResponse.errors.length; i++) {
					errors.push( (i+1) + '. ' + buildResponse.errors[i].functionName + ' depends on ' + buildResponse.errors[i].dependency);
				}

				res.render('index.ejs', {
					functions: functionSet.getFunctions(),
					errors: errors,
					query: query
				});
			}
			else {
				res.header('Content-Disposition', 'attachment; filename="jessie.js');
				res.contentType('text/javascript');
				res.send(buildResponse.output);
			}
		}
	}
	else {
		res.render('index.ejs', {
			functions: functionSet.getFunctions(),
			query: req.query,
			errors: errors
		});
	}
	
});