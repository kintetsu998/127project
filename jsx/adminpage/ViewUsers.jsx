'use strict';

const React = require('react');
const moment = require('moment');
const Link = require('react-router').Link;

const Help = require('../helpers.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {
      users: []
    };
  },
  searchDate(e){
    e.preventDefault();

    let self = this;
    let date = $('.datepicker').val();

    date = moment(date, 'D MMMM, YYYY').format('YYYY-MM-DD');

    $.ajax({
      url: '/api/users-date?date=' + date,
      method: 'GET',
      success(users){
        self.setState({users});

        console.log(self.state.users);
      }
    });
  },
  render(){
    return (
      <div className="card-panel">
        <h5>View users</h5>
        <div className="row">
          <div className="col s9">
            <input type="date" className="datepicker"/>
          </div>
          <div className="col s3">
            <a href="#" className="btn waves-effect waves-light valign blue center" onClick={this.searchDate}>Search</a>
          </div>
        </div>

        {this.state.users.length > 0?
          <ul className="collection">
            {this.state.users.map(user => {
                let fullName = user.fname + ' ' + Help.parseMiddleName(user.mname) + ' ' + user.lname;
                let url = '/profile/' + user.username;

                return (
                  <Link to={url}>
                    <li className="collection-item avatar valign-wrapper" key={user.username}>
                      <img src={user.picture} alt="" className="circle"/>
                      <span className="title">{fullName}</span>
                    </li>
                  </Link>
                );
            })}
          </ul>
          :''
        }
      </div>
    );
  }
});
