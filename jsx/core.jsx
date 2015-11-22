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
var ProfilePage = require('./profilepage/ProfilePage.jsx');
var JobPage = require('./jobpage/JobPage.jsx');

ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Homepage}/>
        <Route path="profile/:username" component={ProfilePage}/>
        <Route path="job/:id" component={JobPage}/>
      </Route>
    </Router>
), document.getElementById('app'));
