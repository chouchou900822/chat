/*!
 * chat - app.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const koa = require('koa.io');
const fs = require('fs');

let app = koa();
/**
 * catch error
 */
app.use(function* (next) {
  try {
    yield next;
  } catch (err) {
    console.log(err);
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});
/**
 * static file server
 */
const staticCache = require('koa-static-cache');
app.use(staticCache(path.join(__dirname, '/public')));
/**
 * router
 */
app.use(function* () {
  this.body = fs.createReadStream(path.join(__dirname, 'public/index.html'));
  this.type = 'html';
  this.status = 200;
});
/**
 * socket
 */
require("./socket")(app);
/**
 * listen port
 */
app.listen(3000);
console.log(`$ open http://127.0.0.1:3000`);

