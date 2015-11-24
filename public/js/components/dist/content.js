"use strict";

const content = {
  height: '600px',
  overflow: 'scroll',
  overflowX: 'hidden  '
};

const Content = React.createClass({displayName: "Content",
  getInitialState: function () {
    return {data: {}, message: '', messages: []};
  },
  componentDidMount: function () {
    const socket = io();
    const ctx = this;
    socket.on("add user", function (data) {
      const message = `${data.username} join the room`;
      ctx.setState({data: data, message: message});
    });
    socket.on("user leave", function (data) {
      const message = `${data.username} leave the room`;
      ctx.setState({data: data, message: message});
    });
    socket.on("send", function (messages) {
      ctx.setState({messages: messages});
    })
  },
  render: function () {
    const user = this.state.data.user;
    let userItems = [];
    if (user) {
      userItems = user.map(item => React.createElement("li", {className: "list-group-item"}, item));
    }
    const messages = this.state.messages;
    let messageItems = [];
    if (messages) {
      messageItems = messages.map(item => React.createElement("div", {className: "panel-body"}, item));
    }
    return (
      React.createElement("div", {className: "container-fluid"}, 
        React.createElement("div", {className: "row-fluid"}, 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("p", null, "notice:"), 
            React.createElement("div", {className: "alert alert-success"}, 
              React.createElement("button", {type: "button", className: "close", "data-dismiss": "alert"}, "×"), 
              this.state.message
            )
          ), 
          React.createElement("div", {className: "col-md-8", style: content}, 
            React.createElement("div", {className: "panel panel-default"}, 
              messageItems
            )
          ), 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("p", null, "online users:"), 
            React.createElement("ul", {className: "list-group"}, 
              userItems
            )
          )
        )
      )
    );
  }
});

React.render(
  React.createElement(Content, null),
  document.getElementById('content')
);