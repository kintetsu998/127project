const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>Pending Jobs</h5>
        <ul className="collection">
          <li className="collection-item">
            <span className="title">Janitor - </span>
            <span className="subtitle">
              Peter Bernard M. Rupa - Cleaning field
            </span>
            <div className="secondary-content">
              <a href="#!"><i className="material-icons">check</i></a>
              <a href="#!"><i className="material-icons">clear</i></a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});
