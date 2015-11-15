var React = require('react');

module.exports = React.createClass({
  render() {
    var job = this.props.job;
    var url = "#/job/" + job.name;

    return (
      <li className="collection-item">
        <a href={url}>{job.name}</a>
      </li>
    );
  }
});
