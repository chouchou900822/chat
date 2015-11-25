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
const Content = React.createClass({displayName: "Content",
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
      userItems = user.map(item => React.createElement("li", {className: "list-group-item", 
                                       onClick: () => ctx._privateMessage(item)}, item));
    }
    const messages = this.state.messages;
    let messageItems = [];
    if (messages) {
      messageItems = messages.map(item => React.createElement("div", {className: "panel-body"}, item));
    }
    let localVideo = null, remoteVideos = null, shutDownButton = null;
    if (chat) {
      localVideo = React.createElement("video", {style: videoStyle, id: "localVideo"});
      remoteVideos = React.createElement("video", {style: videoStyle, id: "remoteVideos"});
      shutDownButton = React.createElement("button", {className: "btn btn-default", onClick: this._shutdownVideo}, "Shut Down");
    }
    return (
      React.createElement("div", {className: "container-fluid"}, 
        React.createElement("div", {className: "row-fluid"}, 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("p", null, "notice:"), 
            React.createElement("div", {className: "alert alert-success"}, 
              React.createElement("button", {type: "button", className: "close", "data-dismiss": "alert"}, "×"), 
              this.state.message
            ), 
            localVideo, 
            shutDownButton
          ), 
          React.createElement("div", {className: "col-md-8", style: content}, 
            React.createElement("p", null, "chat content:"), 
            React.createElement("div", {className: "panel panel-default"}, 
              messageItems
            )
          ), 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("p", null, "online users:"), 
            React.createElement("p", {style: notice}, "click the name for video chat"), 
            React.createElement("ul", {className: "list-group"}, 
              userItems
            ), 
            remoteVideos
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