//const code = require('./code');
const github = require('./github');
const convert = require('koa-convert');

const list = [github];

const fn = function (app) {
  //CQRS, refer to npm install koa-cors


  list.forEach((route) => {
    app.use(route.routes())
       .use(route.allowedMethods({ throw: true }))
  });
}

module.exports = fn;
