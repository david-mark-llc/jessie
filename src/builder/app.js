/*jslint node:true, strict:false*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');
var swigExtras = require('swig-extras');
var port = 1337;

// swig
swig.setDefaults({ cache: false });
swigExtras.useFilter(swig, 'markdown');
swigExtras.useTag(swig, 'markdown');

app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('view cache', false);
app.set('view options', { layout: false });

app.use(express['static'](__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', require('./controllers/builderController.js'));

app.listen(port, function(){
	console.log("Jessie listening on port: "+ port);
});
