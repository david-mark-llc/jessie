/*jslint node:true, strict:false*/

var express = require('express'),
	querystring = require('querystring'),
	JessieFunction = require('./libs/jessie/Function.js'),
	JessieRendition = require('./libs/jessie/Rendition.js'),
	JessieConstructorFn = require('./libs/jessie/ConstructorFn.js'),
	JessiePrototypeMethod = require('./libs/jessie/PrototypeMethod.js'),
	JessieConstructorFnSet = require('./libs/jessie/ConstructorFnSet.js'),
	JessieFunctionSet = require('./libs/jessie/FunctionSet.js'),
	md = require("node-markdown").Markdown,
	JessieBuilder = require('./libs/jessie/Builder.js'),
	app = express.createServer(),
	functionSet = new JessieFunctionSet('../functions/', JessieFunction, JessieRendition),
	constructorFnSet = new JessieConstructorFnSet('../constructors/', JessieConstructorFn, JessiePrototypeMethod),
	excludedQuerystringKeys = ['download', 'namespace', 'minify'];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false });
app.configure(function(){
	app.use(express['static'](__dirname + '/public'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
});
app.listen(1337);

functionSet.create();
constructorFnSet.create();

// add constructor names to exluded keys for building up functions
constructorFnSet.getConstructorFns().forEach(function(constructorFn) {
	excludedQuerystringKeys.push(constructorFn.name);
});

app.get('/', function(req, res){
	var query = req.query,
		builderOptions = {
			headerPath: '../libraries/header1.inc',
			footerPath: '../libraries/footer1.inc'
		},
		builder = null,
		buildResponse = null,
		requestedFunctions,
		requestedConstructorFns,
		namespace,
		minify,
		fileName = 'jessie',
		errors = [];

	/*
	 * There is a download param in the querystring as the user
	 * has submitted the form (but not necessarily)
	 */
	if(query['download']) {
		requestedFunctions = getRequestedFunctions(query);
		requestedConstructorFns = getRequestedConstructors(query);
		
		namespace = query['namespace'].trim();
		if(namespace && namespace.length > 0) {

			// The user has typed a namespace
			builderOptions.namespace = namespace;
			fileName = namespace;
		}

		minify = query['minify'];
		if(minify == 'on') {

			// The user has asked for a minified version
			builderOptions.minify = true;
		}

		builder = new JessieBuilder(functionSet, constructorFnSet, requestedFunctions, requestedConstructorFns, builderOptions);
		buildResponse = builder.build();

		if(buildResponse.errors) {
			errors = getErrorsInViewFriendlyFormat(buildResponse.errors);
			res.render('index.ejs', {
				functions: functionSet.getFunctions(),
				constructorFns: constructorFnSet.getConstructorFns(),
				errors: errors,
				query: query,
				md: md
			});
		} else {
			res.header('Content-Disposition', 'attachment; filename="'+fileName+'.js"');
			res.contentType('text/javascript');
			res.send(buildResponse.output);
		}
	
	/*
	 * The user has requested the page without a download querystring
	 * param, so we just show page
	 */
	} else {
		res.render('index.ejs', {
			functions: functionSet.getFunctions(),
			constructorFns: constructorFnSet.getConstructorFns(),
			query: query,
			errors: errors,
			md: md
		});
	}
});

function getRequestedFunctions(query) {
	var requestedFunctions = [],
		key;

	for(key in query) {
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
	var index,
		i = 0;
	for(; i < requestedConstructorFns.length; i++) {
		if(requestedConstructorFns[i].constructorName === name) {
			index = i;
			break;
		}
	}
	return index;
}

function getRequestedConstructors(query) {
	var requestedConstructorFns = [],
		key,
		keyParts,
		constructorName,
		methodName,
		index;

	for(key in query) {

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
			keyParts = key.split("#");
			constructorName = keyParts[0];
			methodName = keyParts[1];


			index = getRequestedConstructorIndexByName(requestedConstructorFns, constructorName);

			if(typeof index == 'number') {
				requestedConstructorFns[index].methods.push(methodName);
			} else {
				requestedConstructorFns.push({
					constructorName: constructorName,
					methods: [methodName]
				});
			}
		}
	}

	return requestedConstructorFns;
}

function getErrorsInViewFriendlyFormat(errors) {
	var errorItem,
		errorMessage,
		errorMessages = [],
		i = 0,
		l = errors.length;

	for(; i < l; i++) {
		errorItem = errors[i];
		if(errorItem.itemName) {
			errorMessage = (i+1) + '. ' + errorItem.itemName + ' depends on ' + errorItem.dependency;
		}
		else {
			errorMessage = (i+1) + '. ' + errorItem;
		}
		errorMessages.push(errorMessage);
	}

	return errorMessages;
}