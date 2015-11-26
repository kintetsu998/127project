const React = require('react');

const PendingAccounts = require('./PendingAccounts.jsx');
const Statistics = require('./Statistics.jsx');
const PendingJobs = require('./PendingJobs.jsx');
const ViewUsers = require('./ViewUsers.jsx');

module.exports = React.createClass({
  componentDidMount(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  },
  render(){
    return (
      <div className="row">
        <div className="col s3">
          <PendingAccounts/>
        </div>
        <div className="col s6">
          <ViewUsers/>
          <Statistics/>
        </div>
        <div className="col s3">
          <PendingJobs/>
        </div>
      </div>
    );
  }
});
