const React = require('react');

const StatusBox = require('./StatusBox.jsx');
const PostsList = require('../post/PostsList.jsx');

module.exports = React.createClass({
  getInitialState(){
    return {
      posts: [{
        id: '0',
        img: "img/003.jpg",
        url: "/profile/megatricycle",
        name: "Peter Bernard M. Rupa",
        action: "says:",
        body: "This is a test post. Hooray!"
      }, {
        id: '1',
        img: "img/002.jpg",
        url: "/profile/WareAnj",
        name: "Angelica P. Ware",
        action: "is looking for a job."
      }]
    };
  },
  addPost(post){
    this.setState({
      posts: this.state.posts.concat(post)
    });
  },
  render() {
    return (
      <div>
        <StatusBox addPost={this.addPost}/>
        <PostsList posts={this.state.posts}/>
      </div>
    );
  }
});
