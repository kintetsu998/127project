const React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      job: null
    };
  },
  componentWillMount: function(){
    var self = this;

    $.ajax({
      url: "/api/job?jobid="+this.props.params.id,
      method: "GET",
      success: function(res){
        self.setState({
          job: res
        });

        console.log(self.state.job);
      }
    });
  },
  render(){
    return (
      <div className="row">
        <div className="card-panel">
          <p className="center-text job-title">Janitor at Nestle Foods</p>
          <p className="center-text job-country">Philippines</p>

          <strong>Field:</strong>
          <p>Web Development</p>
          <strong>Description:</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <div className="center">
            <a className="waves-effect waves-light btn blue">Stuff</a>
          </div>

          <br/>
          <strong className="red-text job-closed">This job offer is closed.</strong>
        </div>

        <div className="col s12 l6 offset-l3">
          <div className="card-panel">
            <h5>Applicants</h5>

            <div className="collection">
              <a href="#!" className="collection-item">Alvin</a>
              <a href="#!" className="collection-item">Alvin</a>
              <a href="#!" className="collection-item">Alvin</a>
              <a href="#!" className="collection-item">Alvin</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
});
