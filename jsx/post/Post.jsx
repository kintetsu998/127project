var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render(){
    var body;
    if(this.props.body){
      body = (
        <div>
          <div className="divider"></div>
          <p>{this.props.body}</p>
        </div>
      );
    }

    return(
      <div className="card-panel">
          <img src={this.props.img} className="circle post-picture"/>
          <p className="post-info">
            <Link to={this.props.url}>{this.props.name}</Link> <span className="grey-text">{this.props.action}</span>
          </p>
          {body}
      </div>
    );
  }
});
