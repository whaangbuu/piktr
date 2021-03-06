var express = require('express'),
    config = require('./server/config'),
    app = express(),
    mongoose = require('mongoose'),
    multer = require('multer');

    var upload = multer( { 'dest': 'image_uploads/' });

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

mongoose.connect('mongodb://root:password@ds023704.mlab.com:23704/piktr');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
