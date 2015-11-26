'use strict';

const React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      hotJobs: []
    };
  },
  componentWillMount: function(){
    var self = this;

    $.ajax({
      url: '/api/job-recommended',
      method: 'GET',
      success: function(jobs){
        self.setState({
          'hotJobs': jobs
        });
      }
    });
  },
  render() {
    return (
      <div className="card-panel">
        <h5>Recommended for you:</h5>
        <div className="divider"></div>
        <ul className="collection">
          {this.state.hotJobs.map((job)=>{
            let url = '/job/' + job.jobid;

            return(
              <a href={url} className="collection-item" key={job.jobid}>{job.jobname}</a>
            );
          })}
        </ul>
      </div>
    );
  }
});
