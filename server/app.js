// PACKAGE REQUIREMENTS
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// RESOURCE ROUTES REQUIREMENT
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
// const directionsRouter = require('./routes/directions');
// const ingredientsRouter = require('./routes/ingredients');
// const commentsRouter = require('./routes/comments');
// const usagesRouter = require('./routes/usages');
// const ownagesRouter = require('./routes/ownages');

// MIDDLEWARE SETUP
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// ROUTE REDIRECTIONS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
// app.use('/directions', directionsRouter);
// app.use('/ingredients', ingredientsRouter);
// app.use('/comments', commentsRouter);
// app.use('/usages', usagesRouter);
// app.use('/ownages', ownagesRouter);

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
    res.json({error:err.status});
});

module.exports = app;
