var React = require('react');

var NewsFeed = require('./NewsFeed.jsx');
var HotJobs = require('./HotJobs.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div className="row">
        <NewsFeed/>
        <div className="col l4 hide-on-med-and-down">
          <div className="card-panel">
            <div className="row valign-wrapper no-margin">
              <div className="col l3">
                <img src="img/003.jpg" className="circle info-picture" alt="Picture of Peter"/>
              </div>
              <div className="col l9">
                <span className="valign info-name">Peter Bernard M. Rupa</span>
                <span className="grey-text info-title">Student at the University of the Philippines</span>
              </div>
            </div>
          </div>
          <HotJobs/>
        </div>
      </div>
    );
  }
});
