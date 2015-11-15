var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route
var RouteHandler = ReactRouter.RouteHandler;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var history = createBrowserHistory({
  queryString: 'cats'
});

// import classes
var Layout = require('./layout/Layout.jsx');
var Homepage = require('./homepage/HomePage.jsx');

var JobPage = React.createClass({
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

ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Homepage}/>
        <Route path="job/:id" component={JobPage}/>
      </Route>
    </Router>
), document.getElementById('app'));
