"use strict";
const style = {
  position: 'fixed',
  top: '90%',
  left: '0'
};
const Input = React.createClass({displayName: "Input",
  getInitialState: function() {
    const username = localStorage.username;
    return {username: username};
  },
  _send: function (e) {
    const socket = io();
    if (e.keyCode==13) {
      let message = `${this.state.username}:${$("#text").val()}`;
      socket.emit("send", message);
      $("#text").val('');
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "input-group", style: style}, 
      React.createElement("span", {className: "input-group-addon"}, this.state.username), 
      React.createElement("input", {type: "text", id: "text", className: "form-control", "aria-describedby": "sizing-addon2", onKeyDown: this._send})
      )
    );
  }
});

React.render(
  React.createElement(Input, null),
  document.getElementById('input')
);