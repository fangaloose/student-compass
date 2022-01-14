var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var configs = require('./configs')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var termsRouter = require('./routes/terms');
var categoriesRouter = require('./routes/categories');
var coursesRouter = require('./routes/courses');
var semesterCoursesRouter = require('./routes/semesterCourses');
var chaptersRouter = require('./routes/chapters');
var reviewsRouter = require('./routes/review');
var rolesRouter = require('./routes/roles');
var studentCoursesRouter = require('./routes/studentCourse');

const url = configs.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/terms', termsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/semestercourses', semesterCoursesRouter);
app.use('/api/chapters', chaptersRouter);
app.use('/api/reviews', reviewsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
