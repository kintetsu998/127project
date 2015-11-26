'use strict';

const React = require('react');
const Link = require('react-router').Link;

const Notifications = require('./Notifications.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {
      notifications: false
    };
  },
  toggleNotifications(){
    this.setState({
      notifications: this.state.notifications? false: true
    });
  },
  search(e){
    e.preventDefault();

    let keyword = $('#search').val();

    this.props.history.pushState(null, '/s', {keyword});

    // clear search bar
    $('#search').val('');
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
              <li className="navbar-item-area">
                <div className="navbar-item">
                  <Link to="/admin"><i className="material-icons">assignment_ind</i></Link>
                </div>
              </li>
              <li className="navbar-item-area">
                <div className="navbar-item">
                  <a href="#" onClick={this.toggleNotifications}><i className="material-icons">notifications</i></a>
                </div>
                {this.state.notifications? <Notifications/>:''}
              </li>
            </ul>
            <div className="right tab-element tab-input hide-on-med-and-down">
              <form action="/search" onSubmit={this.search}>
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
