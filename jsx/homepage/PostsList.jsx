var React = require('react');

var Post = require('./Post.jsx');

module.exports = React.createClass({
  render(){
    var list = this.props.posts;

    list.reverse();

    var postNodes = list.map(function(post){
      return(
        <Post
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
        {postNodes}
      </div>
    );
  }
});
