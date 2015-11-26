const React = require('react');
const Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    var job = this.props.job;
    var url = "/job/" + job.jobid;

    return (
      <li className="collection-item">
        <Link to={url}>{job.name}</Link>
      </li>
    );
  }
});
