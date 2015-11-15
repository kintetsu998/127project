var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  search: function(e){
    e.preventDefault();

    window.location = "homepage#/job/"+$('#search').val();

    return;
  },
  logout(){
    $.ajax({
      'url': '/logout',
      'method': 'POST',
      'success'(){
        window.location.href = '/';
      },
      'error'(err){
        console.error(err);
      }
    });
  },
  render() {
    return (
      <div>
        <nav className="uppernav" className="navbar blue">
          <div className="nav-wrapper">
            <Link to="/"><img src="/img/logo-full.png" className="navbar-logo"/></Link>

            <ul className="right tab-element">
              <a href="#" className="btn waves-effect waves-light blue" onClick={this.logout}>Log out</a>
            </ul>
            <div className="right tab-element tab-input hide-on-med-and-down">
              <form onSubmit={this.search}>
                <div className="">
                  <input type="text" id="search" placeholder="Search"/>
                </div>
              </form>
            </div>
          </div>
        </nav>

        <div className="container-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});
