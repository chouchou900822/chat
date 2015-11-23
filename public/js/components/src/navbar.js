var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-text">Welcome to chat!</p>
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