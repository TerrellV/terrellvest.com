var path = require('path');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join( __dirname, '_dist' )));


var server = app.listen(8080, function () {
    console.log('Your server is running on port 8080');
});
