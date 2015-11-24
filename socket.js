"use strict";
const _ = require("lodash");

module.exports = function (app) {
  let userNumber = 0;
  let user = [];
  let messages = [];
  app.io.use(function* (next) {
    console.log("connect");
    yield* next;
    console.log("close");
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
      this.emit('send', messages);
      this.broadcast.emit('send', messages);
    }
  });

  app.io.route('send', function* (next, message) {
    messages.push(message);
    this.emit('send', messages);
    this.broadcast.emit('send', messages);
  });
};