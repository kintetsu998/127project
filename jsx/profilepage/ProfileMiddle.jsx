'use strict';

const React = require('react');
const Help = require('../helpers.jsx');
const Link = require('react-router').Link;

module.exports = React.createClass({
  componentDidMount(){
    
  },
  render(){
    return (
      <div className="">
        <div className="col s6">
          <span className="bold">Interested in: <Link to="/s?keyword=Arts">{this.props.interest}</Link></span>
        </div>
        <div className="col s6">
          <span className="bold">Connections ({this.props.connections.length}):</span>
          {this.props.connections.length > 0?
            <ul className="connection-list inline">
              {this.props.connections.map(connection => {
                return (
                  <li className="inline" key={connection.username}>
                    <Link to={"/profile/".concat(connection.username)}>
                      <img src={connection.picture}
                        className="circle connection-pic tooltipped"
                        data-position="bottom"
                        data-delay="10"
                        data-tooltip={Help.getFullName(connection.fname, connection.mname, connection.lname)}/>
                    </Link>
                  </li>
                );
              })}
            </ul>
            :''
          }
        </div>
      </div>
    );
  }
});
