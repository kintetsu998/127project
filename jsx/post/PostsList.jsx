const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const Post = require('./Post.jsx');

module.exports = React.createClass({
  render(){
    var list = this.props.posts;

    list.reverse();

    var postNodes = list.map(function(post){
      return(
        <Post
          key={post.id}
          img={post.img}
          url={post.url}
          name={post.name}
          action={post.action}
          body={post.body}
        />
      );
    });

    list.reverse();

    return (
      <div className="postList">
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {postNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
