"use strict";
const _ = require("lodash");

module.exports = function (app) {
  let userNumber = 0;
  let user = [];
  app.io.use(function* (next) {
    console.log("握手");
    yield* next;
    console.log("断开");
    const username = this.username;
    _.remove(user, function (n) {
      return n == username;
    });
    --userNumber;
    this.broadcast.emit('user leave', {
      username: username,
      userNumber: userNumber,
      user: user
    });
    this.emit('user leave', {
      username: username,
      userNumber: userNumber,
      user: user
    });
  });

  app.io.route('new user', function* (next, username) {
    this.username = username;
    if (_.some(user, function (n) {
        return n == username;
      })) {
      this.emit('add fail');
    } else {
      user.push(username);
      userNumber = userNumber + 1;
      this.broadcast.emit('add user', {
        username: username,
        userNumber: userNumber,
        user: user
      });
      this.emit('add user', {
        username: username,
        userNumber: userNumber,
        user: user
      });
    }
  });
};