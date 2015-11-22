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
              <li id="notification-area">
                <div id="notification">
                  <a href="#"><i className="material-icons">notifications</i></a>
                </div>
                <div id="notifications-pane">
                   <ul className="collection">
                     <li className="collection-item avatar valign-wrapper ">
                       <img src="/img/003.jpg" alt="" className="circle"/>
                       <p>First Line</p>
                     </li>
                     <li className="collection-item avatar valign-wrapper ">
                       <i className="material-icons circle">folder</i>
                       <p>First Line</p>
                     </li>
                     <li className="collection-item avatar valign-wrapper ">
                       <i className="material-icons circle green">insert_chart</i>
                       <p>First Line</p>
                     </li>
                     <li className="collection-item avatar valign-wrapper ">
                       <i className="material-icons circle red">play_arrow</i>
                       <p>First Line</p>
                     </li>
                   </ul>
                </div>
              </li>
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
