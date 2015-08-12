/*jshint node:true, strict:false*/

var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var swigExtras = require('swig-extras');
var path = require('path');

var port = process.env.PORT || 1337;
var app = express();

app.set('views', path.resolve(__dirname, 'views'));

// swig
swig.setDefaults({ cache: false });
swigExtras.useFilter(swig, 'markdown');
swigExtras.useTag(swig, 'markdown');

app.engine('html', swig.renderFile);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view cache', false);
app.set('view options', { layout: false });

app.use( '/public', express['static'](path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', require('./controllers/homeController.js'));
app.get('/builder/', require('./controllers/builderController.js'));

app.listen(port, function(){
	console.log("Jessie listening on port: "+ port);
});
