const React = require('react');

const Link = require('react-router').Link;

module.exports = React.createClass({
  render(){
    return (
      <div className="">
        <div className="col s6">
          <span className="bold">Interested in: <Link to="/s?keyword=Arts">{this.props.interest}</Link></span>
        </div>
        <div className="col s6">
          <span className="bold">Connections (62):</span>
          <ul className="connection-list inline">
            <li className="inline">
              <Link to="/profile/admin">
                <img src="/img/003.jpg"
                  className="circle connection-pic tooltipped"
                  data-position="bottom"
                  data-delay="10"
                  data-tooltip="Peter Bernard M. Rupa"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
