/*jslint node:true, strict:false */

// dependencies
var express = require('express');
var app = express.createServer();
var jessie = require('./libs/jessie/jessie.js').jessie;

// setup express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout:false});
app.use(express.static(__dirname + '/public'));
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

// routes
app.get('/', function(req, res){
	res.render('index.ejs', { functions: functionSet.getFunctions() });
});

app.get('/buildresponse', function(req, res){
	var requestJessieFunctions = req.query;
	res.render('builderresponse.ejs', { functions: functionSet.getFunctions(), query: requestJessieFunctions });
});