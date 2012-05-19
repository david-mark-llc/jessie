// dependencies
var express = require('express');
var querystring = require('querystring');
var jessie = require('./libs/jessie/jessie.js').jessie;

// setup express
var app = express.createServer();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false});

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    //app.use(app.router);
});

app.listen(1337);

// create functionSet
var functionSet = new jessie.FunctionSet('../functions/', jessie.Function);
functionSet.create();

var builder = new jessie.Builder(functionSet.getFunctions());

var mockRequestedFunctions = [{
	functionName: "addClass",
	renditionId: 1
},{
	functionName: "attachListener",
	renditionId: 1
},{
	functionName: "attachBoundListener",
	renditionId: 1
}];

builder.getContents(mockRequestedFunctions);

// form
app.get('/', function(req, res){
	res.render('index.ejs', { functions: functionSet.getFunctions() });
});

// response
app.get('/build/', function(req, res){
	var qs = querystring.stringify(req.query);
	res.render('builderresponse.ejs', { query: qs });
});