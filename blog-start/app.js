const querystring = require('querystring');
const { access } = require('./src/utils/log');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { get, set } = require('./src/db/redis');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);

  return d.toGMTString();
}


const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return
      }

      resolve(JSON.parse(postData));
    })

  });

  return promise;
}

const serverHandler = (req, res) => {

  //记录access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  //设置返回格式
  res.setHeader('Content-type', 'application/json');

  // console.log('设置跨域');
  // res.setHeader('Access-Control-Allow-Credentials', true) // 允许跨域传递cookie
  // res.setHeader('Access-Control-Allow-Origin', '*'); // 允许跨域的origin, * 代表所有
  // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); //允许跨域的方法

  //获取 path
  const url = req.url;
  const path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  //解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }

    const arr = item.split('=');
    const key = arr[0].trim();
    const value = arr[1];

    req.cookie[key] = value;
  })

  //解析session (使用redis)
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;

    //初始化redis 中的session value.
    set(userId, {});
  }

  //获取session
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      set(req.sessionId, {}); //初始化redis 中的session value.
      req.session = {}; // 设置session
    } else {
      req.session = sessionData; // 获取session
    }

    console.log('req.session', req.session)

    return getPostData(req);
  }).then(postData => {
    req.body = postData;

    //处理blog 路由
    const blogResult = handleBlogRouter(req, res, path);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          //登陆成功后，设置cookie (userid)
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
        }

        res.end(JSON.stringify(blogData));
      })

      return;
    }

    //处理user 路由
    const userResult = handleUserRouter(req, res, path);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          //登陆成功后，设置cookie (userid)
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
        }

        res.end(
          JSON.stringify(userData)
        )
      })

      return;
    }

    //Not match
    res.writeHead(404, { "Content-type": 'text/plain' });
    res.write("404 Not Found");
    res.end();
  })

}

module.exports = serverHandler;

//process.env.NODE_ENV