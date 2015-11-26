'use strict';

const React = require('react');

const Link = require('react-router').Link;

module.exports = React.createClass({
  getInitialState(){
    return {
      mostOccupation: null,
      mostField: null
    };
  },
  componentWillMount(){
    let self = this;

    $.ajax({
      url: '/api/user-connection-interest',
      method: 'GET',
      success(mostField){
        self.setState({mostField});
      }
    });

    $.ajax({
      url: '/api/user-connection-occupation',
      method: 'GET',
      success(mostOccupation){
        self.setState({mostOccupation});
      }
    });
  },
  render(){
    return (
      <div className="card-panel">
        <h5>Did you know?</h5>

        <p>That...</p>

        {this.state.mostOccupation?
          <p>...most of your connections are <Link to={"/s?keyword=Janitor".concat(this.state.mostOccupation.occupation)}><strong>{this.state.mostOccupation.occupation}</strong></Link>? ({this.state.mostOccupation.count} connections) </p>
          :''
        }

        {this.state.mostField?
          <p>...most of your connections like <Link to={"/s?keyword=".concat(this.state.mostField.fieldofinterest)}><strong>{this.state.mostField.fieldofinterest}</strong></Link>? ({this.state.mostField.count} connections) </p>
          :''
        }
      </div>
    );
  }
});
