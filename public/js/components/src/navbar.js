"use strict";
const socket = io();
const Navbar = React.createClass({
  getInitialState: function() {
    return {username: ''};
  },
  componentWillMount: function () {

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
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-text">Hello, {this.state.username}! Welcome to chat!</p>
          </div>
        </div>
      </nav>
    );
  }
});

React.render(
  <Navbar />,
  document.getElementById('navbar')
);