var express = require('express');
var path = require('path');
var index = require('./routes/index');
var news = require('./routes/news');

var app = express();

// Allow cross origin
// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// server static files 
app.use('/static', express.static(path.join(__dirname, "../client/build/static")));
app.use('/news', news);

// catch all 
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /*
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  */
 res.status(404);
});

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
