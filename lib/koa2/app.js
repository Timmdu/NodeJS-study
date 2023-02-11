
const LikeKoa2 = require('./like-koa2');
const app = new LikeKoa2();

// 函数实现，参数 n 单位 毫秒 ；
function sleep(n) {
  var start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > n) {
      // 使用  break  实现；
      break;
    }
  }
}

// logger

app.use(async (ctx, next) => {
  console.log('第一层洋葱 - 开始')
  await next();
  console.log('第一层洋葱 - 结束')
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('第二层洋葱 - 开始')
  // 调用方法，同步执行，阻塞后续程序的执行；
  sleep(5000);
  await next();
  console.log('第二层洋葱 - 结束')
});

// response

app.use(async ctx => {
  console.log('第三层洋葱 - 开始')
  ctx.body = 'Hello World';
  console.log('第三层洋葱 - 结束')
});

app.listen(3000);