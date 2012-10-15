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
	app = express(),
	functionSet = new JessieFunctionSet('../functions/', JessieFunction, JessieRendition),
	constructorFnSet = new JessieConstructorFnSet('../constructors/', JessieConstructorFn, JessiePrototypeMethod),
	excludedQuerystringKeys = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false });
app.configure(function(){
	app.use(express['static'](__dirname + '/public'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
});
app.listen(1337, function(){
	console.log("App listening on port 1337");
});


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
		functions,
		requestedConstructorFns,
		namespace,
		minification,
		scaffolding = false,
		fileName = 'jessie',
		action = query['action'],
		errors = [];

	/*
	 * There is a download param in the querystring as the user
	 * has submitted the form (but not necessarily)
	 */
	if(action == 'Download') {
		requestedFunctions = getRequestedFunctions(query);
		requestedConstructorFns = getRequestedConstructors(query);
		
		namespace = query['namespace'];
		if(namespace) {
			namespace = namespace.trim();
		}
		if(namespace && namespace.length > 0) {

			// The user has typed a namespace
			builderOptions.namespace = namespace;
			fileName = namespace;
		}

		minification = query['minification'];
		if(minification) {

			// The user has asked for a minified version
			builderOptions.minification = minification;
		}

		scaffolding = query['scaffolding'];
		if(scaffolding == 'on') {

			// The user has asked for scaffolding to be included
			builderOptions.scaffolding = true;
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

		if(query['degradesIEFilter']) {
			functions = functionSet.getFunctionsFilteredByIEVersion(query['degradesIEFilter']);
		}
		else {
			functions = functionSet.getFunctions();
		}

		res.render('index.ejs', {
			functions: functions,
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
		
		var renditionId = parseInt(query[key], 10);
		// if no rendition was wanted after all
		if (renditionId==-1) {
			continue;
		}
		
		requestedFunctions.push({
			functionName: key,
			renditionId: renditionId
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
		errorMessages = [],
		i = 0,
		l = errors.length;

	for(; i < l; i++) {
		errorItem = errors[i];
		if(errorItem.itemName) {
			errorItem.message = (i+1) + '. ' + errorItem.itemName + ' depends on ' + errorItem.dependency;
			errorItem.link = '#' + errorItem.dependency;
		}
		else {
			errorItem = { message: (i+1) + '. ' + errorItem };
		}
		
		errorMessages.push(errorItem);
	}
	return errorMessages;
}