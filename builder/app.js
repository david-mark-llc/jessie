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

var mockRequestedFunctions = [{
	functionName: "addClass",
	renditionId: 1
},{
	functionName: "attachBoundListener",
	renditionId: 1
},{
	functionName: "bind",
	renditionId: 1
},{
	functionName: "attachListener",
	renditionId: 2
}];

var builder = new jessie.Builder(functionSet, mockRequestedFunctions, {
	headerPath: '../libraries/header1.inc',
	footerPath: '../libraries/footer1.inc'
});

// form
app.get('/', function(req, res){
	res.render('index.ejs', { functions: functionSet.getFunctions() });
});

// response
app.get('/build/', function(req, res){
	var qs = querystring.stringify(req.query);
	buildResponse = builder.build();
	res.send(new Buffer(buildResponse.output));
});