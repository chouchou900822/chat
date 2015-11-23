var Navbar = React.createClass({displayName: "Navbar",
  render: function() {
    return (
      React.createElement("nav", {className: "navbar navbar-default"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "navbar-header"}, 
            React.createElement("p", {className: "navbar-text"}, "Welcome to chat!")
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