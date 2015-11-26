const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="">
        <div className="col s6">
          <span className="bold">Interested in: {this.props.interest}</span>
        </div>
        <div className="col s6">
          <span className="bold">Connections (62):</span>
        </div>
      </div>
    );
  }
});
