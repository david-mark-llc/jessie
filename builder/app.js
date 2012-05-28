/*jslint node:true, strict:false*/

// dependencies
var express = require('express');
var querystring = require('querystring');

var JessieFunction = require('./libs/jessie/Function.js');
var JessieRendition = require('./libs/jessie/Rendition.js');

var JessieConstructorFn = require('./libs/jessie/ConstructorFn.js');
var JessiePrototypeMethod = require('./libs/jessie/PrototypeMethod.js');

var JessieConstructorFnSet = require('./libs/jessie/ConstructorFnSet.js');
var JessieFunctionSet = require('./libs/jessie/FunctionSet.js');

var JessieBuilder = require('./libs/jessie/Builder.js');

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

var functionSet = new JessieFunctionSet('../functions/', JessieFunction, JessieRendition);
functionSet.create();

var constructorFnSet = new JessieConstructorFnSet('../constructors/', JessieConstructorFn, JessiePrototypeMethod);
constructorFnSet.create();


var excludedQuerystringKeys = ['download'];

// add constructor names to exluded keys for building up functions
constructorFnSet.getConstructorFns().forEach(function(constructorFn) {
	excludedQuerystringKeys.push(constructorFn.name);
});


function getRequestedFunctions(query) {
	var requestedFunctions = [];
	for(var key in query) {
		if(excludedQuerystringKeys.indexOf(key) > -1) {
			continue;
		}
		// if its a prototype method key such as 'Element#addClass'
		if(key.indexOf("#") > -1) {
			continue;
		}

		requestedFunctions.push({
			functionName: key,
			renditionId: parseInt(query[key], 10)
		});
	}
	return requestedFunctions;
}


function getRequestedConstructorIndexByName(requestedConstructorFns, name) {
	var index;
	for(var i = 0; i < requestedConstructorFns.length; i++) {
		if(requestedConstructorFns[i].constructorName === name) {
			index = i;
			break;
		}
	}
	return index;
}

function getRequestedConstructors(query) {
	var requestedConstructorFns = [];
	for(var key in query) {

		// firstly check if the key is a constructor name
		if(constructorFnSet.getConstructorFnByName(key)) {
			requestedConstructorFns.push({
				constructorName: key,
				methods: []
			});
			continue;
		}

		// secondly check that it is a method in the format ConstructorName#methodName
		if(key.indexOf("#") > -1) {
			var keyParts = key.split("#");
			var constructorName = keyParts[0];
			var methodName = keyParts[1];


			var index = getRequestedConstructorIndexByName(requestedConstructorFns, constructorName);

			if(typeof index == 'number') {
				requestedConstructorFns[index].methods.push(methodName);
			}
			else {
				requestedConstructorFns.push({
					constructorName: constructorName,
					methods: [methodName]
				});
			}
		}

	}
	return requestedConstructorFns;
}

app.get('/', function(req, res){
	var query = req.query;
	var builder;


	// Trying to download
	if(query['download']) {

		var requestedFunctions = getRequestedFunctions(query);
		
		var requestedConstructorFns = getRequestedConstructors(query);

		builder = new JessieBuilder(functionSet, requestedFunctions, constructorFnSet, requestedConstructorFns, {
			headerPath: '../libraries/header1.inc',
			footerPath: '../libraries/footer1.inc'
		});

		var errors = [];

		if(requestedFunctions.length === 0) {
			errors.push('Please select at least one function.');
			res.render('index.ejs', {
				functions: functionSet.getFunctions(),
				constructorFns: constructorFnSet.getConstructorFns(),
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
					constructorFns: constructorFnSet.getConstructorFns(),
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
			constructorFns: constructorFnSet.getConstructorFns(),
			query: req.query,
			errors: errors
		});
	}
	
});