'use strict';

const React = require('react');
const moment = require('moment');

module.exports = React.createClass({
  searchDate(e){
    e.preventDefault();

    let date = $('.datepicker').val();

    console.log(moment($('.datepicker').val()));
  },
  render(){
    return (
      <div className="card-panel">
        <h5>View users</h5>
        <div className="row">
          <div className="col s9">
            <input type="date" className="datepicker"/>
          </div>
          <div className="col s3">
            <a href="#" className="btn waves-effect waves-light valign blue center" onClick={this.searchDate}>Search</a>
          </div>
        </div>

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
