var path = require('path'),
routes = require('./routes'),
exphbs = require('express-handlebars'),
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
methodOverride = require('method-override'),
errorHandler = require('errorhandler'),
moment = require('moment');

var multer = require('multer');


module.exports = function(app){
	app.use(morgan('dev'));
	// app.use(bodyParser({
	// 	uploadDir:path.join(__dirname, 'public/upload/temp')
	// }));
	// app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}));
	app.use(multer({dest:'../public/upload/temp'}).single('file'));
	app.use(bodyParser.urlencoded( { 'extended': true } ));
	app.use(bodyParser.json());
	app.use(methodOverride('_method'));
	app.use(cookieParser('secretValue'));


	app.use('/public/', express.static(path.join(__dirname, '../public')));

	if('development' === app.get('env')){
		app.use(errorHandler());
	}

	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [ app.get('views') + '/partials' ],
		helpers: {
			timeago: function(timestamp){
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);

	app.set('view engine', 'handlebars');


	routes(app);
	return app;
};