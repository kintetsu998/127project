const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const RouteHandler = ReactRouter.RouteHandler;
const IndexRoute = ReactRouter.IndexRoute;
const createBrowserHistory = require('history/lib/createBrowserHistory');
const history = createBrowserHistory({
  queryString: 'cats'
});

// import classes
const Layout = require('./layout/Layout.jsx');
const Homepage = require('./homepage/HomePage.jsx');
const ProfilePage = require('./profilepage/ProfilePage.jsx');
const JobPage = require('./jobpage/JobPage.jsx');
const AdminPage = require('./adminpage/AdminPage.jsx');
const SearchPage = require('./searchpage/SearchPage.jsx');

ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Homepage}/>
        <Route path="profile/:username" component={ProfilePage}/>
        <Route path="job/:id" component={JobPage}/>
        <Route path="admin" component={AdminPage}></Route>
        <Route path="s" component={SearchPage}></Route>
      </Route>
    </Router>
), document.getElementById('app'));
