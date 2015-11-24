"use strict";

const Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function() {
    return {username: ''};
  },
  componentWillMount: function () {
    const socket = io();
    let username = localStorage.username;
    if (username) {
      socket.emit("new user", username);
      this.setState({username: username});
    } else {
      username = 'Chat' + (new Date()).getTime().toString().slice(8) + parseInt(Math.random() * 100000);
      localStorage.username = username;
      socket.emit("new user", username);
      this.setState({username: username});
    }
  },
  render: function () {
    return (
      React.createElement("nav", {className: "navbar navbar-default"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "navbar-header"}, 
            React.createElement("p", {className: "navbar-text"}, "Hello, ", this.state.username, "! Welcome to chat!")
          )
        )
      )
    );
  }
});

React.render(
  React.createElement(Navbar, null),
  document.getElementById('navbar')
);