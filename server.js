var path = require('path');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join( __dirname, '_dist' )));

app.use('/portfolio/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '_dist/portfolio/index.html'))
});

var server = app.listen(3020, function () {
  console.log('Your server is running on port 3020');
});
