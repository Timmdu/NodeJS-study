var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

//写入日志
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  //测试环境
  app.use(logger('dev'));
} else {
  //生产环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(logger('combined', {
    stream: writeStream
  }));
}

//处理request header content-type为json的格式,request body
app.use(express.json());
//处理request header content-type为x-www-form-urlencoded的格式, request body
app.use(express.urlencoded({ extended: false }));
//处理cookie
app.use(cookieParser());

//把session 存入redis中 ===
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: 'Dxd23de',
  cookie: {
    path: '/', //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
//=====

//注册路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
