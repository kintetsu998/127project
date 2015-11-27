'use strict';

const React = require('react');
const Help = require('../helpers.jsx');
const Link = require('react-router').Link;

module.exports = React.createClass({
  getInitialState(){
    return {
      users: [],
      jobs: []
    }
  },
  fetch(keyword){
    let self = this;

    $.ajax({
      url: '/search?keyword=' + (keyword || this.props.location.query.keyword),
      method: 'GET',
      success(data){
        self.setState(data);
      }
    });
  },
  componentWillMount(){
    this.fetch();
  },
  componentWillReceiveProps(newProps){
    this.fetch(newProps.location.query.keyword);
  },
  render(){
    return (
      <div>
        {this.state.users.length == 0 && this.state.jobs.length == 0?
          <p>No results matched in your query.</p>
          :''
        }
        {this.state.users.length > 0?
          <ul className="collection with-header">
            <li className="collection-header">
              <h5>Users</h5>
            </li>
            {this.state.users.map(user =>
              <Link to={"/profile/".concat(user.username)} key={user.username}>
                <li className="collection-item avatar">
                  <img src={user.picture} alt="" className="circle"/>
                  <strong className="title">{Help.getFullName(user.fname, user.mname, user.lname)}</strong>
                  <p>
                  {user.occupation && user.company?
                    <span>Works at {user.company} as {user.occupation}<br/></span>
                    :''
                  }
                  {user.fieldofinterest?
                    <span>Interested in {user.fieldofinterest}</span>
                    :''
                  }
                  </p>
                </li>
              </Link>
            )}
          </ul>
          :''
        }

        {this.state.jobs.length > 0?
          <ul className="collection with-header">
            <li className="collection-header"><h5>Jobs</h5></li>
            {this.state.jobs.map(job =>
              <Link to={"/job/".concat(job.jobid)} key={job.jobid}>
                <li className="collection-item">{job.jobname}</li>
              </Link>
            )}
          </ul>
          :''
        }
      </div>
    );
  }
});
