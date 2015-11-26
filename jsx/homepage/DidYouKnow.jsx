const React = require('react');

const Link = require('react-router').Link;

module.exports = React.createClass({
  render(){
    return (
      <div className="card-panel">
        <h5>Did you know?</h5>

        <p>That...</p>

        <p>...most of your connections are <Link to="/s?keyword=Janitor"><strong>Janitors</strong></Link>? (3 connections) </p>
        <p>...most of your connections like <Link to="/s?keyword=Web Development"><strong>Web Development</strong></Link>? (7 connections) </p>
      </div>
    );
  }
});
