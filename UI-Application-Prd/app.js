const Koa = require('koa')
const app = new Koa()

app.use(require('koa-static')(__dirname + '/dist'))

module.exports = app
