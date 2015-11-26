"use strict";

const inputStyle = {
  position: 'fixed',
  top: '90%',
  left: '0'
};
const Input = React.createClass({
  getInitialState: function() {
    const username = localStorage.username;
    return {username: username};
  },
  _send: function (e) {
    if (e.keyCode==13) {
      let message = `${this.state.username}:${$("#text").val()}`;
      socket.emit("send", message);
      $("#text").val('');
    }
  },
  render: function() {
    return (
      <div className="input-group" style={inputStyle}>
      <span className="input-group-addon">{this.state.username}</span>
      <input type="text" id="text" className="form-control" aria-describedby="sizing-addon2" onKeyDown={this._send} />
      </div>
    );
  }
});

React.render(
  <Input />,
  document.getElementById('input')
);