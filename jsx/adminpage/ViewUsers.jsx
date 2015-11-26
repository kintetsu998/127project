const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>View users</h5>
        <input type="date" className="datepicker"/>
        <ul className="collection">
         <li className="collection-item avatar valign-wrapper">
           <img src="/img/003.jpg" alt="" className="circle"/>
           <span className="title">Peter Bernard M. Rupa</span>
         </li>
         <li className="collection-item avatar valign-wrapper">
           <img src="/img/003.jpg" alt="" className="circle"/>
           <span className="title">Peter Bernard M. Rupa</span>
         </li>
         <li className="collection-item avatar valign-wrapper">
           <img src="/img/003.jpg" alt="" className="circle"/>
           <span className="title">Peter Bernard M. Rupa</span>
         </li>  
        </ul>
      </div>
    );
  }
});
