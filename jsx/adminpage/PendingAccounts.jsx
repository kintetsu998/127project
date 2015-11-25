const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>Pending accounts</h5>
         <ul className="collection">
          <li className="collection-item avatar">
            <img src="/img/003.jpg" alt="" className="circle"/>
            <span className="title">Peter Bernard M. Rupa</span>
            <div className="secondary-content">
              <a href="#!"><i className="material-icons">check</i></a>
              <a href="#!"><i className="material-icons">clear</i></a>
            </div>
          </li>
          <li className="collection-item avatar">
            <img src="/img/003.jpg" alt="" className="circle"/>
            <span className="title">Peter Bernard M. Rupa</span>
            <div className="secondary-content">
              <a href="#!"><i className="material-icons">check</i></a>
              <a href="#!"><i className="material-icons">clear</i></a>
            </div>
          </li>
          <li className="collection-item avatar">
            <img src="/img/003.jpg" alt="" className="circle"/>
            <span className="title">Peter Bernard M. Rupa</span>
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
