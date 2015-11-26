'use strict';

const React = require('react');
const update = require('react-addons-update');
const Link = require('react-router').Link;

const Help = require('../helpers.jsx');

module.exports = React.createClass({
  approveUser(username){
    Materialize.toast('User ' + username + ' approved.', 5000, 'green');

    this.setState({
      pendingUsers: update(this.state.pendingUsers, {$splice: [[this.state.pendingUsers.indexOfAttr('username', username), 1]]})
    });

    $.ajax({
      url: '/api/user-pending',
      method: 'POST',
      data: {username}
    });
  },
  deleteUser(username){
    Materialize.toast('User ' + username + ' deleted.', 5000, 'green');

    this.setState({
      pendingUsers: update(this.state.pendingUsers, {$splice: [[this.state.pendingUsers.indexOfAttr('username', username), 1]]})
    });

    $.ajax({
      url: '/api/users',
      method: 'DELETE',
      data: {username},
      error(e){
        console.error(e);
      }
    });
  },
  getInitialState(){
    return {
      pendingUsers: []
    };
  },
  componentWillMount(){
    let self = this;
    // get pending users
    $.ajax({
      url: '/api/user-pending',
      method: 'GET',
      success(pendingUsers){
        self.setState({pendingUsers});
      }
    });
  },
  render(){
    return (
      <div className="card-panel">
        <h5>Pending accounts</h5>
          {this.state.pendingUsers.length > 0?
            <ul className="collection">
              {this.state.pendingUsers.map((user)=>{
                let fullName = user.fname + ' ' + Help.parseMiddleName(user.mname) + ' ' + user.lname;

                return (
                  <li className="collection-item avatar">
                    <img src={user.picture} alt="" className="circle"/>
                    <span className="title">{fullName}</span>
                    <div className="secondary-content">
                      <a href="#" onClick={this.approveUser.bind(this, user.username)}><i className="material-icons">check</i></a>
                      <a href="#" onClick={this.deleteUser.bind(this, user.username)}><i className="material-icons">clear</i></a>
                    </div>
                  </li>
                );
              })}
            </ul>
            :
            <p>No pending users.</p>
          }
      </div>
    );
  }
});
