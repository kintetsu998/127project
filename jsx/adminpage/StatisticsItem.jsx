const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="col s6">
        <p className="center-text statistic-text">{this.props.item}</p>
        <p className="center-text">{this.props.desc} ({this.props.count})</p>
      </div>
    );
  }
});
