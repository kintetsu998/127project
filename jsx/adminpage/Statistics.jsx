const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>Statistics</h5>

        <div className="row">
          <div className="col s6">
            <p className="center-text statistic-text">Janitor</p>
            <p className="center-text">Hottest Job (20 users)</p>
          </div>
          <div className="col s6">
            <p className="center-text statistic-text">Web Development</p>
            <p className="center-text">Hottest field (26 users)</p>
          </div>
          <div className="col s12">
            <p className="center-text statistic-text">Salesperson</p>
            <p className="center-text">Most viewed job posting (20 users)</p>
          </div>
        </div>
      </div>
    );
  }
});
