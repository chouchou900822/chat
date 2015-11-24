"use strict";

const content = {
  height: '600px',
  overflow: 'scroll',
  overflowX: 'hidden  '
};
//#remoteVideos video {
//  height: 150px;
//}
//#localVideo {
//  height: 150px;
//}
const socket = io();
const Content = React.createClass({
  getInitialState: function () {
    return {data: {}, message: '', messages: []};
  },
  componentDidMount: function () {
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
    socket.on("video", function () {
      console.log("invite for video");
    });
  },
  _privateMessage: function (item) {
    const username = localStorage.username;
    if (item == username) {
      alert('Sorry! You cann\'t chat with yourself');
    } else {
      console.log("send the invite");
      socket.emit("video", item);
    }
  },
  render: function () {
    const ctx = this;
    const user = this.state.data.user;
    let userItems = [];
    if (user) {
      userItems = user.map(item => <li className="list-group-item" onClick={() => ctx._privateMessage(item)}>{item}</li>);
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
            <p>chat content:</p>
            <div className="panel panel-default">
              {messageItems}
            </div>
          </div>
          <div className="col-md-2">
            <p>online users:</p>
            <h1>click the name for video chat</h1>
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