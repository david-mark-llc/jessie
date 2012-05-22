
// dependencies
var express = require('express');
var querystring = require('querystring');
var md = require('node-markdown').Markdown;
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

// create functionSet
var functionSet = new jessie.FunctionSet('../functions/', jessie.Function);
functionSet.create();

// form
app.get('/', function(req, res){
	res.render('index.ejs', { functions: functionSet.getFunctions(), query: req.query, error: req.query.error });
});

// response
app.get('/build/', function(req, res){
	var qs = querystring.stringify(req.query);
	var requestedFunctions = [];
	for(var key in req.query) {
		if(key === 'download') continue;
		requestedFunctions.push({
			functionName: key,
			renditionId: parseInt(req.query[key], 10)
		});
	}

	if(requestedFunctions.length === 0) {
		res.redirect('/?error=true');
	}

	var builder = new jessie.Builder(functionSet, requestedFunctions, {
		headerPath: '../libraries/header1.inc',
		footerPath: '../libraries/footer1.inc'
	});

	var buildResponse = builder.build();

	if(buildResponse.errors) {
		res.render('builderresponse.ejs', {errors: buildResponse.errors, query: qs });
	}
	else {
		res.header('Content-Disposition', 'attachment; filename="jessie.js');
		res.contentType('text/javascript');
		res.send(buildResponse.output);
	}

});