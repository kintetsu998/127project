const React = require('react');
const Link = require('react-router').Link;

const NewsFeed = require('./NewsFeed.jsx');
const HotJobs = require('./HotJobs.jsx');
const ControlPanel = require('./ControlPanel.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {};
  },
  componentWillMount(){
    var self = this;

    $.ajax({
      url: '/api/whoami',
      method: 'GET',
      success: function(user){
        self.setState(user);
      }
    });
  },
  render() {
    // get user occupation
    var info;
    if(this.state.occupation){
      info = (<span className="grey-text info-title">{this.state.occupation} at the {this.state.college}</span>);
    }
    var url = '/profile/' + this.state.username;

    return (
      <div className="row">
        <div className="col l8">
          <NewsFeed/>
        </div>
        <div className="col l4 hide-on-med-and-down">
          <Link to={url}>
            <div className="card-panel">
              <div className="row valign-wrapper no-margin">
                <div className="col l3">
                  <img src={this.state.picture} className="circle info-picture"/>
                </div>
                <div className="col l9">
                  <span className="valign info-name">{this.state.fname} {this.state.mname} {this.state.lname}</span>
                  {info}
                </div>
              </div>
            </div>
          </Link>
          <ControlPanel/>
          <HotJobs/>
        </div>
      </div>
    );
  }
});
