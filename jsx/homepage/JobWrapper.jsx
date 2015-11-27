'use strict';

const React = require('react');

const ControlPanel = require('./ControlPanel.jsx');
const YourJobs = require('./YourJobs.jsx');

module.exports = React.createClass({
  addJob(jobname, description, company, fieldofinterest, country){
    $.ajax({
      url: '/api/job',
      method: 'POST',
      data: {
        jobname,
        description,
        company,
        fieldofinterest,
        country,
        username: this.props.username
      }
    });
  },
  getInitialState(){
    return {
      jobs: []
    };
  },
  componentWillReceiveProps(nextProps){
    let self = this;

    $.ajax({
      url: '/api/job-user?username=' + nextProps.username,
      method: 'GET',
      success(jobs){
        self.setState({jobs});
      }
    });
  },
  render(){
    return (
      <div>
        <ControlPanel addJob={this.addJob}/>
        <YourJobs jobs={this.state.jobs}/>
      </div>
    );
  }
});
