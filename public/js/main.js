function addUser(username) {
  var message = username + "加入聊天";
  $("#broadcast").append('<p>' + message + '</p>');
}
function removeUser(username) {
  var message = username + "离开聊天";
  $("#broadcast").append('<p>' + message + '</p>');
}
function numberChange(userNumber) {
  $("#user-number").html('<p>' + userNumber + '</p>');
}
function userChange(user) {
  $("#user").empty();
  user.map(function (n) {
    $("#user").append('<p>' + n + '</p>');
  });
}
$(function () {
  var socket = io();

  $("#add-user").click(function () {
    var username = $("#username").val();
    socket.emit("new user", username);
  });

  socket.on("add user", function (data) {
    var username = data.username;
    var userNumber = data.userNumber;
    var user = data.user;
    addUser(username);
    numberChange(userNumber);
    userChange(user);
    $("#send").css("display", "block");
    $("#join").css("display", "none");
  });

  socket.on("user leave", function (data) {
    var username = data.username;
    var userNumber = data.userNumber;
    var user = data.user;
    removeUser(username);
    numberChange(userNumber);
    userChange(user);
  });

  socket.on("add fail", function () {
    alert('该用户名已经存在!');
  });
});