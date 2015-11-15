var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    var job = this.props.job;
    var url = "/job/" + job.jobid;

    return (
      <li className="collection-item">
        <Link to={url}>Missing name{/*{job.name}*/}</Link>
      </li>
    );
  }
});
