var React = require('react');

var Post = require('../post/Post.jsx');
var ProfileTop = require('./ProfileTop.jsx');
var ProfileMiddle = require('./ProfileMiddle.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      experiences: []
    };
  },
  componentDidMount(){
    var self = this;

    $.ajax({
      'url': '/api/users/' + this.props.params.username,
      'method': 'GET',
      'success'(data){
        self.setState(data);
      },
      'error'(err){
        console.error(err);
      }
    });

    // experiences
    $.ajax({
      'url': '/api/user-experience?username=' + this.props.params.username,
      'method': 'GET',
      'success'(data){
        self.setState({
          experiences: data
        });

        console.log(self.state);
      },
      'error'(err){
        console.error(err);
      }
    });
  },
  render() {
    var name = [this.state.fname, this.state.mname, this.state.lname].join(' ');

    return (
      <div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-top">
            <ProfileTop
              name={name}
              occupation={this.state.occupation}
              college={this.state.college}
              country={this.state.country}
              img={this.state.picture}
              experiences={this.state.experiences}
            />
          </div>
        </div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-middle">
            <ProfileMiddle
              interest={this.state.fieldofinterest}
            />
          </div>
        </div>
        <div className="row small-margin">
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="is looking for a job."/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="This is a post."/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body=":)"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="is now connected with Procopio. "/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="Hello World!"/>
          </div>
        </div>
      </div>
    );
  }
});
