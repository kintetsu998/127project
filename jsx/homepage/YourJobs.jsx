'use strict';

const React = require('react');
const Link = require('react-router').Link;

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>Your jobs:</h5>
        <div className="divider"></div>
        {this.props.jobs.length > 0?
          <ul className="collection">
            {this.props.jobs.map((job)=>{
              let url = '/job/' + job.jobid;

              return(
                <Link to={url} className="collection-item" key={job.jobid}>{job.jobname}</Link>
              );
            })}
          </ul>
          :
          <p>You have no jobs created.</p>
        }
      </div>
    );
  }
});
