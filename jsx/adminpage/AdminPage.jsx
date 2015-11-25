const React = require('react');

const PendingAccounts = require('./PendingAccounts.jsx');
const Statistics = require('./Statistics.jsx');
const PendingJobs = require('./PendingJobs.jsx');

module.exports = React.createClass({
  render(){
    return (
      <div className="row">
        <div className="col s3">
          <PendingAccounts/>
        </div>
        <div className="col s6">
          <Statistics/>
        </div>
        <div className="col s3">
          <PendingJobs/>
        </div>
      </div>
    );
  }
});
