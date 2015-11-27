'use strict';

const React = require('react');
const Link = require('react-router').Link;
const Help = require('../helpers.jsx');

const NewsFeed = require('./NewsFeed.jsx');
const HotJobs = require('./HotJobs.jsx');
const JobWrapper = require('./JobWrapper.jsx');
const DidYouKnow = require('./DidYouKnow.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {};
  },
  componentDidMount(){
    var self = this;

    $.ajax({
      url: '/api/whoami',
      method: 'GET',
      success: function(user){
        self.setState(user);
      }
    });
  },
  render() {
    // get user occupation
    let info;
    if(this.state.occupation && this.state.company){
      info = (<span className="grey-text info-title">{this.state.occupation} at the {this.state.company}</span>);
    }
    let url = '/profile/' + this.state.username;

    if(this.state.mname){
      var fullName = this.state.fname + ' ' + Help.parseMiddleName(this.state.mname) + ' ' + this.state.lname;
    }

    return (
      <div className="row">
        <div className="col l8">
          <NewsFeed/>
        </div>
        <div className="col l4 hide-on-med-and-down">
          <Link to={url}>
            <div className="card-panel">
              <div className="row valign-wrapper no-margin">
                <div className="col l3">
                  <img src={this.state.picture} className="circle info-picture"/>
                </div>
                <div className="col l9">
                  <span className="valign info-name">{this.state.mname? fullName: ''}</span>
                  {info}
                </div>
              </div>
            </div>
          </Link>
          <JobWrapper username={this.props.username}/>
          <HotJobs/>
          <DidYouKnow/>
        </div>
      </div>
    );
  }
});
