'use strict';
var should = require('should');
function factorial(n) {
  return n > 1 ? n * factorial(n-1) : 1;
}
describe("year test", function () {
  it("1的阶乘是1", function () {
    factorial(1).should.be.exactly(1).and.be.a.Number;
  });
  it("2的阶乘是2", function () {
    factorial(2).should.be.exactly(2).and.be.a.Number;
  });
  it("3的阶乘是6", function () {
    factorial(3).should.be.exactly(6).and.be.a.Number;
  });
});

var fs = require("fs");

describe("readFile", function() {
  it("读取的文本应该是hello world!", function(done) {
    fs.readFile("./test/text.txt", "utf8", function(err, data) {
      should.not.exist(err);
      should.exist(data);
      data.should.eql("hello world!");
      done();
    });
  });
});