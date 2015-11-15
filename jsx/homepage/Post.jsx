var React = require('react');

module.exports = React.createClass({
  render(){
    return(
      <div className="card-panel">
          <img src={this.props.img} className="circle post-picture"/>
          <p className="post-info">
            <a href={this.props.url}>{this.props.name}</a> <span className="grey-text">{this.props.action}</span>
          </p>

        <div className="divider"></div>
        <p>{this.props.body}</p>
      </div>
    );
  }
});
