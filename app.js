var express = require('express');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');


var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', '.html');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.set('port', 3003);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port 3003');
});

module.exports = app;
