var connect = require('connect')
   , express =require('express')
  , path = require('path')
  //, routes=require('./routes')
  ,  morgan  = require('morgan')
  , exphbs = require('express3-handlebars');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride =require('method-override')
var cookieParser = require('cookie-parser')
//var urlencode = require('urlencode');
module.exports =function(app) {
	// body...
	app.engine('handlebars',exphbs.create({    //60
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layout',
		partialsDir: [app.get('views') + '/partials']
	}).engine);
	app.set('view engine','handlebars');

	app.use(logger()); //simply performs a console.log() output of any request and in 64
	app.use(bodyParser({
		uploadDir:path.join(__dirname, '../public/upload/temp')  // accept req.body in POST request
	}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	app.use(app.router);//spcial commponent of Express that says you are actually using router with your server GET, POST, PUT, UPDATE
	app.use('/public/', express.static(path.join(__dirname, '../public'))); //FOR js css html file must after route
	if('development'===app.get('env')){
		app.use(express.errorHandler());
	}
	return app;
}