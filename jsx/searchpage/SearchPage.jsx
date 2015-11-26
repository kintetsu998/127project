const React = require('react');

const Link = require('react-router').Link;

module.exports = React.createClass({
  render(){
    console.log(this.props.location.query.keyword);

    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header"><h4>Users</h4></li>
          <Link to="/profile/admin">
            <li className="collection-item avatar">
              <img src="img/003.jpg" alt="" className="circle"/>
              <strong className="title">Peter Bernard M. Rupa</strong>
              <p>Works at Sa Puso Mo as Janitor <br/>
                 Interested in Psychology
              </p>
            </li>
          </Link>
        </ul>

        <ul className="collection with-header">
          <li className="collection-header"><h4>Jobs</h4></li>
          <Link to="/job/39">
            <li className="collection-item">Janitor</li>
          </Link>
        </ul>
      </div>
    );
  }
});
