"use strict";

const content = {
  height: '600px',
  overflow: 'scroll',
  overflowX: 'hidden  '
};

const Content = React.createClass({
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
      userItems = user.map(item => <li className="list-group-item">{item}</li>);
    }
    const messages = this.state.messages;
    let messageItems = [];
    if (messages) {
      messageItems = messages.map(item => <div className="panel-body">{item}</div>);
    }
    return (
      <div className="container-fluid">
        <div className="row-fluid">
          <div className="col-md-2">
            <p>notice:</p>
            <div className="alert alert-success">
              <button type="button" className="close" data-dismiss="alert">×</button>
              {this.state.message}
            </div>
          </div>
          <div className="col-md-8" style={content}>
            <div className="panel panel-default">
              {messageItems}
            </div>
          </div>
          <div className="col-md-2">
            <p>online users:</p>
            <ul className="list-group">
              {userItems}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

React.render(
  <Content />,
  document.getElementById('content')
);