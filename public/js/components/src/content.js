"use strict";

const content = {
  height: '600px',
  overflow: 'scroll',
  overflowX: 'hidden  '
};
const videoStyle = {
  height: '150px'
}
const notice = {
  color: 'red'
}
const socket = io();
const Content = React.createClass({
  getInitialState: function () {
    return {data: {}, message: '', messages: [], chat: false};
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
      ctx.setState({chat: true});
      const webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
      });
      webrtc.on('readyToCall', function () {
        webrtc.joinRoom('your awesome room name');
      });
    });
  },
  _privateMessage: function (item) {
    this.setState({chat: false});
    const username = localStorage.username;
    if (item == username) {
      alert('Sorry! You cann\'t chat with yourself');
    } else {
      console.log("send the invite");
      socket.emit("video", item);
      this.setState({chat: true});
      const webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
      });
      webrtc.on('readyToCall', function () {
        webrtc.joinRoom('your awesome room name');
      });
    }
  },
  _shutdownVideo: function () {
    this.setState({chat: false});
  },
  render: function () {
    const ctx = this;
    const user = this.state.data.user;
    const chat = this.state.chat;
    let userItems = [];
    if (user) {
      userItems = user.map(item => <li className="list-group-item"
                                       onClick={() => ctx._privateMessage(item)}>{item}</li>);
    }
    const messages = this.state.messages;
    let messageItems = [];
    if (messages) {
      messageItems = messages.map(item => <div className="panel-body">{item}</div>);
    }
    let localVideo = null, remoteVideos = null, shutDownButton = null;
    if (chat) {
      localVideo = <video style={videoStyle} id="localVideo"></video>;
      remoteVideos = <video style={videoStyle} id="remoteVideos"></video>;
      shutDownButton = <button className="btn btn-default" onClick={this._shutdownVideo}>Shut Down</button>;
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
            {localVideo}
            {shutDownButton}
          </div>
          <div className="col-md-8" style={content}>
            <p>chat content:</p>
            <div className="panel panel-default">
              {messageItems}
            </div>
          </div>
          <div className="col-md-2">
            <p>online users:</p>
            <p style={notice}>click the name for video chat</p>
            <ul className="list-group">
              {userItems}
            </ul>
            {remoteVideos}
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