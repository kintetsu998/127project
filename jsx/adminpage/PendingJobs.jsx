'use strict';

const React = require('react');
const update = require('react-addons-update');
const Help = require('../helpers.jsx');

module.exports = React.createClass({
  approveJob(jobid, jobname){
    Materialize.toast('Job ' + jobname + ' approved.', 5000, 'green');

    this.setState({
      jobs: update(this.state.jobs, {$splice: [[this.state.jobs.indexOfAttr('jobid', jobid), 1]]})
    });

    $.ajax({
      url: '/api/job-approve',
      method: 'POST',
      data: {jobid}
    });
  },
  deleteJob(jobid, jobname){
    Materialize.toast('Job ' + jobname + ' deleted.', 5000, 'red');

    this.setState({
      jobs: update(this.state.jobs, {$splice: [[this.state.jobs.indexOfAttr('jobid', jobid), 1]]})
    });

    $.ajax({
      url: '/api/job',
      method: 'DELETE',
      data: {jobid}
    });
  },
  getInitialState(){
    return {
      jobs: []
    };
  },
  componentWillMount(){
    let self = this;

    $.ajax({
      url: '/api/job-pending',
      method: 'GET',
      success(jobs){
        self.setState({jobs});
      }
    });
  },
  render(){
    return (
      <div className="card-panel">
        <h5>Pending Jobs</h5>
        {this.state.jobs.length > 0?
          <ul className="collection">
            {this.state.jobs.map(job => {
              return (
                <li className="collection-item">
                  <span className="title">{job.jobname} - </span>
                  <span className="subtitle">
                    {Help.getFullName(job.fname, job.mname, job.lname)} - {job.fieldofinterest}
                  </span>
                  <div className="secondary-content">
                    <a href="#!" onClick={this.approveJob.bind(this, job.jobid, job.jobname)}><i className="material-icons">check</i></a>
                    <a href="#!" onClick={this.deleteJob.bind(this, job.jobid, job.jobname)}><i className="material-icons">clear</i></a>
                  </div>
                </li>
              );
            })}
          </ul>
          :
          <p>No pending job posts.</p>
        }

      </div>
    );
  }
});
