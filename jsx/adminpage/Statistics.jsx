'use strict';

const React = require('react');

const StatisticsItem = require('./StatisticsItem.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {
      job: null,
      field: null,
      mostViewed: null
    };
  },
  componentWillMount(){
    let self = this;

    // hottest field
    $.ajax({
      url: '/api/user-most-interest',
      method: 'GET',
      success(field){
        self.setState({field});
      }
    });

    // hottest job
    $.ajax({
      url: '/api/user-most-occupation',
      method: 'GET',
      success(job){
        self.setState({job});
      }
    });

    // most viewed job
    $.ajax({
      url: '/api/job-hottest',
      method: 'GET',
      success(mostViewed){
        self.setState({mostViewed});
      }
    });
  },
  render(){
    return (
      <div className="card-panel">
        <h5>Statistics</h5>

        <div className="row">
          {this.state.job?
            <StatisticsItem
              item={this.state.job.occupation}
              desc="Hottest job"
              count={this.state.job.count.concat(' users')}
            />
            :''
          }

          {this.state.field?
            <StatisticsItem
              item={this.state.field.fieldofinterest}
              desc="Hottest field"
              count={this.state.field.count.concat(' users')}
            />
            :''
          }

          {this.state.mostViewed?
            <StatisticsItem
              item={this.state.mostViewed.jobname}
              desc="Most viewed job posting"
              count={this.state.mostViewed.count.toString().concat(' views')}
            />
            :''
          }
        </div>
      </div>
    );
  }
});
