var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      job: null
    };
  },
  componentWillMount: function(){
    var self = this;

    $.ajax({
      url: "api/job/"+this.props.params.id,
      method: "GET",
      success: function(res){
        self.setState({
          job: res
        });
      }
    });
  },
  render(){
    var name = "";
    var country = "";
    var company = "";

    if(this.state.job){
      name = this.state.job.name;
      country = this.state.job.country;
      company = this.state.job.company;
    }

    return (
      <div>
        <h5>Job</h5>
        <p>
          {name}
        </p>
        <p>
          {country}
        </p>
        <p>
          {company}
        </p>
      </div>
    );
  }
});
