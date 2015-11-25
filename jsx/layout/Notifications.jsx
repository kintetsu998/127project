const React = require('react');

module.exports = React.createClass({
  render(){
    return(
      <div id="notifications-pane" >
         <ul className="collection z-depth-3">
           <li className="collection-item avatar valign-wrapper ">
             <img src="/img/003.jpg" alt="" className="circle"/>
             <p>First Line</p>
           </li>
           <li className="collection-item avatar valign-wrapper ">
             <i className="material-icons circle">folder</i>
             <p>First Line</p>
           </li>
           <li className="collection-item avatar valign-wrapper ">
             <i className="material-icons circle green">insert_chart</i>
             <p>First Line</p>
           </li>
           <li className="collection-item avatar valign-wrapper ">
             <i className="material-icons circle red">play_arrow</i>
             <p>First Line</p>
           </li>
         </ul>
      </div>
    );
  }
});
