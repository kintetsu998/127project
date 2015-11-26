const React = require('react');

const HotJobItem = require('./HotJobItem.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      hotJobs: []
    };
  },
  componentWillMount: function(){
    var self = this;

    $.ajax({
      url: '/api/joball',
      method: 'GET',
      success: function(jobs){
        self.setState({
          'hotJobs': jobs
        });
      }
    });
  },
  render() {
    var hotJobNodes = this.state.hotJobs.map(function(job){
      return(
        <HotJobItem
          key={job.jobid}
          job={job}
        />
      );
    });

    return (
      <div className="card-panel">
        <h5>Hot Jobs</h5>
        <div className="divider"></div>
        <ul className="collection">
          {hotJobNodes}
        </ul>
      </div>
    );
  }
});
